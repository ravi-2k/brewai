// Image generation provider: Cloudflare Workers AI (FLUX.1 schnell).
// This is the ONLY file that knows about it, so switching to another provider
// means rewriting just this function. Callers only see "prompt in, Buffer out".
const TIMEOUT_MS = 90_000;

// Overridable from .env so you can try other Workers AI image models.
const getModel = () =>
  process.env.CLOUDFLARE_IMAGE_MODEL || "@cf/black-forest-labs/flux-1-schnell";

// Read at call time (not import time) so the server starts without these set,
// and a missing one produces a clear error naming it.
const getCredentials = () => {
  const { CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN } = process.env;

  const missing = [
    ["CLOUDFLARE_ACCOUNT_ID", CLOUDFLARE_ACCOUNT_ID],
    ["CLOUDFLARE_API_TOKEN", CLOUDFLARE_API_TOKEN],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(`Missing in server/.env: ${missing.join(", ")}`);
  }

  return { accountId: CLOUDFLARE_ACCOUNT_ID, token: CLOUDFLARE_API_TOKEN };
};

/**
 * Generates an image from a text prompt. Returns the image as a Buffer.
 * FLUX schnell takes up to 2048 characters of prompt; we send at most ~600.
 */
export const generateImage = async (prompt) => {
  const { accountId, token } = getCredentials();

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${getModel()}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // steps: how many refinement passes. schnell is built for 4 (max 8).
      body: JSON.stringify({ prompt, steps: 4 }),
      // AbortSignal.timeout cancels the request if the provider hangs.
      signal: AbortSignal.timeout(TIMEOUT_MS),
    },
  );

  // Some models answer with the raw image, others with JSON holding base64.
  const type = response.headers.get("content-type") ?? "";
  if (response.ok && type.startsWith("image/")) {
    return Buffer.from(await response.arrayBuffer());
  }

  const data = await response.json().catch(() => null);

  if (!response.ok || data?.success === false) {
    const reason = data?.errors?.[0]?.message ?? `status ${response.status}`;
    throw new Error(`Cloudflare image generation failed: ${reason}`);
  }

  // Cloudflare wraps results as { result: { image: "<base64>" }, success: true }.
  const base64 = data?.result?.image ?? data?.image;
  if (!base64) throw new Error("Cloudflare returned no image");

  return Buffer.from(base64, "base64");
};

import { v2 as cloudinary } from "cloudinary";

let configured = false;

/**
 * Returns the configured Cloudinary client.
 * Configured lazily (on first use) so the server starts even before the
 * credentials exist, and a missing one gives a clear error naming it.
 */
export const getCloudinary = () => {
  if (!configured) {
    const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
      process.env;

    const missing = [
      ["CLOUDINARY_CLOUD_NAME", CLOUDINARY_CLOUD_NAME],
      ["CLOUDINARY_API_KEY", CLOUDINARY_API_KEY],
      ["CLOUDINARY_API_SECRET", CLOUDINARY_API_SECRET],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    if (missing.length > 0) {
      throw new Error(`Missing in server/.env: ${missing.join(", ")}`);
    }

    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
      secure: true, // always return https:// URLs
    });
    configured = true;
  }

  return cloudinary;
};

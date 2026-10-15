import { getCloudinary } from "../config/cloudinary.js";

/**
 * Uploads an image (a Buffer of bytes) to Cloudinary.
 * Returns { url, publicId }: the https URL for <img src>, and the ID we need
 * later to delete the file.
 */
export const uploadImage = (buffer, folder = "brewai") => {
  const cloudinary = getCloudinary();

  // upload_stream is callback-based, so wrap it in a Promise to use await.
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      },
    );
    stream.end(buffer);
  });
};

/** Deletes an uploaded image. Used to undo an upload if saving to the DB fails. */
export const deleteImage = (publicId) =>
  getCloudinary().uploader.destroy(publicId);

/**
 * Builds a delivery URL for an uploaded image with a transformation applied,
 * e.g. buildUrl(id, { effect: "background_removal", format: "png" }).
 * Cloudinary runs the transformation the first time the URL is requested.
 */
export const buildUrl = (publicId, options = {}) =>
  getCloudinary().url(publicId, { secure: true, ...options });

/**
 * Requests a URL once and checks it really returns an image.
 * Transformations run lazily on first request, so doing it here means a failure
 * (e.g. the AI add-on is not enabled) shows up now as a clear error, not later
 * as a broken image in the browser. It also warms Cloudinary's cache.
 */
export const assertServesImage = async (url) => {
  const response = await fetch(url, { signal: AbortSignal.timeout(60_000) });
  const type = response.headers.get("content-type") ?? "";

  if (!response.ok || !type.startsWith("image/")) {
    const reason = response.headers.get("x-cld-error") ?? `status ${response.status}`;
    throw new Error(`Cloudinary could not process the image (${reason})`);
  }

  await response.arrayBuffer(); // read to the end so the connection is released
};

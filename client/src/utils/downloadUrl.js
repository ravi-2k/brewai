/**
 * Browsers ignore <a download> for images on another domain (ours come from
 * Cloudinary), and just open them in a tab. Cloudinary's `fl_attachment` flag
 * makes it send "Content-Disposition: attachment", which forces a real download.
 */
export const toDownloadUrl = (url) =>
  url.includes('res.cloudinary.com') ? url.replace('/upload/', '/upload/fl_attachment/') : url

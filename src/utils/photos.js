export const MAX_IMAGE_BYTES = 2 * 1024 * 1024;
export const MAX_IMAGE_DIMENSION = 4096;
export const IMAGE_HELP = "JPEG, PNG, WebP or GIF. Maximum 2 MB and 4096 × 4096 pixels.";
const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function preparePhoto(file) {
  if (!allowed.includes(file.type)) throw new Error("Choose a JPEG, PNG, WebP or GIF. Export HEIC photos as JPEG first.");
  if (file.size > 25 * 1024 * 1024) throw new Error("This photo is too large to prepare here. Choose a photo smaller than 25 MB.");
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("This image could not be read. Choose another photo."));
      image.src = url;
    });
    if (file.size <= MAX_IMAGE_BYTES && Math.max(img.naturalWidth, img.naturalHeight) <= MAX_IMAGE_DIMENSION) return file;
    if (["image/gif", "image/webp"].includes(file.type)) throw new Error("Resize this GIF or WebP to 2 MB and 4096 × 4096 pixels before uploading, to preserve any animation.");
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Photo resizing is unavailable. Choose an image up to 2 MB and 4096 × 4096 pixels.");
    let scale = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(img.naturalWidth, img.naturalHeight));
    for (let attempt = 0; attempt < 8; attempt += 1) {
      canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, file.type, Math.max(.55, .88 - attempt * .05)));
      if (blob && blob.size <= MAX_IMAGE_BYTES) return new File([blob], file.name.replace(/\.[^.]+$/, "") + (blob.type === "image/png" ? ".png" : ".jpg"), { type: blob.type });
      scale *= .8;
    }
    throw new Error("We couldn’t reduce this photo below 2 MB. Choose a smaller photo.");
  } finally { URL.revokeObjectURL(url); }
}

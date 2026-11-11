export type UploadedImage = {
  secureUrl: string;
  publicId: string;
  originalFilename: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
};

const maxImageSize = 10 * 1024 * 1024;
const allowedImageTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export async function uploadImageToCloudinary(
  file: File,
  onProgress: (progress: number) => void,
): Promise<UploadedImage> {
  if (!allowedImageTypes.has(file.type)) {
    throw new Error("Choose a JPEG, PNG, WebP, or GIF image. SVG files are not accepted.");
  }
  if (file.size > maxImageSize) {
    throw new Error("Choose an image no larger than 10 MB.");
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME?.trim();
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET?.trim();
  if (!cloudName || !uploadPreset) {
    throw new Error(
      "Image uploads need NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local.",
    );
  }
  if (!/^[a-zA-Z0-9_-]+$/.test(cloudName)) {
    throw new Error("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not a valid Cloudinary cloud name.");
  }

  const response = await sendUpload(file, cloudName, uploadPreset, onProgress);
  if (
    !response ||
    typeof response !== "object" ||
    !("secure_url" in response) ||
    typeof response.secure_url !== "string" ||
    !("public_id" in response) ||
    typeof response.public_id !== "string" ||
    !("bytes" in response) ||
    typeof response.bytes !== "number" ||
    !("width" in response) ||
    typeof response.width !== "number" ||
    !("height" in response) ||
    typeof response.height !== "number"
  ) {
    throw new Error("Cloudinary returned incomplete image metadata.");
  }

  const secureUrl = new URL(response.secure_url);
  if (
    secureUrl.protocol !== "https:" ||
    secureUrl.hostname !== "res.cloudinary.com" ||
    secureUrl.pathname.split("/")[1] !== cloudName
  ) {
    throw new Error("Cloudinary returned an image URL for an unexpected cloud.");
  }

  return {
    secureUrl: secureUrl.toString(),
    publicId: response.public_id,
    originalFilename: file.name,
    format:
      "format" in response && typeof response.format === "string"
        ? response.format
        : file.type.split("/")[1],
    bytes: response.bytes,
    width: response.width,
    height: response.height,
  };
}

function sendUpload(
  file: File,
  cloudName: string,
  uploadPreset: string,
  onProgress: (progress: number) => void,
) {
  return new Promise<unknown>((resolve, reject) => {
    const request = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    request.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    );
    request.timeout = 120_000;
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };
    request.onerror = () => {
      reject(new Error("Network error while uploading. Check the connection and Cloudinary access."));
    };
    request.ontimeout = () => {
      reject(new Error("Cloudinary upload timed out. Try a smaller image or check the connection."));
    };
    request.onabort = () => reject(new Error("Cloudinary upload was cancelled."));
    request.onload = () => {
      let payload: unknown;
      try {
        payload = JSON.parse(request.responseText);
      } catch {
        reject(
          new Error(
            `Cloudinary returned an unreadable response (HTTP ${request.status}).`,
          ),
        );
        return;
      }

      if (request.status < 200 || request.status >= 300) {
        const cloudinaryMessage = readCloudinaryError(payload);
        const isMissingPreset = /upload preset not found/i.test(cloudinaryMessage);
        const isUnknownApiKey =
          request.status === 401 && /unknown api key/i.test(cloudinaryMessage);
        reject(
          new Error(
            isMissingPreset
              ? "Cloudinary could not find this upload preset. In Cloudinary Console, create or enable an unsigned upload preset for this cloud, then set NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET to its exact name and restart the app."
              : isUnknownApiKey
                ? "Cloudinary does not recognize this upload endpoint. Check that NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME exactly matches the Cloud name on the API Keys page for the active Cloudinary product environment. Unsigned uploads do not need an API key or secret. Restart the app after changing the cloud name."
              : `Cloudinary upload failed (HTTP ${request.status}): ${cloudinaryMessage}`,
          ),
        );
        return;
      }

      resolve(payload);
    };
    request.send(formData);
  });
}

function readCloudinaryError(payload: unknown) {
  if (
    payload &&
    typeof payload === "object" &&
    "error" in payload &&
    payload.error &&
    typeof payload.error === "object" &&
    "message" in payload.error &&
    typeof payload.error.message === "string"
  ) {
    return payload.error.message;
  }
  return "Cloudinary did not provide an error description.";
}

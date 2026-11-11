"use client";

import { ChangeEvent, useState } from "react";
import { ImagePlus } from "lucide-react";
import { UploadedImage, uploadImageToCloudinary } from "../../lib/cloudinary/uploadImage";

export function CloudinaryImageUploader({
  label,
  onUploaded,
  disabled = false,
}: {
  label: string;
  onUploaded: (image: UploadedImage) => Promise<void>;
  disabled?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    setError("");
    setUploading(true);
    setProgress(0);
    let uploadedToCloudinary = false;
    try {
      const image = await uploadImageToCloudinary(file, setProgress);
      uploadedToCloudinary = true;
      await onUploaded(image);
    } catch (reason) {
      console.error("Could not complete the image upload flow.", reason);
      const detail =
        reason instanceof Error ? reason.message : "Could not upload this image.";
      setError(
        uploadedToCloudinary
          ? `${detail} The image was uploaded to Cloudinary; retrying may create a duplicate asset.`
          : detail,
      );
    } finally {
      setUploading(false);
      setProgress(0);
    }
  }

  return (
    <div>
      <label
        aria-disabled={disabled || uploading}
        className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 text-xs transition focus-within:outline focus-within:outline-2 focus-within:outline-blue-300 ${
          disabled || uploading
            ? "cursor-not-allowed border-white/10 text-white/35"
            : "cursor-pointer border-white/15 text-white/75 hover:border-blue-200/40 hover:text-white"
        }`}
      >
        <ImagePlus className="h-4 w-4" />
        {uploading ? `Uploading ${progress}%` : label}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          disabled={disabled || uploading}
          onChange={(event) => void handleFileChange(event)}
          className="sr-only"
        />
      </label>
      {uploading && (
        <div
          className="mt-2 h-1 overflow-hidden rounded-full bg-white/10"
          role="progressbar"
          aria-label="Image upload progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <div
            className="h-full bg-blue-200 transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
      {error && (
        <p role="alert" className="mt-2 max-w-md text-xs leading-5 text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

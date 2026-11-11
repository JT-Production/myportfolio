"use client";

import { optimizedCloudinaryUrl } from "../../lib/cloudinary/imageUrl";
import { UploadedImage } from "../../lib/cloudinary/uploadImage";
import { CloudinaryImageUploader } from "./CloudinaryImageUploader";

export type ProjectGalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export function ProjectImageFields({
  coverImage,
  gallery,
  disabled,
  onCoverUploaded,
  onGalleryUploaded,
  onCoverRemove,
  onGalleryRemove,
  onGalleryChange,
}: {
  coverImage: string;
  gallery: ProjectGalleryImage[];
  disabled: boolean;
  onCoverUploaded: (image: UploadedImage) => Promise<void>;
  onGalleryUploaded: (image: UploadedImage) => Promise<void>;
  onCoverRemove: () => void;
  onGalleryRemove: (index: number) => void;
  onGalleryChange: (
    index: number,
    field: "alt" | "caption",
    value: string,
  ) => void;
}) {
  return (
    <section
      aria-label="Project images"
      className="mb-5 space-y-5 rounded-xl border border-white/10 bg-[#080a0f] p-4 sm:p-5"
    >
      <div>
        <h3 className="text-sm font-medium text-white/85">Project images</h3>
        <p className="mt-1 text-xs leading-5 text-white/45">
          Upload a cover image and case-study gallery images. They are added to
          the media library; save the project below to publish the changes.
        </p>
        {disabled && (
          <p role="status" className="mt-2 text-xs text-amber-200/75">
            Fix the project JSON and finish saving before uploading images.
          </p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        {coverImage ? (
          <div
            role="img"
            aria-label="Current project cover image"
            className="aspect-[16/9] overflow-hidden rounded-lg border border-white/10 bg-cover bg-center"
            style={{
              backgroundImage: `url("${optimizedCloudinaryUrl(coverImage, 1000)}")`,
            }}
          />
        ) : (
          <div className="grid aspect-[16/9] place-items-center rounded-lg border border-dashed border-white/15 text-xs text-white/35">
            No cover image selected
          </div>
        )}
        <div className="flex flex-wrap gap-2 md:flex-col">
          <CloudinaryImageUploader
            label={coverImage ? "Replace cover" : "Upload cover"}
            onUploaded={onCoverUploaded}
            disabled={disabled}
          />
          {coverImage && (
            <button
              type="button"
              onClick={onCoverRemove}
              className="min-h-10 rounded-lg border border-white/10 px-3 text-xs text-red-200/75 hover:border-red-200/30 hover:text-red-100"
            >
              Remove cover
            </button>
          )}
        </div>
      </div>

      <div className="border-t border-white/[0.08] pt-5">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <h4 className="text-xs font-medium text-white/75">
            Case study gallery ({gallery.length})
          </h4>
          <CloudinaryImageUploader
            label="Add gallery image"
            onUploaded={onGalleryUploaded}
            disabled={disabled}
          />
        </div>

        {gallery.length === 0 ? (
          <p className="rounded-lg border border-dashed border-white/10 p-4 text-xs text-white/35">
            No gallery images yet.
          </p>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {gallery.map((image, index) => (
              <article
                key={`${image.src}-${index}`}
                className="overflow-hidden rounded-lg border border-white/10"
              >
                <div
                  role="img"
                  aria-label={image.alt || `Gallery image ${index + 1}`}
                  className="aspect-[16/10] bg-cover bg-center"
                  style={{
                    backgroundImage: `url("${optimizedCloudinaryUrl(image.src, 800)}")`,
                  }}
                />
                <div className="space-y-2 p-3">
                  <label className="block text-[10px] text-white/50">
                    Alt text
                    <input
                      value={image.alt}
                      onChange={(event) =>
                        onGalleryChange(index, "alt", event.target.value)
                      }
                      className="mt-1 min-h-9 w-full rounded-md border border-white/10 bg-black/20 px-2 text-xs text-white outline-none focus:border-blue-200/50"
                    />
                  </label>
                  <label className="block text-[10px] text-white/50">
                    Caption
                    <input
                      value={image.caption}
                      onChange={(event) =>
                        onGalleryChange(index, "caption", event.target.value)
                      }
                      className="mt-1 min-h-9 w-full rounded-md border border-white/10 bg-black/20 px-2 text-xs text-white outline-none focus:border-blue-200/50"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => onGalleryRemove(index)}
                    className="pt-1 text-xs text-red-200/70 hover:text-red-100"
                  >
                    Remove from project
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

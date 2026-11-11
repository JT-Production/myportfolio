"use client";

import { useEffect, useState } from "react";
import {
  addActivity,
  ContentRecord,
  createContent,
  listAdminContent,
  removeContent,
  saveContent,
} from "../../lib/firebase/content";
import { useAdminAuth } from "./AdminAuthProvider";
import { optimizedCloudinaryUrl } from "../../lib/cloudinary/imageUrl";
import { CloudinaryImageUploader } from "./CloudinaryImageUploader";
import { UploadedImage } from "../../lib/cloudinary/uploadImage";

export function AdminMediaManager() {
  const { user } = useAdminAuth();
  const [records, setRecords] = useState<ContentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function refresh() {
    try {
      setRecords(await listAdminContent("media"));
      setError("");
    } catch (reason) {
      console.error("Could not load media records.", reason);
      setError(reason instanceof Error ? reason.message : "Could not load media.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    listAdminContent("media")
      .then((items) => {
        if (active) {
          setRecords(items);
          setError("");
        }
      })
      .catch((reason: unknown) => {
        if (!active) return;
        console.error("Could not load media records.", reason);
        setError(reason instanceof Error ? reason.message : "Could not load media.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function handleUpload(image: UploadedImage) {
    if (!user) {
      throw new Error("Sign in again before uploading media.");
    }
    setError("");
    setNotice("");

    try {
      await createContent(
        "media",
        {
          secureUrl: image.secureUrl,
          publicId: image.publicId,
          originalFilename: image.originalFilename,
          format: image.format,
          bytes: image.bytes,
          width: image.width,
          height: image.height,
          alt: image.originalFilename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "),
          caption: "",
        },
        user.uid,
      );
      setNotice("Image uploaded and its metadata was saved.");
      await refresh();
      try {
        await addActivity("Uploaded media", image.originalFilename, user.uid);
      } catch (activityError) {
        console.error("Media was uploaded, but its activity entry could not be recorded.", activityError);
        setNotice("Image uploaded, but the activity log could not be updated.");
      }
    } catch (reason) {
      console.error("Image uploaded, but its media-library record could not be saved.", reason);
      throw new Error(
        `Image uploaded to Cloudinary, but saving its media record failed: ${
          reason instanceof Error ? reason.message : "Firestore rejected the write."
        }`,
      );
    }
  }

  async function saveMetadata(record: ContentRecord, alt: string, caption: string) {
    if (!user) {
      setError("Sign in again before editing media metadata.");
      return;
    }
    setError("");
    setNotice("");
    try {
      const { id, ...values } = record;
      await saveContent("media", id, { ...values, alt, caption }, user.uid);
      setNotice("Image metadata saved.");
      await refresh();
    } catch (reason) {
      console.error("Could not save image metadata.", reason);
      setError(reason instanceof Error ? reason.message : "Could not save metadata.");
      return;
    }
    try {
      await addActivity(
        "Updated media metadata",
        String(record.originalFilename ?? record.id),
        user.uid,
      );
    } catch (reason) {
      console.error("Media metadata saved, but its activity entry could not be recorded.", reason);
      setNotice("Image metadata saved, but the activity log could not be updated.");
    }
  }

  async function deleteMetadata(record: ContentRecord) {
    if (
      !window.confirm(
        "Remove this image from the portfolio library? The uploaded Cloudinary asset itself will remain in Cloudinary.",
      )
    ) {
      return;
    }
    try {
      await removeContent("media", record.id);
      setRecords((current) => current.filter((item) => item.id !== record.id));
      setNotice("Image metadata removed from the library.");
      if (user) {
        try {
          await addActivity(
            "Removed media metadata",
            String(record.originalFilename ?? record.id),
            user.uid,
          );
        } catch (activityError) {
          console.error("Media record removed, but its activity entry could not be recorded.", activityError);
          setNotice("Image record removed, but the activity log could not be updated.");
        }
      }
    } catch (reason) {
      console.error("Could not remove the media record.", reason);
      setError(reason instanceof Error ? reason.message : "Could not remove media.");
    }
  }

  return (
    <section>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/65">
            Asset management
          </p>
          <h1 className="mt-2 text-3xl font-medium">Media library</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
            Uploads use a restricted unsigned Cloudinary preset. Configure that preset to accept images only, under 10 MB, in the Portfolio folder.
          </p>
        </div>
        <CloudinaryImageUploader
          label="Upload image"
          onUploaded={handleUpload}
        />
      </header>

      {error && <p role="alert" className="mt-4 text-sm text-red-300">{error}</p>}
      {notice && <p role="status" className="mt-4 text-sm text-emerald-300">{notice}</p>}

      {loading ? (
        <p className="mt-8 text-sm text-white/45">Loading library...</p>
      ) : records.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-white/15 p-8 text-sm text-white/45">
          No image metadata yet. Upload an image to add it to the library.
        </div>
      ) : (
        <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {records.map((record) => (
            <MediaCard
              key={record.id}
              record={record}
              onSave={saveMetadata}
              onDelete={deleteMetadata}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function MediaCard({
  record,
  onSave,
  onDelete,
}: {
  record: ContentRecord;
  onSave: (record: ContentRecord, alt: string, caption: string) => Promise<void>;
  onDelete: (record: ContentRecord) => Promise<void>;
}) {
  const [alt, setAlt] = useState(String(record.alt ?? ""));
  const [caption, setCaption] = useState(String(record.caption ?? ""));
  const secureUrl = typeof record.secureUrl === "string" ? record.secureUrl : "";

  return (
    <article className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
      {secureUrl ? (
        <div
          role="img"
          aria-label={alt || "Uploaded image"}
          className="aspect-[16/10] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${optimizedCloudinaryUrl(secureUrl, 800)}")`,
          }}
        />
      ) : (
        <div className="grid aspect-[16/10] place-items-center text-xs text-white/35">
          Preview unavailable
        </div>
      )}
      <div className="space-y-3 p-4">
        <p className="truncate font-mono text-[10px] text-white/35">
          {String(record.originalFilename ?? record.publicId ?? record.id)}
        </p>
        <label className="block text-xs text-white/50">
          Alt text
          <input
            value={alt}
            onChange={(event) => setAlt(event.target.value)}
            className="mt-1 min-h-9 w-full rounded-md border border-white/10 bg-black/20 px-2 text-sm text-white outline-none focus:border-blue-200/50"
          />
        </label>
        <label className="block text-xs text-white/50">
          Caption
          <input
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
            className="mt-1 min-h-9 w-full rounded-md border border-white/10 bg-black/20 px-2 text-sm text-white outline-none focus:border-blue-200/50"
          />
        </label>
        <p className="text-[10px] text-white/35">
          {typeof record.width === "number" && typeof record.height === "number"
            ? `${record.width} × ${record.height}`
            : ""}
          {typeof record.bytes === "number"
            ? ` · ${(record.bytes / 1024 / 1024).toFixed(2)} MB`
            : ""}
        </p>
        <div className="flex justify-between gap-3">
          <button
            onClick={() => void onSave(record, alt, caption)}
            className="text-xs text-blue-100/80 hover:text-white"
          >
            Save metadata
          </button>
          <button
            onClick={() => void onDelete(record)}
            className="text-xs text-red-300/70 hover:text-red-200"
          >
            Remove record
          </button>
        </div>
      </div>
    </article>
  );
}

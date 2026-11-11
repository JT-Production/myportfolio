"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  addActivity,
  ContentCollection,
  ContentRecord,
  createContent,
  listAdminContent,
  reorderContent,
  removeContent,
  saveContent,
} from "../../lib/firebase/content";
import { useAdminAuth } from "./AdminAuthProvider";
import { UploadedImage } from "../../lib/cloudinary/uploadImage";
import {
  ProjectGalleryImage,
  ProjectImageFields,
} from "./ProjectImageFields";

const templates: Record<string, Record<string, unknown>> = {
  projects: {
    title: "New project",
    slug: "new-project",
    subHeader: "Project type",
    summary: "",
    description: "",
    categories: ["Web Development"],
    role: [],
    company: "",
    period: "",
    technologies: [],
    image: "",
    gallery: [],
    theme: "default",
    featured: false,
    isVisible: false,
    status: "draft",
    displayOrder: 0,
    caseStudy: {
      overview: "",
      challenge: "",
      contributions: [],
      process: [],
      features: [],
      technicalDetails: [],
      learnings: [],
    },
  },
  skills: {
    name: "New skill",
    category: "Frontend",
    description: "",
    isVisible: true,
    isFeatured: false,
    displayOrder: 0,
  },
  toolkit: {
    name: "New tool",
    category: "Development Tools",
    description: "",
    isVisible: true,
    isFeatured: false,
    displayOrder: 0,
  },
  experience: {
    year: "",
    company: "",
    role: "",
    description: "",
    current: false,
    isVisible: true,
    displayOrder: 0,
  },
};

const collectionLabels: Record<string, string> = {
  projects: "Projects",
  skills: "Skills",
  toolkit: "Toolkit",
  experience: "Experience",
};

function parseRecord(value: string): Record<string, unknown> | null {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return null;
    }
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function parseGallery(value: unknown): ProjectGalleryImage[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (
      !item ||
      typeof item !== "object" ||
      !("src" in item) ||
      typeof item.src !== "string"
    ) {
      return [];
    }
    return [
      {
        src: item.src,
        alt: "alt" in item && typeof item.alt === "string" ? item.alt : "",
        caption:
          "caption" in item && typeof item.caption === "string"
            ? item.caption
            : "",
      },
    ];
  });
}

export function AdminContentManager({
  collectionName,
}: {
  collectionName: Exclude<ContentCollection, "media" | "activityLogs" | "siteSettings">;
}) {
  const { user } = useAdminAuth();
  const [records, setRecords] = useState<ContentRecord[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [json, setJson] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [projectAction, setProjectAction] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const projectValues =
    collectionName === "projects" ? parseRecord(json) : null;
  const projectCover =
    projectValues && typeof projectValues.image === "string"
      ? projectValues.image
      : "";
  const projectGallery = parseGallery(projectValues?.gallery);

  async function refresh() {
    try {
      setRecords(await listAdminContent(collectionName));
      setError("");
    } catch (reason) {
      console.error(`Could not load ${collectionName}.`, reason);
      setError(reason instanceof Error ? reason.message : "Could not load content.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    listAdminContent(collectionName)
      .then((items) => {
        if (active) {
          setRecords(items);
          setError("");
        }
      })
      .catch((reason: unknown) => {
        if (!active) return;
        console.error(`Could not load ${collectionName}.`, reason);
        setError(reason instanceof Error ? reason.message : "Could not load content.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [collectionName]);

  function startNew() {
    setSelectedId(null);
    setJson(JSON.stringify(templates[collectionName], null, 2));
    setError("");
    setNotice("");
  }

  function editRecord(record: ContentRecord) {
    const metadataFields = new Set(["id", "createdAt", "updatedAt", "createdBy", "updatedBy"]);
    const values = Object.fromEntries(
      Object.entries(record).filter(([key]) => !metadataFields.has(key)),
    );
    setSelectedId(record.id);
    setJson(JSON.stringify(values, null, 2));
    setError("");
    setNotice("");
  }

  function updateProjectJson(update: (values: Record<string, unknown>) => void) {
    setJson((current) => {
      const values = parseRecord(current);
      if (!values) return current;
      update(values);
      return JSON.stringify(values, null, 2);
    });
  }

  async function handleProjectImageUpload(
    image: UploadedImage,
    destination: "cover" | "gallery",
  ) {
    if (!user) {
      throw new Error("Sign in again before uploading project images.");
    }
    const projectTitle =
      projectValues && typeof projectValues.title === "string"
        ? projectValues.title
        : "Untitled project";
    const alt = image.originalFilename
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ");

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
          alt: destination === "cover" ? `${projectTitle} cover` : alt,
          caption: "",
        },
        user.uid,
      );
    } catch (reason) {
      console.error("Image uploaded, but its media-library record could not be saved.", reason);
      throw new Error(
        `Image uploaded to Cloudinary, but its media-library record could not be saved: ${
          reason instanceof Error ? reason.message : "Firestore rejected the write."
        }`,
      );
    }

    updateProjectJson((values) => {
      if (destination === "cover") {
        values.image = image.secureUrl;
        return;
      }
      values.gallery = [
        ...parseGallery(values.gallery),
        { src: image.secureUrl, alt, caption: "" },
      ];
    });
    setError("");
    setNotice(
      `${destination === "cover" ? "Cover" : "Gallery"} image uploaded and added to this project. Save the project to apply it to the portfolio.`,
    );

    try {
      await addActivity(
        "Uploaded project image",
        `${projectTitle} / ${destination}`,
        user.uid,
      );
    } catch (activityError) {
      console.error(
        "Project image uploaded, but the activity entry could not be recorded.",
        activityError,
      );
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      setError("Your administrator session is no longer available. Sign in again.");
      return;
    }

    let values: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(json);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("The content must be a JSON object.");
      }
      values = parsed as Record<string, unknown>;
      if (
        collectionName === "projects" &&
        (typeof values.title !== "string" ||
          typeof values.summary !== "string" ||
          !Array.isArray(values.categories) ||
          !Array.isArray(values.role) ||
          !Array.isArray(values.technologies) ||
          !values.caseStudy ||
          typeof values.caseStudy !== "object" ||
          Array.isArray(values.caseStudy) ||
          !("overview" in values.caseStudy) ||
          typeof values.caseStudy.overview !== "string" ||
          !("challenge" in values.caseStudy) ||
          typeof values.caseStudy.challenge !== "string" ||
          !("contributions" in values.caseStudy) ||
          !Array.isArray(values.caseStudy.contributions) ||
          !("learnings" in values.caseStudy) ||
          !Array.isArray(values.caseStudy.learnings))
      ) {
        throw new Error("Projects need a title, summary, category, role and technology arrays, plus a case study with overview, challenge, contributions and learnings.");
      }
      if (
        collectionName !== "projects" &&
        typeof values.name !== "string" &&
        typeof values.company !== "string"
      ) {
        throw new Error("Provide a name or company for this record.");
      }
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Invalid JSON content.");
      return;
    }

    setSaving(true);
    setError("");
    setNotice("");
    try {
      const label =
        String(values.title ?? values.name ?? values.company ?? collectionLabels[collectionName]);
      const id = await saveContent(collectionName, selectedId ?? undefined, values, user.uid);
      setSelectedId(id);
      setNotice("Content saved.");
      await refresh();
      try {
        await addActivity(
          selectedId ? "Updated content" : "Created content",
          label,
          user.uid,
        );
      } catch (activityError) {
        console.error("Content saved, but the activity entry could not be recorded.", activityError);
        setNotice("Content saved, but the activity log could not be updated.");
      }
    } catch (reason) {
      console.error(`Could not save ${collectionName} content.`, reason);
      setError(reason instanceof Error ? reason.message : "Could not save content.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(record: ContentRecord) {
    const label = String(record.title ?? record.name ?? record.company ?? record.id);
    if (!window.confirm(`Permanently delete "${label}"? This cannot be undone.`)) return;
    setError("");
    setNotice("");
    try {
      await removeContent(collectionName, record.id);
      setRecords((current) => current.filter((item) => item.id !== record.id));
      if (selectedId === record.id) {
        setSelectedId(null);
        setJson("");
      }
      setNotice("Content deleted.");
      if (user) {
        try {
          await addActivity("Deleted content", label, user.uid);
        } catch (activityError) {
          console.error("Content deleted, but the activity entry could not be recorded.", activityError);
          setNotice("Content deleted, but the activity log could not be updated.");
        }
      }
    } catch (reason) {
      console.error(`Could not delete ${collectionName} content.`, reason);
      setError(reason instanceof Error ? reason.message : "Could not delete content.");
    }
  }

  const orderedRecords =
    collectionName === "projects"
      ? [...records].sort(
          (left, right) =>
            (left.displayOrder ?? 0) - (right.displayOrder ?? 0) ||
            String(left.title ?? left.id).localeCompare(
              String(right.title ?? right.id),
            ),
        )
      : records;
  const filtered = orderedRecords.filter((record) => {
    const label = String(record.title ?? record.name ?? record.company ?? "");
    const matchesSearch = `${label} ${record.slug ?? ""} ${record.category ?? ""}`
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "visible" && record.isVisible === true) ||
      (statusFilter === "hidden" &&
        (record.isVisible !== true || record.status === "draft")) ||
      (statusFilter === "published" && record.status === "published") ||
      (statusFilter === "draft" && record.status === "draft");
    return matchesSearch && matchesStatus;
  });

  async function updateProjectState(
    record: ContentRecord,
    changes: { status?: "draft" | "published" | "archived"; isVisible?: boolean },
  ) {
    if (!user || projectAction) return;
    setProjectAction(record.id);
    setError("");
    setNotice("");
    try {
      await saveContent("projects", record.id, changes, user.uid);
      setRecords((current) =>
        current.map((item) =>
          item.id === record.id ? { ...item, ...changes } : item,
        ),
      );
      if (selectedId === record.id) {
        updateProjectJson((values) => Object.assign(values, changes));
      }
      setNotice(`"${record.title ?? "Project"}" updated.`);
      try {
        await addActivity(
          "Updated project status",
          String(record.title ?? record.id),
          user.uid,
        );
      } catch (activityError) {
        console.error("Project updated, but the activity entry could not be recorded.", activityError);
        setNotice("Project updated, but the activity log could not be updated.");
      }
    } catch (reason) {
      console.error("Could not update project status.", reason);
      setError(reason instanceof Error ? reason.message : "Could not update project.");
    } finally {
      setProjectAction(null);
    }
  }

  async function moveProject(record: ContentRecord, direction: -1 | 1) {
    if (!user || projectAction) return;
    const index = orderedRecords.findIndex((item) => item.id === record.id);
    const adjacent = orderedRecords[index + direction];
    if (index < 0 || !adjacent) return;

    const reordered = [...orderedRecords];
    reordered.splice(index, 1);
    reordered.splice(index + direction, 0, record);
    setProjectAction("order");
    setError("");
    setNotice("");
    try {
      await reorderContent(
        "projects",
        reordered.map((item) => item.id),
        user.uid,
      );
      setRecords((current) => {
        const byId = new Map(current.map((item) => [item.id, item]));
        return reordered.map((item, order) => ({
          ...byId.get(item.id)!,
          displayOrder: order * 10,
        }));
      });
      setNotice(`"${record.title ?? "Project"}" moved ${direction < 0 ? "up" : "down"} in the portfolio.`);
    } catch (reason) {
      console.error("Could not reorder portfolio projects.", reason);
      setError(reason instanceof Error ? reason.message : "Could not reorder projects.");
    } finally {
      setProjectAction(null);
    }
  }

  const noun = collectionLabels[collectionName];
  return (
    <section>
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/65">
            Content manager
          </p>
          <h1 className="mt-2 text-3xl font-medium">{noun}</h1>
          <p className="mt-2 text-sm text-white/45">
            Edit structured content as JSON. Changes are saved directly to Firestore.
          </p>
        </div>
        <button
          onClick={startNew}
          className="min-h-10 rounded-lg bg-blue-100 px-4 text-sm font-medium text-slate-950 hover:bg-white"
        >
          Add {
            {
              projects: "project",
              skills: "skill",
              toolkit: "tool",
              experience: "role",
            }[collectionName]
          }
        </button>
      </header>

      <div className="mt-7 grid gap-5 xl:grid-cols-[minmax(16rem,.7fr)_minmax(0,1.3fr)]">
        <div className="rounded-xl border border-white/10 bg-white/[0.02]">
          <div className="space-y-3 border-b border-white/[0.08] p-4">
            <input
              aria-label={`Search ${noun.toLowerCase()}`}
              placeholder="Search..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-h-10 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none focus:border-blue-200/50"
            />
            <select
              aria-label="Filter by visibility or publication"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="min-h-10 w-full rounded-lg border border-white/10 bg-[#0d1018] px-3 text-sm text-white/70"
            >
              <option value="all">All content</option>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden / draft</option>
              {collectionName === "projects" && (
                <>
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </>
              )}
            </select>
          </div>
          <div className="max-h-[36rem] overflow-auto p-2">
            {loading ? (
              <p className="p-4 text-sm text-white/45">Loading content...</p>
            ) : filtered.length ? (
              filtered.map((record) => (
                <article
                  key={record.id}
                  className={`mb-1 rounded-lg border p-3 ${
                    selectedId === record.id
                      ? "border-blue-200/30 bg-blue-200/[0.06]"
                      : "border-transparent hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => editRecord(record)}
                    className="block w-full text-left"
                  >
                    <span className="block truncate text-sm text-white/85">
                      {record.title ?? record.name ?? record.company ?? "(Untitled)"}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] text-white/35">
                      {record.status ?? (record.isVisible ? "visible" : "hidden")}
                      {" · order "}
                      {record.displayOrder ?? 0}
                    </span>
                  </button>
                  {collectionName === "projects" && (
                    <div className="mt-3 space-y-2 border-t border-white/[0.08] pt-3">
                      <div className="flex flex-wrap gap-2">
                        {record.status !== "published" && (
                          <button
                            type="button"
                            disabled={projectAction !== null}
                            onClick={() =>
                              void updateProjectState(record, {
                                status: "published",
                                isVisible: true,
                              })
                            }
                            className="rounded-md border border-emerald-200/20 px-2.5 py-1.5 text-[11px] text-emerald-100/80 hover:bg-emerald-200/10 disabled:opacity-40"
                          >
                            {record.isVisible === true ? "Publish" : "Publish & show"}
                          </button>
                        )}
                        {record.status !== "draft" && (
                          <button
                            type="button"
                            disabled={projectAction !== null}
                            onClick={() =>
                              void updateProjectState(record, {
                                status: "draft",
                                isVisible: false,
                              })
                            }
                            className="rounded-md border border-white/10 px-2.5 py-1.5 text-[11px] text-white/65 hover:bg-white/[0.06] disabled:opacity-40"
                          >
                            Move to draft
                          </button>
                        )}
                        {record.status !== "archived" && (
                          <button
                            type="button"
                            disabled={projectAction !== null}
                            onClick={() =>
                              void updateProjectState(record, {
                                status: "archived",
                                isVisible: false,
                              })
                            }
                            className="rounded-md border border-amber-200/15 px-2.5 py-1.5 text-[11px] text-amber-100/70 hover:bg-amber-200/[0.06] disabled:opacity-40"
                          >
                            Archive
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <button
                          type="button"
                          disabled={projectAction !== null}
                          onClick={() =>
                            void updateProjectState(record, {
                              isVisible: record.isVisible !== true,
                            })
                          }
                          className="text-[11px] text-blue-100/75 hover:text-blue-50 disabled:opacity-40"
                        >
                          {record.isVisible === true ? "Hide from portfolio" : "Make visible"}
                        </button>
                        <div className="flex gap-1">
                          <button
                            type="button"
                            aria-label={`Move ${record.title ?? "project"} up in portfolio`}
                            disabled={projectAction !== null || orderedRecords[0]?.id === record.id}
                            onClick={() => void moveProject(record, -1)}
                            className="rounded border border-white/10 px-2 py-1 text-[11px] text-white/65 hover:bg-white/[0.06] disabled:opacity-30"
                          >
                            Move up
                          </button>
                          <button
                            type="button"
                            aria-label={`Move ${record.title ?? "project"} down in portfolio`}
                            disabled={
                              projectAction !== null ||
                              orderedRecords[orderedRecords.length - 1]?.id === record.id
                            }
                            onClick={() => void moveProject(record, 1)}
                            className="rounded border border-white/10 px-2 py-1 text-[11px] text-white/65 hover:bg-white/[0.06] disabled:opacity-30"
                          >
                            Move down
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => void handleDelete(record)}
                    disabled={projectAction !== null}
                    className="mt-3 text-xs text-red-300/70 hover:text-red-200 disabled:opacity-40"
                  >
                    Delete
                  </button>
                </article>
              ))
            ) : (
              <p className="p-4 text-sm leading-6 text-white/40">
                No matching content. Import the existing portfolio content from Settings to get started.
              </p>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSave}
          className="flex min-h-[30rem] flex-col rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:p-5"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-medium text-white/80">
              {selectedId ? "Edit record" : "New record"}
            </h2>
            <span className="font-mono text-[10px] text-white/35">
              {selectedId ? selectedId : "Not saved"}
            </span>
          </div>
          {collectionName === "projects" && (
            <ProjectImageFields
              coverImage={projectCover}
              gallery={projectGallery}
              disabled={!projectValues || saving}
              onCoverUploaded={(image) =>
                handleProjectImageUpload(image, "cover")
              }
              onGalleryUploaded={(image) =>
                handleProjectImageUpload(image, "gallery")
              }
              onCoverRemove={() =>
                updateProjectJson((values) => {
                  delete values.image;
                })
              }
              onGalleryRemove={(index) =>
                updateProjectJson((values) => {
                  values.gallery = parseGallery(values.gallery).filter(
                    (_, galleryIndex) => galleryIndex !== index,
                  );
                })
              }
              onGalleryChange={(index, field, value) =>
                updateProjectJson((values) => {
                  values.gallery = parseGallery(values.gallery).map(
                    (item, galleryIndex) =>
                      galleryIndex === index
                        ? { ...item, [field]: value }
                        : item,
                  );
                })
              }
            />
          )}
          <textarea
            aria-label="Content JSON"
            value={json}
            onChange={(event) => setJson(event.target.value)}
            spellCheck={false}
            placeholder="Choose a record or add a new one."
            className="min-h-[24rem] flex-1 resize-y rounded-lg border border-white/10 bg-[#080a0f] p-4 font-mono text-xs leading-6 text-blue-50/80 outline-none focus:border-blue-200/40"
          />
          {error && <p role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
          {notice && <p role="status" className="mt-3 text-sm text-emerald-300">{notice}</p>}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs leading-5 text-white/35">
              Projects are public only when both <code>status</code> is published and <code>isVisible</code> is true.
            </p>
            <button
              disabled={saving || !json}
              className="min-h-10 rounded-lg bg-blue-100 px-5 text-sm font-medium text-slate-950 hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

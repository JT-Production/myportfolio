"use client";

import { useEffect, useState } from "react";
import {
  addActivity,
  createContent,
  getContent,
  listAdminContent,
  saveContent,
} from "../../lib/firebase/content";
import { importMissingStaticContent } from "../../lib/firebase/importStaticContent";
import { projects } from "../../constants/projects";
import { experiences } from "../../constants/experience";
import { defaultSkills } from "../../constants/skills";
import { defaultToolkit } from "../../constants/toolkit";
import { defaultSiteSettings } from "../../constants/siteSettings";
import { useAdminAuth } from "./AdminAuthProvider";

const exportedCollections = [
  "projects",
  "skills",
  "toolkit",
  "experience",
  "media",
  "activityLogs",
] as const;

export function AdminSettings() {
  const { user } = useAdminAuth();
  const [json, setJson] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let active = true;
    getContent("siteSettings", "main")
      .then((record) => {
        if (!active) return;
        const values = Object.fromEntries(
          Object.entries(record ?? defaultSiteSettings).filter(
            ([key]) =>
              !["id", "createdAt", "updatedAt", "createdBy", "updatedBy"].includes(key),
          ),
        );
        setJson(JSON.stringify(values, null, 2));
      })
      .catch((reason: unknown) => {
        if (!active) return;
        console.error("Could not load site settings.", reason);
        setError(reason instanceof Error ? reason.message : "Could not load settings.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  async function saveSettings() {
    if (!user) {
      setError("Sign in again before saving site settings.");
      return;
    }
    let values: Record<string, unknown>;
    try {
      const parsed: unknown = JSON.parse(json);
      if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
        throw new Error("Settings must be a JSON object.");
      }
      values = parsed as Record<string, unknown>;
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Invalid JSON settings.");
      return;
    }

    setBusy(true);
    setError("");
    setNotice("");
    try {
      const current = await getContent("siteSettings", "main");
      if (current) await saveContent("siteSettings", "main", values, user.uid);
      else await createContent("siteSettings", values, user.uid, "main");
      setNotice("Settings saved.");
      try {
        await addActivity("Updated site settings", "Site settings", user.uid);
      } catch (reason) {
        console.error("Settings saved, but the activity entry could not be recorded.", reason);
        setNotice("Settings saved, but the activity log could not be updated.");
      }
    } catch (reason) {
      console.error("Could not save site settings.", reason);
      setError(reason instanceof Error ? reason.message : "Could not save settings.");
    } finally {
      setBusy(false);
    }
  }

  async function importContent() {
    if (!user) {
      setError("Sign in again before importing content.");
      return;
    }
    if (
      !window.confirm(
        "Import only portfolio records that do not already exist. Existing Firestore records will not be overwritten.",
      )
    ) {
      return;
    }
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const imported = await importMissingStaticContent(user.uid);
      setNotice(
        `Import complete: ${imported.projects} projects, ${imported.skills} skills, ${imported.toolkit} tools, and ${imported.experience} roles added.`,
      );
      try {
        await addActivity("Imported missing portfolio content", "Static content import", user.uid);
      } catch (activityError) {
        console.error("Import completed, but its activity entry could not be recorded.", activityError);
        setNotice("Import completed, but the activity log could not be updated.");
      }
    } catch (reason) {
      console.error("Static content import failed.", reason);
      setError(reason instanceof Error ? reason.message : "Could not import content.");
    } finally {
      setBusy(false);
    }
  }

  async function exportBackup() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const entries = await Promise.all(
        exportedCollections.map(async (collectionName) => {
          const records = await listAdminContent(collectionName);
          return [collectionName, records] as const;
        }),
      );
      const backup = {
        exportedAt: new Date().toISOString(),
        siteSettings: await getContent("siteSettings", "main"),
        collections: Object.fromEntries(entries),
      };
      const file = new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(file);
      const link = document.createElement("a");
      link.href = url;
      link.download = `portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("Backup downloaded.");
    } catch (reason) {
      console.error("Could not export a content backup.", reason);
      setError(reason instanceof Error ? reason.message : "Could not export backup.");
    } finally {
      setBusy(false);
    }
  }

  const localCounts = {
    projects: projects.length,
    skills: defaultSkills.length,
    toolkit: defaultToolkit.length,
    experience: experiences.length,
  };

  return (
    <section className="max-w-5xl">
      <header>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/65">
          Portfolio configuration
        </p>
        <h1 className="mt-2 text-3xl font-medium">Settings & data</h1>
        <p className="mt-2 text-sm text-white/45">
          Configure public site settings, migrate local content once, or download a JSON backup.
        </p>
      </header>

      <div className="mt-7 grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
          <h2 className="text-base font-medium">Site settings</h2>
          <p className="mt-2 text-sm leading-6 text-white/45">
            Keep public settings free of secrets. Use <code>isPublic: true</code> only for values intended for every visitor.
          </p>
          {loading ? (
            <p className="mt-5 text-sm text-white/45">Loading settings...</p>
          ) : (
            <>
              <textarea
                aria-label="Site settings JSON"
                value={json}
                onChange={(event) => setJson(event.target.value)}
                spellCheck={false}
                className="mt-5 min-h-64 w-full rounded-lg border border-white/10 bg-[#080a0f] p-4 font-mono text-xs leading-6 text-blue-50/80 outline-none focus:border-blue-200/40"
              />
              <button
                disabled={busy}
                onClick={() => void saveSettings()}
                className="mt-3 min-h-10 rounded-lg bg-blue-100 px-4 text-sm font-medium text-slate-950 hover:bg-white disabled:opacity-50"
              >
                Save settings
              </button>
            </>
          )}
        </article>

        <div className="space-y-5">
          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="text-base font-medium">Import existing portfolio</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Adds static content only when the matching Firestore document ID does not exist. Re-running is safe and will not replace edits.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 text-xs text-white/55">
              {Object.entries(localCounts).map(([label, count]) => (
                <li key={label} className="rounded-lg border border-white/[0.07] p-3">
                  <span className="font-mono text-blue-100/70">{count}</span> {label}
                </li>
              ))}
            </ul>
            <button
              disabled={busy}
              onClick={() => void importContent()}
              className="mt-4 min-h-10 rounded-lg border border-white/15 px-4 text-sm text-white/75 hover:border-white/35 hover:text-white disabled:opacity-50"
            >
              Import missing records
            </button>
          </article>

          <article className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="text-base font-medium">Backup</h2>
            <p className="mt-2 text-sm leading-6 text-white/45">
              Export projects, skills, toolkit, experience, media metadata, activity history, and site settings to a JSON file.
            </p>
            <button
              disabled={busy}
              onClick={() => void exportBackup()}
              className="mt-4 min-h-10 rounded-lg border border-white/15 px-4 text-sm text-white/75 hover:border-white/35 hover:text-white disabled:opacity-50"
            >
              Download JSON backup
            </button>
          </article>
        </div>
      </div>

      {error && <p role="alert" className="mt-5 text-sm text-red-300">{error}</p>}
      {notice && <p role="status" className="mt-5 text-sm text-emerald-300">{notice}</p>}
    </section>
  );
}

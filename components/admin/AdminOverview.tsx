"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, Images, Shapes, Sparkles } from "lucide-react";
import { ContentRecord, listAdminContent } from "../../lib/firebase/content";
import { Timestamp } from "firebase/firestore";

const summaries = [
  { title: "Projects", path: "/admin/projects", collection: "projects", icon: BriefcaseBusiness },
  { title: "Skills", path: "/admin/skills", collection: "skills", icon: Sparkles },
  { title: "Toolkit", path: "/admin/toolkit", collection: "toolkit", icon: Shapes },
  { title: "Experience", path: "/admin/experience", collection: "experience", icon: BriefcaseBusiness },
  { title: "Media assets", path: "/admin/media", collection: "media", icon: Images },
] as const;

export function AdminOverview() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [activities, setActivities] = useState<ContentRecord[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const collections = await Promise.all([
        ...summaries.map((item) => listAdminContent(item.collection)),
        listAdminContent("activityLogs"),
      ]);
      const nextCounts: Record<string, number> = {};
      summaries.forEach((item, index) => {
        nextCounts[item.collection] = collections[index].length;
      });
      setCounts(nextCounts);
      setActivities(collections[collections.length - 1].slice(0, 8));
      setError("");
    } catch (reason) {
      console.error("Could not load the admin dashboard overview.", reason);
      setError(reason instanceof Error ? reason.message : "Could not load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    Promise.all([
      ...summaries.map((item) => listAdminContent(item.collection)),
      listAdminContent("activityLogs"),
    ])
      .then((collections) => {
        if (!active) return;
        const nextCounts: Record<string, number> = {};
        summaries.forEach((item, index) => {
          nextCounts[item.collection] = collections[index].length;
        });
        setCounts(nextCounts);
        setActivities(collections[collections.length - 1].slice(0, 8));
        setError("");
      })
      .catch((reason: unknown) => {
        if (!active) return;
        console.error("Could not load the admin dashboard overview.", reason);
        setError(reason instanceof Error ? reason.message : "Could not load dashboard data.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <section>
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-200/65">
            Portfolio management
          </p>
          <h1 className="mt-2 text-3xl font-medium">Dashboard</h1>
          <p className="mt-2 text-sm text-white/45">
            Manage the content that powers your public portfolio.
          </p>
        </div>
        <button
          onClick={() => void load()}
          className="min-h-10 rounded-lg border border-white/15 px-4 text-sm text-white/65 hover:border-white/30 hover:text-white"
        >
          Refresh
        </button>
      </header>

      {error && <p role="alert" className="mt-5 text-sm text-red-300">{error}</p>}

      <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {summaries.map(({ title, path, collection, icon: Icon }) => (
          <Link
            key={collection}
            href={path}
            className="group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-blue-200/30 hover:bg-blue-200/[0.03]"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.03] text-blue-100/70">
                <Icon className="h-4 w-4" />
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
            </div>
            <p className="mt-5 text-sm text-white/60">{title}</p>
            <p className="mt-1 text-3xl font-medium">
              {loading ? "—" : counts[collection] ?? 0}
            </p>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-4">
          <div>
            <h2 className="text-sm font-medium">Recent activity</h2>
            <p className="mt-1 text-xs text-white/40">Latest CMS changes</p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/35">
            {activities.length} entries
          </span>
        </div>
        {loading ? (
          <p className="p-5 text-sm text-white/45">Loading recent activity...</p>
        ) : activities.length === 0 ? (
          <p className="p-5 text-sm text-white/45">No activity has been recorded yet.</p>
        ) : (
          <ul className="divide-y divide-white/[0.06]">
            {activities.map((activity) => (
              <li key={activity.id} className="flex flex-wrap justify-between gap-2 px-5 py-4 text-sm">
                <span className="text-white/70">
                  {String(activity.action ?? "Updated")}{" "}
                  <span className="text-white/45">{String(activity.itemName ?? "")}</span>
                </span>
                <time className="font-mono text-[10px] text-white/35">
                  {activity.createdAt instanceof Timestamp
                    ? activity.createdAt.toDate().toLocaleString()
                    : "Just now"}
                </time>
              </li>
            ))}
          </ul>
        )}
      </section>
    </section>
  );
}

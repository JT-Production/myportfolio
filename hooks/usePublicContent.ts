"use client";

import { useEffect, useState } from "react";
import {
  ContentCollection,
  subscribeToPublicContent,
  subscribeToPublicSiteSettings,
} from "../lib/firebase/content";
import { firebaseConfigured } from "../lib/firebase/client";

export function usePublicContent<T>(
  collectionName: Exclude<ContentCollection, "media" | "activityLogs">,
  fallback: T[],
) {
  const [records, setRecords] = useState<T[]>(
    firebaseConfigured ? [] : fallback,
  );
  const [loading, setLoading] = useState(firebaseConfigured);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!firebaseConfigured) return;

    const handleData = (items: import("../lib/firebase/content").ContentRecord[]) => {
      setRecords(items as T[]);
      setLoading(false);
      setError(null);
    };
    const handleError = (reason: Error) => {
      console.error(
        `Could not load public ${collectionName}; rendering the local portfolio content instead.`,
        reason,
      );
      setRecords(fallback);
      setLoading(false);
      setError(reason);
    };

    return collectionName === "siteSettings"
      ? subscribeToPublicSiteSettings(handleData, handleError)
      : subscribeToPublicContent(collectionName, handleData, handleError);
  }, [collectionName, fallback]);

  return { records, loading, error };
}

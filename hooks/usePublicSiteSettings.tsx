"use client";

import { createContext, ReactNode, useContext } from "react";
import { usePublicContent } from "./usePublicContent";
import { ContentRecord } from "../lib/firebase/content";
import { defaultSiteSettings, PublicSiteSettings } from "../constants/siteSettings";

const fallbackSettings: ContentRecord[] = [defaultSiteSettings];

type PublicSettingsValue = Omit<PublicSiteSettings, "id" | "isPublic">;
const PublicSettingsContext = createContext<PublicSettingsValue>({
  emailAddress: defaultSiteSettings.emailAddress,
  copyrightName: defaultSiteSettings.copyrightName,
  socials: defaultSiteSettings.socials,
});

export function PublicSiteSettingsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { records } = usePublicContent<ContentRecord>(
    "siteSettings",
    fallbackSettings,
  );
  const record =
    records.find((item) => item.id === "main") ?? defaultSiteSettings;
  const socials = Array.isArray(record.socials)
    ? record.socials.filter(
        (item): item is { platform: string; url: string } =>
          !!item &&
          typeof item === "object" &&
          typeof item.platform === "string" &&
          typeof item.url === "string" &&
          isSafeExternalUrl(item.url),
      )
    : defaultSiteSettings.socials;

  const value = {
    emailAddress:
      typeof record.emailAddress === "string" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(record.emailAddress)
        ? record.emailAddress
        : defaultSiteSettings.emailAddress,
    copyrightName:
      typeof record.copyrightName === "string"
        ? record.copyrightName
        : defaultSiteSettings.copyrightName,
    socials,
  } satisfies PublicSettingsValue;

  return (
    <PublicSettingsContext.Provider value={value}>
      {children}
    </PublicSettingsContext.Provider>
  );
}

export function usePublicSiteSettings() {
  return useContext(PublicSettingsContext);
}

function isSafeExternalUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

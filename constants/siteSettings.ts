import { Social } from "../types";

export type PublicSiteSettings = {
  id: string;
  isPublic: boolean;
  emailAddress: string;
  copyrightName: string;
  socials: Social[];
};

export const defaultSiteSettings: PublicSiteSettings = {
  id: "main",
  isPublic: true,
  emailAddress: "joeyofficial707@gmail.com",
  copyrightName: "Joey",
  socials: [],
};

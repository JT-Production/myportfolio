import { notFound } from "next/navigation";
import { AdminContentManager } from "../../../components/admin/AdminContentManager";
import { AdminMediaManager } from "../../../components/admin/AdminMediaManager";
import { AdminSettings } from "../../../components/admin/AdminSettings";

const contentSections = ["projects", "skills", "toolkit", "experience"] as const;

export default async function AdminSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const contentSection = contentSections.find((candidate) => candidate === section);

  if (contentSection) {
    return (
      <AdminContentManager collectionName={contentSection} />
    );
  }
  if (section === "media") return <AdminMediaManager />;
  if (section === "settings") return <AdminSettings />;
  notFound();
}

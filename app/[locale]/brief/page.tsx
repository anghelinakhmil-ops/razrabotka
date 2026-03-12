import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import BriefContent from "./BriefContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.brief");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
  };
}

export default async function BriefPage() {
  const t = await getTranslations("pages.brief");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: t("title"), url: "/brief" },
          ])),
        }}
      />
      <BriefContent />
    </>
  );
}

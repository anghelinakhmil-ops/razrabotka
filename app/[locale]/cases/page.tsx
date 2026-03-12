import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import CasesContent from "./CasesContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.cases");
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

export default async function CasesPage() {
  const t = await getTranslations("pages.cases");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: t("title"), url: "/cases" },
          ])),
        }}
      />
      <CasesContent />
    </>
  );
}

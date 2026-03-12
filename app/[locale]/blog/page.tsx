import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import BlogContent from "./BlogContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.blog");
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

export default async function BlogPage() {
  const t = await getTranslations("pages.blog");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: t("title"), url: "/blog" },
          ])),
        }}
      />
      <BlogContent />
    </>
  );
}

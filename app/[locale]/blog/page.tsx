import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Блог",
  description:
    "Статьи о веб-разработке, дизайне, SEO и digital-маркетинге от команды NAKO Agency. Полезные материалы для бизнеса и экспертов.",
  openGraph: {
    title: "Блог | NAKO Agency",
    description:
      "Полезные статьи о веб-разработке, дизайне и продвижении сайтов.",
    type: "website",
  },
};

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

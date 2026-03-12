import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import CasesContent from "./CasesContent";

export const metadata: Metadata = {
  title: "Кейсы — Портфолио",
  description:
    "Портфолио веб-студии NAKO Agency. Реальные проекты: интернет-магазины, лендинги, корпоративные сайты и личные бренды экспертов.",
  openGraph: {
    title: "Кейсы — Портфолио | NAKO Agency",
    description:
      "Смотрите наши работы: сайты для бизнеса, экспертов и e-commerce проектов.",
    type: "website",
  },
};

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

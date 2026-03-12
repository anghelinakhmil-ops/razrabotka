import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import BriefContent from "./BriefContent";

export const metadata: Metadata = {
  title: "Бриф — Оставить заявку",
  description:
    "Заполните бриф на разработку сайта. Расскажите о проекте — мы подготовим персональное коммерческое предложение с точными сроками и стоимостью.",
  openGraph: {
    title: "Бриф — Оставить заявку | NAKO Agency",
    description:
      "Заполните бриф и получите персональное предложение на разработку сайта.",
    type: "website",
  },
};

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

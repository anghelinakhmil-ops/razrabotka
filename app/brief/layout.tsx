import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Бриф | WebStudio — Оставить заявку на разработку сайта",
  description:
    "Заполните бриф и получите персональное коммерческое предложение на разработку сайта. Ответим в течение 2 часов с точными сроками и стоимостью.",
  openGraph: {
    title: "Бриф | WebStudio",
    description:
      "Заполните бриф и получите персональное предложение на разработку сайта.",
    type: "website",
  },
};

export default function BriefLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

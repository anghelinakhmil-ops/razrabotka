import { Metadata } from "next";
import CasesContent from "./CasesContent";

export const metadata: Metadata = {
  title: "Кейсы — Портфолио | WebStudio",
  description:
    "Портфолио веб-студии WebStudio. Реальные проекты: интернет-магазины, лендинги, корпоративные сайты и личные бренды экспертов.",
  openGraph: {
    title: "Кейсы — Портфолио | WebStudio",
    description:
      "Смотрите наши работы: сайты для бизнеса, экспертов и e-commerce проектов.",
    type: "website",
  },
};

export default function CasesPage() {
  return <CasesContent />;
}

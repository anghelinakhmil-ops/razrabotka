import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы | WebStudio — Портфолио работ",
  description:
    "Реальные проекты с измеримыми результатами. Сайты для экспертов, интернет-магазины, лендинги. Смотрите наши работы.",
  openGraph: {
    title: "Кейсы | WebStudio",
    description: "Реальные проекты с измеримыми результатами.",
    type: "website",
  },
};

export default function CasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

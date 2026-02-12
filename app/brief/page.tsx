import { Metadata } from "next";
import BriefContent from "./BriefContent";

export const metadata: Metadata = {
  title: "Бриф — Оставить заявку | WebStudio",
  description:
    "Заполните бриф на разработку сайта. Расскажите о проекте — мы подготовим персональное коммерческое предложение с точными сроками и стоимостью.",
  openGraph: {
    title: "Бриф — Оставить заявку | WebStudio",
    description:
      "Заполните бриф и получите персональное предложение на разработку сайта.",
    type: "website",
  },
};

export default function BriefPage() {
  return <BriefContent />;
}

import { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Блог | WebStudio",
  description:
    "Статьи о веб-разработке, дизайне, SEO и digital-маркетинге от команды WebStudio. Полезные материалы для бизнеса и экспертов.",
  openGraph: {
    title: "Блог | WebStudio",
    description:
      "Полезные статьи о веб-разработке, дизайне и продвижении сайтов.",
    type: "website",
  },
};

export default function BlogPage() {
  return <BlogContent />;
}

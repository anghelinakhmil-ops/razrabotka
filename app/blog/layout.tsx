import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог | WebStudio — Статьи о разработке и дизайне",
  description:
    "Статьи о веб-разработке, дизайне, SEO и маркетинге. Практические советы от команды WebStudio.",
  openGraph: {
    title: "Блог | WebStudio",
    description: "Статьи о веб-разработке, дизайне, SEO и маркетинге.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

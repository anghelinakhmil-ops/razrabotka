import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Блог | NAKO Agency — Статьи о разработке и дизайне",
  description:
    "Статьи о веб-разработке, дизайне, SEO и маркетинге. Практические советы от команды NAKO Agency.",
  openGraph: {
    title: "Блог | NAKO Agency",
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

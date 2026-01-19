import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты | WebStudio — Свяжитесь с нами",
  description:
    "Свяжитесь с WebStudio для обсуждения вашего проекта. Email, телефон, мессенджеры — выберите удобный способ связи. Ответим в течение 2 часов.",
  openGraph: {
    title: "Контакты | WebStudio",
    description:
      "Свяжитесь с нами для обсуждения вашего проекта. Ответим в течение 2 часов.",
    type: "website",
  },
};

export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

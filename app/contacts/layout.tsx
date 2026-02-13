import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты | NAKO Agency — Свяжитесь с нами",
  description:
    "Свяжитесь с NAKO Agency для обсуждения вашего проекта. Email, телефон, мессенджеры — выберите удобный способ связи. Ответим в течение 2 часов.",
  openGraph: {
    title: "Контакты | NAKO Agency",
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

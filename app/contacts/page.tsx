import { Metadata } from "next";
import ContactsContent from "./ContactsContent";

export const metadata: Metadata = {
  title: "Контакты | NAKO Agency",
  description:
    "Свяжитесь с NAKO Agency: телефон, email, Telegram, WhatsApp. Офис в Москве. Ответим в течение 2 часов.",
  openGraph: {
    title: "Контакты | NAKO Agency",
    description:
      "Свяжитесь с нами любым удобным способом — мы всегда на связи.",
    type: "website",
  },
};

export default function ContactsPage() {
  return <ContactsContent />;
}

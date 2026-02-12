import { Metadata } from "next";
import ContactsContent from "./ContactsContent";

export const metadata: Metadata = {
  title: "Контакты | WebStudio",
  description:
    "Свяжитесь с WebStudio: телефон, email, Telegram, WhatsApp. Офис в Москве. Ответим в течение 2 часов.",
  openGraph: {
    title: "Контакты | WebStudio",
    description:
      "Свяжитесь с нами любым удобным способом — мы всегда на связи.",
    type: "website",
  },
};

export default function ContactsPage() {
  return <ContactsContent />;
}

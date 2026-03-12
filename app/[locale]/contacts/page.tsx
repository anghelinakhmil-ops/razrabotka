import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import ContactsContent from "./ContactsContent";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Свяжитесь с NAKO Agency по email. Ответим в течение 2 часов.",
  openGraph: {
    title: "Контакты | NAKO Agency",
    description:
      "Свяжитесь с нами любым удобным способом — мы всегда на связи.",
    type: "website",
  },
};

export default async function ContactsPage() {
  const t = await getTranslations("pages.contacts");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: t("title"), url: "/contacts" },
          ])),
        }}
      />
      <ContactsContent />
    </>
  );
}

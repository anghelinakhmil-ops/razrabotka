import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import ContactsContent from "./ContactsContent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.contacts");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
  };
}

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

import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { breadcrumbSchema } from "@/lib/schema";
import ContactsContent from "./ContactsContent";
import { getPageAlternates } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pages.contacts" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    openGraph: {
      title: t("metaTitle"),
      description: t("metaDescription"),
      type: "website",
    },
    alternates: getPageAlternates("/contacts", locale),
  };
}

export default async function ContactsPage() {
  const t = await getTranslations("pages.contacts");
  const tNav = await getTranslations("nav");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([
            { name: tNav("home"), url: "/" },
            { name: t("title"), url: "/contacts" },
          ])),
        }}
      />
      <ContactsContent />
    </>
  );
}

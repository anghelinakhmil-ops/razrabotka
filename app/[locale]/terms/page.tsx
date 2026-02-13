import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Условия использования",
  description:
    "Условия использования сайта NAKO Agency. Правила пользования сайтом, ограничения ответственности и порядок разрешения споров.",
  openGraph: {
    title: "Условия использования | NAKO Agency",
    description: "Условия использования сайта и правила пользования услугами.",
    type: "website",
  },
};

interface TermsSectionData {
  number: string;
  title: string;
  content: string[];
}

/**
 * Terms Page — страница условий использования
 */
export default async function TermsPage() {
  const t = await getTranslations("pages.terms");
  const sections = t.raw("sections") as TermsSectionData[];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container size="sm">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            {t("caption")}
          </span>

          <h1 className="mb-6">
            <BrokenText
              text={t("heading1")}
              spaced
              mixPattern={[2, 4]}
              className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
            />
            <span className="block text-h2 font-display font-bold text-[var(--color-text-secondary)] mt-2">
              {t("heading2")}
            </span>
          </h1>

          <p className="text-body text-[var(--color-text-muted)]">
            {t("lastUpdated")}
          </p>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container size="sm">
          <div className="prose prose-lg max-w-none">
            {sections.map((section) => (
              <div key={section.number} className="mb-12 last:mb-0">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-h3 font-display font-bold text-[var(--color-line-dark)]">
                    {section.number}
                  </span>
                  <h2 className="text-h3 font-display font-bold text-[var(--color-text-primary)]">
                    {section.title}
                  </h2>
                </div>
                <div className="pl-0 lg:pl-16 space-y-4 text-body text-[var(--color-text-secondary)]">
                  {section.content.map((paragraph, index) => (
                    <p
                      key={index}
                      dangerouslySetInnerHTML={{
                        __html: paragraph.replace(
                          CONTACT.email,
                          `<a href="mailto:${CONTACT.email}" class="text-[var(--color-text-primary)] underline hover:no-underline">${CONTACT.email}</a>`
                        ),
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

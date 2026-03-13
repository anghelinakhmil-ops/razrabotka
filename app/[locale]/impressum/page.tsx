import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { CONTACT } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.impressum");
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

interface ImpressumSectionData {
  title: string;
  content: string[];
}

/**
 * Impressum Page — обязательная страница для Германии (TMG §5)
 *
 * Содержит юридические данные компании: название, адрес, контакты, регистрация.
 */
export default async function ImpressumPage() {
  const t = await getTranslations("pages.impressum");
  const sections = t.raw("sections") as ImpressumSectionData[];

  return (
    <main>
      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-40 lg:pb-16 bg-[var(--color-background)]">
        <Container size="sm">
          <span className="text-caption text-[var(--color-text-muted)] mb-4 block">
            {t("caption")}
          </span>

          <h1 className="mb-6">
            <BrokenText
              text={t("heading1")}
              spaced
              className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h1>

          <p className="text-body text-[var(--color-text-muted)]">
            {t("subtitle")}
          </p>
        </Container>
      </section>

      {/* Content Section */}
      <section className="py-[var(--section-gap)] bg-[var(--color-background)]">
        <Container size="sm">
          <div className="space-y-10">
            {sections.map((section, index) => (
              <div key={index}>
                <h2 className="text-[18px] font-display font-bold text-[var(--color-text-primary)] mb-4">
                  {section.title}
                </h2>
                <div className="space-y-2 text-body text-[var(--color-text-secondary)]">
                  {section.content.map((line, i) => (
                    <p
                      key={i}
                      dangerouslySetInnerHTML={{
                        __html: line.replace(
                          CONTACT.email,
                          `<a href="mailto:${CONTACT.email}" class="text-[var(--color-text-primary)] underline hover:no-underline">${CONTACT.email}</a>`,
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

      {/* Back link */}
      <section className="py-12 bg-[var(--color-background-alt)] border-t border-[var(--color-line)]">
        <Container size="sm">
          <Link
            href="/contacts"
            className="text-body font-medium text-[var(--color-text-primary)] border-b border-[var(--color-text-primary)] pb-0.5 hover:opacity-70 transition-opacity"
          >
            ← {t("backLink")}
          </Link>
        </Container>
      </section>
    </main>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";

/**
 * Not Found Page — страница 404
 */
export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[var(--color-background)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <BrokenText
              text="404"
              spaced
              className="text-[120px] sm:text-[160px] lg:text-[200px] font-display font-bold text-[var(--color-line)] leading-none"
            />
          </div>

          {/* Title */}
          <h1 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
            {t("title")}
          </h1>

          {/* Description */}
          <p className="text-body-lg text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
            {t("description")}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" as={Link} href="/">
              {t("home")}
            </Button>
            <Button variant="outline" size="lg" as={Link} href="/contacts">
              {t("contact")}
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
            <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
              {t("lookingFor")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/services"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                {t("linkServices")}
              </Link>
              <Link
                href="/cases"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                {t("linkCases")}
              </Link>
              <Link
                href="/blog"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                {t("linkBlog")}
              </Link>
              <Link
                href="/about"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                {t("linkAbout")}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

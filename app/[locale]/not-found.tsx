"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";

/**
 * Not Found Page — страница 404
 */
export default function NotFound() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[var(--color-background)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <BrokenText
              text="404"
              spaced
              mixPattern={[1]}
              className="text-[120px] sm:text-[160px] lg:text-[200px] font-display font-bold text-[var(--color-line)] leading-none"
            />
          </div>

          {/* Title */}
          <h1 className="text-h2 font-display font-bold text-[var(--color-text-primary)] mb-4">
            Страница не найдена
          </h1>

          {/* Description */}
          <p className="text-body-lg text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
            Возможно, страница была удалена или вы перешли по неверной ссылке.
            Проверьте адрес или вернитесь на главную.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" as={Link} href="/">
              На главную
            </Button>
            <Button variant="outline" size="lg" as={Link} href="/contacts">
              Связаться с нами
            </Button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
            <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
              Возможно, вы искали:
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/services"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                Услуги
              </Link>
              <Link
                href="/cases"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                Кейсы
              </Link>
              <Link
                href="/blog"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                Блог
              </Link>
              <Link
                href="/about"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                О нас
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

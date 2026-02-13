"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BrokenText } from "@/components/ui/BrokenText";
import { Button } from "@/components/ui/Button";

/**
 * Error Page — страница ошибки
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="min-h-[80vh] flex items-center justify-center bg-[var(--color-background)]">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto rounded-full bg-[var(--color-background-alt)] border border-[var(--color-line)] flex items-center justify-center">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                className="text-[var(--color-text-muted)]"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M12 7V13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16.5" r="1" fill="currentColor" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="mb-4">
            <BrokenText
              text="ОШИБКА"
              spaced
              mixPattern={[2, 4]}
              className="text-h1 font-display font-bold text-[var(--color-text-primary)]"
            />
          </h1>

          {/* Subtitle */}
          <h2 className="text-h3 font-display font-bold text-[var(--color-text-secondary)] mb-4">
            Что-то пошло не так
          </h2>

          {/* Description */}
          <p className="text-body-lg text-[var(--color-text-muted)] mb-8 max-w-md mx-auto">
            Произошла непредвиденная ошибка. Попробуйте обновить страницу
            или вернитесь на главную.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" onClick={reset}>
              Попробовать снова
            </Button>
            <Button variant="outline" size="lg" as={Link} href="/">
              На главную
            </Button>
          </div>

          {/* Error Details (only in development) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
              <p className="text-caption text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                Детали ошибки (только в режиме разработки)
              </p>
              <div className="p-4 bg-[var(--color-background-alt)] border border-[var(--color-line)] rounded-sm text-left overflow-auto">
                <code className="text-body-sm text-[var(--color-text-secondary)] break-all">
                  {error.message}
                </code>
                {error.digest && (
                  <p className="text-caption text-[var(--color-text-muted)] mt-2">
                    Digest: {error.digest}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Help Section */}
          <div className="mt-12 pt-8 border-t border-[var(--color-line)]">
            <p className="text-body-sm text-[var(--color-text-muted)] mb-4">
              Если ошибка повторяется, свяжитесь с нами:
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="mailto:hello@nakoagency.com"
                className="text-body-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] underline hover:no-underline transition-colors"
              >
                hello@nakoagency.com
              </a>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

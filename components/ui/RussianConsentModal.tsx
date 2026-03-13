"use client";

import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { CONTACT } from "@/lib/constants";

interface RussianConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

/**
 * RussianConsentModal — separate consent document for 152-FZ compliance
 *
 * Since September 2025, Russian law requires consent for personal data
 * processing to be a SEPARATE document, not embedded in another form.
 *
 * This modal displays the full consent text and requires explicit acceptance.
 */
export function RussianConsentModal({
  isOpen,
  onClose,
  onAccept,
}: RussianConsentModalProps) {
  const t = useTranslations("consent.ru152fz");

  const sections = t.raw("sections") as string[];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t("title")}
      size="lg"
    >
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {sections.map((text, index) => (
          <p
            key={index}
            className="text-body-sm text-[var(--color-text-secondary)] leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: text.replace(
                CONTACT.email,
                `<a href="mailto:${CONTACT.email}" class="text-[var(--color-text-primary)] underline hover:no-underline">${CONTACT.email}</a>`,
              ),
            }}
          />
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-[var(--color-line)]">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={onAccept}
        >
          {t("accept")}
        </Button>
        <Button
          variant="outline"
          size="lg"
          fullWidth
          onClick={onClose}
        >
          {t("decline")}
        </Button>
      </div>
    </Modal>
  );
}

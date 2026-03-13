"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";
import { useRegion } from "@/components/providers/RegionProvider";
import {
  type CookieConsent as CookieConsentType,
  getConsent,
  hasConsented,
  acceptAll,
  rejectAll,
  setConsent,
} from "@/lib/cookie-consent";

/**
 * CookieConsent — GDPR-compliant cookie banner
 *
 * 3 кнопки: «Принять все» / «Отклонить все» / «Настроить»
 * Модалка детальных настроек per категория
 * Кнопки «Принять» и «Отклонить» равнозначны по размеру (GDPR/Германия)
 */
export function CookieConsent() {
  const t = useTranslations("cookies");
  const { regionCode } = useRegion();
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    if (!hasConsented()) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = useCallback(() => {
    acceptAll(regionCode);
    setVisible(false);
    setShowSettings(false);
  }, [regionCode]);

  const handleRejectAll = useCallback(() => {
    rejectAll(regionCode);
    setVisible(false);
    setShowSettings(false);
  }, [regionCode]);

  const handleSaveSettings = useCallback(
    (consent: Omit<CookieConsentType, "necessary">) => {
      setConsent(consent, "settings", regionCode);
      setVisible(false);
      setShowSettings(false);
    },
    [regionCode],
  );

  useEffect(() => {
    if (!visible || showSettings) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleRejectAll();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible, showSettings, handleRejectAll]);

  return (
    <AnimatePresence>
      {visible && !showSettings && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="dialog"
          aria-label={t("bannerTitle")}
        >
          <div className="max-w-2xl mx-auto bg-[var(--color-background)] text-[var(--color-text-primary)] p-5 sm:p-6 border border-[var(--color-line)] shadow-xl">
            <p className="text-body-sm leading-relaxed mb-4">
              {t("bannerText")}{" "}
              <Link
                href="/privacy"
                className="underline hover:no-underline text-[var(--color-accent)]"
              >
                {t("policyLink")}
              </Link>
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRejectAll}
                className="flex-1 sm:flex-initial"
              >
                {t("rejectAll")}
              </Button>
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="text-body-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] underline transition-colors"
              >
                {t("customize")}
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-initial"
              >
                {t("acceptAll")}
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      {visible && showSettings && (
        <CookieSettings
          onSave={handleSaveSettings}
          onAcceptAll={handleAcceptAll}
          onClose={() => setShowSettings(false)}
        />
      )}
    </AnimatePresence>
  );
}

/**
 * CookieSettings — модалка детальных настроек cookies
 */
function CookieSettings({
  onSave,
  onAcceptAll,
  onClose,
}: {
  onSave: (consent: Omit<CookieConsentType, "necessary">) => void;
  onAcceptAll: () => void;
  onClose: () => void;
}) {
  const t = useTranslations("cookies");
  const currentConsent = getConsent();

  const [analytics, setAnalytics] = useState(currentConsent.analytics);
  const [marketing, setMarketing] = useState(currentConsent.marketing);
  const [preferences, setPreferences] = useState(currentConsent.preferences);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleSave = () => {
    onSave({ analytics, marketing, preferences });
  };

  const categories = [
    {
      id: "necessary" as const,
      label: t("necessary"),
      description: t("necessaryDesc"),
      checked: true,
      disabled: true,
    },
    {
      id: "analytics" as const,
      label: t("analytics"),
      description: t("analyticsDesc"),
      checked: analytics,
      disabled: false,
      onChange: setAnalytics,
    },
    {
      id: "marketing" as const,
      label: t("marketing"),
      description: t("marketingDesc"),
      checked: marketing,
      disabled: false,
      onChange: setMarketing,
    },
    {
      id: "preferences" as const,
      label: t("preferences"),
      description: t("preferencesDesc"),
      checked: preferences,
      disabled: false,
      onChange: setPreferences,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={t("settingsTitle")}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease }}
        className="relative w-full max-w-lg max-h-[80vh] overflow-y-auto bg-[var(--color-background)] border border-[var(--color-line)] shadow-xl p-6 sm:p-8"
      >
        <h2 className="text-h3 font-display font-bold text-[var(--color-text-primary)] mb-6">
          {t("settingsTitle")}
        </h2>

        <div className="space-y-5 mb-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="flex items-start justify-between gap-4 pb-5 border-b border-[var(--color-line)] last:border-0 last:pb-0"
            >
              <div className="flex-1">
                <span className="text-body-sm font-medium text-[var(--color-text-primary)] block mb-1">
                  {cat.label}
                </span>
                <span className="text-caption text-[var(--color-text-muted)] block leading-relaxed">
                  {cat.description}
                </span>
              </div>
              {cat.disabled ? (
                <span className="text-[11px] uppercase tracking-[0.05em] text-[var(--color-accent)] font-medium shrink-0 mt-0.5">
                  {t("alwaysActive")}
                </span>
              ) : (
                <button
                  type="button"
                  role="switch"
                  aria-checked={cat.checked}
                  aria-label={cat.label}
                  onClick={() => cat.onChange?.(!cat.checked)}
                  className={`relative shrink-0 mt-0.5 w-10 h-5 rounded-full transition-colors duration-200 ${
                    cat.checked
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-line)]"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      cat.checked ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" size="sm" onClick={handleSave} className="flex-1">
            {t("save")}
          </Button>
          <Button variant="primary" size="sm" onClick={onAcceptAll} className="flex-1">
            {t("acceptAll")}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default CookieConsent;

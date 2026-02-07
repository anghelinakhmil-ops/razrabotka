"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ease } from "@/lib/motion";

const STORAGE_KEY = "cookie_consent";

type ConsentStatus = "accepted" | "declined" | null;

/**
 * Читает статус согласия из localStorage
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    if (value === "accepted" || value === "declined") return value;
  } catch {
    // Игнорируем ошибки
  }
  return null;
}

/**
 * CookieConsent — баннер согласия на использование cookies
 *
 * Стиль: Premium-minimal, фиксирован внизу экрана.
 * Появляется только если пользователь ещё не дал ответ.
 * При «Принять» — загружается GA. При «Отклонить» — GA не загружается.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const status = getConsentStatus();
    if (!status) {
      // Показываем баннер с небольшой задержкой
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Игнорируем
    }
    setVisible(false);
    // Перезагружаем страницу чтобы GA подхватился
    window.location.reload();
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
    } catch {
      // Игнорируем
    }
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6"
          role="dialog"
          aria-label="Согласие на использование cookies"
        >
          <div className="max-w-2xl mx-auto bg-[var(--color-text-primary)] text-[var(--color-background)] rounded-sm p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-lg">
            <p className="text-sm leading-relaxed flex-1">
              Мы используем cookies для аналитики и улучшения сайта.{" "}
              <a
                href="/privacy"
                className="underline hover:no-underline"
              >
                Подробнее
              </a>
            </p>
            <div className="flex gap-3 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="!border-[var(--color-background)] !text-[var(--color-background)] hover:!bg-[var(--color-background)] hover:!text-[var(--color-text-primary)]"
              >
                Отклонить
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAccept}
                className="!bg-[var(--color-background)] !text-[var(--color-text-primary)] hover:!bg-[var(--color-line)]"
              >
                Принять
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CookieConsent;

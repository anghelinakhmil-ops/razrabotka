"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrokenText } from "../ui/BrokenText";
import { Button } from "../ui/Button";
import { NAV_ITEMS, LEGAL_LINKS, SOCIAL_LINKS_FULL, CONTACT, COMPANY_NAME } from "@/lib/constants";

interface FooterProps {
  onCallbackClick?: () => void;
  className?: string;
}

/**
 * Footer — подвал сайта с reveal-эффектом
 *
 * position: fixed внизу — контент скроллится поверх,
 * footer «проявляется» когда контент заканчивается.
 * Полностью тёмный фон (как в референсе THE BRIDGE).
 */
export function Footer({ onCallbackClick, className }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const [footerHeight, setFooterHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <>
      {/* Spacer — reserves space for the fixed footer */}
      <div style={{ height: footerHeight }} aria-hidden="true" />

      <footer
        ref={footerRef}
        className={clsx(
          "fixed bottom-0 left-0 right-0",
          "z-0",
          "bg-[var(--color-text-primary)]",
          "text-white",
          className
        )}
      >
        {/* Lead block — CTA section */}
        <div className="border-b border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <BrokenText
                  text="ОБСУДИТЬ ПРОЕКТ"
                  spaced
                  className={clsx(
                    "text-[16px] sm:text-[32px] md:text-[40px] lg:text-[48px]",
                    "font-bold",
                    "tracking-[0.1em]",
                    "text-white",
                    "mb-4"
                  )}
                />
                <p className="text-[16px] lg:text-[18px] text-white/50 max-w-md">
                  Расскажите о вашем проекте, и мы предложим лучшее решение
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={onCallbackClick}
                  className="border-white text-white hover:bg-white hover:text-[var(--color-text-primary)]"
                >
                  Заказать звонок
                </Button>
                <Button
                  as={Link}
                  href="/brief"
                  variant="ghost"
                  size="lg"
                  className="text-white hover:bg-white/10"
                >
                  Заполнить бриф
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main footer content — all dark */}
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Logo + Description */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <BrokenText
                  text="NAKO"
                  spaced
                  className={clsx(
                    "text-[18px]",
                    "font-bold",
                    "tracking-[0.15em]",
                    "text-white"
                  )}
                />
              </Link>
              <p className="text-[14px] text-white/40 leading-relaxed mb-6">
                Создаём сайты под ключ для экспертов, e-commerce и бизнесов.
                Premium-minimal дизайн, который работает на результат.
              </p>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS_FULL.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={clsx(
                      "p-2",
                      "text-white/40",
                      "hover:text-white",
                      "transition-colors duration-200",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-text-primary)]"
                    )}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className={clsx(
                "text-[12px] font-semibold uppercase",
                "tracking-[0.05em]",
                "text-white/60",
                "mb-6"
              )}>
                Навигация
              </h3>
              <nav aria-label="Навигация в футере">
                <ul className="space-y-3">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={clsx(
                          "text-[14px]",
                          "text-white/40",
                          "hover:text-white",
                          "transition-colors duration-200"
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Column 3: Contacts */}
            <div>
              <h3 className={clsx(
                "text-[12px] font-semibold uppercase",
                "tracking-[0.05em]",
                "text-white/60",
                "mb-6"
              )}>
                Контакты
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`tel:${CONTACT.phoneRaw}`}
                    className={clsx(
                      "block text-[14px]",
                      "text-white",
                      "hover:text-white/60",
                      "transition-colors duration-200"
                    )}
                  >
                    {CONTACT.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className={clsx(
                      "block text-[14px]",
                      "text-white/40",
                      "hover:text-white",
                      "transition-colors duration-200"
                    )}
                  >
                    {CONTACT.email}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal */}
            <div>
              <h3 className={clsx(
                "text-[12px] font-semibold uppercase",
                "tracking-[0.05em]",
                "text-white/60",
                "mb-6"
              )}>
                Информация
              </h3>
              <ul className="space-y-3">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={clsx(
                        "text-[14px]",
                        "text-white/40",
                        "hover:text-white",
                        "transition-colors duration-200"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[13px] text-white/30">
                &copy; {currentYear} {COMPANY_NAME}. Все права защищены.
              </p>
              <p className="text-[13px] text-white/20">
                Разработано с{" "}
                <span className="text-white/40" aria-label="любовью">
                  &hearts;
                </span>{" "}
                в {COMPANY_NAME}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

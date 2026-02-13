"use client";

import { clsx } from "clsx";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BrokenText } from "../ui/BrokenText";
import { Button } from "../ui/Button";
import { NAV_ITEMS, LEGAL_LINKS, CONTACT, COMPANY_NAME } from "@/lib/constants";

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
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
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
                  text={t("cta")}
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
                  {t("ctaSubtitle")}
                </p>
              </div>
              <Button
                as={Link}
                href="/brief"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-[var(--color-text-primary)]"
              >
                {t("ctaButton")}
              </Button>
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
              <p className="text-[14px] text-white/40 leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Column 2: Navigation */}
            <div>
              <h3 className={clsx(
                "text-[12px] font-semibold uppercase",
                "tracking-[0.05em]",
                "text-white/60",
                "mb-6"
              )}>
                {t("navTitle")}
              </h3>
              <nav aria-label={t("navTitle")}>
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
                        {tNav(item.key)}
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
                {t("contactsTitle")}
              </h3>
              <ul className="space-y-4">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className={clsx(
                      "block text-[14px]",
                      "text-white",
                      "hover:text-white/60",
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
                {t("legalTitle")}
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
                      {t(item.key)}
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
                &copy; {currentYear} {COMPANY_NAME}. {t("copyright")}
              </p>
              <p className="text-[13px] text-white/20">
                {t("madeWith")}{" "}
                <span className="text-white/40" aria-label="love">
                  &hearts;
                </span>{" "}
                {t("madeIn")} {COMPANY_NAME}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

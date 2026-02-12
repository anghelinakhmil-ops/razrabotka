"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BrokenText } from "../ui/BrokenText";
import { Button } from "../ui/Button";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Главная", href: "/" },
  { label: "Про нас", href: "/about" },
  { label: "Услуги", href: "/services" },
  { label: "Кейсы", href: "/cases" },
  { label: "Блог", href: "/blog" },
  { label: "Контакты", href: "/contacts" },
];

const LEGAL_LINKS: NavItem[] = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Условия использования", href: "/terms" },
];

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "Telegram",
    href: "https://t.me/webstudio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/webstudio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/webstudio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
];

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
          <div className="max-w-[1440px] mx-auto px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <BrokenText
                  text="ОБСУДИТЬ ПРОЕКТ"
                  spaced
                  className={clsx(
                    "text-[32px] md:text-[40px] lg:text-[48px]",
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
        <div className="max-w-[1440px] mx-auto px-8 lg:px-16 xl:px-24 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Logo + Description */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-6">
                <BrokenText
                  text="WEBSTUDIO"
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
                {SOCIAL_LINKS.map((social) => (
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
                    href="tel:+78001234567"
                    className={clsx(
                      "block text-[14px]",
                      "text-white",
                      "hover:text-white/60",
                      "transition-colors duration-200"
                    )}
                  >
                    +7 (800) 123-45-67
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@webstudio.com"
                    className={clsx(
                      "block text-[14px]",
                      "text-white/40",
                      "hover:text-white",
                      "transition-colors duration-200"
                    )}
                  >
                    hello@webstudio.com
                  </a>
                </li>
                <li>
                  <address className={clsx(
                    "not-italic text-[14px]",
                    "text-white/40",
                    "leading-relaxed"
                  )}>
                    Москва, ул. Примерная, 123
                    <br />
                    БЦ «Пример», офис 456
                  </address>
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
          <div className="max-w-[1440px] mx-auto px-8 lg:px-16 xl:px-24 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-[13px] text-white/30">
                &copy; {currentYear} WebStudio. Все права защищены.
              </p>
              <p className="text-[13px] text-white/20">
                Разработано с{" "}
                <span className="text-white/40" aria-label="любовью">
                  &hearts;
                </span>{" "}
                в WebStudio
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;

"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SplitTextReveal } from "@/components/motion";
import { ease, duration } from "@/lib/motion";

/**
 * SVG логотипы клиентов (стилизованные, grayscale)
 */
interface ClientLogo {
  name: string;
  svg: React.ReactNode;
}

const CLIENTS: ClientLogo[] = [
  {
    name: "TechCorp",
    svg: (
      <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="8" width="16" height="16" fill="currentColor" opacity="0.6" />
        <rect x="4" y="12" width="8" height="8" fill="currentColor" opacity="0.3" />
        <text x="22" y="22" fontFamily="inherit" fontSize="14" fontWeight="700" letterSpacing="0.1em" fill="currentColor">TECHCORP</text>
      </svg>
    ),
  },
  {
    name: "DesignLab",
    svg: (
      <svg width="130" height="32" viewBox="0 0 130 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="16" r="8" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <circle cx="10" cy="16" r="3" fill="currentColor" opacity="0.4" />
        <text x="24" y="22" fontFamily="inherit" fontSize="14" fontWeight="700" letterSpacing="0.08em" fill="currentColor">DESIGNLAB</text>
      </svg>
    ),
  },
  {
    name: "StartupX",
    svg: (
      <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 24L10 8L18 24" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="6" y1="18" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <text x="24" y="22" fontFamily="inherit" fontSize="14" fontWeight="700" letterSpacing="0.1em" fill="currentColor">STARTUPX</text>
      </svg>
    ),
  },
  {
    name: "MediaPro",
    svg: (
      <svg width="126" height="32" viewBox="0 0 126 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="2,8 18,16 2,24" fill="currentColor" opacity="0.5" />
        <polygon points="8,11 18,16 8,21" fill="currentColor" opacity="0.3" />
        <text x="24" y="22" fontFamily="inherit" fontSize="14" fontWeight="700" letterSpacing="0.08em" fill="currentColor">MEDIAPRO</text>
      </svg>
    ),
  },
  {
    name: "FinanceHub",
    svg: (
      <svg width="140" height="32" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="14" width="18" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="5" y1="10" x2="13" y2="10" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="9" y1="10" x2="9" y2="14" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <text x="24" y="22" fontFamily="inherit" fontSize="14" fontWeight="700" letterSpacing="0.06em" fill="currentColor">FINANCEHUB</text>
      </svg>
    ),
  },
  {
    name: "EduPlatform",
    svg: (
      <svg width="148" height="32" viewBox="0 0 148 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 18L9 12L18 18" stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        <line x1="9" y1="18" x2="9" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <line x1="4" y1="24" x2="14" y2="24" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />
        <text x="24" y="22" fontFamily="inherit" fontSize="14" fontWeight="700" letterSpacing="0.04em" fill="currentColor">EDUPLATFORM</text>
      </svg>
    ),
  },
];

/**
 * TrustedBy — секция «Нам доверяют»
 *
 * SVG логотипы клиентов в grayscale, как в референсе THE BRIDGE.
 */
export function TrustedBy() {
  const t = useTranslations("trustedBy");

  return (
    <section className="py-[var(--section-gap-sm)] bg-[var(--color-background)] border-t border-[var(--color-line)]">
      <Container>
        <SplitTextReveal
          text={t("title")}
          as="p"
          className="text-caption text-[var(--color-text-muted)] text-center mb-12"
          direction="up"
          staggerDelay={0.06}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-8 lg:gap-x-14">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              className="flex items-center justify-center text-[var(--color-text-muted)]/30 hover:text-[var(--color-text-muted)] transition-colors duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: duration.normal,
                ease,
                delay: 0.1 + i * 0.08,
              }}
              aria-label={client.name}
            >
              {client.svg}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrustedBy;

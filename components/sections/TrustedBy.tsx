"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SplitTextReveal } from "@/components/motion";
import { ease, duration } from "@/lib/motion";

/**
 * Логотипы клиентов (placeholder — текстовые)
 */
const CLIENTS = [
  { name: "TechCorp", width: "w-24" },
  { name: "DesignLab", width: "w-28" },
  { name: "StartupX", width: "w-24" },
  { name: "MediaPro", width: "w-28" },
  { name: "FinanceHub", width: "w-28" },
  { name: "EduPlatform", width: "w-32" },
];

/**
 * TrustedBy — секция «Нам доверяют»
 *
 * Логотипы клиентов в grayscale, как в референсе THE BRIDGE.
 * Placeholder: текстовые логотипы до получения реальных.
 */
export function TrustedBy() {
  return (
    <section className="py-[var(--section-gap-sm)] bg-[var(--color-background)] border-t border-[var(--color-line)]">
      <Container>
        <SplitTextReveal
          text="Нам доверяют"
          as="p"
          className="text-caption text-[var(--color-text-muted)] text-center mb-12"
          direction="up"
          staggerDelay={0.06}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 lg:gap-x-16">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client.name}
              className={`${client.width} flex items-center justify-center`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: duration.normal,
                ease,
                delay: 0.1 + i * 0.08,
              }}
            >
              <span className="text-[var(--color-text-muted)]/40 text-lg font-display font-bold uppercase tracking-wider select-none hover:text-[var(--color-text-muted)] transition-colors duration-300">
                {client.name}
              </span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TrustedBy;

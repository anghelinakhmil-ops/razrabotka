"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ease, sectionPresets } from "@/lib/motion";

interface FullBleedImageProps {
  /** Image source */
  src: string;
  /** Alt text */
  alt: string;
  /** Optional overlay text */
  overlayText?: string;
}

/**
 * FullBleedImage — полноширинная секция с изображением и parallax-эффектом
 *
 * Стиль: Архитектурный / Галерейный
 * Изображение занимает всю ширину экрана, лёгкий параллакс при скролле.
 */
export function FullBleedImage({
  src,
  alt,
  overlayText,
}: FullBleedImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      className="relative w-full h-[50vh] lg:h-[70vh] overflow-hidden"
      aria-label={alt}
    >
      <motion.div className="absolute inset-0" style={{ y }}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          quality={85}
        />
      </motion.div>

      {/* Тёмный overlay */}
      <div className="absolute inset-0 bg-[var(--color-text-primary)]/20" />

      {/* Опциональный текст */}
      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.p
            className="text-h2 font-display font-bold text-white tracking-widest uppercase text-center px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: sectionPresets.image.duration, ease }}
          >
            {overlayText}
          </motion.p>
        </div>
      )}
    </section>
  );
}

export default FullBleedImage;

"use client";

import { Button } from "@/components/ui/Button";
import { trackCtaClick } from "@/lib/analytics";

interface CtaButtonProps {
  /** Текст кнопки */
  children: React.ReactNode;
  /** Вариант кнопки */
  variant?: "primary" | "outline" | "ghost";
  /** Размер */
  size?: "sm" | "md" | "lg";
  /** Источник для аналитики */
  source?: string;
  /** Дополнительные классы */
  className?: string;
}

/**
 * CtaButton — CTA кнопка, открывающая CallbackModal
 *
 * Использует CustomEvent для связи с LayoutClient,
 * что позволяет использовать компонент и в Server, и в Client компонентах.
 */
export function CtaButton({
  children = "Обсудить проект",
  variant = "primary",
  size = "lg",
  source = "page_cta",
  className,
}: CtaButtonProps) {
  const handleClick = () => {
    trackCtaClick(source, String(children), window.location.pathname);
    window.dispatchEvent(new CustomEvent("open-callback-modal"));
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Button>
  );
}

export default CtaButton;

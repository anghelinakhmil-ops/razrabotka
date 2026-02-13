"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface CtaButtonProps {
  /** Текст кнопки */
  children: React.ReactNode;
  /** Вариант кнопки */
  variant?: "primary" | "outline" | "ghost";
  /** Размер */
  size?: "sm" | "md" | "lg";
  /** Дополнительные классы */
  className?: string;
}

/**
 * CtaButton — CTA кнопка, ведущая на /brief
 */
export function CtaButton({
  children = "Обсудить проект",
  variant = "primary",
  size = "lg",
  className,
}: CtaButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      as={Link}
      href="/brief"
      className={className}
    >
      {children}
    </Button>
  );
}

export default CtaButton;

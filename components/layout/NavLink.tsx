"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  /** URL ссылки */
  href: string;
  /** Текст ссылки */
  children: React.ReactNode;
  /** Точное совпадение пути (для главной страницы) */
  exact?: boolean;
  /** Дополнительные CSS классы */
  className?: string;
}

/**
 * NavLink — навигационная ссылка с определением активного состояния
 *
 * Автоматически определяет активную страницу через usePathname
 * и применяет соответствующие стили.
 *
 * @example
 * // Обычная ссылка
 * <NavLink href="/about">Про нас</NavLink>
 *
 * @example
 * // Главная страница (exact match)
 * <NavLink href="/" exact>Главная</NavLink>
 */
export function NavLink({
  href,
  children,
  exact = false,
  className,
}: NavLinkProps) {
  const pathname = usePathname();

  // Определяем активное состояние
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      className={clsx(
        "relative",
        "text-[13px] font-medium uppercase",
        "tracking-[var(--letter-spacing-wide)]",
        // Transition с ease из дизайн-системы
        "transition-colors duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        // Цвет в зависимости от состояния
        isActive
          ? "text-[var(--color-text-primary)]"
          : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
        // Underline animation
        "after:absolute after:bottom-0 after:left-0",
        "after:h-[1px]",
        "after:bg-[var(--color-text-primary)]",
        "after:transition-all after:duration-300 after:ease-[cubic-bezier(0.2,0.8,0.2,1)]",
        // Underline состояние
        isActive ? "after:w-full" : "after:w-0 hover:after:w-full",
        // Focus
        "focus-visible:outline-none",
        "focus-visible:after:w-full",
        className
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {children}
    </Link>
  );
}

export default NavLink;

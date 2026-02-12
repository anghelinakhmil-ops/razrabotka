"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — кастомный курсор (кружок следует за мышью)
 *
 * Особенности:
 * - Плавно следует за мышью через spring-анимацию
 * - Увеличивается на интерактивных элементах (a, button)
 * - Показывает текст на CTA элементах (data-cursor-text)
 * - Скрыт на touch-устройствах
 */
export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const isTouchDevice = useRef(false);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [cursorX, cursorY, isVisible]
  );

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (!isTouchDevice.current) setIsVisible(true);
  }, []);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      isTouchDevice.current =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
    };
    checkTouch();

    if (isTouchDevice.current) return;

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Track hover on interactive elements
    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor-text]"
      );
      if (interactive) {
        setIsHovering(true);
        const text = interactive.getAttribute("data-cursor-text");
        setCursorText(text || "");
      }
    };

    const handlePointerOut = (e: Event) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor-text]"
      );
      if (interactive) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
    };
  }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

  // Don't render on touch devices or SSR
  if (typeof window === "undefined") return null;

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9998] pointer-events-none mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
      }}
      aria-hidden="true"
    >
      <motion.div
        className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
        animate={{
          width: isHovering ? (cursorText ? 80 : 48) : 12,
          height: isHovering ? (cursorText ? 80 : 48) : 12,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          width: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
          height: { duration: 0.3, ease: [0.2, 0.8, 0.2, 1] },
          opacity: { duration: 0.2 },
        }}
      >
        {cursorText && isHovering && (
          <motion.span
            className="text-[10px] font-medium uppercase tracking-wider text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
}

export default CustomCursor;

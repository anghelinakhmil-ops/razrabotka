"use client";

import { useEffect, useSyncExternalStore, createContext, useContext } from "react";
import Lenis from "lenis";

/**
 * Контекст для доступа к инстансу Lenis
 */
const LenisContext = createContext<Lenis | null>(null);

/**
 * Хук для доступа к инстансу Lenis
 */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

interface LenisProviderProps {
  children: React.ReactNode;
}

/** Module-level store for Lenis instance (singleton) */
let lenisInstance: Lenis | null = null;
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => { listeners.delete(callback); };
}

function getSnapshot() { return lenisInstance; }
function getServerSnapshot() { return null; }

/**
 * Scroll to top — works with Lenis or native scroll
 */
export function scrollToTop() {
  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  }
  window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/**
 * LenisProvider — провайдер smooth scroll
 *
 * Настройки приближены к референсу THE BRIDGE:
 * - duration: 1.7 (длительная плавная прокрутка)
 * - easing: exponential ease-out
 * - touchMultiplier: 1.5
 */
export function LenisProvider({ children }: LenisProviderProps) {
  useEffect(() => {
    // Disable Lenis on touch devices — native scroll works better
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const instance = new Lenis({
      duration: 1.7,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      infinite: false,
    });

    lenisInstance = instance;
    listeners.forEach((cb) => cb());

    function raf(time: number) {
      instance.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      instance.destroy();
      lenisInstance = null;
      listeners.forEach((cb) => cb());
    };
  }, []);

  const lenis = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  );
}

export default LenisProvider;

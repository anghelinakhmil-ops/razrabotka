"use client";

import { useEffect, useRef, createContext, useContext } from "react";
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

/**
 * LenisProvider — провайдер smooth scroll
 *
 * Настройки приближены к референсу THE BRIDGE:
 * - duration: 1.7 (длительная плавная прокрутка)
 * - easing: exponential ease-out
 * - touchMultiplier: 2
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.7,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <LenisContext.Provider value={lenisRef.current}>
      {children}
    </LenisContext.Provider>
  );
}

export default LenisProvider;

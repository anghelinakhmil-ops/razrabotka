"use client";

import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileMenu } from "./MobileMenu";
import { CallbackModal } from "@/components/forms/CallbackModal";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { captureUtm } from "@/lib/utm";

interface LayoutClientProps {
  children: React.ReactNode;
}

/**
 * LayoutClient — клиентская обёртка для layout
 *
 * Управляет состоянием:
 * - MobileMenu (open/closed)
 * - CallbackModal (open/closed)
 */
export function LayoutClient({ children }: LayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const handleMenuOpen = () => setIsMobileMenuOpen(true);
  const handleMenuClose = () => setIsMobileMenuOpen(false);

  const handleCallbackClick = () => {
    // Закрываем мобильное меню если открыто
    setIsMobileMenuOpen(false);
    // Открываем модал
    setIsCallbackModalOpen(true);
  };

  const handleCallbackClose = () => setIsCallbackModalOpen(false);

  // Listen for CustomEvent from CtaButton (works from Server & Client components)
  useEffect(() => {
    const handleOpenModal = () => setIsCallbackModalOpen(true);
    window.addEventListener("open-callback-modal", handleOpenModal);
    return () => window.removeEventListener("open-callback-modal", handleOpenModal);
  }, []);

  // Capture UTM params from URL on first load
  useEffect(() => {
    captureUtm();
  }, []);

  return (
    <LenisProvider>
      {/* Custom Cursor — hidden on touch devices */}
      <CustomCursor />

      {/* Header */}
      <Header
        isMenuOpen={isMobileMenuOpen}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        onCallbackClick={handleCallbackClick}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        onCallbackClick={handleCallbackClick}
      />

      {/* Main content — relative + z-10 + bg to scroll over fixed footer */}
      <main className="relative z-10 min-h-screen bg-[var(--color-background)] pt-[72px] lg:pt-[80px]">
        {children}
      </main>

      {/* Footer */}
      <Footer onCallbackClick={handleCallbackClick} />

      {/* Callback Modal */}
      <CallbackModal
        isOpen={isCallbackModalOpen}
        onClose={handleCallbackClose}
        source="header_cta"
      />
    </LenisProvider>
  );
}

export default LayoutClient;

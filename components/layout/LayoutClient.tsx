"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileMenu } from "./MobileMenu";
import { CallbackModal } from "@/components/forms/CallbackModal";

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

  return (
    <>
      {/* Header */}
      <Header
        onMenuOpen={handleMenuOpen}
        onCallbackClick={handleCallbackClick}
      />

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMenuClose}
        onCallbackClick={handleCallbackClick}
      />

      {/* Main content */}
      <main className="min-h-screen pt-[72px] lg:pt-[88px]">
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
    </>
  );
}

export default LayoutClient;

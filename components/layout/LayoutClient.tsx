"use client";

import { useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileMenu } from "./MobileMenu";

interface LayoutClientProps {
  children: React.ReactNode;
}

/**
 * LayoutClient — клиентская обёртка для layout
 *
 * Управляет состоянием:
 * - MobileMenu (open/closed)
 * - CallbackModal (будет добавлен позже)
 */
export function LayoutClient({ children }: LayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // TODO: добавить состояние для CallbackModal в Phase 8
  // const [isCallbackModalOpen, setIsCallbackModalOpen] = useState(false);

  const handleMenuOpen = () => setIsMobileMenuOpen(true);
  const handleMenuClose = () => setIsMobileMenuOpen(false);

  // TODO: заменить на открытие модала в Phase 8
  const handleCallbackClick = () => {
    // Временно: открываем ссылку на страницу контактов
    window.location.href = "/contacts";
  };

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

      {/* TODO: Preloader будет добавлен в Phase 5 */}
      {/* TODO: CallbackModal будет добавлен в Phase 8 */}
    </>
  );
}

export default LayoutClient;

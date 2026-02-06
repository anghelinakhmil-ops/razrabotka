"use client";

import { useEffect } from "react";

interface TrackPageViewProps {
  /** Название события */
  event: string;
  /** Параметры события */
  params: Record<string, string>;
}

/**
 * TrackPageView — клиентский компонент для отправки GA4 событий
 *
 * Используется на серверных страницах для трекинга просмотров.
 * Отправляет событие один раз при монтировании.
 */
export function TrackPageView({ event, params }: TrackPageViewProps) {
  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;
    window.gtag("event", event, params);
  }, [event, params]);

  return null;
}

export default TrackPageView;

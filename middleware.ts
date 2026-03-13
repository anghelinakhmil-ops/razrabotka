import { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { getRegionByCountry, REGION_COOKIE } from "./lib/regions";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Гео-детекция: установить cookie региона при первом визите
  const existingRegion = request.cookies.get(REGION_COOKIE)?.value;

  if (!existingRegion) {
    // Dev-режим: использовать NEXT_PUBLIC_DEV_REGION из .env.local
    const countryCode =
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_REGION ?? undefined
        : request.headers.get("x-vercel-ip-country") ?? undefined;

    const region = getRegionByCountry(countryCode);

    response.cookies.set(REGION_COOKIE, region, {
      maxAge: 31536000, // 1 год
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      httpOnly: false, // нужен доступ из клиентского JS
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

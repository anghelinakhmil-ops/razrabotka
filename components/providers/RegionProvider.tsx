"use client";

import { createContext, useContext, useMemo } from "react";
import {
  type RegionCode,
  type RegionConfig,
  REGIONS,
  REGION_COOKIE,
  getRegionConfig,
} from "@/lib/regions";
import { formatPrice } from "@/lib/format-price";

interface RegionContextValue {
  region: RegionConfig;
  regionCode: RegionCode;
  formatPrice: (amount: number) => string;
}

const RegionContext = createContext<RegionContextValue>({
  region: REGIONS.DEFAULT,
  regionCode: "DEFAULT",
  formatPrice: (amount: number) => formatPrice(amount, "DEFAULT"),
});

function getCookieValue(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function isValidRegionCode(value: string): value is RegionCode {
  return value in REGIONS;
}

export function RegionProvider({ children }: { children: React.ReactNode }) {
  const value = useMemo<RegionContextValue>(() => {
    const cookieValue = getCookieValue(REGION_COOKIE) ?? "DEFAULT";
    const regionCode: RegionCode = isValidRegionCode(cookieValue) ? cookieValue : "DEFAULT";
    const region = getRegionConfig(regionCode);

    return {
      region,
      regionCode,
      formatPrice: (amount: number) => formatPrice(amount, regionCode),
    };
  }, []);

  return <RegionContext.Provider value={value}>{children}</RegionContext.Provider>;
}

export function useRegion(): RegionContextValue {
  return useContext(RegionContext);
}

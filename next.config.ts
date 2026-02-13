import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Включаем поддержку MDX страниц
  pageExtensions: ["ts", "tsx", "md", "mdx"],

  // Оптимизация изображений
  images: {
    formats: ["image/avif", "image/webp"],
  },

  // Turbopack конфигурация
  turbopack: {},
};

const withMDX = createMDX({
  // Опции MDX
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withNextIntl(withMDX(nextConfig));

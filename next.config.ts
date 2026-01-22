import type { NextConfig } from "next";
import createMDX from "@next/mdx";

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

export default withMDX(nextConfig);

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NAKO Agency",
    short_name: "NAKO",
    description: "Turnkey website development for experts, businesses and e-commerce",
    start_url: "/",
    display: "standalone",
    background_color: "#F9F7F2",
    theme_color: "#1A1A1A",
    icons: [
      {
        src: "/images/logo/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/logo/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}

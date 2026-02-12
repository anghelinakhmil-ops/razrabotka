import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import Metrics from "@/components/sections/Metrics";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import CasesPreview from "@/components/sections/CasesPreview";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import LeadFormSection from "@/components/sections/LeadFormSection";

export const metadata: Metadata = {
  title: "WebStudio — Разработка сайтов под ключ",
  description:
    "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, высокая скорость, SEO-оптимизация. Конверсия от 3%.",
  openGraph: {
    title: "WebStudio — Разработка сайтов под ключ",
    description:
      "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, высокая скорость.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Metrics />
      <Services />
      <Process />
      <CasesPreview />
      <Testimonials />
      <FAQ />
      <LeadFormSection />
    </>
  );
}

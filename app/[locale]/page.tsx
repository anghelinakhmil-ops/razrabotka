import { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import FullBleedImage from "@/components/sections/FullBleedImage";
import Metrics from "@/components/sections/Metrics";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import CasesPreview from "@/components/sections/CasesPreview";
import Testimonials from "@/components/sections/Testimonials";
import TrustedBy from "@/components/sections/TrustedBy";
import FAQ from "@/components/sections/FAQ";
import LeadFormSection from "@/components/sections/LeadFormSection";

export const metadata: Metadata = {
  title: "NAKO Agency — Разработка сайтов под ключ",
  description:
    "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, высокая скорость, SEO-оптимизация. Конверсия от 3%.",
  openGraph: {
    title: "NAKO Agency — Разработка сайтов под ключ",
    description:
      "Создаём сайты для экспертов, e-commerce и бизнесов. Premium-minimal дизайн, высокая скорость.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <FullBleedImage
        src="/images/fullbleed-workspace.jpg"
        alt="Рабочий процесс создания сайта в NAKO Agency"
      />
      <Metrics />
      <Services />
      <Process />
      <CasesPreview />
      <Testimonials />
      <TrustedBy />
      <FAQ />
      <LeadFormSection />
    </>
  );
}

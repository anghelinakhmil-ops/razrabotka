import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import FullBleedImage from "@/components/sections/FullBleedImage";

const Metrics = dynamic(() => import("@/components/sections/Metrics"));
const Services = dynamic(() => import("@/components/sections/Services"));
const CasesPreview = dynamic(() => import("@/components/sections/CasesPreview"));
const Process = dynamic(() => import("@/components/sections/Process"));
const FAQ = dynamic(() => import("@/components/sections/FAQ"));
const LeadFormSection = dynamic(() => import("@/components/sections/LeadFormSection"));

export default async function Home() {
  const t = await getTranslations("hero");

  return (
    <>
      <Hero />
      <Benefits />
      <FullBleedImage
        src="/images/fullbleed-workspace.jpg"
        alt={t("fullBleedAlt")}
      />
      <Metrics />
      <Services />
      <CasesPreview />
      <FullBleedImage
        src="/images/fullbleed-process.jpg"
        alt={t("fullBleedProcessAlt")}
      />
      <Process />
      <FAQ />
      <LeadFormSection />
    </>
  );
}

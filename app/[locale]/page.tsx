import { getTranslations } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import Benefits from "@/components/sections/Benefits";
import FullBleedImage from "@/components/sections/FullBleedImage";
import Metrics from "@/components/sections/Metrics";
import Services from "@/components/sections/Services";
import CasesPreview from "@/components/sections/CasesPreview";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import LeadFormSection from "@/components/sections/LeadFormSection";

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

import Hero from "@/components/Hero";
import ServicesPreview from "@/components/ServicesPreview";
import ApproachPreview from "@/components/ApproachPreview";
import WorksPreview from "@/components/WorksPreview";
import CallToAction from "@/components/CallToAction";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WorksPreview />
      <ApproachPreview />
      <CallToAction />
    </>
  );
}

import { About } from "@/components/sections/about";
import { Business } from "@/components/sections/business";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Markets } from "@/components/sections/markets";
import { Products } from "@/components/sections/products";
import { Security } from "@/components/sections/security";
import { SupplyChain } from "@/components/sections/supply-chain";
import { VisionValues } from "@/components/sections/vision-values";
import { WhyIntank } from "@/components/sections/why-intank";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <About />
      <Business />
      <SupplyChain />
      <Markets />
      <Products />
      <Security />
      <WhyIntank />
      <VisionValues />
      <Contact />
    </>
  );
}

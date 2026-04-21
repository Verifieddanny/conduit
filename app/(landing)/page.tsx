"use client";
import { useState } from "react";
import FeaturesSection from "@/components/landing/feature";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import ResilienceSection from "@/components/landing/resillence";


export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center">
      <Hero />
      <HowItWorks />
      <ResilienceSection />
      <FeaturesSection />
    </div>
  );
}

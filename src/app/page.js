'use client';

import { useState } from 'react';
import HeroSection from "@/sections/HeroSection";
import SplashScreen from "@/sections/SplashScreen";
import AboutSection from "@/sections/AboutSection";
import ResumeSection from "@/sections/ResumeSection";
import SkillsVisualization from "@/components/SkillsVisualization";

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <div className="overflow-hidden font-sans">
     
      {showSplash ? (
        <SplashScreen onComplete={handleSplashComplete} />
              ) : (
                <div>
                  <HeroSection />
                  <AboutSection />
                  <SkillsVisualization />
                  <ResumeSection />
                </div>
              )}
     
    </div>
  );
}

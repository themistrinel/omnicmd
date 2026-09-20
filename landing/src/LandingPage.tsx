import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { WorkflowSection } from './components/WorkflowSection';
import { BenchmarksSection } from './components/BenchmarksSection';
import { CommandsSection } from './components/CommandsSection';
import { DownloadSection } from './components/DownloadSection';
import { DevlogSection } from './components/DevlogSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { OSPlatform } from './types';
import { detectUserOS, getDownloadInfo } from './utils';

export const LandingPage: React.FC = () => {
  const [detectedOS] = useState<OSPlatform>(detectUserOS);
  const downloadInfo = getDownloadInfo(detectedOS);

  return (
    <div className="min-h-screen w-full bg-[#030712] text-zinc-100 font-sans antialiased selection:bg-sky-400 selection:text-black relative overflow-x-hidden">
      {/* Cosmic Starry Sky Layer */}
      <div
        className="pointer-events-none fixed inset-0 cosmic-stars opacity-40 z-0"
        aria-hidden="true"
      />

      {/* Top Ambient Cosmic Glows */}
      <div
        className="pointer-events-none fixed top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-sky-500/15 via-cyan-400/10 to-transparent rounded-full blur-[140px] z-0"
        aria-hidden="true"
      />

      {/* Side Cyan/Sky Aurora Accent */}
      <div
        className="pointer-events-none fixed top-[40%] -left-[200px] w-[600px] h-[600px] bg-sky-900/15 rounded-full blur-[160px] z-0"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed top-[60%] -right-[200px] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[160px] z-0"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10">
        <HeroSection detectedOS={detectedOS} downloadInfo={downloadInfo} />
        <FeaturesSection />
        <WorkflowSection />
        <BenchmarksSection />
        <CommandsSection />
        <DownloadSection detectedOS={detectedOS} />
        <DevlogSection />
        <CtaSection detectedOS={detectedOS} downloadInfo={downloadInfo} />
      </main>

      <Footer />
    </div>
  );
};

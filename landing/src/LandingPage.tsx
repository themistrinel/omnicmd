import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
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
    <div className="min-h-screen w-full bg-[#050608] text-zinc-100 font-sans antialiased selection:bg-[#38bdf8] selection:text-black relative overflow-x-hidden">
      {/* Precision Blueprint Grid Background */}
      <div
        className="pointer-events-none fixed inset-0 blueprint-grid opacity-25 z-0"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative z-10">
        <HeroSection detectedOS={detectedOS} downloadInfo={downloadInfo} />
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

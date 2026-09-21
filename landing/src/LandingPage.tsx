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
import { LanguageProvider } from './i18n/LanguageContext';

const LandingPageContent: React.FC = () => {
  const [detectedOS] = useState<OSPlatform>(detectUserOS);
  const downloadInfo = getDownloadInfo(detectedOS);

  return (
    <div className="min-h-screen w-full bg-[#08090d] text-slate-100 font-sans antialiased selection:bg-sky-400 selection:text-[#082f49] relative overflow-x-hidden">
      {/* Subtle Top Atmosphere */}
      <div
        className="pointer-events-none fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-sky-500/8 rounded-full blur-[120px] z-0"
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

export const LandingPage: React.FC = () => {
  return (
    <LanguageProvider>
      <LandingPageContent />
    </LanguageProvider>
  );
};

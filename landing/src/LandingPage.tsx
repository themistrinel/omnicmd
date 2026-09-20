import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { InteractiveHudSimulator } from './components/InteractiveHudSimulator';
import { BenchmarksSection } from './components/BenchmarksSection';
import { WorkflowSection } from './components/WorkflowSection';
import { DevlogSection } from './components/DevlogSection';
import { DownloadSection } from './components/DownloadSection';
import { Footer } from './components/Footer';
import { OSPlatform } from './types';
import { detectUserOS, getDownloadInfo } from './utils';

export const LandingPage: React.FC = () => {
  const [detectedOS] = useState<OSPlatform>(detectUserOS);
  const downloadInfo = getDownloadInfo(detectedOS);

  return (
    <div className="min-h-screen w-full bg-[#050608] text-slate-100 font-sans antialiased selection:bg-white/20 selection:text-white relative overflow-x-hidden">
      {/* Precision Ambient Light */}
      <div
        className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] opacity-25 blur-[150px]"
        style={{
          background: 'radial-gradient(circle at 50% 10%, rgba(56, 189, 248, 0.1) 0%, rgba(99, 102, 241, 0.04) 50%, transparent 80%)',
        }}
      />

      <Navbar />

      <main className="relative z-10">
        <HeroSection detectedOS={detectedOS} downloadInfo={downloadInfo} />
        <InteractiveHudSimulator />
        <BenchmarksSection />
        <WorkflowSection />
        <DevlogSection />
        <DownloadSection detectedOS={detectedOS} />
      </main>

      <Footer />
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { APP_VERSION, GITHUB_URL } from '../constants';
import { DownloadInfo, OSPlatform } from '../types';
import { detectUserOS, getDownloadInfo } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { Magnet, StarBorder } from './reactbits';

interface NavbarProps {
  downloadInfo?: DownloadInfo;
  version?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ downloadInfo: propDownloadInfo, version }) => {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [detectedOS] = useState<OSPlatform>(detectUserOS);
  const downloadInfo = propDownloadInfo || getDownloadInfo(detectedOS);
  const activeVersion = version || APP_VERSION;
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { label: t.nav.cockpit, href: '#cockpit' },
    { label: t.nav.features, href: '#features' },
    { label: t.nav.benchmarks, href: '#architecture' },
    { label: t.nav.commands, href: '#commands' },
    { label: t.nav.changelog, href: '#devlog' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        e.preventDefault();
        setIsMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Lock body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header
        className="fixed top-2.5 sm:top-4 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none font-sans"
      >
        <div
          className={`pointer-events-auto max-w-5xl w-full h-13 sm:h-14 px-3 sm:px-5 flex items-center justify-between rounded-2xl sm:rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#07090e]/92 backdrop-blur-xl border border-white/[0.14] shadow-[0_12px_40px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.08)]'
              : 'bg-[#090c13]/75 backdrop-blur-lg border border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.05)]'
          }`}
        >
          {/* Logo & Version Tag */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Magnet padding={30} magnetStrength={4}>
              <a
                href="#"
                className="flex items-center gap-2 text-white font-bold tracking-tight text-sm focus:outline-none group"
              >
                <div className="w-6 h-6 rounded-md bg-sky-400 text-[#082f49] flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 group-hover:shadow-[0_0_12px_rgba(56,189,248,0.6)] transition-all">
                  &gt;_
                </div>
                <span className="font-display font-bold tracking-tight text-sm sm:text-base text-white">
                  OMNICMD
                </span>
              </a>
            </Magnet>

            <a
              href="#devlog"
              className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-mono font-medium text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] hover:border-white/[0.16] transition-colors"
            >
              <span>v{activeVersion}</span>
            </a>
          </div>

          {/* Navigation Items (Desktop Pill Nav) */}
          <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300 font-sans">
            {navLinks.map((link) => (
              <Magnet key={link.label} padding={25} magnetStrength={4}>
                <a
                  href={link.href}
                  className="px-3 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/[0.07] transition-all duration-150"
                >
                  {link.label}
                </a>
              </Magnet>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Language Selector (Desktop) */}
            <LanguageSelector variant="desktop" />

            <Magnet padding={30} magnetStrength={3} wrapperClassName="hidden lg:inline-block">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="View OmniCmd on GitHub"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans text-slate-300 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.08] hover:border-white/[0.18] transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>
            </Magnet>

            {/* Tactical StarBorder Action Button */}
            <Magnet padding={30} magnetStrength={3}>
              <StarBorder
                as="a"
                href={downloadInfo.url}
                color="#38bdf8"
                speed="3s"
                thickness={1}
                backgroundColor="rgba(8, 12, 19, 0.95)"
                borderColor="rgba(255, 255, 255, 0.12)"
                innerClassName="px-3.5 py-1.5 flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-b from-sky-500/15 via-[#0a0e17] to-[#06080e] hover:from-sky-500/25 hover:border-sky-400/40 hover:shadow-[0_0_18px_rgba(56,189,248,0.3)] transition-all cursor-pointer rounded-[9px]"
                className="rounded-xl shadow-md shadow-black/40"
              >
                <Download className="w-3.5 h-3.5 text-sky-400 stroke-[2.5]" />
                <span className="tracking-tight">{t.nav.downloadBtn}</span>
              </StarBorder>
            </Magnet>

            {/* Mobile Hamburger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-drawer"
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-40 bg-[#08090d]/98 backdrop-blur-2xl md:hidden pt-20 px-6 flex flex-col justify-between pb-8 font-sans overflow-y-auto"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 mb-2 font-mono">
              {t.nav.systemDirectory}
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="py-3 text-base font-semibold text-slate-200 hover:text-white border-b border-white/[0.08] transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Language Selector in Mobile Drawer */}
            <div className="pt-4 pb-2">
              <LanguageSelector variant="mobile" />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.08]">
            <StarBorder
              as="a"
              href={downloadInfo.url}
              onClick={closeMobileMenu}
              color="#38bdf8"
              speed="3.5s"
              backgroundColor="rgba(10, 14, 22, 0.95)"
              innerClassName="flex items-center justify-center gap-2.5 w-full py-3 rounded-xl bg-gradient-to-b from-sky-500/15 via-[#0b0f19] to-[#06080e] border-sky-400/30 text-white font-bold text-sm shadow-[0_0_20px_rgba(56,189,248,0.25)]"
              className="w-full rounded-xl"
            >
              <Download className="w-4 h-4 text-sky-400" />
              <span>{t.nav.downloadFor} {downloadInfo.osName}</span>
            </StarBorder>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/[0.08] text-sm font-medium transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>themistrinel/omnicmd</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

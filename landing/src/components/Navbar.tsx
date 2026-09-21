import React, { useState, useEffect, useRef } from 'react';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { APP_VERSION, GITHUB_URL } from '../constants';
import { DownloadInfo, OSPlatform } from '../types';
import { detectUserOS, getDownloadInfo } from '../utils';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 font-sans ${
          scrolled
            ? 'bg-[#08090d]/90 backdrop-blur-md border-b border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.6)]'
            : 'bg-transparent border-b border-white/[0.05]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo & Version Tag */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 text-white font-bold tracking-tight text-sm focus:outline-none group"
            >
              <div className="w-6 h-6 rounded-md bg-sky-400 text-[#082f49] flex items-center justify-center font-mono font-bold text-xs group-hover:scale-105 transition-transform">
                &gt;_
              </div>
              <span className="font-display font-bold tracking-tight text-base text-white">
                OMNICMD
              </span>
            </a>

            <a
              href="#devlog"
              className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] font-mono font-medium text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-colors"
            >
              <span>v{activeVersion}</span>
            </a>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-400 font-sans">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            {/* Language Selector (Desktop) */}
            <LanguageSelector variant="desktop" />

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="View OmniCmd on GitHub"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium font-sans text-slate-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-slate-500" />
            </a>

            {/* Tactical Primary Action Button */}
            <a
              href={downloadInfo.url}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold font-sans btn-primary-azure cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t.nav.downloadBtn}</span>
            </a>

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
            <a
              href={downloadInfo.url}
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl btn-primary-azure font-bold text-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.nav.downloadFor} {downloadInfo.osName}</span>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white/[0.04] text-slate-300 border border-white/[0.08] text-sm font-medium"
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

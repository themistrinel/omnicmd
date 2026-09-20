import React, { useState, useEffect, useRef } from 'react';
import { Download, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { GITHUB_URL } from '../constants';
import { OSPlatform } from '../types';
import { detectUserOS, getDownloadInfo } from '../utils';

interface NavItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { label: 'Cockpit', href: '#cockpit' },
  { label: 'Features', href: '#features' },
  { label: 'Benchmarks', href: '#architecture' },
  { label: 'Commands', href: '#commands' },
  { label: 'Changelog', href: '#devlog' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [detectedOS] = useState<OSPlatform>(detectUserOS);
  const downloadInfo = getDownloadInfo(detectedOS);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

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
            ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-sky-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent border-b border-sky-500/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2.5 text-white font-bold tracking-tight text-sm focus:outline-none group"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-sky-500 via-cyan-400 to-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-[0_0_15px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-transform">
                &gt;_
              </div>
              <span className="font-display font-extrabold tracking-tight text-base bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-sky-300">
                OMNICMD
              </span>
            </a>

            <a
              href="#devlog"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-sans font-medium text-sky-300 hover:text-white bg-sky-950/40 border border-sky-500/30 transition-colors"
            >
              <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
              <span className="font-mono text-[11px]">v0.1.0</span>
            </a>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-sky-200/75 font-sans">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.8)] transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="View OmniCmd on GitHub"
              className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium font-sans text-sky-200 hover:text-white bg-[#081430] hover:bg-[#0c1f4d] border border-sky-500/30 transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5 text-sky-300" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-sky-400" />
            </a>

            {/* Pill Arredondado com Glow Sky/Cyan (Image 1 style) */}
            <a
              href={downloadInfo.url}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-sans bg-gradient-to-r from-sky-500 via-cyan-400 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] border border-sky-400/40 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download v0.1.0</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-1.5 rounded-full text-sky-300 hover:text-white bg-[#081430] border border-sky-500/30 transition-colors cursor-pointer"
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
          className="fixed inset-0 z-40 bg-[#030712]/98 backdrop-blur-2xl md:hidden pt-20 px-6 flex flex-col justify-between pb-8 font-sans"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-wider font-semibold text-sky-400/60 mb-2">
              SYSTEM DIRECTORY
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="py-3 text-base font-semibold text-sky-100 hover:text-white border-b border-sky-500/15 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-sky-500/20">
            <a
              href={downloadInfo.url}
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(56,189,248,0.4)]"
            >
              <Download className="w-4 h-4" />
              <span>Download for {downloadInfo.osName}</span>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[#081430] text-sky-200 border border-sky-500/30 text-sm font-medium"
            >
              <GithubIcon className="w-4 h-4" />
              <span>themistrinel/omnicmd</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-sky-400" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

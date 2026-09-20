import React, { useState, useEffect, useRef } from 'react';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
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
  { label: 'Cadence', href: '#cadence' },
  { label: 'Profiler', href: '#architecture' },
  { label: 'Commands', href: '#commands' },
  { label: 'Artifacts', href: '#downloads' },
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-150 font-mono ${
          scrolled
            ? 'bg-[#050608]/95 backdrop-blur-md border-b border-white/[0.1]'
            : 'bg-transparent border-b border-white/[0.04]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2 text-white font-bold tracking-tight text-sm focus:outline-none"
            >
              <div className="w-5 h-5 rounded bg-[#38bdf8] text-black flex items-center justify-center font-mono font-bold text-xs">
                &gt;_
              </div>
              <span className="font-display font-extrabold tracking-tight">OMNICMD</span>
            </a>

            <a
              href="#devlog"
              className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-mono text-zinc-400 hover:text-white bg-[#10131b] border border-white/[0.08]"
            >
              v0.1.0
            </a>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-mono text-zinc-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#38bdf8] transition-colors"
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
              className="hidden xs:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono text-zinc-300 hover:text-white bg-[#0e1118] hover:bg-[#161a24] border border-white/[0.08] transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GH</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            <a
              href={downloadInfo.url}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded text-xs font-mono font-bold bg-[#38bdf8] text-black hover:bg-[#0ea5e9] transition-all shadow-[0_0_15px_rgba(56,189,248,0.25)]"
            >
              <Download className="w-3.5 h-3.5 text-black" />
              <span>{downloadInfo.osName.toUpperCase()}</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden p-1.5 rounded text-zinc-400 hover:text-white bg-[#10131b] border border-white/[0.08] transition-colors cursor-pointer"
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
          className="fixed inset-0 z-40 bg-[#050608]/98 backdrop-blur-2xl md:hidden pt-20 px-6 flex flex-col justify-between pb-8 font-mono"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-wider text-zinc-500 mb-2">
              SYSTEM DIRECTORY
            </div>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMobileMenu}
                className="py-3 text-base font-bold text-zinc-200 hover:text-[#38bdf8] border-b border-white/[0.06] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.08]">
            <a
              href={downloadInfo.url}
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-3 rounded bg-[#38bdf8] text-black font-bold text-xs"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD FOR {downloadInfo.osName.toUpperCase()}</span>
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded bg-[#10131b] text-zinc-300 border border-white/[0.08] text-xs font-mono"
            >
              <GithubIcon className="w-4 h-4" />
              <span>themistrinel/omnicmd</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};

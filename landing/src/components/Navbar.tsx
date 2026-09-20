import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Download, Menu, X, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { GITHUB_URL } from '../constants';

interface NavItem {
  label: string;
  href: string;
}

const NAV_LINKS: NavItem[] = [
  { label: 'Preview', href: '#preview' },
  { label: 'Architecture', href: '#benchmarks' },
  { label: 'Cadence', href: '#workflow' },
  { label: 'Releases', href: '#devlog' },
  { label: 'Downloads', href: '#downloads' },
];

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Accessible focus trap inside drawer
  useEffect(() => {
    if (!isMobileMenuOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusable = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length > 0) {
      focusable[0]?.focus();
    }

    const handleTabTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const elements = drawer.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    drawer.addEventListener('keydown', handleTabTrap);
    return () => drawer.removeEventListener('keydown', handleTabTrap);
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 py-3 sm:py-4 pointer-events-none">
        <div
          className={`pointer-events-auto w-full max-w-6xl transition-all duration-300 rounded-2xl flex items-center justify-between px-3.5 sm:px-6 h-14 ${
            scrolled
              ? 'bg-[#090b10]/85 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
              : 'bg-[#090b10]/50 backdrop-blur-md border border-white/[0.04]'
          }`}
        >
          {/* Brand */}
          <a
            href="#"
            aria-label="OmniCmd Home"
            className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer min-h-[44px] py-1 focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-white shadow-inner group-hover:border-white/25 transition-colors shrink-0">
              <Terminal className="w-4 h-4 text-sky-400" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-white font-sans">
                OmniCmd
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/[0.05] text-slate-300 border border-white/[0.06] hidden sm:inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                v0.1.0 • Rust Core
              </span>
            </div>
          </a>

          {/* Desktop Links (Screens >= 768px) */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-[13px] text-slate-400 font-medium">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors min-h-[44px] inline-flex items-center py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls & Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop Action Controls */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="View OmniCmd on GitHub"
                className="flex items-center gap-1.5 px-3 py-1.5 min-h-[44px] text-xs font-medium rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/[0.08] transition-all"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>

              <a
                href="#downloads"
                aria-label="Download OmniCmd"
                className="flex items-center gap-1.5 px-3.5 py-1.5 min-h-[44px] text-xs font-semibold rounded-lg bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_2px_10px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get OmniCmd</span>
              </a>
            </div>

            {/* Compact download button on small screens without drawer open */}
            <a
              href="#downloads"
              aria-label="Download OmniCmd"
              className="sm:hidden flex items-center justify-center min-w-[44px] min-h-[44px] px-3 rounded-lg bg-white text-slate-950 font-semibold text-xs cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
            </a>

            {/* Mobile Menu Hamburger Toggle (Screens < 768px) */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-200 border border-white/[0.08] transition-colors cursor-pointer"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-slate-200" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer & Backdrop Overlay (Screens < 768px) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden flex flex-col justify-start"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer Sheet Panel */}
          <div
            ref={drawerRef}
            id="mobile-navigation-drawer"
            className="relative z-10 w-[calc(100%-1.5rem)] max-w-md mx-auto mt-20 mb-6 p-5 rounded-2xl bg-[#090b10] border border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.1)] flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-6rem)]"
          >
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-white">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <span className="font-semibold text-sm text-white font-sans">Navigation</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-300 border border-white/[0.06]">
                  v0.1.0
                </span>
              </div>

              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close navigation sheet"
                className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav aria-label="Mobile Drawer Navigation" className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between min-h-[44px] px-4 py-2.5 rounded-xl text-sm font-medium text-slate-200 hover:text-white hover:bg-white/[0.06] transition-colors border border-transparent hover:border-white/[0.06]"
                >
                  <span>{link.label}</span>
                  <span className="text-slate-400 text-xs font-mono">→</span>
                </a>
              ))}
            </nav>

            {/* Action Buttons inside Drawer */}
            <div className="flex flex-col gap-2.5 pt-3 border-t border-white/[0.08]">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-medium text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Star on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>

              <a
                href="#downloads"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl text-xs font-semibold bg-white text-slate-950 hover:bg-slate-200 transition-all shadow-[0_2px_12px_rgba(255,255,255,0.18)]"
              >
                <Download className="w-4 h-4" />
                <span>Get OmniCmd for your OS</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

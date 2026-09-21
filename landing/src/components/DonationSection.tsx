import React, { useState } from 'react';
import { Heart, Copy, Check, QrCode, ShieldCheck, Zap, Layers, Sparkles } from 'lucide-react';
import { PIX_KEY, PIX_QR_IMAGE } from '../constants';
import { useLanguage } from '../i18n/LanguageContext';

export const DonationSection: React.FC = () => {
  const { t } = useLanguage();
  const [copiedKey, setCopiedKey] = useState(false);

  const copyPixKey = () => {
    navigator.clipboard?.writeText(PIX_KEY);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2500);
  };

  const featureIcons = [
    <Zap className="w-5 h-5 text-amber-400 shrink-0" key="zap" />,
    <ShieldCheck className="w-5 h-5 text-sky-400 shrink-0" key="shield" />,
    <Layers className="w-5 h-5 text-emerald-400 shrink-0" key="layers" />,
  ];

  return (
    <section
      id="donate"
      className="py-20 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 border-t border-white/[0.08] relative z-10 font-sans"
    >
      {/* Background Soft Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-sky-500/5 rounded-full blur-[140px] -z-10"
        aria-hidden="true"
      />

      {/* Header Section */}
      <div className="max-w-3xl mb-14 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-xs font-mono font-medium text-slate-300 mb-4">
          <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/20" />
          <span>{t.donations.pill}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.035em] text-white leading-[1.08] font-display whitespace-pre-line">
          {t.donations.headline}
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed font-sans font-normal max-w-2xl">
          {t.donations.subtitle}
        </p>
      </div>

      {/* Main Donation Cockpit Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        {/* Left Column: Tactical QR Code Scanner Box */}
        <div className="lg:col-span-5 rounded-2xl hud-panel p-6 sm:p-8 flex flex-col items-center justify-between text-center relative overflow-hidden shadow-2xl border border-white/[0.1]">
          {/* Subtle top indicator */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 border-b border-white/[0.08] pb-3 mb-6">
            <span className="flex items-center gap-1.5 text-sky-400 font-semibold uppercase tracking-wider">
              <QrCode className="w-3.5 h-3.5" />
              {t.donations.pixBadge}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              <Sparkles className="w-2.5 h-2.5" />
              INSTANT
            </span>
          </div>

          {/* QR Code Container with High-Contrast White Background for Camera Scanning */}
          <div className="relative group my-auto">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-sky-500/20 via-sky-400/10 to-teal-500/20 rounded-2xl blur-sm opacity-70 group-hover:opacity-100 transition duration-300" />
            <div className="relative p-3 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex items-center justify-center">
              <img
                src={PIX_QR_IMAGE}
                alt={t.donations.qrTitle}
                width={200}
                height={200}
                className="w-44 h-44 sm:w-48 sm:h-48 object-contain rounded-lg select-none"
                loading="lazy"
              />
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 font-sans">
            {t.donations.qrScanText}
          </p>

          {/* Key Copy Box */}
          <div className="w-full mt-6 pt-5 border-t border-white/[0.08] flex flex-col gap-2">
            <span className="text-[11px] font-mono text-slate-400 text-left font-medium">
              {t.donations.pixKeyLabel}:
            </span>
            <div className="flex items-center justify-between gap-2 p-2 sm:p-2.5 rounded-xl bg-[#080a0f] border border-white/[0.08] text-xs font-mono text-slate-300">
              <span className="truncate select-all text-[11px] sm:text-xs text-slate-200 pl-1">
                {PIX_KEY}
              </span>
              <button
                type="button"
                onClick={copyPixKey}
                aria-label={t.donations.copyKeyBtn}
                className="px-3 py-1.5 rounded-lg bg-sky-400/15 hover:bg-sky-400/25 border border-sky-400/30 text-sky-300 hover:text-white transition-all cursor-pointer shrink-0 font-sans font-semibold text-xs flex items-center gap-1.5 active:scale-95"
              >
                {copiedKey ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">{t.donations.keyCopied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-sky-400" />
                    <span>{t.donations.copyKeyBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Mission, Independence & Community Impact */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="grid grid-cols-1 gap-3.5">
            {t.donations.features.map((feat, index) => (
              <div
                key={feat.title}
                className="rounded-2xl hud-card p-5 sm:p-6 flex items-start gap-4 border border-white/[0.07] hover:border-white/[0.14] transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                  {featureIcons[index]}
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm sm:text-base font-bold text-white font-display tracking-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Callout Banner */}
          <div className="rounded-2xl p-5 sm:p-6 bg-gradient-to-r from-sky-500/10 via-[#0d131f] to-transparent border border-sky-400/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-sky-400">
                <Heart className="w-3.5 h-3.5 fill-sky-400" />
                <span>COMMUNITY DRIVEN</span>
              </div>
              <p className="text-xs text-slate-300 font-sans">
                Qualquer contribuição faz diferença direta para manter a infraestrutura, builds e evolução do OmniCmd.
              </p>
            </div>
            <button
              type="button"
              onClick={copyPixKey}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.12] text-xs font-mono font-medium text-white transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
            >
              <Copy className="w-3 h-3 text-sky-400" />
              <span>{copiedKey ? t.donations.keyCopied : t.donations.copyKeyBtn}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

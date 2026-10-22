import React from 'react';
import {
  Flame,
  Sparkles,
  Heart,
  Leaf,
  Box,
  Star,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import { ViolaLogo } from '../components/ViolaLogo';

interface AboutPageProps {
  lang: Lang;
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';
  const DirArrow = isRtl ? ArrowLeft : ArrowRight;

  const pillarIcons = [Flame, Sparkles, Heart, Leaf, Box, Star];
  const pillarLinks = [
    '/shop/candles',
    '/shop/soaps',
    '/shop',
    '/shop/soaps',
    '/shop/pharaonic-magnets',
    '/shop/concrete-art',
  ];

  return (
    <div className="pb-20 space-y-16">
      {/* 1. High-Contrast Header Banner */}
      <section className="bg-gradient-to-b from-[#6B461B] via-[#7D5322] to-[#5E3C16] text-white py-14 sm:py-18 border-b border-[#4D3010]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight">
            {t.about.bannerTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#F5EAD8] font-medium">
            {t.about.bannerSub}
          </p>
        </div>
      </section>

      {/* 2. Split Brand Showcase & Story Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Framed Viola Handmade Luxor Emblem Card with 6 Craft Badges */}
          <div className="lg:col-span-6">
            <div className="p-3 rounded-3xl border border-[#DFCEB2] bg-[#F6F0E4]/70">
              <div className="bg-white border border-[#DED2BC] rounded-2xl p-7 sm:p-9 shadow-sm space-y-8">
                <div className="flex justify-center pt-2">
                  <ViolaLogo variant="card" size="lg" />
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  {t.about.pillars.map((pillar, idx) => {
                    const IconComponent = pillarIcons[idx];
                    return (
                      <button
                        key={pillar.title}
                        type="button"
                        onClick={() => onNavigate(pillarLinks[idx])}
                        className="group flex flex-col items-center text-center gap-2 p-2.5 rounded-xl hover:bg-[#FAF6EE] transition-colors cursor-pointer"
                      >
                        <div className="w-11 h-11 rounded-xl bg-[#F3E9D8] border border-[#D8C5A4] group-hover:border-[#7C4D15] flex items-center justify-center text-[#7A4D16] transition-colors">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold text-[#2B2118] leading-tight">
                          {pillar.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: About Us & Our Mission Prose */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1510]">
                {t.about.storyHeading}
              </h2>
              <p className="text-sm sm:text-base text-[#3D3024] leading-relaxed">
                {t.about.storyP1}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-lg sm:text-xl font-bold text-[#7C4D15]">
                {t.about.missionHeading}
              </h3>
              <p className="text-sm sm:text-base text-[#3D3024] leading-relaxed">
                {t.about.missionP1}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F3E9D8] border border-[#D8C5A4] text-xs font-bold text-[#2B2118]">
                <MapPin className="w-4 h-4 text-[#7C4D15]" />
                <span>{t.about.locationBadge}</span>
              </div>

              <button
                type="button"
                onClick={() => onNavigate('/shop')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2B2118] hover:bg-[#7C4D15] text-white text-xs font-bold transition-colors cursor-pointer"
              >
                <span>{t.hero.shopNow}</span>
                <DirArrow className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Viola? 6-Card Grid */}
      <section className="bg-[#F3ECE0] border-y border-[#E2D6C1] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C1510]">
              {t.about.whyChooseTitle}
            </h2>
            <p className="text-sm text-[#544332]">{t.about.whyChooseSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.about.pillars.map((pillar, idx) => {
              const IconComponent = pillarIcons[idx];
              return (
                <div
                  key={pillar.title}
                  onClick={() => onNavigate(pillarLinks[idx])}
                  className="bg-white border border-[#DED2BC] hover:border-[#8A5A1E] rounded-2xl p-6 space-y-3.5 shadow-[0_2px_10px_rgba(28,21,16,0.03)] transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#8A5A1E] to-[#B68236] text-white flex items-center justify-center shadow-xs">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-[#1C1510]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A3828] leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

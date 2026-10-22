import React, { useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Check,
  Instagram,
  Facebook,
} from 'lucide-react';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import { ViolaLogo } from './ViolaLogo';

interface FooterProps {
  lang: Lang;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ lang, onNavigate }) => {
  const t = TRANSLATIONS[lang];
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#2D2218] text-[#F5EFE4] border-t border-[#473728] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand & Story */}
          <div className="space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              className="inline-block"
              aria-label="Viola Handmade Luxor"
            >
              <ViolaLogo variant="footer" size="md" />
            </a>
            <p className="text-sm text-[#D9CEBE] leading-relaxed max-w-xs">
              {t.footer.description}
            </p>
          </div>

          {/* Column 2: Quick Links & Legal */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-bold text-[#E6C37A] tracking-wide mb-4">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-2.5 text-sm text-[#E5DDD0]">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleLink(e, '/')}
                    className="hover:text-[#E6C37A] transition-colors"
                  >
                    {t.nav.home}
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    onClick={(e) => handleLink(e, '/shop')}
                    className="hover:text-[#E6C37A] transition-colors"
                  >
                    {t.nav.shop}
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    onClick={(e) => handleLink(e, '/about')}
                    className="hover:text-[#E6C37A] transition-colors"
                  >
                    {t.nav.about}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => handleLink(e, '/contact')}
                    className="hover:text-[#E6C37A] transition-colors"
                  >
                    {t.nav.contact}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#E6C37A] tracking-wide mb-4">
                {t.footer.legal}
              </h3>
              <ul className="space-y-2.5 text-sm text-[#E5DDD0]">
                <li>
                  <a
                    href="/privacy"
                    onClick={(e) => handleLink(e, '/privacy')}
                    className="hover:text-[#E6C37A] transition-colors"
                  >
                    {t.footer.privacy}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    onClick={(e) => handleLink(e, '/terms')}
                    className="hover:text-[#E6C37A] transition-colors"
                  >
                    {t.footer.terms}
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    onClick={(e) => handleLink(e, '/faq')}
                    className="hover:text-[#E6C37A] transition-colors"
                  >
                    {t.footer.faq}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <h3 className="text-sm font-bold text-[#E6C37A] tracking-wide mb-4">
              {t.footer.contactUs}
            </h3>
            <ul className="space-y-3 text-sm text-[#E5DDD0]">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#E6C37A] shrink-0" />
                <a
                  href="tel:+201070090679"
                  dir="ltr"
                  className="hover:text-[#E6C37A] transition-colors tabular-nums"
                >
                  +2001070090679
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#E6C37A] shrink-0" />
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  dir="ltr"
                  className="hover:text-[#E6C37A] transition-colors tabular-nums"
                >
                  +2001070090679
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#E6C37A] shrink-0" />
                <a
                  href="mailto:info@violahandmade.com"
                  className="hover:text-[#E6C37A] transition-colors"
                >
                  info@violahandmade.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#E6C37A] shrink-0" />
                <span>{t.about.locationBadge}</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Follow Us & Newsletter */}
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-[#E6C37A] tracking-wide mb-3">
                {t.footer.followUs}
              </h3>
              <div className="flex items-center gap-2.5">
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-lg bg-[#3F3124] hover:bg-[#C6923A] text-[#F5EFE4] hover:text-[#1C1510] flex items-center justify-center transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-lg bg-[#3F3124] hover:bg-[#C6923A] text-[#F5EFE4] hover:text-[#1C1510] flex items-center justify-center transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="/contact"
                  onClick={(e) => handleLink(e, '/contact')}
                  aria-label="WhatsApp"
                  className="w-9 h-9 rounded-lg bg-[#3F3124] hover:bg-[#22C55E] text-[#F5EFE4] hover:text-white flex items-center justify-center transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-[#E6C37A] tracking-wide mb-1.5">
                {t.footer.newsletter}
              </h3>
              <p className="text-xs text-[#D0C3B0] mb-3">
                {t.footer.newsletterDesc}
              </p>

              {subscribed ? (
                <div className="p-3 rounded-lg bg-[#1F4E35] border border-[#348358] text-xs text-white flex items-center gap-2">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>{t.footer.subscribed}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.footer.emailPlaceholder}
                    aria-label={t.footer.emailPlaceholder}
                    className="flex-1 min-w-0 h-10 px-3.5 rounded-lg bg-[#423426] border border-[#5E4B37] text-sm text-white placeholder:text-[#B8A893] focus:outline-none focus:border-[#E6C37A]"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-lg bg-[#C99B49] hover:bg-[#B58635] text-[#1C1510] text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                  >
                    {t.footer.subscribe}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-[#433325] bg-[#241B12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#C7B9A5]">
          <p>جميع الحقوق محفوظة. <a href="https://azagency.online/" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">A.Z Agency</a> 2026 ©</p>
          <p>
            {t.footer.createdBy} ·{' '}
            <span className="text-[#E6C37A] font-semibold">Viola Artisan Studio</span>
          </p>
        </div>
      </div>

      {/* Floating WhatsApp Direct Inquiry Button */}
      <a
        href="/contact"
        onClick={(e) => handleLink(e, '/contact')}
        aria-label={lang === 'ar' ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}
        className="fixed bottom-5 end-5 z-30 w-12 h-12 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-105"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </footer>
  );
};

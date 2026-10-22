import React, { useState } from 'react';
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Flame,
  Sparkles,
} from 'lucide-react';
import { Lang, TRANSLATIONS } from '../i18n/translations';
import { ViolaLogo } from '../components/ViolaLogo';

interface ContactPageProps {
  lang: Lang;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang];

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [inquiryType, setInquiryType] = useState(t.contact.inquiryOptions[0]);
  const [message, setMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    phone: string;
    message: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى ملء الاسم ورقم الهاتف والرسالة.'
          : 'Please fill in your name, phone number, and message.'
      );
      return;
    }
    setErrorMsg(null);
    setSubmittedData({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
    });
    setName('');
    setPhone('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="pb-20 space-y-12">
      {/* 1. High-Contrast Contact Header Banner */}
      <section className="bg-gradient-to-b from-[#6B461B] via-[#7D5322] to-[#5E3C16] text-white py-14 sm:py-18 border-b border-[#4D3010]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-[#F3D28A]">
            <Flame className="w-5 h-5" />
            <Sparkles className="w-5 h-5" />
          </div>
          <h1 className="font-serif-display text-4xl sm:text-5xl font-bold tracking-tight">
            {t.contact.bannerTitle}
          </h1>
          <p className="text-sm sm:text-base text-[#F5EAD8] max-w-xl mx-auto">
            {t.contact.bannerSub}
          </p>
        </div>
      </section>

      {/* 2. Two-Column Contact Form & Luxor Studio Info */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Send us a Message Form Card */}
          <div className="lg:col-span-6 bg-white border border-[#DED2BC] rounded-2xl p-6 sm:p-8 shadow-[0_2px_12px_rgba(28,21,16,0.04)] space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#8A5A1E] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#1C1510]">
                  {t.contact.formTitle}
                </h2>
                <p className="text-xs text-[#5C4938]">{t.contact.formSub}</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs font-semibold text-[#991B1B]">
                {errorMsg}
              </div>
            )}

            {submittedData && (
              <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#86EFAC] text-xs text-[#14532D] space-y-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" />
                  <span>{t.contact.sentSuccess}</span>
                </div>
                <p className="text-[#166534]">
                  {submittedData.name} ({submittedData.phone}): “{submittedData.message}”
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-bold text-[#2B2118] mb-1.5"
                  >
                    {t.contact.yourName} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.contact.namePlaceholder}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510] placeholder:text-[#786652] focus:outline-none focus:border-[#7C4D15]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-phone"
                    className="block text-xs font-bold text-[#2B2118] mb-1.5"
                  >
                    {t.contact.phone} *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t.contact.phonePlaceholder}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510] placeholder:text-[#786652] focus:outline-none focus:border-[#7C4D15]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-bold text-[#2B2118] mb-1.5"
                  >
                    {t.contact.email}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510] placeholder:text-[#786652] focus:outline-none focus:border-[#7C4D15]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-type"
                    className="block text-xs font-bold text-[#2B2118] mb-1.5"
                  >
                    {t.contact.inquiryType}
                  </label>
                  <select
                    id="contact-type"
                    value={inquiryType}
                    onChange={(e) => setInquiryType(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4C5AC] text-sm font-semibold text-[#1C1510] focus:outline-none focus:border-[#7C4D15]"
                  >
                    {t.contact.inquiryOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-bold text-[#2B2118] mb-1.5"
                >
                  {t.contact.message} *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.contact.messagePlaceholder}
                  className="w-full p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D4C5AC] text-sm text-[#1C1510] placeholder:text-[#786652] focus:outline-none focus:border-[#7C4D15]"
                />
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-[#8A5A1E] hover:bg-[#6E4614] text-white font-bold text-sm inline-flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{t.contact.sendWhatsApp}</span>
              </button>
            </form>
          </div>

          {/* Right Column: Brand Card, 4 Contact Channels, and Luxor Map */}
          <div className="lg:col-span-6 space-y-5">
            {/* Brand Showcase Card */}
            <div className="bg-white border border-[#DED2BC] rounded-2xl p-6 text-center space-y-2 shadow-[0_2px_10px_rgba(28,21,16,0.03)]">
              <ViolaLogo variant="card" size="md" />
              <h2 className="text-base font-bold text-[#1C1510] pt-1">
                Viola Hand Made
              </h2>
              <p className="text-xs text-[#544332]">{t.contact.cardTagline}</p>
            </div>

            {/* 2x2 Contact Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-[#DED2BC] rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#16A34A] text-white flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#5C4938]">
                    {t.contact.whatsappLabel}
                  </p>
                  <p
                    className="text-sm font-extrabold text-[#1C1510] tabular-nums"
                    dir="ltr"
                  >
                    01070090679
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#DED2BC] rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#9A6B26] text-white flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#5C4938]">
                    {t.contact.phoneLabel}
                  </p>
                  <p
                    className="text-sm font-extrabold text-[#1C1510] tabular-nums"
                    dir="ltr"
                  >
                    01070090679
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#DED2BC] rounded-2xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#C2781A] text-white flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#5C4938]">
                    {t.contact.emailLabel}
                  </p>
                  <p className="text-xs font-extrabold text-[#1C1510] whitespace-nowrap">
                    info@violahandmade.com
                  </p>
                </div>
              </div>

              <div className="bg-white border border-[#DED2BC] rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-[#D13B56] text-white flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#5C4938]">
                    {t.contact.addressLabel}
                  </p>
                  <p className="text-sm font-extrabold text-[#1C1510] truncate">
                    {t.about.locationBadge}
                  </p>
                </div>
              </div>
            </div>

            {/* Our Location Luxor Map Card */}
            <div className="bg-white border border-[#DED2BC] rounded-2xl overflow-hidden shadow-[0_2px_10px_rgba(28,21,16,0.03)]">
              <div className="px-5 py-3.5 border-b border-[#EDE4D3] flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1C1510]">
                  <MapPin className="w-4 h-4 text-[#7C4D15]" />
                  <span>{t.contact.ourLocation}</span>
                </div>
                <span className="text-xs font-medium text-[#5C4938]">
                  25.6872° N, 32.6396° E
                </span>
              </div>

              {/* Clean Stylized Vector Map of Luxor & the Nile */}
              <div className="relative h-56 bg-[#EAE4D7] overflow-hidden">
                <svg
                  viewBox="0 0 600 240"
                  className="w-full h-full object-cover"
                  aria-label="Map of Luxor, Egypt"
                >
                  <rect width="600" height="240" fill="#EAE4D7" />
                  {/* Green Nile Valley Agriculture Strip */}
                  <path
                    d="M170 240 C230 180, 290 130, 355 0 L470 0 C400 130, 340 190, 280 240 Z"
                    fill="#D2DEC5"
                  />
                  {/* The Nile River */}
                  <path
                    d="M210 240 C265 185, 325 125, 385 0 L412 0 C350 125, 292 185, 238 240 Z"
                    fill="#8CC0DE"
                  />
                  {/* Major Luxor Roads */}
                  <path
                    d="M120 200 L490 50 M260 0 L430 240"
                    stroke="#F7F3EB"
                    strokeWidth="3"
                  />
                  {/* Luxor Pin */}
                  <circle
                    cx="325"
                    cy="126"
                    r="18"
                    fill="#7C4D15"
                    opacity="0.18"
                  />
                  <circle
                    cx="325"
                    cy="126"
                    r="7"
                    fill="#7C4D15"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                  />
                  <text
                    x="325"
                    y="108"
                    textAnchor="middle"
                    fill="#1C1510"
                    fontSize="13"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    Luxor · الأقصر
                  </text>
                  <text
                    x="388"
                    y="75"
                    textAnchor="middle"
                    fill="#4A3828"
                    fontSize="10"
                    fontFamily="sans-serif"
                  >
                    Al Karnak · الكرنك
                  </text>
                  <text
                    x="255"
                    y="185"
                    textAnchor="middle"
                    fill="#4A3828"
                    fontSize="10"
                    fontFamily="sans-serif"
                  >
                    Armant · أرمنت
                  </text>
                </svg>

                <a
                  href="https://maps.google.com/?q=Luxor,Egypt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 start-3 px-3 py-1.5 rounded-lg bg-white border border-[#D4C5AC] text-xs font-bold text-[#1D4ED8] hover:bg-[#F8FAFC] inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>{t.contact.openInMaps}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

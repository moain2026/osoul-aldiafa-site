"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import {
  HERO_IMAGES,
  TEAM_IMAGES,
  PRODUCT_IMAGES,
  SETUP_IMAGES,
  DATES_IMAGES,
  BRAND_LOGO,
} from "@/lib/images";
import { useWhatsAppUrl, WA_NUMBER } from "@/components/Navbar";

// ─────────────────────────────────────────────────────────────
// Small primitives
// ─────────────────────────────────────────────────────────────
function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3" aria-hidden>
      <span className="block h-px w-10 sm:w-16 bg-gradient-to-l from-gold to-transparent" />
      <span className="text-gold text-base">✦</span>
      <span className="block h-px w-10 sm:w-16 bg-gradient-to-r from-gold to-transparent" />
    </div>
  );
}

function SectionLabel({ label }: { label: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-gold-bright text-center mb-3"
      style={{ fontSize: "0.72rem", letterSpacing: "0.45em", fontWeight: 600 }}
    >
      ✦ {label} ✦
    </motion.p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-pearl text-center font-amiri"
      style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", fontWeight: 700, lineHeight: 1.25 }}
    >
      {children}
    </motion.h2>
  );
}

// ─────────────────────────────────────────────────────────────
// Hero — full-screen poster of the brand logo on a parallax photo
// Composition is intentionally different from the legacy site:
// the brand mark is centered & oversized, the team photo sits to
// the side (desktop) / behind (mobile).
// ─────────────────────────────────────────────────────────────
function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const waUrl = useWhatsAppUrl();

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[640px] max-h-[1000px] overflow-hidden"
      aria-label="الصفحة الرئيسية"
    >
      {/* parallax photo */}
      <motion.div className="absolute inset-0" style={{ y: parallax }}>
        <Image
          src={HERO_IMAGES.desktop}
          alt="ركن ضيافة أصول الضيافة"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* dark vignette */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.35) 50%, rgba(10,10,10,0.92) 100%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 50% 38%, rgba(212,175,55,0.18) 0%, transparent 65%)" }} />

      {/* sparkles */}
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute block rounded-full"
          style={{
            left: `${10 + ((i * 53) % 80)}%`,
            top: `${15 + ((i * 37) % 60)}%`,
            width: 3,
            height: 3,
            background: "radial-gradient(circle, #E2C68E 0%, transparent 70%)",
            boxShadow: "0 0 12px rgba(244,215,126,0.85)",
          }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1.4, 0.4] }}
          transition={{ duration: 2.5 + (i % 3), repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
        />
      ))}

      {/* content */}
      <motion.div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6" style={{ opacity: fade }}>
        {/* huge centered brand logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 floaty"
          style={{ filter: "drop-shadow(0 12px 30px rgba(212,175,55,0.35))" }}
        >
          <Image
            src={BRAND_LOGO}
            alt="أصول الضيافة"
            width={220}
            height={220}
            priority
            className="w-[140px] h-[140px] sm:w-[200px] sm:h-[200px]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <span className="h-px w-10 bg-gradient-to-l from-gold to-transparent" />
          <span className="text-gold-bright" style={{ fontSize: "0.7rem", letterSpacing: "0.45em", fontWeight: 600 }}>
            SINCE 2017
          </span>
          <span className="h-px w-10 bg-gradient-to-r from-gold to-transparent" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="gold-text font-amiri"
          style={{
            fontSize: "clamp(2.6rem, 9vw, 5.5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            textShadow: "0 6px 36px rgba(0,0,0,0.7)",
          }}
        >
          أصول الضيافة
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-pearl/85 mt-4 max-w-2xl mx-auto"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", lineHeight: 1.8 }}
        >
          نُحيي أصول الضيافة العربية بفريق صبّابين بزي تراثي، قهوة عربية، شاي وتمور فاخرة —
          تجربة ضيافة تليق بأرقى المناسبات في كل بقاع المملكة.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.85 }}
          className="ornament-line mt-7 mb-7 mx-auto"
          style={{ width: 120 }}
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href={waUrl}
            target="_blank"
            className="gold-button w-[280px] sm:w-auto px-10 py-4 rounded-full text-sm tracking-widest"
          >
            احجز ضيافتك الآن
          </Link>
          <Link
            href="/portfolio"
            className="ghost-button w-[280px] sm:w-auto px-10 py-4 rounded-full text-sm tracking-widest"
          >
            شاهد أعمالنا
          </Link>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold-bright/70"
        >
          <span className="text-[10px] tracking-[0.4em]">SCROLL</span>
          <motion.span
            className="block w-px h-8 bg-gradient-to-b from-gold to-transparent"
            animate={{ scaleY: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Marquee strip of real photos — a strong, visual "proof" right
// under the hero (replaces the old partners marquee).
// ─────────────────────────────────────────────────────────────
function PhotoMarquee() {
  const strip = [...SETUP_IMAGES, ...TEAM_IMAGES.slice(0, 6), ...PRODUCT_IMAGES.slice(0, 5)];
  return (
    <section className="relative py-10 overflow-hidden border-y border-gold/15 bg-noir-rich" aria-hidden>
      <motion.div
        className="flex gap-4 will-change-transform"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ width: "max-content" }}
      >
        {[...strip, ...strip].map((src, i) => (
          <div
            key={i}
            className="relative h-32 sm:h-40 md:h-48 w-44 sm:w-56 md:w-72 flex-shrink-0 rounded-xl overflow-hidden"
            style={{ border: "1px solid rgba(212,175,55,0.18)" }}
          >
            <Image src={src} alt="" fill sizes="288px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-transparent to-transparent" />
          </div>
        ))}
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// "Why us" — fancier 4-tile grid with hover lift + stagger
// ─────────────────────────────────────────────────────────────
const whyTiles = [
  {
    title: "خبرة منذ 2017",
    desc: "سبع سنوات نضع فيها معايير ضيافة لا تخذل ضيوفك أبداً.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    title: "فريق بزيٍّ تراثي",
    desc: "صبّابون ومباشرون بزي سعودي مطرّز، يقدمون القهوة على الأصول.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    title: "أدوات ذهبية فاخرة",
    desc: "دلال وصواني وفناجين بتطعيمات ذهبية وحضور بصري لا يُنسى.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
      </svg>
    ),
  },
  {
    title: "تغطية كامل المملكة",
    desc: "نتنقل بطاقمنا وعدّتنا أينما كانت مناسبتك في المملكة.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
  },
];

function WhyUs() {
  return (
    <section className="relative py-24 px-4 bg-noir overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionLabel label="لماذا أصول الضيافة" />
        <SectionTitle>تفاصيلٌ تُصنع منها التجارب الفاخرة</SectionTitle>
        <div className="ornament-line mt-5 mx-auto" style={{ width: 110 }} />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyTiles.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              className="card-royal p-7 group"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-gold mb-6 transition-all duration-500 group-hover:bg-gold group-hover:text-noir"
                style={{ background: "rgba(212,175,55,0.12)" }}
              >
                {t.icon}
              </div>
              <h3 className="font-amiri text-pearl mb-3" style={{ fontSize: "1.15rem", fontWeight: 700 }}>{t.title}</h3>
              <p className="text-pearl/65 text-sm leading-relaxed">{t.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Pillars — 3 visual service pillars with image cards
// ─────────────────────────────────────────────────────────────
const pillars = [
  {
    title: "فريق ضيافة بزي تراثي",
    desc: "صبّابون ومباشرون مدربون على أصول تقديم القهوة العربية، بزي سعودي مطرز.",
    img: TEAM_IMAGES[2],
    href: "/services",
    cta: "تعرف على الفريق",
  },
  {
    title: "أركان ضيافة فاخرة",
    desc: "تجهيز ركن قهوة وشاي بطاولات وأدوات ذهبية تليق بكبار الضيوف.",
    img: SETUP_IMAGES[4],
    href: "/services",
    cta: "شاهد التجهيزات",
  },
  {
    title: "تمر وحلويات وضيافة بصرية",
    desc: "أبراج تمر ومعمول مغلف بشرائط ذهبية وبوفيهات مشروبات تتفنّن في التقديم.",
    img: DATES_IMAGES[5],
    href: "/offerings",
    cta: "تصفّح التقديمات",
  },
];

function Pillars() {
  return (
    <section className="py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #050505 0%, #0a0a0a 100%)" }}>
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="ثلاثُ ركائز" />
        <SectionTitle>ضيافة على ثلاثة أعمدة</SectionTitle>
        <div className="ornament-line mt-5 mx-auto" style={{ width: 110 }} />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="card-royal overflow-hidden group cursor-default"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 40%, rgba(10,10,10,0.85))" }} />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] tracking-widest text-gold-bright" style={{ background: "rgba(10,10,10,0.7)", border: "1px solid rgba(212,175,55,0.3)" }}>
                  0{i + 1}
                </span>
              </div>
              <div className="p-6 sm:p-7">
                <h3 className="font-amiri text-pearl mb-3" style={{ fontSize: "1.2rem", fontWeight: 700 }}>{p.title}</h3>
                <p className="text-pearl/60 text-sm leading-relaxed mb-5">{p.desc}</p>
                <Link href={p.href} className="inline-flex items-center gap-2 text-gold-bright text-sm font-bold group/link">
                  <span>{p.cta}</span>
                  <span className="transition-transform group-hover/link:-translate-x-1">←</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// "Mosaic" — masonry preview of real photos with hover zoom
// ─────────────────────────────────────────────────────────────
function Mosaic() {
  const tiles = [
    { src: SETUP_IMAGES[0], span: "row-span-2", aspect: "aspect-[3/4]" },
    { src: TEAM_IMAGES[1],  span: "",            aspect: "aspect-[4/3]" },
    { src: PRODUCT_IMAGES[8], span: "",          aspect: "aspect-[4/3]" },
    { src: SETUP_IMAGES[5], span: "col-span-2",  aspect: "aspect-[16/9]" },
    { src: DATES_IMAGES[5], span: "",            aspect: "aspect-[4/3]" },
    { src: TEAM_IMAGES[9], span: "",             aspect: "aspect-[4/3]" },
  ];
  return (
    <section className="py-24 px-4 bg-noir relative">
      <div className="max-w-7xl mx-auto">
        <SectionLabel label="من أعمالنا" />
        <SectionTitle>لمحات من المناسبات</SectionTitle>
        <div className="ornament-line mt-5 mx-auto" style={{ width: 110 }} />

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {tiles.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
              className={`relative overflow-hidden rounded-2xl ${t.span}`}
              style={{ border: "1px solid rgba(212,175,55,0.18)" }}
            >
              <Image src={t.src} alt="" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover transition-transform duration-1000 hover:scale-110" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.65))" }} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/portfolio" className="ghost-button inline-block px-9 py-3.5 rounded-full text-sm tracking-widest">
            استعرض كامل المعرض
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Process — 4-step ribbon (entirely new section)
// ─────────────────────────────────────────────────────────────
const steps = [
  { n: "١", t: "تواصل", d: "اطلب عبر واتساب أو ابعث استفسارك." },
  { n: "٢", t: "تصميم الباقة", d: "نقترح أعداد الصبّابين والتقديمات والديكور." },
  { n: "٣", t: "تجهيز الموقع", d: "نصل قبل المناسبة بوقت كافٍ لتجهيز الركن." },
  { n: "٤", t: "ضيافة لا تُنسى", d: "نقدّم تجربة ضيافة مدروسة من البداية للنهاية." },
];

function Process() {
  return (
    <section className="py-24 px-4 relative overflow-hidden" style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #050505 100%)" }}>
      <div className="absolute inset-0" style={{ background: "var(--gradient-vignette)" }} />
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionLabel label="رحلة الحجز" />
        <SectionTitle>أربع خطوات نجمع فيها أصول الضيافة</SectionTitle>
        <div className="ornament-line mt-5 mx-auto" style={{ width: 110 }} />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="relative card-royal p-7"
            >
              <span
                className="absolute -top-5 right-6 w-12 h-12 rounded-full flex items-center justify-center font-amiri text-noir"
                style={{ background: "var(--gradient-royal)", fontSize: "1.4rem", fontWeight: 700, boxShadow: "0 6px 18px rgba(212,175,55,0.35)" }}
              >
                {s.n}
              </span>
              <h3 className="font-amiri text-pearl mt-4 mb-2" style={{ fontSize: "1.1rem", fontWeight: 700 }}>{s.t}</h3>
              <p className="text-pearl/60 text-sm leading-relaxed">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Final CTA
// ─────────────────────────────────────────────────────────────
function FinalCTA() {
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("السلام عليكم، أرغب في حجز خدمات أصول الضيافة.")}`;
  return (
    <section className="relative py-24 px-4 bg-noir overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto rounded-[28px] overflow-hidden text-center p-10 sm:p-14"
        style={{
          background: "linear-gradient(160deg, rgba(31,28,23,0.92), rgba(10,10,10,0.96))",
          border: "1px solid rgba(212,175,55,0.28)",
          boxShadow: "0 20px 80px rgba(0,0,0,0.55)",
        }}
      >
        <Ornament />
        <h2 className="font-amiri text-pearl mt-5" style={{ fontSize: "clamp(1.8rem, 5vw, 2.6rem)", fontWeight: 700 }}>
          مناسبتك تستحق <span className="gold-text">أصول الضيافة</span>
        </h2>
        <p className="text-pearl/65 mt-4 max-w-xl mx-auto text-sm sm:text-base leading-7">
          احجز معنا قبل اقتراب موعد مناسبتك لنضمن تجهيز فريق وتقديمات تليق بضيوفك. الاستشارة مجانية.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href={waUrl} target="_blank" className="gold-button px-9 py-4 rounded-full text-sm tracking-widest">
            تواصل عبر واتساب
          </Link>
          <a href={`tel:+${WA_NUMBER}`} className="ghost-button px-9 py-4 rounded-full text-sm tracking-widest">
            اتصل الآن
          </a>
        </div>
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────
export function HomePageClient() {
  return (
    <>
      <Hero />
      <PhotoMarquee />
      <WhyUs />
      <Pillars />
      <Mosaic />
      <Process />
      <FinalCTA />
    </>
  );
}

export default HomePageClient;

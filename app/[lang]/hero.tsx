"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import LightRays from "../components/LightRays";
import { ArrowRight } from "lucide-react";
import Work from "./work";
import Studio from "./studio";
import Contact from "./contact";

type Project = {
  index: string;
  slug: string;
  name: string;
  category: string;
  tags: string[];
  year: string;
  description: string;
  image: string;
};

type Dict = {
  nav: { home: string; work: string; services: string; contact: string };
  badge: { availability: string };
  hero: {
    tagline: string;
    headline: string;
    headlineAccent: string;
    subCopy: string;
    cta: { primary: string; secondary: string };
  };
  ticker: string[];
  work: {
    label: string;
    projects: Project[];
  };
  studio: {
    label: string;
    headline: string;
    paragraphs: string[];
  };
  contact: any;
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const expandX = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1 },
};

export default function Hero({ dict, lang }: { dict: Dict; lang: string }) {
  const pathname = usePathname();

  const [activeHash, setActiveHash] = useState("#home");

  useEffect(() => {
    const sections = ["home", "work"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-30% 0px -40% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", hash);
      setActiveHash(hash);
    }
  };

  const otherLang = lang === "es" ? "en" : "es";
  const otherPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  // Duplicate ticker for seamless loop
  const tickerItems = [...dict.ticker, ...dict.ticker, ...dict.ticker, ...dict.ticker];

  return (
    <div
      className="bg-black text-white font-sans selection:bg-white selection:text-black"
      style={{ position: "relative" }}
    >
      {/* ── LightRays background ────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.5}
          lightSpread={1.4}
          rayLength={3}
          fadeDistance={1.2}
          saturation={0}
          pulsating
          followMouse
          mouseInfluence={0.12}
          noiseAmount={0.04}
          distortion={0.15}
          className="absolute inset-0 opacity-[0.65]"
        />
      </div>

      {/* ── Floating Nav ────────────────────────────────────── */}
      <motion.header
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      >
        <nav className="flex items-center gap-0.5 px-2 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl">
          {/* Scroll links */}
          {[
            { hash: "#home", label: dict.nav.home },
            { hash: "#work", label: dict.nav.work },
          ].map(({ hash, label }) => (
            <a
              key={hash}
              href={`/${lang}${hash}`}
              onClick={(e) => handleNavClick(e, hash)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer ${
                activeHash === hash
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </a>
          ))}

          {/* Page links */}
          {[
            { href: `/${lang}/services`, label: dict.nav.services },
            { href: `/${lang}/contact`, label: dict.nav.contact },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 text-white/50 hover:text-white hover:bg-white/10"
            >
              {label}
            </Link>
          ))}

          {/* Divider */}
          <span className="w-px h-3.5 bg-white/10 mx-1" />

          {/* Language switcher */}
          <Link
            href={otherPath}
            className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest text-white/35 hover:text-white hover:bg-white/10 transition-all duration-200 uppercase"
          >
            {otherLang}
          </Link>
        </nav>
      </motion.header>

      {/* ── Hero ────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative flex min-h-screen flex-col justify-between px-6 sm:px-10 md:px-14 pt-32 pb-10"
        style={{ zIndex: 1 }}
      >
        {/* Logo + Badge */}
        <div className="flex-1 flex flex-col items-center justify-center gap-10">

          {/* Badge */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            className="flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5"
          >
            {/* Pulsing green dot */}
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/70">
              {dict.badge.availability}
            </span>
          </motion.div>

          {/* Logo */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md"
          >
            <Image
              src="/logo.png"
              alt="BYND."
              width={1200}
              height={400}
              priority
              className="w-full h-auto"
            />
          </motion.div>
        </div>

        {/* Bottom strip */}
        <div>
          {/* Rule */}
          <motion.div
            variants={expandX}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
            className="h-px w-full bg-white/10 origin-left"
          />

          {/* Info row */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.85 }}
            className="mt-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
          >
            {/* Left */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
                {dict.hero.tagline}
              </p>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-normal leading-snug text-white/90 max-w-xs">
                {dict.hero.headline}
                <br />
                <span className="text-white font-semibold">{dict.hero.headlineAccent}</span>
              </h1>
            </div>

            {/* Right */}
            <div className="flex flex-col items-start sm:items-end gap-4">
              <p className="text-sm text-white/60 max-w-[220px] text-left sm:text-right leading-relaxed">
                {dict.hero.subCopy}
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="#work"
                  onClick={(e) => handleNavClick(e, "#work")}
                  className="group flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all duration-200 hover:bg-white/90 active:scale-95"
                >
                  {dict.hero.cta.primary}
                  <ArrowRight
                    size={12}
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                </a>
                <Link
                  href={`/${lang}/contact`}
                  className="rounded-full border border-white/30 px-5 py-2.5 text-xs font-medium text-white/80 transition-all duration-200 hover:border-white/50 hover:text-white active:scale-95"
                >
                  {dict.hero.cta.secondary}
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Ticker ──────────────────────────────────────────── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.6, delay: 1.3 }}
        className="relative z-10 overflow-hidden border-t border-b border-white/[0.07] py-3 select-none"
      >
        <div className="marquee-track">
          {tickerItems.map((item, i) => (
            <span key={i} className="flex items-center">
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 px-8">
                {item}
              </span>
              <span className="w-px h-3 bg-white/10" />
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Work section ─────────────────────────────────── */}
      <Work dict={dict.work} lang={lang} />

      {/* ── Studio ───────────────────────────────────────── */}
      <Studio dict={dict.studio} />

      {/* ── Contact CTA ──────────────────────────────────── */}
      <Contact dict={dict.contact} lang={lang} />
    </div>
  );
}

"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import LightRays from "../../components/LightRays";
import PageNav from "../../components/PageNav";

type Plan = {
  title: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
};

type Category = {
  id: string;
  index: string;
  title: string;
  description: string;
  tags: string[];
  plans: Plan[];
};

type ServicesDict = {
  label: string;
  headline: string;
  headlineAccent: string;
  subCopy: string;
  categories: Category[];
  note: string;
  talkCta: string;
};

type Social = { label: string; url: string };

type Dict = {
  nav: { home: string; work: string; services: string; contact: string };
  services: ServicesDict;
  contact: { email: string; socials: Social[] };
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ServicesContent({ dict, lang }: { dict: Dict; lang: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-10%" });
  const s = dict.services;

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black min-h-screen">
      {/* ── LightRays background ─────────────────────────── */}
      <div
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.4}
          lightSpread={1.2}
          rayLength={2.5}
          fadeDistance={1.4}
          saturation={0}
          pulsating
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.04}
          distortion={0.12}
          className="absolute inset-0 opacity-[0.5]"
        />
      </div>

      {/* ── Nav ──────────────────────────────────────────── */}
      <PageNav lang={lang} dict={dict.nav} />

      {/* ── Hero header ──────────────────────────────────── */}
      <div
        ref={headerRef}
        className="relative z-10 px-6 sm:px-10 md:px-14 pt-40 pb-16 md:pt-48 md:pb-20"
      >
        <div className="max-w-6xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate={headerInView ? "show" : "hidden"}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 mb-6"
          >
            {s.label}
          </motion.p>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "show" : "hidden"}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight leading-none text-white/90"
            >
              {s.headline}
              <br />
              <span className="text-white font-semibold">{s.headlineAccent}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "show" : "hidden"}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-white/50 text-sm max-w-xs leading-relaxed md:text-right flex-shrink-0 pb-1"
            >
              {s.subCopy}
            </motion.p>
          </div>
        </div>
      </div>

      {/* ── Category sections ────────────────────────────── */}
      <div className="relative z-10">
        {s.categories.map((category, catIndex) => (
          <CategorySection
            key={category.id}
            category={category}
            lang={lang}
            index={catIndex}
          />
        ))}
      </div>

      {/* ── Footer note ──────────────────────────────────── */}
      <FooterNote note={s.note} talkCta={s.talkCta} lang={lang} socials={dict.contact.socials} />
    </div>
  );
}

function CategorySection({
  category,
  lang,
  index,
}: {
  category: Category;
  lang: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  // Grid cols class based on number of plans
  const cardsGridClass =
    category.plans.length === 3
      ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <div
      ref={ref}
      className="border-t border-white/[0.07] px-6 sm:px-10 md:px-14 py-16 md:py-20"
    >
      <div className="max-w-6xl flex flex-col lg:flex-row gap-10 lg:gap-16">
        {/* ── Category sidebar ──────────────────────────── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          className="lg:w-56 xl:w-64 flex-shrink-0 lg:sticky lg:top-32 lg:self-start"
        >
          <p className="text-[10px] font-medium tabular-nums tracking-[0.3em] text-white/25 mb-3">
            {category.index}
          </p>
          <h2 className="text-3xl md:text-4xl font-normal tracking-tight text-white mb-4">
            {category.title}
          </h2>
          <p className="text-sm text-white/45 leading-relaxed mb-5">
            {category.description}
          </p>
          {/* Tag pills */}
          <div className="flex flex-wrap gap-1.5">
            {category.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/35 border border-white/10 rounded-full px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* ── Plans cards ───────────────────────────────── */}
        <div className={`flex-1 grid ${cardsGridClass} gap-4`}>
          {category.plans.map((plan, i) => (
            <motion.div
              key={plan.title}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "show" : "hidden"}
              transition={{
                duration: 0.65,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.1 + i * 0.1,
              }}
              className="flex"
            >
              <PricingCard plan={plan} lang={lang} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PricingCard({ plan, lang }: { plan: Plan; lang: string }) {
  return (
    <div
      className={`relative flex flex-col w-full rounded-2xl p-6 border transition-all duration-300 hover:border-white/20 group ${plan.highlighted
          ? "bg-white/[0.07] border-white/[0.18]"
          : "bg-white/[0.025] border-white/[0.08]"
        }`}
    >
      {/* Recommended badge */}
      {plan.highlighted && (
        <div className="absolute -top-3 left-5">
          <span className="bg-white text-black text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full">
            {lang === "es" ? "Recomendado" : "Recommended"}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="mb-5">
        <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 mb-4">
          {plan.title}
        </p>

        {/* Price */}
        <p className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/30 mb-1.5">
          {lang === "es" ? "Desde" : "From"}
        </p>
        <div className="flex items-baseline gap-0.5 mb-3">
          <span className="text-xs text-white/35 self-start mt-1.5">{plan.currency}</span>
          <span className="text-5xl font-light text-white tracking-tight leading-none">
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-sm text-white/35 self-end mb-0.5">{plan.period}</span>
          )}
        </div>

        <p className="text-sm text-white/50 leading-relaxed">{plan.description}</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.07] mb-5" />

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span className="flex-shrink-0 w-[18px] h-[18px] rounded-full border border-white/[0.15] flex items-center justify-center mt-px">
              <Check size={9} className="text-white/60" strokeWidth={2.5} />
            </span>
            <span className="text-sm text-white/60 leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={`/${lang}/contact`}
        className={`group/btn flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold transition-all duration-200 active:scale-95 ${plan.highlighted
            ? "bg-white text-black hover:bg-white/90"
            : "border border-white/[0.15] text-white/70 hover:border-white/30 hover:text-white"
          }`}
      >
        {plan.cta}
        <ArrowRight
          size={12}
          className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
        />
      </Link>
    </div>
  );
}

function FooterNote({
  note,
  talkCta,
  lang,
  socials,
}: {
  note: string;
  talkCta: string;
  lang: string;
  socials: Social[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <div ref={ref} className="relative z-10 border-t border-white/[0.07]">
      {/* Note row */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="px-6 sm:px-10 md:px-14 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <p className="text-xs text-white/30 max-w-sm leading-relaxed">{note}</p>
        <Link
          href={`/${lang}/contact`}
          className="text-sm text-white/50 hover:text-white transition-colors duration-200 flex-shrink-0"
        >
          {talkCta}
        </Link>
      </motion.div>

      {/* Footer bar */}
      <div className="border-t border-white/[0.06] px-6 sm:px-10 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/25">© {new Date().getFullYear()} Nadie Studio.</p>
        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/35 hover:text-white transition-colors uppercase tracking-widest"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

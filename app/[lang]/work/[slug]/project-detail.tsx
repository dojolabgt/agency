"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import LightRays from "../../../components/LightRays";
import PageNav from "../../../components/PageNav";

type Project = {
  index: string;
  slug: string;
  name: string;
  client: string;
  category: string;
  tags: string[];
  year: string;
  description: string;
  overview: string;
  deliverables: string[];
  mockup: "browser" | "screen";
  image: string;
  gallery: string[];
};

type Meta = {
  client: string;
  year: string;
  category: string;
  tags: string;
  deliverables: string;
  similarCta: string;
};

type WorkDict = {
  backLabel: string;
  nextLabel: string;
  meta: Meta;
  projects: Project[];
};

type Dict = {
  nav: { home: string; work: string; services: string; contact: string };
  work: WorkDict;
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export default function ProjectDetail({
  dict,
  lang,
  project,
  nextProject,
}: {
  dict: Dict;
  lang: string;
  project: Project;
  nextProject: Project;
}) {
  const infoRef = useRef<HTMLDivElement>(null);
  const infoInView = useInView(infoRef, { once: true, margin: "-5%" });
  const galleryRef = useRef<HTMLDivElement>(null);
  const galleryInView = useInView(galleryRef, { once: true, margin: "-5%" });

  const meta = dict.work.meta;

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* ── LightRays ────────────────────────────────────── */}
      <div
        aria-hidden
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.3}
          lightSpread={0.9}
          rayLength={2}
          fadeDistance={1.6}
          saturation={0}
          pulsating={false}
          followMouse={false}
          noiseAmount={0.02}
          distortion={0.08}
          className="absolute inset-0 opacity-[0.3]"
        />
      </div>

      {/* ── Nav ──────────────────────────────────────────── */}
      <PageNav lang={lang} dict={dict.nav} />

      {/* ── Hero ─────────────────────────────────────────── */}
      <div className="relative min-h-[100svh] w-full overflow-hidden flex flex-col">

        {/* Back link */}
        <div className="relative z-10 pt-28 px-6 sm:px-10 md:px-14">
          <Link
            href={`/${lang}#work`}
            className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={10} />
            {dict.work.backLabel}
          </Link>
        </div>

        {/* Headline */}
        <div className="relative z-10 px-6 sm:px-10 md:px-14 mt-10 md:mt-14">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30 mb-5"
          >
            {project.index} — {project.category}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[clamp(3rem,10vw,9rem)] font-normal tracking-tight leading-none text-white"
          >
            {project.name}
          </motion.h1>

          {/* Meta row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-6 mt-6"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">{project.client}</span>
            <span className="w-px h-3 bg-white/15" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/25 tabular-nums">{project.year}</span>
            <span className="w-px h-3 bg-white/15" />
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="text-[9px] uppercase tracking-[0.15em] text-white/20 border border-white/10 rounded-full px-2.5 py-1">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="relative z-10 mx-6 sm:mx-10 md:mx-14 mt-12 mb-0"
          style={{ perspective: "1200px" }}
        >
          <div
            style={{
              transform: "rotateX(4deg) rotateY(-1deg)",
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Browser chrome — solo para proyectos web */}
            {project.mockup === "browser" && (
              <div
                className="rounded-t-2xl px-4 flex items-center gap-2"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "none",
                  height: "36px",
                }}
              >
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
                </div>
                <div
                  className="flex-1 mx-4 rounded-md flex items-center px-3"
                  style={{ background: "rgba(255,255,255,0.04)", height: "20px" }}
                >
                  <span className="text-[9px] text-white/20 tracking-wide">somosnadie.com</span>
                </div>
              </div>
            )}

            {/* Screenshot */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "16/9",
                border: "1px solid rgba(255,255,255,0.08)",
                borderTop: project.mockup === "browser" ? "none" : undefined,
                borderRadius: project.mockup === "browser" ? "0 0 16px 16px" : "16px",
                boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04)",
              }}
            >
              <Image
                src={project.image}
                alt={project.name}
                fill
                priority
                className="object-cover object-left-top"
                sizes="(max-width: 768px) 100vw, 90vw"
              />
              {/* Bottom fade into page */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Metadata strip ───────────────────────────────── */}
      <div
        ref={infoRef}
        className="relative z-10 border-b border-white/[0.07] px-6 sm:px-10 md:px-14 py-8"
      >
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={infoInView ? "show" : "hidden"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          <MetaItem label={meta.client} value={project.client} />
          <MetaItem label={meta.year} value={project.year} />
          <MetaItem label={meta.category} value={project.category} />
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/30 mb-2">{meta.tags}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-medium uppercase tracking-[0.15em] text-white/50 border border-white/15 rounded-full px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Overview + deliverables ───────────────────────── */}
      <div className="relative z-10 px-6 sm:px-10 md:px-14 py-20 md:py-28">
        <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={infoInView ? "show" : "hidden"}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-2"
          >
            <p className="text-2xl md:text-3xl font-light text-white/80 leading-relaxed">
              {project.overview}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={infoInView ? "show" : "hidden"}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/30 mb-5">
              {meta.deliverables}
            </p>
            <ul className="flex flex-col gap-3">
              {project.deliverables.map((d, i) => (
                <li key={d} className="flex items-center gap-3">
                  <span className="text-[9px] tabular-nums text-white/20">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-white/60">{d}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ── Gallery ──────────────────────────────────────── */}
      <div ref={galleryRef} className="relative z-10 px-6 sm:px-10 md:px-14 pb-3">
        {/* Info card + optional second image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Second gallery image — only if different from hero */}
          {project.gallery[1] && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={galleryInView ? "show" : "hidden"}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={project.gallery[1]}
                alt={`${project.name} — detail`}
                fill
                className="object-cover object-left-top"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>
          )}

          {/* Info card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={galleryInView ? "show" : "hidden"}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative aspect-[4/3] rounded-2xl bg-white/[0.03] border border-white/[0.07] flex flex-col justify-between p-8"
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/25">
              {project.index} — {project.category}
            </p>
            <div>
              <p className="text-3xl md:text-4xl font-normal text-white/80 tracking-tight mb-3">
                {project.name}
              </p>
              <p className="text-sm text-white/40 leading-relaxed max-w-xs">
                {project.description}
              </p>
            </div>
            <Link
              href={`/${lang}/contact`}
              className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200"
            >
              {meta.similarCta}
              <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ── Next project ─────────────────────────────────── */}
      <NextProject
        project={nextProject}
        lang={lang}
        label={dict.work.nextLabel}
      />
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/30 mb-2">{label}</p>
      <p className="text-sm text-white/70">{value}</p>
    </div>
  );
}

function NextProject({
  project,
  lang,
  label,
}: {
  project: Project;
  lang: string;
  label: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <Link
      href={`/${lang}/work/${project.slug}`}
      ref={ref}
      className="group relative z-10 flex flex-col justify-end overflow-hidden h-[60vh] mt-3 mx-6 sm:mx-10 md:mx-14 mb-6 rounded-2xl cursor-pointer"
    >
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover object-left-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative p-8 md:p-12 flex items-end justify-between"
      >
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40 mb-3">
            {label}
          </p>
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-normal text-white tracking-tight leading-none">
            {project.name}
          </h3>
          <p className="text-sm text-white/50 mt-2">{project.category}</p>
        </div>
        {/* Arrow — always visible on mobile, hover-only on desktop */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/25 flex items-center justify-center opacity-100 md:opacity-0 md:translate-x-3 md:group-hover:opacity-100 md:group-hover:translate-x-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <ArrowRight size={16} className="text-white" />
        </div>
      </motion.div>
    </Link>
  );
}

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
  image: string;
  gallery: string[];
};

type WorkDict = {
  backLabel: string;
  nextLabel: string;
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

  return (
    <div className="bg-black text-white font-sans selection:bg-white selection:text-black">
      {/* ── LightRays — very subtle on project pages ─────── */}
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

      {/* ── Hero image ───────────────────────────────────── */}
      <div className="relative h-[90vh] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />
        <div className="absolute inset-0 bg-black/25" />

        {/* Top-left: back + index */}
        <div className="absolute top-28 left-6 sm:left-10 md:left-14 flex items-center gap-4">
          <Link
            href={`/${lang}#work`}
            className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-200"
          >
            <ArrowLeft size={10} />
            {dict.work.backLabel}
          </Link>
          <span className="text-[10px] text-white/20 tabular-nums">{project.index}</span>
        </div>

        {/* Bottom: project name + category */}
        <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-10 md:px-14 pb-10 md:pb-14">
          {/* Category pill */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-4"
          >
            {project.category}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-normal tracking-tight leading-none text-white"
          >
            {project.name}
          </motion.h1>
        </div>
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
          <MetaItem label="Client" value={project.client} />
          <MetaItem label="Year" value={project.year} />
          <MetaItem label="Category" value={project.category} />
          <div>
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/30 mb-2">Tags</p>
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
          {/* Overview text */}
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

          {/* Deliverables */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={infoInView ? "show" : "hidden"}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <p className="text-[9px] font-medium uppercase tracking-[0.3em] text-white/30 mb-5">
              Deliverables
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
      <div ref={galleryRef} className="relative z-10 flex flex-col gap-3 px-6 sm:px-10 md:px-14 pb-3">
        {/* Full-width image */}
        {project.gallery[0] && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate={galleryInView ? "show" : "hidden"}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] overflow-hidden rounded-2xl"
          >
            <Image
              src={project.gallery[0]}
              alt={`${project.name} — detail 1`}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>
        )}

        {/* Two smaller images */}
        {project.gallery[1] && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate={galleryInView ? "show" : "hidden"}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={project.gallery[1]}
                alt={`${project.name} — detail 2`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10" />
            </motion.div>

            {/* Placeholder / info card */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={galleryInView ? "show" : "hidden"}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
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
              <div className="flex items-center gap-2">
                <Link
                  href={`/${lang}/contact`}
                  className="group flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-200"
                >
                  Start a similar project
                  <ArrowRight size={10} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
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
      {/* Background image */}
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
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
        <div className="flex-shrink-0 w-12 h-12 rounded-full border border-white/25 flex items-center justify-center opacity-0 translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <ArrowRight size={16} className="text-white" />
        </div>
      </motion.div>
    </Link>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

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

type WorkDict = {
  label: string;
  cta: string;
  projects: Project[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Work({ dict, lang }: { dict: WorkDict; lang: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="work"
      ref={ref}
      className="relative z-10 bg-black border-t border-white/[0.06] px-6 sm:px-10 md:px-14 py-24 md:py-32"
    >
      {/* Section header */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between mb-12 md:mb-16"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50">
          {dict.label}
        </p>
        <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/30">
          {String(dict.projects.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* Project cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {dict.projects.map((project, i) => (
          <motion.div
            key={project.index}
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.1 + i * 0.1,
            }}
          >
            <ProjectCard project={project} lang={lang} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, lang }: { project: Project; lang: string }) {
  return (
    <Link
      href={`/${lang}/work/${project.slug}`}
      className="group relative aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer bg-white/[0.03] block"
    >
      {/* Image */}
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-500" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top row */}
      <div className="absolute top-5 left-6 right-6 flex items-center justify-between">
        <span className="text-[10px] font-medium tabular-nums text-white/40 tracking-[0.2em]">
          {project.index}
        </span>
        <span className="text-[10px] font-medium tabular-nums text-white/40">
          {project.year}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Description — reveals on hover */}
        <div className="overflow-hidden mb-3">
          <p
            className="text-sm text-white/65 leading-relaxed translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            {project.description}
          </p>
        </div>

        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/50 mb-1.5">
              {project.category}
            </p>
            <h3 className="text-2xl sm:text-3xl font-normal text-white tracking-tight leading-none truncate">
              {project.name}
            </h3>
          </div>

          {/* Arrow button */}
          <div
            className="flex-shrink-0 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
          >
            <ArrowUpRight size={14} className="text-white" />
          </div>
        </div>

        {/* Tags — reveal on hover */}
        <div
          className="flex flex-wrap gap-1.5 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75 ease-[cubic-bezier(0.16,1,0.3,1)]"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/60 border border-white/20 rounded-full px-2.5 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

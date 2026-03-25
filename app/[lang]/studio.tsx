"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type StudioDict = {
  label: string;
  headline: string;
  paragraphs: string[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function Studio({ dict }: { dict: StudioDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="studio"
      ref={ref}
      className="relative z-10 bg-black border-t border-white/[0.06] px-6 sm:px-10 md:px-14 py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-16 md:mb-20"
        >
          {dict.label}
        </motion.p>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
          {/* Left — headline */}
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.05] text-white/95"
          >
            {dict.headline}
          </motion.h2>

          {/* Right — paragraphs */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="flex flex-col gap-8 md:pt-3"
          >
            {dict.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-base md:text-lg text-white/55 leading-relaxed font-light"
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

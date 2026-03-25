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
      className="relative z-10 bg-black border-t border-white/[0.06] px-6 sm:px-10 md:px-14 py-24 md:py-32 lg:py-40"
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
        {/* Label */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-8 md:mb-12">
            {dict.label}
          </p>
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="w-full"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight text-white/95 leading-[1.1] max-w-4xl mx-auto md:mb-20 mb-12">
            {dict.headline}
          </h2>
        </motion.div>

        {/* Paragraphs - split into a generous grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 max-w-4xl mx-auto text-left"
        >
          {dict.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-base md:text-lg text-white/60 leading-relaxed font-light"
            >
              {p}
            </motion.p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

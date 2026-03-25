"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type ServiceItem = {
  title: string;
  description: string;
};

type ServicesDict = {
  label: string;
  headline: string;
  items: ServiceItem[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Services({ dict }: { dict: ServicesDict }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-10 bg-black border-t border-white/[0.06] px-6 sm:px-10 md:px-14 py-24 md:py-32 border-b"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center text-center mb-16 md:mb-24"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/50 mb-6">
            {dict.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-white/95 max-w-2xl leading-[1.15]">
            {dict.headline}
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {dict.items.map((item, i) => (
            <motion.div 
              key={item.title} 
              variants={fadeUp} 
              className="group border border-white/[0.08] bg-white/[0.02] p-8 sm:p-10 md:p-12 hover:bg-white/[0.04] transition-colors duration-500 rounded-none flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6 h-full">
                <span className="text-xs font-medium tabular-nums text-white/40">
                  0{i + 1}
                </span>
                <div className="mt-auto pt-8">
                  <h3 className="text-xl sm:text-2xl font-normal text-white/90 mb-4 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-base text-white/70 leading-relaxed group-hover:text-white transition-colors">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

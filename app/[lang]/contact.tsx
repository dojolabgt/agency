"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Social = { label: string; url: string };

type ContactDict = {
  label: string;
  headline: string;
  subCopy: string;
  cta: string;
  email: string;
  socials: Social[];
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Contact({ dict, lang }: { dict: ContactDict; lang: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <footer
      id="contact"
      ref={ref}
      className="relative z-10 bg-black border-t border-white/[0.06] px-6 sm:px-10 md:px-14 pt-24 pb-12"
    >
      <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-32">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] font-medium uppercase tracking-[0.3em] text-emerald-400 mb-6"
        >
          {dict.label}
        </motion.p>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-normal tracking-tight text-white mb-6 leading-tight"
        >
          {dict.headline}
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="text-white/70 max-w-md mx-auto mb-10 text-base md:text-lg leading-relaxed"
        >
          {dict.subCopy}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {dict.cta}
            <div className="bg-black/10 rounded-full p-1 -mr-1 transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight size={14} />
            </div>
          </Link>
        </motion.div>
      </div>

      {/* Footer bottom bar */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.06]"
      >
        <p className="text-xs text-white/30">
          © {new Date().getFullYear()} Nadie Studio.
        </p>

        <div className="flex items-center gap-6">
          {dict.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/60 hover:text-white transition-colors uppercase tracking-widest"
            >
              {social.label}
            </a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}

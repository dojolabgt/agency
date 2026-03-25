"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, ChevronDown } from "lucide-react";
import LightRays from "../../components/LightRays";
import PageNav from "../../components/PageNav";

type FormDict = {
  name: string;
  email: string;
  company: string;
  service: string;
  serviceOptions: string[];
  message: string;
  budget: string;
  budgetOptions: string[];
  submit: string;
  success: string;
};

type ContactPageDict = {
  label: string;
  headline: string;
  subCopy: string;
  form: FormDict;
};

type Social = { label: string; url: string };

type Dict = {
  nav: { home: string; work: string; services: string; contact: string };
  contactPage: ContactPageDict;
  contact: { email: string; socials: Social[] };
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function ContactForm({ dict, lang }: { dict: Dict; lang: string }) {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-5%" });
  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-5%" });

  const [fields, setFields] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    budget: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const cp = dict.contactPage;
  const f = cp.form;

  const set = (key: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const setSel = (key: string) => (value: string) =>
    setFields((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
          lightSpread={1.0}
          rayLength={2.5}
          fadeDistance={1.5}
          saturation={0}
          pulsating
          followMouse
          mouseInfluence={0.08}
          noiseAmount={0.03}
          distortion={0.1}
          className="absolute inset-0 opacity-[0.45]"
        />
      </div>

      {/* ── Nav ──────────────────────────────────────────── */}
      <PageNav lang={lang} dict={dict.nav} />

      {/* ── Main content ─────────────────────────────────── */}
      <div className="relative z-10 px-6 sm:px-10 md:px-14 pt-32 pb-20 md:pt-40">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — info */}
          <div ref={headerRef} className="lg:sticky lg:top-32">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "show" : "hidden"}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] font-medium uppercase tracking-[0.3em] text-emerald-400 mb-6"
            >
              {cp.label}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "show" : "hidden"}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight leading-tight text-white mb-5"
            >
              {cp.headline}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "show" : "hidden"}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="text-white/55 text-base leading-relaxed mb-10 max-w-sm"
            >
              {cp.subCopy}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={headerInView ? "show" : "hidden"}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <a
                href={`mailto:${dict.contact.email}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200"
              >
                {dict.contact.email}
              </a>
              <div className="flex items-center gap-5">
                {dict.contact.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35 hover:text-white transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <div ref={formRef}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={formInView ? "show" : "hidden"}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
            >
              {submitted ? (
                <SuccessState message={f.success} lang={lang} />
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      label={f.name}
                      type="text"
                      value={fields.name}
                      onChange={set("name")}
                      required
                    />
                    <FormField
                      label={f.email}
                      type="email"
                      value={fields.email}
                      onChange={set("email")}
                      required
                    />
                  </div>

                  {/* Company */}
                  <FormField
                    label={f.company}
                    type="text"
                    value={fields.company}
                    onChange={set("company")}
                  />

                  {/* Service + Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <SelectField
                      label={f.service}
                      value={fields.service}
                      onSelect={setSel("service")}
                      options={f.serviceOptions}
                    />
                    <SelectField
                      label={f.budget}
                      value={fields.budget}
                      onSelect={setSel("budget")}
                      options={f.budgetOptions}
                    />
                  </div>

                  {/* Message */}
                  <TextareaField
                    label={f.message}
                    value={fields.message}
                    onChange={set("message")}
                    required
                  />

                  {/* Submit */}
                  <button
                    type="submit"
                    className="group mt-2 flex items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 active:scale-95"
                  >
                    {f.submit}
                    <div className="bg-black/10 rounded-full p-1 -mr-1 transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </div>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Footer bar ───────────────────────────────────── */}
      <div className="relative z-10 border-t border-white/[0.06] px-6 sm:px-10 md:px-14 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-white/30">© {new Date().getFullYear()} BYND Studio.</p>
        <div className="flex items-center gap-6">
          {dict.contact.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/40 hover:text-white transition-colors uppercase tracking-widest"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function FormField({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all duration-200"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  onSelect,
  options,
}: {
  label: string;
  value: string;
  onSelect: (value: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
        {label}
      </span>
      <div ref={containerRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`w-full bg-white/[0.04] border rounded-xl px-4 py-3 text-sm text-left flex items-center justify-between transition-all duration-200 hover:bg-white/[0.06] outline-none ${
            open ? "border-white/30 bg-white/[0.06]" : "border-white/10"
          }`}
        >
          <span className={value ? "text-white/80" : "text-white/25"}>
            {value || "—"}
          </span>
          <ChevronDown
            size={14}
            className={`text-white/30 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#111111] border border-white/10 rounded-xl overflow-hidden z-50 shadow-xl shadow-black/50">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onSelect(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 hover:bg-white/[0.06] border-b border-white/[0.04] last:border-0 ${
                  value === opt ? "text-white" : "text-white/55"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  required,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
        {label}
      </span>
      <textarea
        value={value}
        onChange={onChange}
        required={required}
        rows={5}
        className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-white/30 focus:bg-white/[0.06] transition-all duration-200 resize-none leading-relaxed"
      />
    </label>
  );
}

function SuccessState({ message, lang }: { message: string; lang: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 gap-6">
      <div className="w-14 h-14 rounded-full border border-white/20 bg-white/[0.05] flex items-center justify-center">
        <Check size={22} className="text-emerald-400" />
      </div>
      <p className="text-base text-white/80 leading-relaxed max-w-xs">{message}</p>
      <Link
        href={`/${lang}`}
        className="text-xs font-medium uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-200"
      >
        ← Home
      </Link>
    </div>
  );
}

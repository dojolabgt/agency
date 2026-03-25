"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type NavDict = {
  home: string;
  work: string;
  services: string;
  contact: string;
};

export default function PageNav({ lang, dict }: { lang: string; dict: NavDict }) {
  const pathname = usePathname();
  const otherLang = lang === "es" ? "en" : "es";
  const otherPath = pathname.replace(`/${lang}`, `/${otherLang}`);

  const links = [
    { href: `/${lang}`, label: dict.home, active: pathname === `/${lang}` },
    { href: `/${lang}#work`, label: dict.work, active: pathname === `/${lang}` || pathname.startsWith(`/${lang}/work`) },
    { href: `/${lang}/services`, label: dict.services, active: pathname === `/${lang}/services` },
    { href: `/${lang}/contact`, label: dict.contact, active: pathname === `/${lang}/contact` },
  ];

  return (
    <motion.header
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
    >
      <nav className="flex items-center gap-0.5 px-2 py-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl">
        {links.map(({ href, label, active }) => (
            <Link
              key={href}
              href={href}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                active
                  ? "bg-white text-black"
                  : "text-white/50 hover:text-white hover:bg-white/10"
              }`}
            >
              {label}
            </Link>
        ))}

        <span className="w-px h-3.5 bg-white/10 mx-1" />

        <Link
          href={otherPath}
          className="px-3 py-1.5 rounded-full text-xs font-semibold tracking-widest text-white/35 hover:text-white hover:bg-white/10 transition-all duration-200 uppercase"
        >
          {otherLang}
        </Link>
      </nav>
    </motion.header>
  );
}

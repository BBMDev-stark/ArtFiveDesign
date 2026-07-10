"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { nav } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${
        scrolled || open
          ? "bg-ivory/70 backdrop-blur-md border-b border-line shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-x flex items-center justify-between h-18 md:h-20 lg:h-22">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="ARTFIVE DESIGN trang chủ"
        >
          <span className="relative block h-8 md:h-9 w-[110px] shrink-0">
            <Image
              src="/images/brand/logo-full.png"
              alt=""
              aria-hidden
              fill
              sizes="110px"
              className="object-contain"
              priority
            />
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10" aria-label="Chính">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`eyebrow text-charcoal/70 hover:text-bronze transition-colors duration-300 tracking-widest3 ${
                pathname === item.href ? "text-bronze" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden lg:inline-flex items-center border border-[#8B7355] px-7 py-3 text-[#8B7355] hover:bg-[#8B7355] hover:text-ivory transition-all duration-400 tracking-widest3 text-sm"
        >
          Bắt đầu Dự án
        </Link>

        <button
          className="lg:hidden flex flex-col gap-[6px] w-11 h-11 items-center justify-center -mr-1"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 ${
              open ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-charcoal transition-all duration-300 ${
              open ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="lg:hidden overflow-hidden bg-ivory/98 backdrop-blur-md border-b border-line"
            aria-label="Di động"
          >
            <ul className="container-x flex flex-col py-8 gap-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="font-serif text-2xl text-charcoal hover:text-bronze transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: nav.length * 0.05 }}
                className="pt-4"
              >
                <Link
                  href="/contact"
                  className="eyebrow text-bronze tracking-widest3"
                >
                  Bắt đầu Dự án →
                </Link>
              </motion.li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
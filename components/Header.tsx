"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/data";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrolledRef = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    let frame: number | null = null;

    const update = () => {
      frame = null;
      const next = window.scrollY > 50;
      if (next === scrolledRef.current) return;
      scrolledRef.current = next;
      setScrolled(next);
    };

    const onScroll = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const lightSurface = scrolled || open;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth ${
        lightSurface
          ? "bg-ivory/95 border-b border-line shadow-soft"
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
              className={`object-contain transition-opacity duration-500 ease-smooth ${
                lightSurface ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
            <Image
              src="/images/brand/logo-full.png"
              alt=""
              aria-hidden
              fill
              sizes="110px"
              className={`site-header-logo--light object-contain transition-opacity duration-500 ease-smooth ${
                lightSurface ? "opacity-100" : "opacity-0"
              }`}
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
          BẮT ĐẦU DỰ ÁN
        </Link>

        <button
          className={`lg:hidden flex flex-col gap-[6px] w-11 h-11 items-center justify-center -mr-1 rounded-full transition-colors duration-300 ${
            lightSurface
              ? "bg-charcoal/[0.04]"
              : "bg-black/20 backdrop-blur-sm"
          }`}
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span
            className={`block w-6 h-[1.5px] transition-all duration-300 ${
              lightSurface
                ? "bg-charcoal shadow-none"
                : "bg-champagne shadow-[0_0_8px_rgba(201,184,150,0.4)]"
            } ${
              open ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] transition-all duration-300 ${
              lightSurface
                ? "bg-charcoal shadow-none"
                : "bg-champagne shadow-[0_0_8px_rgba(201,184,150,0.4)]"
            } ${
              open ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </button>
      </div>

      <nav
        id="mobile-navigation"
        className={`grid border-b border-line bg-ivory/98 backdrop-blur-xl transition-[grid-template-rows,opacity,min-height] duration-300 ease-smooth lg:hidden ${
          open
            ? "grid-rows-[1fr] min-h-[calc(100dvh-4.5rem)] opacity-100"
            : "pointer-events-none grid-rows-[0fr] border-transparent opacity-0"
        }`}
        aria-label="Di động"
        aria-hidden={!open}
      >
        <div className={open ? "overflow-y-auto" : "overflow-hidden"}>
          <ul className="container-x flex min-h-full flex-col gap-2 py-6">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-300 ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className={`flex min-h-12 items-center font-serif text-2xl transition-colors hover:text-bronze ${
                    pathname === item.href ? "text-bronze" : "text-charcoal"
                  }`}
                  tabIndex={open ? undefined : -1}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li
              className={`pt-4 transition-[opacity,transform] duration-300 ${
                open ? "translate-x-0 opacity-100" : "-translate-x-3 opacity-0"
              }`}
              style={{
                transitionDelay: open ? `${nav.length * 35}ms` : "0ms",
              }}
            >
              <Link
                href="/contact"
                className="eyebrow flex min-h-12 items-center border-t border-line pt-4 text-bronze tracking-widest3"
                tabIndex={open ? undefined : -1}
              >
                Bắt đầu Dự án →
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

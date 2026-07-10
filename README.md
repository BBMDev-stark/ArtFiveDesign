# ARTFIVE DESIGN — Corporate Website

A production-ready marketing website for **Art Five Design Corporation**,
built with Next.js (App Router), TypeScript, Tailwind CSS, and Framer
Motion. All copy, project names, clients, locations, team members, and
statistics are sourced directly from the company's profile document
(`Profile_Art_Five_Design_Corp__V070925_VN.pdf`) — nothing has been
invented.

## Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling, with a custom design-token palette
  (ivory / charcoal / bronze / champagne)
- **Framer Motion** for scroll reveals and menu transitions
- **GSAP + ScrollTrigger** for the pinned "Drawing → Building" blueprint
  wipe reveal
- **Three.js + React Three Fiber + drei** for the live, orbit-able 3D
  massing study in the homepage hero
- **Lenis** for smooth scrolling
- Google Fonts: **Fraunces** (serif display) + **Inter** (sans body)

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

> Note: `next/font/google` fetches Fraunces and Inter from Google Fonts at
> build time, so an internet connection is required for `npm run build`
> and `npm run dev`.

## Project structure

```
app/
  layout.tsx          Root layout — fonts, header, footer, smooth scroll
  page.tsx             Home (hero, about, stats, expertise, featured work,
                        signature project, process, clients, insights, CTA)
  about/                Company story, philosophy, leadership, certifications
  expertise/            Sector-by-sector breakdown + design process
  portfolio/            Filterable project grid
  portfolio/[slug]/     Individual project case studies (20 real projects)
  clients/              Named clients & the C.P. Group Thailand partnership
  insights/             Editorial notes on process, healthcare design, and
                        in-house manufacturing
  careers/              Studio culture + open-ended contact CTA
  contact/              Office addresses + inquiry form
components/             Header, Footer, ProjectCard, PortfolioFilter,
                        Reveal (Framer Motion), SmoothScroll (Lenis),
                        LocationLedger (signature geography ticker)
lib/data.ts             All sourced content — company facts, projects,
                        team, clients, certifications, process, stats
public/images/          20 real project photographs extracted from the
                        company profile
```

## Content integrity

Every project, client name, location, certification, team member, and
statistic in `lib/data.ts` is traceable to the source profile. Where the
profile did not provide a precise figure (e.g. total project count,
headcount), the site avoids inventing one and instead uses defensible,
derivable facts (founding year, years in practice, countries delivered
in, partnership start date).

## Design system

| Token | Value | Use |
|---|---|---|
| `ivory` | `#F6F2EA` | Page background |
| `charcoal` | `#1C1A17` | Primary text, dark sections |
| `ink` | `#100F0D` | Hero overlays |
| `bronze` | `#9C7A4F` | Primary accent |
| `champagne` | `#D7BD8E` | Secondary accent, dark-section highlight |
| `line` | `#DCD3C0` | Hairline dividers |

Display type is set in **Fraunces**; body and UI text in **Inter**, with
wide-tracked uppercase "eyebrow" labels throughout for section markers.

The signature visual motif is twofold:

1. **A live 3D massing study in the hero** — six abstract volumes, one per
   practice sector, rendered in real WebGL (Three.js), lit and shadowed,
   sitting on a drafting grid with hairline bronze edges. Visitors can
   drag to orbit it; it idles with a slow auto-rotate and gentle float.
   It's paired with a real, labeled project photograph in the corner so
   the abstraction stays grounded in built work — it is deliberately
   presented as an abstract study across sectors, not a literal model of
   any single project.
2. **The "Drawing → Building" scroll reveal** — a pinned, scroll-scrubbed
   moment (GSAP ScrollTrigger) where a real architectural floor plan from
   the SIH Hospital project wipes away to reveal the built photograph
   underneath.

The **location ledger** — a running line of the real cities ARTFIVE
DESIGN has delivered work in (Ho Chi Minh City, Singapore, Hải Phòng,
Bình Phước, Hà Nội, Biên Hòa, Bắc Ninh, Kiên Giang) — runs beneath the
hero and on the About page as a quiet, factual signal of international
reach.

A custom cursor (magnetic on links/buttons) and a fixed film-grain
overlay round out the premium, editorial feel across every page.

## Deployment

The site is a standard Next.js app and deploys as-is to Vercel, or any
Node hosting environment:

```bash
npm run build
npm run start
```

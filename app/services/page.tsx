"use client";

import Link from "next/link";
import { Check, Shield, Target, Wrench } from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import PackageTier from "@/components/ui/PackageTier";
import { useBookingCart } from "@/context/BookingCartContext";

const serviceAnchors = [
  { id: "paint-correction", label: "Paint Correction" },
  { id: "ceramic-coating", label: "Ceramic Coating" },
  { id: "ppf-zones", label: "PPF Impact Zones" },
  { id: "pricing", label: "Good Better Best" }
];

const correctionSteps = [
  {
    name: "1-Step Correction",
    notes: "Single-pass polish for light swirls and gloss recovery.",
    outcome: "~60-70% defect removal"
  },
  {
    name: "2-Step Correction",
    notes: "Compound + refining polish to level medium defects and restore depth.",
    outcome: "~80-90% defect removal"
  },
  {
    name: "3-Step Correction",
    notes: "Cut + refine + jewel stage for show-grade clarity under inspection LEDs.",
    outcome: "~95%+ defect removal"
  }
];

const coatingRows = [
  {
    label: "Durability",
    oneYear: "12 Months",
    fiveYear: "60 Months",
    lifetime: "Annualized Service Plan"
  },
  {
    label: "Chemical Resistance",
    oneYear: "Moderate",
    fiveYear: "High",
    lifetime: "Maximum"
  },
  {
    label: "Hydrophobic Strength",
    oneYear: "High",
    fiveYear: "Very High",
    lifetime: "Extreme"
  },
  {
    label: "Maintenance",
    oneYear: "Quarterly Wash",
    fiveYear: "Biannual Inspection",
    lifetime: "Annual Top Layer"
  }
];

export default function ServicesPage() {
  const { addItem } = useBookingCart();

  return (
    <main className="px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan-200">Services // Treatment Matrix</p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-slate-100 md:text-5xl">
            Precision Surface Programs for Drivers Who Measure Results
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
            Every package is engineered around defect depth, substrate condition, and long-term protection behavior.
            Scroll the laboratory protocol below.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="glass-card rounded-2xl p-4">
              <p className="font-display text-[10px] uppercase tracking-[0.24em] text-slate-400">Protocol Index</p>
              <nav className="mt-3 space-y-2">
                {serviceAnchors.map((anchor) => (
                  <a
                    key={anchor.id}
                    href={`#${anchor.id}`}
                    className="block rounded-lg border border-transparent px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100"
                    data-repel
                  >
                    {anchor.label}
                  </a>
                ))}
              </nav>

              <div className="mt-5 rounded-xl border border-cyan-300/25 bg-cyan-300/10 p-3 text-xs leading-relaxed text-cyan-100">
                Inspection report included with paint gauge readings and package recommendation.
              </div>
            </div>
          </aside>

          <div className="space-y-16">
            <section id="paint-correction">
              <Reveal>
                <header className="mb-6">
                  <h2 className="font-display text-3xl text-slate-100">Paint Correction</h2>
                  <p className="mt-3 max-w-3xl text-sm text-slate-300">
                    We calibrate pad, polish, and machine speed per panel. Goal: clearcoat leveling without unnecessary
                    film build removal.
                  </p>
                </header>
              </Reveal>

              <div className="grid gap-4 md:grid-cols-3">
                {correctionSteps.map((step, index) => (
                  <Reveal key={step.name} delay={index * 0.07}>
                    <article className="glass-card rounded-2xl p-5" data-repel>
                      <div className="flex items-center gap-2 text-cyan-200">
                        <Wrench className="h-4 w-4" />
                        <p className="font-display text-sm uppercase tracking-[0.2em]">{step.name}</p>
                      </div>
                      <p className="mt-4 text-sm leading-relaxed text-slate-300">{step.notes}</p>
                      <div className="mt-5 inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/12 px-3 py-1 text-xs text-cyan-100">
                        {step.outcome}
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </section>

            <section id="ceramic-coating">
              <Reveal>
                <header className="mb-6">
                  <h2 className="font-display text-3xl text-slate-100">Ceramic Coating</h2>
                  <p className="mt-3 max-w-3xl text-sm text-slate-300">
                    Choose your chemistry by ownership horizon and environmental load. Hydrophobic performance is tested
                    during delivery.
                  </p>
                </header>
              </Reveal>

              <Reveal>
                <div className="overflow-x-auto rounded-2xl border border-slate-300/20 bg-slate-900/60">
                  <table className="min-w-full text-left text-sm">
                    <thead className="bg-slate-800/70 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                      <tr>
                        <th className="px-4 py-3">Spec</th>
                        <th className="px-4 py-3">1 Year</th>
                        <th className="px-4 py-3">5 Year</th>
                        <th className="px-4 py-3">Lifetime</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coatingRows.map((row) => (
                        <tr key={row.label} className="border-t border-slate-300/10">
                          <td className="px-4 py-3 font-medium text-slate-200">{row.label}</td>
                          <td className="px-4 py-3 text-slate-300">{row.oneYear}</td>
                          <td className="px-4 py-3 text-slate-300">{row.fiveYear}</td>
                          <td className="px-4 py-3 text-cyan-100">{row.lifetime}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </section>

            <section id="ppf-zones">
              <Reveal>
                <header className="mb-6">
                  <h2 className="font-display text-3xl text-slate-100">PPF High Impact Areas</h2>
                  <p className="mt-3 max-w-3xl text-sm text-slate-300">
                    Transparent protection film is mapped to kinetic strike zones: front fascia, rocker panels, mirrors,
                    and leading hood edge.
                  </p>
                </header>
              </Reveal>

              <Reveal>
                <div className="grid gap-6 rounded-2xl border border-slate-300/20 bg-slate-900/55 p-5 lg:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-xl border border-slate-300/15 bg-slate-950/55 p-3">
                    <svg viewBox="0 0 700 300" className="h-full w-full">
                      <defs>
                        <linearGradient id="carBody" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#1e293b" />
                          <stop offset="100%" stopColor="#0b1220" />
                        </linearGradient>
                      </defs>
                      <rect x="60" y="120" width="560" height="95" rx="45" fill="url(#carBody)" stroke="#64748b" strokeWidth="2" />
                      <rect x="180" y="85" width="300" height="55" rx="20" fill="#111827" stroke="#475569" strokeWidth="2" />
                      <circle cx="200" cy="220" r="42" fill="#020617" stroke="#64748b" strokeWidth="4" />
                      <circle cx="500" cy="220" r="42" fill="#020617" stroke="#64748b" strokeWidth="4" />

                      <rect x="70" y="128" width="115" height="80" rx="30" fill="rgba(6,182,212,0.35)" stroke="#67e8f9" strokeWidth="2" />
                      <rect x="510" y="128" width="100" height="80" rx="26" fill="rgba(6,182,212,0.35)" stroke="#67e8f9" strokeWidth="2" />
                      <rect x="186" y="90" width="288" height="16" rx="8" fill="rgba(6,182,212,0.28)" stroke="#67e8f9" strokeWidth="1.6" />
                      <rect x="170" y="150" width="26" height="52" rx="12" fill="rgba(6,182,212,0.3)" stroke="#67e8f9" strokeWidth="1.4" />
                      <rect x="504" y="150" width="26" height="52" rx="12" fill="rgba(6,182,212,0.3)" stroke="#67e8f9" strokeWidth="1.4" />
                    </svg>
                  </div>

                  <div className="space-y-3">
                    {[
                      "Front bumper and grille perimeter",
                      "Hood leading edge and mirror caps",
                      "Fender arches and rocker strips",
                      "Door cup and trunk loading lip"
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-slate-300/15 bg-slate-950/55 px-3 py-3 text-sm text-slate-200"
                      >
                        <Target className="mt-0.5 h-4 w-4 text-cyan-300" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </section>

            <section id="pricing">
              <Reveal>
                <header className="mb-6">
                  <h2 className="font-display text-3xl text-slate-100">Good, Better, Best</h2>
                  <p className="mt-3 max-w-3xl text-sm text-slate-300">
                    Curated service tiers designed around outcome targets and ownership timeline.
                  </p>
                </header>
              </Reveal>

              <div className="grid gap-4 xl:grid-cols-3">
                <Reveal delay={0.04}>
                  <PackageTier
                    tier="Good // Gold"
                    price="$1,500"
                    description="1-step correction with entry ceramic coating and maintenance plan."
                    features={[
                      "Single-stage polish",
                      "1-year ceramic coat",
                      "Wheel face sealant",
                      "Exterior decontamination"
                    ]}
                    onSelect={() =>
                      addItem({
                        id: "gold-package",
                        name: "Gold Package",
                        price: 1500,
                        category: "Detailing"
                      })
                    }
                  />
                </Reveal>

                <Reveal delay={0.08}>
                  <PackageTier
                    tier="Better // Platinum"
                    price="$2,650"
                    description="2-step correction + 5-year ceramic chemistry for lasting gloss density."
                    features={[
                      "Two-stage correction",
                      "5-year ceramic coating",
                      "Glass and trim coating",
                      "Interior reset detail"
                    ]}
                    highlighted
                    onSelect={() =>
                      addItem({
                        id: "platinum-package",
                        name: "Platinum Package",
                        price: 2650,
                        category: "Detailing"
                      })
                    }
                  />
                </Reveal>

                <Reveal delay={0.12}>
                  <PackageTier
                    tier="Best // Obsidian"
                    price="$4,500+"
                    description="3-step correction, full high-impact PPF, and lifetime ceramic plan."
                    features={[
                      "Three-stage correction",
                      "High-impact PPF kit",
                      "Lifetime ceramic plan",
                      "Annual inspection + topper"
                    ]}
                    onSelect={() =>
                      addItem({
                        id: "obsidian-package",
                        name: "Obsidian Package",
                        price: 4500,
                        category: "Detailing"
                      })
                    }
                  />
                </Reveal>
              </div>

              <Reveal className="mt-8">
                <div className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 p-5 text-sm text-cyan-100">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="inline-flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Premium packages include post-cure inspection and contamination-control wash guide.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 rounded-lg border border-cyan-300/55 bg-cyan-300/15 px-4 py-2 text-xs uppercase tracking-[0.18em] transition hover:bg-cyan-300/25"
                    >
                      <Check className="h-4 w-4" /> Book Consultation
                    </Link>
                  </div>
                </div>
              </Reveal>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

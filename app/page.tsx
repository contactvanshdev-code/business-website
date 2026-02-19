import Link from "next/link";
import { ArrowRight, FlaskConical, ShieldCheck, Sofa, Sparkles } from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import ComparisonSlider from "@/components/ui/ComparisonSlider";
import MagneticButton from "@/components/ui/MagneticButton";

const quickServices = [
  {
    title: "Correction",
    copy: "Machine-polished paint leveling to eliminate haze, swirls, and oxidation.",
    icon: Sparkles
  },
  {
    title: "Protection",
    copy: "Nano-ceramic and PPF shielding with documented gloss and hydrophobic gain.",
    icon: ShieldCheck
  },
  {
    title: "Interior",
    copy: "Steam extraction, leather conditioning, and antimicrobial cockpit restoration.",
    icon: Sofa
  }
];

const labPartners = ["XPEL", "Gtechniq", "RUPES", "CarPro", "SONAX", "Koch-Chemie"];
const heroBeforeImage =
  "https://images.unsplash.com/photo-1632823639409-ce060d5a54cc?auto=format&fit=crop&w=2200&q=80";
const heroAfterImage =
  "https://images.unsplash.com/photo-1749394043452-39913210c7af?auto=format&fit=crop&w=2200&q=80";

export default function HomePage() {
  return (
    <main className="pb-24">
      <section className="min-h-screen px-6 pb-20 pt-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan-200/90">
              ONYX AUTO LAB // DIGITAL SURFACE ANALYSIS
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-slate-100 md:text-6xl">
              High-End Detailing Built Like a
              <span className="text-cyan-300"> Precision Laboratory</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Not a wash bay. A controlled environment for paint correction, ceramic chemistry, and true
              reflection metrics that justify premium pricing above $1,500.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/services">
                <MagneticButton>
                  Enter The Lab <ArrowRight className="ml-2 inline h-4 w-4" />
                </MagneticButton>
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-slate-300/20 bg-slate-900/55 px-5 py-3 text-xs uppercase tracking-[0.18em] text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
                data-repel
              >
                Start Consultation
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="mt-10">
            <ComparisonSlider
              beforeImage={heroBeforeImage}
              afterImage={heroAfterImage}
              beforeLabel="Scratched"
              afterLabel="Mirror Finish"
            />
          </Reveal>
        </div>
      </section>

      <section className="px-6 py-12 md:px-10">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {quickServices.map((service, index) => (
            <Reveal key={service.title} delay={0.08 * index}>
              <article
                className="glass-card group rounded-2xl p-6 transition duration-300 hover:border-cyan-300/45 hover:shadow-[0_0_40px_rgba(6,182,212,0.24)]"
                data-repel
              >
                <div className="inline-flex rounded-xl border border-cyan-300/35 bg-cyan-300/15 p-2.5 text-cyan-100">
                  <service.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl text-slate-100">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{service.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-10 md:px-10">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-slate-300/20 bg-slate-950/60 p-4 backdrop-blur-md">
          <p className="mb-4 px-2 font-display text-[10px] uppercase tracking-[0.3em] text-slate-400">
            Trusted Product Ecosystem
          </p>

          <div className="overflow-hidden">
            <div className="marquee-track flex w-max items-center gap-4">
              {[...labPartners, ...labPartners].map((partner, index) => (
                <div
                  key={`${partner}-${index}`}
                  className="rounded-xl border border-slate-300/20 bg-slate-900/70 px-5 py-3 text-sm uppercase tracking-[0.2em] text-slate-200"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10">
        <Reveal>
          <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl border border-cyan-300/30 bg-slate-900/60 px-6 py-12 text-center shadow-[0_0_70px_rgba(6,182,212,0.2)] backdrop-blur-xl">
            <div className="mb-4 rounded-full border border-cyan-300/50 bg-cyan-300/15 p-3 text-cyan-100">
              <FlaskConical className="h-5 w-5" />
            </div>
            <h2 className="font-display text-3xl text-slate-100 md:text-4xl">Enter The Lab</h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              Book a guided inspection and receive a data-first treatment roadmap for gloss, protection longevity,
              and defect removal.
            </p>
            <Link href="/contact" className="mt-8">
              <MagneticButton>Reserve Diagnostic Session</MagneticButton>
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

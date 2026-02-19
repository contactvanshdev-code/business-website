import Image from "next/image";
import { BadgeCheck, Microscope, Zap } from "lucide-react";

import Reveal from "@/components/animations/Reveal";

const team = [
  {
    name: "Iris Vance",
    role: "Master Installer // Coating Specialist",
    image: "https://images.unsplash.com/photo-1761934658331-2e00b20dc6c6?auto=format&fit=crop&w=1400&q=80"
  },
  {
    name: "Noah Mercer",
    role: "Master Installer // Paint Correction",
    image: "https://images.unsplash.com/photo-1632823471725-4004ed0669b1?auto=format&fit=crop&w=1400&q=80"
  },
  {
    name: "Kai Sterling",
    role: "Master Installer // PPF Lead",
    image: "https://images.unsplash.com/photo-1632823639409-ce060d5a54cc?auto=format&fit=crop&w=1400&q=80"
  }
];

const facility = [
  {
    title: "ISO-Inspired Clean Room",
    image: "https://images.unsplash.com/photo-1641914921661-e43aaadd732e?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Multi-Angle Inspection Lighting",
    image: "https://images.unsplash.com/photo-1652509407752-71703cd40435?auto=format&fit=crop&w=1400&q=80"
  },
  {
    title: "Controlled Curing Lamp Bay",
    image: "https://images.unsplash.com/photo-1650535517973-1139e7feb023?auto=format&fit=crop&w=1400&q=80"
  }
];

export default function AboutPage() {
  return (
    <main className="px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan-200">The Lab // About ONYX</p>
          <h1 className="mt-4 font-display text-4xl text-slate-100 md:text-5xl">
            Not a Car Wash. A Surface Science Studio.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-slate-300">
            ONYX AUTO LAB was built around one idea: premium finishes should be measurable. We treat each vehicle as a
            technical surface restoration case, not a volume service ticket.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: Microscope, label: "Panel-level diagnostics before polishing" },
            { icon: Zap, label: "Controlled curing timelines for coating stability" },
            { icon: BadgeCheck, label: "Master installers with documented process control" }
          ].map((item, index) => (
            <Reveal key={item.label} delay={index * 0.07}>
              <div className="glass-card rounded-2xl p-5" data-repel>
                <item.icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-sm text-slate-200">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <section className="mt-14">
          <Reveal>
            <h2 className="font-display text-3xl text-slate-100">Master Installers</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {team.map((member, index) => (
              <Reveal key={member.name} delay={index * 0.06}>
                <article className="overflow-hidden rounded-2xl border border-slate-300/20 bg-slate-900/60">
                  <div className="relative h-64">
                    <Image src={member.image} alt={member.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-xl text-slate-100">{member.name}</h3>
                    <p className="mt-1 text-sm text-slate-300">{member.role}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <Reveal>
            <h2 className="font-display text-3xl text-slate-100">Facility Standards</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {facility.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <article className="overflow-hidden rounded-2xl border border-slate-300/20 bg-slate-900/60">
                  <div className="relative h-52">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-slate-200">{item.title}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

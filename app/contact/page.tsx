"use client";

import Link from "next/link";
import { ChevronDown, MapPinned } from "lucide-react";
import { useState } from "react";

import Reveal from "@/components/animations/Reveal";
import BookingWizard from "@/components/ui/BookingWizard";
import { cn } from "@/lib/cn";

const faqs = [
  {
    question: "How long does it take?",
    answer: "Most full correction + coating jobs require 2-4 days depending on paint condition and cure requirements."
  },
  {
    question: "Can I wash it immediately?",
    answer: "Avoid washing for 7 days after coating install so the layer can fully cure and harden."
  }
];

export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan-200">Booking // Contact</p>
          <h1 className="mt-4 font-display text-4xl text-slate-100 md:text-5xl">Build Your Service Configuration</h1>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <BookingWizard />
          </Reveal>

          <div className="space-y-6">
            <Reveal>
              <section className="rounded-2xl border border-slate-300/20 bg-slate-900/65 p-4">
                <h2 className="font-display text-xl text-slate-100">Location</h2>
                <div className="mt-3 overflow-hidden rounded-xl border border-slate-300/20">
                  <iframe
                    className="h-64 w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps?q=Los+Angeles+CA&output=embed"
                    title="ONYX Auto Lab location map"
                  />
                </div>
                <Link
                  href="https://maps.google.com/?q=Los+Angeles+CA"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg border border-cyan-300/55 bg-cyan-300/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300/25"
                >
                  <MapPinned className="h-4 w-4" /> Get Directions
                </Link>
              </section>
            </Reveal>

            <Reveal delay={0.08}>
              <section className="rounded-2xl border border-slate-300/20 bg-slate-900/65 p-4">
                <h2 className="font-display text-xl text-slate-100">FAQ</h2>
                <div className="mt-4 space-y-2">
                  {faqs.map((faq, index) => {
                    const open = openIndex === index;
                    return (
                      <article key={faq.question} className="rounded-xl border border-slate-300/15 bg-slate-950/55">
                        <button
                          type="button"
                          onClick={() => setOpenIndex(open ? null : index)}
                          className="flex w-full items-center justify-between px-4 py-3 text-left"
                        >
                          <span className="text-sm text-slate-200">{faq.question}</span>
                          <ChevronDown className={cn("h-4 w-4 text-cyan-300 transition", open ? "rotate-180" : "")} />
                        </button>
                        {open ? <p className="px-4 pb-4 text-sm text-slate-300">{faq.answer}</p> : null}
                      </article>
                    );
                  })}
                </div>
              </section>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  );
}

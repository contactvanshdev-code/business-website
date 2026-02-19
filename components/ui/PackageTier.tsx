"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/cn";

type PackageTierProps = {
  tier: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  buttonLabel?: string;
  href?: string;
  onSelect?: () => void;
};

export default function PackageTier({
  tier,
  price,
  description,
  features,
  highlighted,
  buttonLabel = "Add To Booking",
  href,
  onSelect
}: PackageTierProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 240, damping: 20 }}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-slate-900/60 p-6 backdrop-blur-md",
        highlighted
          ? "border-cyan-300/65 shadow-[0_0_45px_rgba(6,182,212,0.34)]"
          : "border-slate-400/25 hover:border-cyan-300/45"
      )}
      data-repel
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.18),transparent_52%)] opacity-0 transition duration-300 group-hover:opacity-100" />

      <p className="font-display text-xs uppercase tracking-[0.26em] text-cyan-200">{tier}</p>
      <p className="mt-2 font-display text-3xl text-slate-100">{price}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-300">{description}</p>

      <ul className="mt-5 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-slate-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {onSelect ? (
        <button
          type="button"
          onClick={onSelect}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-cyan-300/55 bg-cyan-300/15 px-4 py-3 text-xs uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-300/25"
        >
          {buttonLabel}
        </button>
      ) : (
        <Link
          href={href ?? "/contact"}
          className="mt-6 inline-flex w-full items-center justify-center rounded-xl border border-cyan-300/55 bg-cyan-300/15 px-4 py-3 text-xs uppercase tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-300/25"
        >
          {buttonLabel}
        </Link>
      )}
    </motion.article>
  );
}

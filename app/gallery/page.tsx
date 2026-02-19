"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

import Reveal from "@/components/animations/Reveal";
import { cn } from "@/lib/cn";

type Category = "Supercars" | "SUVs" | "Motorcycles" | "Restorations";

type GalleryItem = {
  id: string;
  title: string;
  category: Category;
  image: string;
};

const categories: Array<"All" | Category> = ["All", "Supercars", "SUVs", "Motorcycles", "Restorations"];

const items: GalleryItem[] = [
  {
    id: "1",
    title: "Ferrari Reflection Study",
    category: "Supercars",
    image: "https://images.unsplash.com/photo-1749394043452-39913210c7af?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "2",
    title: "McLaren Ceramic Finish",
    category: "Supercars",
    image: "https://images.unsplash.com/photo-1738796906434-04571bfb91de?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "3",
    title: "Range Rover Armor Coat",
    category: "SUVs",
    image: "https://images.unsplash.com/photo-1753806901556-3b7f216f0ca6?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "4",
    title: "BMW X7 Decon Protocol",
    category: "SUVs",
    image: "https://images.unsplash.com/photo-1683455425978-c40c16590b0b?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "5",
    title: "Ducati Wet Gloss",
    category: "Motorcycles",
    image: "https://images.unsplash.com/photo-1665564590635-e5e27629f548?auto=format&fit=crop&w=1800&q=80"
  },
  {
    id: "6",
    title: "Classic Refinish Revival",
    category: "Restorations",
    image: "https://images.unsplash.com/photo-1761934658331-2e00b20dc6c6?auto=format&fit=crop&w=1800&q=80"
  }
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("All");
  const [selected, setSelected] = useState<GalleryItem | null>(null);

  const filtered = useMemo(
    () => (activeCategory === "All" ? items : items.filter((item) => item.category === activeCategory)),
    [activeCategory]
  );

  return (
    <main className="px-6 pb-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-display text-xs uppercase tracking-[0.3em] text-cyan-200">The Vault // Verified Transformations</p>
          <h1 className="mt-4 font-display text-4xl text-slate-100 md:text-5xl">Filter by Vehicle Class</h1>
        </Reveal>

        <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.18em] transition",
                activeCategory === category
                  ? "border-cyan-300/65 bg-cyan-300/15 text-cyan-100"
                  : "border-slate-300/20 bg-slate-900/55 text-slate-300 hover:border-cyan-300/45 hover:text-cyan-100"
              )}
              data-repel
            >
              {category}
            </button>
          ))}
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <button
                type="button"
                onClick={() => setSelected(item)}
                className="wet-gloss group relative h-64 w-full overflow-hidden rounded-2xl border border-slate-300/20 bg-slate-900/60 text-left"
                data-repel
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <p className="font-display text-sm uppercase tracking-[0.2em] text-cyan-200">{item.category}</p>
                  <p className="mt-1 text-sm text-slate-200">{item.title}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <section className="rounded-2xl border border-slate-300/20 bg-slate-900/55 p-5">
            <h2 className="font-display text-2xl text-slate-100">Hydrophobic Proof Reel</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              Watch beading behavior and panel sheeting speed after curing.
            </p>
            <div className="mt-5 overflow-hidden rounded-xl border border-slate-300/20">
              <iframe
                className="aspect-video w-full"
                src="https://www.youtube.com/embed/mySqMFUBL7c"
                title="Hydrophobic water beading demonstration"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        </Reveal>
      </div>

      <AnimatePresence>
        {selected ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/95 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-6 top-6 rounded-full border border-slate-300/30 bg-slate-900/80 p-2 text-slate-200 hover:border-cyan-300/50 hover:text-cyan-100"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative h-[80vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-300/25">
              <Image src={selected.image} alt={selected.title} fill className="object-contain" sizes="90vw" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="font-display text-xs uppercase tracking-[0.24em] text-cyan-200">{selected.category}</p>
                <p className="mt-2 text-lg text-slate-100">{selected.title}</p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

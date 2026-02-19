"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FlaskConical, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/cn";
import { useBookingCart } from "@/context/BookingCartContext";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Vault" },
  { href: "/about", label: "The Lab" },
  { href: "/contact", label: "Book" }
];

export default function FloatingNavbar() {
  const pathname = usePathname();
  const { items } = useBookingCart();

  return (
    <motion.header
      initial={{ y: -36, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="fixed inset-x-0 top-4 z-[100] px-4"
    >
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-slate-400/20 bg-slate-950/55 px-4 py-3 backdrop-blur-xl shadow-[0_15px_50px_rgba(2,6,23,0.45)]">
        <Link href="/" className="group flex items-center gap-2" data-repel>
          <span className="rounded-lg border border-cyan-300/40 bg-cyan-300/10 p-1.5">
            <FlaskConical className="h-4 w-4 text-cyan-300" />
          </span>
          <span className="font-display text-xs tracking-[0.24em] text-slate-100 md:text-sm">ONYX AUTO LAB</span>
        </Link>

        <div className="hidden items-center gap-1 rounded-xl border border-slate-500/20 bg-slate-900/50 px-2 py-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-repel
                className={cn(
                  "rounded-lg px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition duration-300",
                  active
                    ? "bg-cyan-300/16 text-cyan-200 shadow-[0_0_25px_rgba(6,182,212,0.28)]"
                    : "text-slate-300 hover:bg-slate-800/70 hover:text-cyan-100"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <Link
          href="/contact"
          className="flex items-center gap-2 rounded-xl border border-slate-400/25 bg-slate-900/65 px-3 py-2 text-xs text-slate-200 transition hover:border-cyan-300/60 hover:text-cyan-100"
          data-repel
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="font-medium">Cart {items.length > 0 ? `(${items.length})` : ""}</span>
        </Link>
      </nav>
    </motion.header>
  );
}

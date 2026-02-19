"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { type MouseEvent, type PropsWithChildren } from "react";
import { cn } from "@/lib/cn";

// 1. Change the type to HTMLMotionProps to match motion.span
type MagneticButtonProps = PropsWithChildren<
  HTMLMotionProps<"span"> & {
    className?: string;
  }
>;

export default function MagneticButton({ children, className, ...props }: MagneticButtonProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLSpanElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (bounds.left + bounds.width / 2);
    const offsetY = event.clientY - (bounds.top + bounds.height / 2);

    rawX.set(offsetX * 0.22);
    rawY.set(offsetY * 0.22);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.span
      {...props} // Now TypeScript knows these props are compatible with Motion
      style={{ ...props.style, x, y }} // Merges existing styles with our motion values
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "inline-flex rounded-full border border-cyan-300/50 bg-cyan-300/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_28px_rgba(6,182,212,0.35)] backdrop-blur-md transition hover:bg-cyan-300/20",
        className
      )}
      // 2. Set data attributes to "true" string for TS compatibility
      data-repel="true"
    >
      {children}
    </motion.span>
  );
}
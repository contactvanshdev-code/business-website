"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { type MouseEvent, type PropsWithChildren } from "react";
import { cn } from "@/lib/cn"; // Adjust this path if your utility is in @/lib/utils

/**
 * We use Omit to remove standard React animation events that conflict 
 * with Framer Motion's internal prop names.
 */
type MagneticButtonProps = PropsWithChildren<
  Omit<HTMLMotionProps<"span">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag"> & {
    className?: string;
  }
>;

export default function MagneticButton({ 
  children, 
  className, 
  ...props 
}: MagneticButtonProps) {
  // Motion values for smooth tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  // Spring physics for that "magnetic" feel
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLSpanElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const bounds = currentTarget.getBoundingClientRect();
    
    // Calculate distance from center
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    // 0.22 is the "strength" of the pull
    rawX.set(offsetX * 0.22);
    rawY.set(offsetY * 0.22);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.span
      {...props}
      style={{ ...props.style, x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "inline-flex cursor-none rounded-full border border-cyan-300/50 bg-cyan-300/15 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-cyan-100 shadow-[0_0_28px_rgba(6,182,212,0.35)] backdrop-blur-md transition hover:bg-cyan-300/20",
        className
      )}
      data-magnetic="true"
      data-repel="true"
    >
      {children}
    </motion.span>
  );
}
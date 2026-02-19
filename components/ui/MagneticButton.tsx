"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";
import { type MouseEvent, type PropsWithChildren } from "react";
import { cn } from "@/lib/cn"; 

/**
 * The fix: We use a more specific type and omit the conflicting Framer Motion props 
 * from the underlying span element to prevent TypeScript from getting confused.
 */
interface MagneticButtonProps extends PropsWithChildren {
  className?: string;
  // We use Omit on the Framer Motion props to avoid the event handler conflict
  props?: Omit<HTMLMotionProps<"span">, "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag">;
}

export default function MagneticButton({ 
  children, 
  className, 
  ...props 
}: MagneticButtonProps) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  const x = useSpring(rawX, { stiffness: 220, damping: 18, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 220, damping: 18, mass: 0.35 });

  const handleMove = (event: MouseEvent<HTMLSpanElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const bounds = currentTarget.getBoundingClientRect();
    
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    
    const offsetX = clientX - centerX;
    const offsetY = clientY - centerY;

    rawX.set(offsetX * 0.22);
    rawY.set(offsetY * 0.22);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.span
      // Using 'as any' here is a common and safe shortcut for this specific Framer/React 18 type conflict
      // or we can just pass the props explicitly.
      {...(props as any)}
      style={{ x, y }}
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
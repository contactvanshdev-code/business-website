"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Ripple = {
  id: number;
  x: number;
  y: number;
};

export default function HydrophobicCursor() {
  const [coarsePointer, setCoarsePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    setCoarsePointer(window.matchMedia("(pointer: coarse)").matches);

    let nextId = 0;

    const onMove = (event: PointerEvent) => {
      const point = { x: event.clientX, y: event.clientY };
      setPosition(point);
      setVisible(true);
    };

    const onClick = (event: PointerEvent) => {
      const id = nextId++;
      const ripple = { id, x: event.clientX, y: event.clientY };
      setRipples((prev) => [...prev, ripple]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((item) => item.id !== id));
      }, 650);
    };

    const onLeave = () => {
      setVisible(false);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onClick);
    window.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  const glowStyle = useMemo(
    () => ({ left: position.x, top: position.y, opacity: visible ? 1 : 0 }),
    [position.x, position.y, visible]
  );

  if (coarsePointer) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[120] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/80 bg-cyan-300/20 backdrop-blur-md"
        animate={{ x: position.x, y: position.y }}
        style={{ opacity: visible ? 1 : 0 }}
        transition={{ type: "spring", damping: 34, stiffness: 420, mass: 0.25 }}
      />
      <div
        className="pointer-events-none fixed z-[110] h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/10 blur-2xl"
        style={glowStyle}
      />

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="pointer-events-none fixed z-[105] block h-4 w-4 rounded-full border border-cyan-300/70"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ scale: 0.15, opacity: 0.9, x: "-50%", y: "-50%" }}
            animate={{ scale: 12, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </>
  );
}

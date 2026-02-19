"use client";

import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useRef, useState } from "react";

import { cn } from "@/lib/cn";

type ComparisonSliderProps = {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
};

export default function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Before",
  afterLabel = "After",
  className
}: ComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(53);
  const activePointerId = useRef<number | null>(null);

  const updatePosition = (clientX: number) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(100, Math.max(0, percent));
    setPosition(clamped);
  };

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    activePointerId.current = event.pointerId;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePosition(event.clientX);
  };

  const continueDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) return;
    updatePosition(event.clientX);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    activePointerId.current = null;
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative h-[66vh] min-h-[420px] w-full touch-none select-none overflow-hidden rounded-3xl border border-slate-300/20 bg-slate-900/40 shadow-[0_30px_90px_rgba(2,6,23,0.55)]",
        className
      )}
      onPointerDown={beginDrag}
      onPointerMove={continueDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      aria-label="Before and after detailing comparison"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") setPosition((prev) => Math.max(0, prev - 3));
        if (event.key === "ArrowRight") setPosition((prev) => Math.min(100, prev + 3));
      }}
      style={{ cursor: "ew-resize" }}
    >
      <Image
        src={afterImage}
        alt="After detailing mirror finish"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image
          src={beforeImage}
          alt="Before detailing scratched paint"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />

      <div className="absolute left-5 top-5 rounded-full border border-slate-300/20 bg-slate-900/70 px-4 py-1 text-xs uppercase tracking-[0.2em] text-slate-200">
        {beforeLabel}
      </div>
      <div className="absolute right-5 top-5 rounded-full border border-cyan-300/35 bg-cyan-300/20 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100">
        {afterLabel}
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full border border-slate-300/20 bg-slate-900/75 px-5 py-2 text-[10px] uppercase tracking-[0.24em] text-slate-300">
        Drag to inspect paint transformation
      </div>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 w-px -translate-x-1/2 bg-cyan-200/90 shadow-[0_0_18px_rgba(6,182,212,0.9)]" />
        <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-200/80 bg-slate-900/85 text-cyan-100 shadow-[0_0_20px_rgba(6,182,212,0.45)]">
          <MoveHorizontal className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

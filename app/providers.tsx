"use client";

import type { PropsWithChildren } from "react";

import { BookingCartProvider } from "@/context/BookingCartContext";
import HydrophobicCursor from "@/components/ui/HydrophobicCursor";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <BookingCartProvider>
      <HydrophobicCursor />
      {children}
    </BookingCartProvider>
  );
}

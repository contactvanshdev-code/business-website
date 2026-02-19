"use client";

import { CalendarDays, CarFront, CheckCircle2, Truck } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/cn";
import { useBookingCart } from "@/context/BookingCartContext";

type VehicleType = "Sedan" | "SUV" | "Truck";
type PackageType = "Gold" | "Platinum";

const packagePricing: Record<PackageType, number> = {
  Gold: 1500,
  Platinum: 2650
};

const vehicleChoices: Array<{ label: VehicleType; icon: typeof CarFront }> = [
  { label: "Sedan", icon: CarFront },
  { label: "SUV", icon: CarFront },
  { label: "Truck", icon: Truck }
];

export default function BookingWizard() {
  const { addItem } = useBookingCart();
  const [step, setStep] = useState(1);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [pkg, setPkg] = useState<PackageType | null>(null);
  const [date, setDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const minDate = useMemo(() => new Date().toISOString().split("T")[0], []);

  const validateCurrentStep = () => {
    if (step === 1 && !vehicle) {
      setError("Select a vehicle type.");
      return false;
    }
    if (step === 2 && !pkg) {
      setError("Select a package.");
      return false;
    }
    if (step === 3 && !date) {
      setError("Pick a preferred date.");
      return false;
    }
    setError(null);
    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    setStep((prev) => Math.min(3, prev + 1));
  };

  const backStep = () => {
    setError(null);
    setStep((prev) => Math.max(1, prev - 1));
  };

  const submit = () => {
    if (!validateCurrentStep() || !vehicle || !pkg) return;

    addItem({
      id: `${pkg.toLowerCase()}-${vehicle.toLowerCase()}-${date}`,
      name: `${pkg} Package (${vehicle})`,
      price: packagePricing[pkg],
      category: "Booking"
    });

    setConfirmed(true);
  };

  return (
    <div className="rounded-2xl border border-slate-300/20 bg-slate-900/65 p-5 backdrop-blur-md">
      <div className="mb-6 flex items-center gap-2">
        {[1, 2, 3].map((index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                step >= index
                  ? "border-cyan-300/60 bg-cyan-300/20 text-cyan-100"
                  : "border-slate-400/30 bg-slate-800/70 text-slate-400"
              )}
            >
              {index}
            </div>
            {index < 3 ? <div className="h-px w-5 bg-slate-500/40" /> : null}
          </div>
        ))}
      </div>

      {confirmed ? (
        <div className="rounded-xl border border-cyan-300/35 bg-cyan-300/12 p-4">
          <p className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-[0.18em] text-cyan-100">
            <CheckCircle2 className="h-4 w-4" /> Booking Added
          </p>
          <p className="mt-2 text-sm text-slate-200">
            Your package selection has been added to the Booking Cart. Our team will confirm availability shortly.
          </p>
        </div>
      ) : null}

      {!confirmed && step === 1 ? (
        <div>
          <h3 className="font-display text-lg text-slate-100">Step 1: Vehicle Type</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {vehicleChoices.map((choice) => (
              <button
                key={choice.label}
                type="button"
                onClick={() => setVehicle(choice.label)}
                className={cn(
                  "rounded-xl border px-4 py-4 text-left transition",
                  vehicle === choice.label
                    ? "border-cyan-300/65 bg-cyan-300/12"
                    : "border-slate-300/20 bg-slate-950/50 hover:border-cyan-300/45"
                )}
                data-repel
              >
                <choice.icon className="h-5 w-5 text-cyan-300" />
                <p className="mt-2 text-sm text-slate-200">{choice.label}</p>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {!confirmed && step === 2 ? (
        <div>
          <h3 className="font-display text-lg text-slate-100">Step 2: Package</h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {(["Gold", "Platinum"] as PackageType[]).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPkg(option)}
                className={cn(
                  "rounded-xl border px-4 py-4 text-left transition",
                  pkg === option
                    ? "border-cyan-300/65 bg-cyan-300/12"
                    : "border-slate-300/20 bg-slate-950/50 hover:border-cyan-300/45"
                )}
                data-repel
              >
                <p className="font-display text-sm uppercase tracking-[0.2em] text-cyan-200">{option}</p>
                <p className="mt-1 text-slate-100">${packagePricing[option].toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {!confirmed && step === 3 ? (
        <div>
          <h3 className="font-display text-lg text-slate-100">Step 3: Preferred Date</h3>
          <div className="mt-4 rounded-xl border border-slate-300/20 bg-slate-950/55 p-4">
            <label className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-300">
              <CalendarDays className="h-4 w-4" /> Select Date
            </label>
            <input
              type="date"
              min={minDate}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="w-full rounded-lg border border-slate-300/25 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 outline-none ring-cyan-300/60 transition focus:ring-2"
            />
            <p className="mt-3 text-xs text-slate-400">
              Selection: {vehicle ?? "-"} / {pkg ?? "-"} / {date || "-"}
            </p>
          </div>
        </div>
      ) : null}

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

      {!confirmed ? (
        <div className="mt-6 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={backStep}
            disabled={step === 1}
            className="rounded-lg border border-slate-400/30 bg-slate-900/65 px-4 py-2 text-xs uppercase tracking-[0.18em] text-slate-300 transition disabled:cursor-not-allowed disabled:opacity-45"
          >
            Back
          </button>

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="rounded-lg border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300/25"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={submit}
              className="rounded-lg border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-xs uppercase tracking-[0.18em] text-cyan-100 transition hover:bg-cyan-300/25"
            >
              Confirm Booking
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertTriangle, ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { lenders } from "@/data/lenders";

/* ─── Constants ─── */

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA",
  "HI","ID","IL","IN","IA","KS","KY","LA","ME","MD",
  "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC",
  "SD","TN","TX","UT","VT","VA","WA","WV","WI","WY",
] as const;

const TIMELINES = [
  { label: "Less than 6 months", value: "less-than-6-months" },
  { label: "6–12 months ago", value: "6-12-months" },
  { label: "Over 1 year ago", value: "over-1-year" },
] as const;

const VEHICLE_TYPES = [
  { label: "Car", value: "car" },
  { label: "Truck", value: "truck" },
  { label: "SUV", value: "suv" },
  { label: "Motorcycle", value: "motorcycle" },
  { label: "Other", value: "other" },
] as const;

const LENDER_OPTIONS = [
  ...lenders.map((l) => ({ label: l.name, value: l.slug })),
  { label: "Other", value: "other" },
];

const VIOLATIONS = [
  { label: "Yelled, threatened, or argued with me or my family", value: 8000 },
  { label: "Cut locks, broke a gate, or damaged property", value: 12000 },
  { label: "Entered a closed garage or private area without permission", value: 15000 },
  { label: "Took the car while I was in it or about to drive", value: 10000 },
  { label: "Used fake police lights or impersonated law enforcement", value: 20000 },
  { label: "No notice before repossession", value: 10000 },
  { label: "Personal belongings not returned", value: 5000 },
] as const;

/* ─── Zod schema (Step 3 contact fields) ─── */

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Please enter a valid email"),
  state: z.string().min(1, "Please select your state"),
});

type ContactValues = z.infer<typeof contactSchema>;

/* ─── Slide animation variants ─── */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

/* ─── Props ─── */

interface InlineIntakeFormProps {
  variant?: "hero" | "page";
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  Component                                                         */
/* ═══════════════════════════════════════════════════════════════════ */

export default function InlineIntakeForm({ variant = "hero" }: InlineIntakeFormProps) {
  /* ── Step state ── */
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1);

  /* ── Step 1 state ── */
  const [timeline, setTimeline] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [lender, setLender] = useState("");
  const [otherLender, setOtherLender] = useState("");

  /* ── Step 2 state ── */
  const [violations, setViolations] = useState<string[]>([]);
  const [description, setDescription] = useState("");

  /* ── Submission state ── */
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  /* ── React Hook Form for step 3 ── */
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { firstName: "", lastName: "", phone: "", email: "", state: "" },
  });

  /* ── Navigation helpers ── */
  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 2));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 0));
  }, []);

  /* ── Violation toggle ── */
  const toggleViolation = useCallback((label: string) => {
    setViolations((prev) =>
      prev.includes(label) ? prev.filter((v) => v !== label) : [...prev, label]
    );
  }, []);

  /* ── Case value calculator ── */
  const estimatedValue = violations.reduce((sum, v) => {
    const match = VIOLATIONS.find((item) => item.label === v);
    return sum + (match?.value ?? 0);
  }, 0);

  /* ── Step 1 validation ── */
  const step1Valid = timeline !== "" && vehicleType !== "" && lender !== "" && (lender !== "other" || otherLender.trim() !== "");

  /* ── Submit ── */
  const onSubmit = async (contactData: ContactValues) => {
    setSubmitError(null);
    try {
      const payload = {
        // Contact (step 3)
        name: `${contactData.firstName} ${contactData.lastName}`,
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        email: contactData.email,
        phone: contactData.phone,
        state: contactData.state,
        // Qualifying (step 1)
        timeline,
        vehicleType,
        lenderName: lender === "other" ? otherLender : lender,
        // Violations (step 2)
        violations,
        description: description || undefined,
      };

      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    }
  };

  /* ═══════════════════ Success state ═══════════════════ */

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "rounded-2xl p-8 text-center shadow-xl",
          variant === "hero" ? "bg-white/95 backdrop-blur-sm" : "bg-white"
        )}
      >
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h3 className="mb-2 text-2xl font-bold text-navy">Thank You!</h3>
        <p className="text-lg text-gray-700">
          We&apos;ll contact you within 24 hours for your free case review.
        </p>
        <p className="mt-2 text-sm text-steel">
          Check your email and phone for our call.
        </p>
      </motion.div>
    );
  }

  /* ═══════════════════ Step indicator ═══════════════════ */

  const stepLabels = ["What Happened?", "Violations", "Contact Info"];

  const StepIndicator = () => (
    <div className="mb-5 flex items-center justify-center gap-2">
      {stepLabels.map((label, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition-colors",
                i < currentStep
                  ? "bg-[#D4A843] text-[#0D1B2A]"
                  : i === currentStep
                  ? "bg-[#D4A843] text-[#0D1B2A]"
                  : variant === "hero"
                  ? "bg-white/10 text-white/40"
                  : "bg-gray-200 text-gray-400"
              )}
            >
              {i < currentStep ? "✓" : i + 1}
            </div>
            <span
              className={cn(
                "hidden text-xs font-medium sm:block",
                i <= currentStep
                  ? variant === "hero"
                    ? "text-white"
                    : "text-[#0D1B2A]"
                  : variant === "hero"
                  ? "text-white/40"
                  : "text-gray-400"
              )}
            >
              {label}
            </span>
          </div>
          {i < stepLabels.length - 1 && (
            <div
              className={cn(
                "h-px w-6 sm:w-10",
                i < currentStep
                  ? "bg-[#D4A843]"
                  : variant === "hero"
                  ? "bg-white/15"
                  : "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );

  /* ═══════════════════ Radio Pill helper ═══════════════════ */

  const RadioPills = ({
    options,
    value,
    onChange,
  }: {
    options: readonly { label: string; value: string }[];
    value: string;
    onChange: (v: string) => void;
  }) => (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full border px-3 py-1.5 text-sm font-medium transition-all",
            value === opt.value
              ? "border-[#D4A843] bg-[#D4A843]/20 text-[#D4A843]"
              : variant === "hero"
              ? "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
              : "border-gray-300 text-gray-600 hover:border-gray-400"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  /* ═══════════════════ Render ═══════════════════ */

  const isHero = variant === "hero";
  const labelClass = cn("mb-1.5 block text-sm font-semibold", isHero ? "text-white/90" : "text-[#0D1B2A]");
  const inputClass = cn(
    "h-11 text-sm",
    isHero
      ? "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:border-[#D4A843] focus-visible:ring-[#D4A843]/30"
      : "border-gray-300 bg-gray-50 text-[#0D1B2A] placeholder:text-gray-400"
  );

  return (
    <div>
      <StepIndicator />

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          {/* ═══════════ STEP 1 — What Happened? ═══════════ */}
          {currentStep === 0 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="space-y-4"
            >
              {/* Timeline */}
              <div>
                <label className={labelClass}>When was your vehicle repossessed?</label>
                <RadioPills options={TIMELINES} value={timeline} onChange={setTimeline} />
                {timeline === "over-1-year" && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-2 flex items-start gap-1.5 text-xs text-amber-400"
                  >
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                    Cases over 1 year may be time-barred — but call us to check.
                  </motion.p>
                )}
              </div>

              {/* Vehicle Type */}
              <div>
                <label className={labelClass}>What kind of vehicle?</label>
                <RadioPills options={VEHICLE_TYPES} value={vehicleType} onChange={setVehicleType} />
              </div>

              {/* Lender */}
              <div>
                <label className={labelClass}>Who was the lender?</label>
                <Select value={lender} onValueChange={setLender}>
                  <SelectTrigger
                    className={cn(
                      "h-11 w-full text-sm",
                      isHero
                        ? "border-white/20 bg-white/10 text-white [&>span]:text-white/40 data-[state=open]:border-[#D4A843]"
                        : "border-gray-300 bg-gray-50 text-[#0D1B2A]",
                      lender && (isHero ? "[&>span]:text-white" : "")
                    )}
                  >
                    <SelectValue placeholder="Select your lender" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-60">
                    {LENDER_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {lender === "other" && (
                  <Input
                    placeholder="Enter lender name"
                    value={otherLender}
                    onChange={(e) => setOtherLender(e.target.value)}
                    className={cn("mt-2", inputClass)}
                  />
                )}
              </div>

              {/* Next */}
              <button
                type="button"
                onClick={goNext}
                disabled={!step1Valid}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-[#D4A843] text-sm font-bold text-[#0D1B2A] transition-all hover:brightness-110 disabled:pointer-events-none disabled:opacity-40"
              >
                Continue <ChevronRight className="ml-1 h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* ═══════════ STEP 2 — Violations ═══════════ */}
          {currentStep === 1 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="space-y-4"
            >
              <div>
                <p className={cn("text-sm font-bold", isHero ? "text-white" : "text-[#0D1B2A]")}>
                  Check all that apply
                </p>
                <p className={cn("text-xs", isHero ? "text-[#D4A843]" : "text-[#D4A843]")}>
                  Each violation increases your case value
                </p>
              </div>

              <div className="space-y-2">
                {VIOLATIONS.map((v) => {
                  const checked = violations.includes(v.label);
                  return (
                    <label
                      key={v.label}
                      className={cn(
                        "flex cursor-pointer items-start gap-2.5 rounded-lg border px-3 py-2 transition-all",
                        checked
                          ? "border-[#D4A843]/50 bg-[#D4A843]/10"
                          : isHero
                          ? "border-white/10 hover:border-white/20"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleViolation(v.label)}
                        className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-[#D4A843]"
                      />
                      <span
                        className={cn(
                          "text-sm leading-tight",
                          checked
                            ? "text-[#D4A843] font-medium"
                            : isHero
                            ? "text-white/70"
                            : "text-gray-600"
                        )}
                      >
                        {v.label}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Estimated value */}
              <motion.div
                animate={{ scale: estimatedValue > 0 ? [1, 1.02, 1] : 1 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "rounded-xl px-4 py-3 text-center",
                  estimatedValue > 0
                    ? "bg-[#D4A843]/15"
                    : isHero
                    ? "bg-white/5"
                    : "bg-gray-100"
                )}
              >
                <p className={cn("text-xs font-medium", isHero ? "text-white/60" : "text-gray-500")}>
                  Estimated Case Value
                </p>
                <p className="text-2xl font-extrabold text-[#D4A843]">
                  {estimatedValue > 0 ? `$${estimatedValue.toLocaleString()}+` : "$0"}
                </p>
              </motion.div>

              {/* Optional description */}
              <Textarea
                placeholder="Tell us what happened (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className={cn(
                  "resize-none text-sm",
                  isHero
                    ? "border-white/20 bg-white/10 text-white placeholder:text-white/40 focus-visible:border-[#D4A843] focus-visible:ring-[#D4A843]/30"
                    : "border-gray-300 bg-gray-50 placeholder:text-gray-400"
                )}
              />

              {/* Navigation */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  onClick={goBack}
                  variant="outline"
                  className={cn(
                    "h-11 flex-1 text-sm font-semibold",
                    isHero
                      ? "border-white/20 bg-transparent text-white hover:bg-white/10"
                      : "border-gray-300"
                  )}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" /> Back
                </Button>
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex h-11 flex-[2] items-center justify-center gap-2 rounded-md bg-[#D4A843] text-sm font-bold text-[#0D1B2A] transition-all hover:brightness-110"
                >
                  Continue <ChevronRight className="ml-1 h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* ═══════════ STEP 3 — Contact Info ═══════════ */}
          {currentStep === 2 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: "easeOut" as const }}
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <p className={cn("text-sm font-bold", isHero ? "text-white" : "text-[#0D1B2A]")}>
                  Get Your Free Evaluation
                </p>

                {/* First / Last name */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Input
                      placeholder="First Name"
                      {...register("firstName")}
                      className={cn(inputClass, errors.firstName && "border-red-400 focus-visible:ring-red-200")}
                    />
                    {errors.firstName && <p className="text-xs text-red-400">{errors.firstName.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Input
                      placeholder="Last Name"
                      {...register("lastName")}
                      className={cn(inputClass, errors.lastName && "border-red-400 focus-visible:ring-red-200")}
                    />
                    {errors.lastName && <p className="text-xs text-red-400">{errors.lastName.message}</p>}
                  </div>
                </div>

                {/* Phone / Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Input
                      type="tel"
                      placeholder="Phone"
                      {...register("phone")}
                      className={cn(inputClass, errors.phone && "border-red-400 focus-visible:ring-red-200")}
                    />
                    {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}
                  </div>
                  <div className="space-y-1">
                    <Input
                      type="email"
                      placeholder="Email"
                      {...register("email")}
                      className={cn(inputClass, errors.email && "border-red-400 focus-visible:ring-red-200")}
                    />
                    {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                  </div>
                </div>

                {/* State */}
                <div className="space-y-1">
                  <Select
                    onValueChange={(value) => {
                      setValue("state", value);
                      trigger("state");
                    }}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-11 w-full text-sm",
                        isHero
                          ? "border-white/20 bg-white/10 text-white [&>span]:text-white/40 data-[state=open]:border-[#D4A843]"
                          : "border-gray-300 bg-gray-50 text-[#0D1B2A]"
                      )}
                    >
                      <SelectValue placeholder="Select your state" />
                    </SelectTrigger>
                    <SelectContent position="popper" className="max-h-60">
                      {US_STATES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.state && <p className="text-xs text-red-400">{errors.state.message}</p>}
                </div>

                {/* Navigation + Submit */}
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={goBack}
                    variant="outline"
                    className={cn(
                      "h-11 flex-1 text-sm font-semibold",
                      isHero
                        ? "border-white/20 bg-transparent text-white hover:bg-white/10"
                        : "border-gray-300"
                    )}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Back
                  </Button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex h-11 flex-[2] items-center justify-center gap-2 rounded-md bg-[#D4A843] text-sm font-bold text-[#0D1B2A] transition-all hover:brightness-110 disabled:pointer-events-none disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Get My Free Case Review"
                    )}
                  </button>
                </div>

                {submitError && (
                  <p className="text-center text-xs text-red-400">{submitError}</p>
                )}

                <p className={cn(
                  "text-center text-xs",
                  isHero ? "text-white/40" : "text-gray-400"
                )}>
                  Free &amp; confidential. No obligation.
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

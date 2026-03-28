"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Car,
  PhoneOff,
  FileWarning,
  Check,
  ChevronRight,
  ChevronLeft,
  Loader2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn, VANITY_HREF } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const;

type CaseType = "repo" | "debt" | "credit";
type Timeline = "30days" | "1-6months" | "6-12months" | "over1year";

const STEP_LABELS = [
  "Case Type",
  "Timeline",
  "Details",
  "Contact",
  "Confirmation",
];

const CASE_TYPE_OPTIONS = [
  {
    value: "repo" as CaseType,
    icon: Car,
    title: "Vehicle Repossession",
    description: "My vehicle was wrongfully repossessed",
  },
  {
    value: "debt" as CaseType,
    icon: PhoneOff,
    title: "Debt Collection Harassment",
    description: "I'm being harassed by debt collectors",
  },
  {
    value: "credit" as CaseType,
    icon: FileWarning,
    title: "Credit Report Errors",
    description: "There are errors on my credit report",
  },
];

const TIMELINE_OPTIONS = [
  { value: "30days" as Timeline, label: "Within the last 30 days" },
  { value: "1-6months" as Timeline, label: "1-6 months ago" },
  { value: "6-12months" as Timeline, label: "6-12 months ago" },
  { value: "over1year" as Timeline, label: "Over 1 year ago" },
];

const REPO_VIOLATIONS = [
  "No prior notice",
  "Breach of peace",
  "During bankruptcy stay",
  "Personal property not returned",
  "Deficiency balance pursued",
  "Threatened or harassed",
];

const DEBT_VIOLATIONS = [
  "Excessive calls",
  "Workplace calls",
  "Threats",
  "Third-party contact",
  "False amount claimed",
];

const CREDIT_BUREAUS = ["Equifax", "Experian", "TransUnion"];

const CREDIT_ISSUES = [
  "Inaccurate balance",
  "Mixed file",
  "Identity theft",
  "Re-inserted info",
];

/* ------------------------------------------------------------------ */
/*  Zod Schema for Step 4 (Contact)                                    */
/* ------------------------------------------------------------------ */

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .min(10, "Please enter a valid phone number"),
  state: z.string().min(1, "Please select your state"),
  bestTimeToCall: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

/* ------------------------------------------------------------------ */
/*  Wizard Data Shape                                                  */
/* ------------------------------------------------------------------ */

interface WizardData {
  caseType: CaseType | null;
  timeline: Timeline | null;
  // Details - repo
  lenderName: string;
  repoViolations: string[];
  // Details - debt
  collectorName: string;
  debtViolations: string[];
  // Details - credit
  creditBureaus: string[];
  creditIssues: string[];
  // Details - shared
  description: string;
  // Contact
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  state: string;
  bestTimeToCall: string;
}

/* ------------------------------------------------------------------ */
/*  Slide animation variants                                           */
/* ------------------------------------------------------------------ */

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                            */
/* ------------------------------------------------------------------ */

function CustomCheckbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex items-center gap-3 rounded-lg border-2 px-4 py-3 text-left text-sm font-medium transition-all",
        checked
          ? "border-gold bg-gold/10 text-navy"
          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
      )}
    >
      <span
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded border-2 transition-all",
          checked
            ? "border-gold bg-gold text-white"
            : "border-gray-300 bg-white"
        )}
      >
        {checked && <Check className="size-3" />}
      </span>
      {label}
    </button>
  );
}

function NavigationButtons({
  onBack,
  onNext,
  nextLabel = "Next",
  nextDisabled = false,
  isLoading = false,
  showBack = true,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  isLoading?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="mt-8 flex items-center justify-between gap-4">
      {showBack && onBack ? (
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="h-12 gap-2 border-gray-300 px-6 text-base text-gray-700 hover:bg-gray-50"
        >
          <ChevronLeft className="size-4" />
          Back
        </Button>
      ) : (
        <div />
      )}
      <Button
        type="button"
        onClick={onNext}
        disabled={nextDisabled || isLoading}
        className={cn(
          "h-12 gap-2 px-8 text-base font-bold transition-all",
          nextLabel === "Submit My Case"
            ? "bg-gold text-navy hover:bg-gold-dark"
            : "bg-gold text-navy hover:bg-gold-dark"
        )}
      >
        {isLoading ? (
          <>
            <Loader2 className="size-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            {nextLabel}
            {nextLabel !== "Submit My Case" && (
              <ChevronRight className="size-4" />
            )}
          </>
        )}
      </Button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Progress Bar                                                       */
/* ------------------------------------------------------------------ */

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-8 px-2">
      {/* Step indicators */}
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, i) => {
          const stepNum = i + 1;
          const isCompleted = stepNum < currentStep;
          const isCurrent = stepNum === currentStep;

          return (
            <div key={label} className="flex flex-1 flex-col items-center">
              <div className="relative flex w-full items-center justify-center">
                {/* Connector line (left side) */}
                {i > 0 && (
                  <div
                    className={cn(
                      "absolute right-1/2 h-0.5 w-full",
                      stepNum <= currentStep ? "bg-gold" : "bg-gray-200"
                    )}
                  />
                )}
                {/* Connector line (right side) */}
                {i < STEP_LABELS.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-1/2 h-0.5 w-full",
                      stepNum < currentStep ? "bg-gold" : "bg-gray-200"
                    )}
                  />
                )}
                {/* Step circle */}
                <motion.div
                  layout
                  className={cn(
                    "relative z-10 flex size-10 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors",
                    isCompleted
                      ? "border-green-500 bg-green-500 text-white"
                      : isCurrent
                        ? "border-gold bg-gold text-navy"
                        : "border-gray-300 bg-white text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check className="size-5" />
                    </motion.div>
                  ) : (
                    stepNum
                  )}
                </motion.div>
              </div>
              {/* Label */}
              <span
                className={cn(
                  "mt-2 text-xs font-medium transition-colors",
                  isCurrent
                    ? "text-gold"
                    : isCompleted
                      ? "text-green-600"
                      : "text-gray-400"
                )}
              >
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">
                  {stepNum === 1
                    ? "Type"
                    : stepNum === 2
                      ? "When"
                      : stepNum === 3
                        ? "Info"
                        : stepNum === 4
                          ? "You"
                          : "Done"}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 1 - Case Type                                                 */
/* ------------------------------------------------------------------ */

function StepCaseType({
  caseType,
  onSelect,
  onNext,
}: {
  caseType: CaseType | null;
  onSelect: (type: CaseType) => void;
  onNext: () => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-navy md:text-3xl">
        What happened to you?
      </h2>
      <p className="mb-8 text-center text-steel">
        Select the option that best describes your situation.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {CASE_TYPE_OPTIONS.map((option) => {
          const Icon = option.icon;
          const isSelected = caseType === option.value;

          return (
            <motion.button
              key={option.value}
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(option.value)}
              className={cn(
                "group flex flex-col items-center gap-4 rounded-xl border-2 p-6 text-center transition-all",
                isSelected
                  ? "border-gold bg-gold/10 shadow-lg shadow-gold/10"
                  : "border-gray-200 bg-white hover:border-gold/50 hover:shadow-md"
              )}
            >
              <div
                className={cn(
                  "flex size-16 items-center justify-center rounded-full transition-colors",
                  isSelected
                    ? "bg-gold text-navy"
                    : "bg-gray-100 text-steel group-hover:bg-gold/20 group-hover:text-navy"
                )}
              >
                <Icon className="size-8" />
              </div>
              <div>
                <h3
                  className={cn(
                    "text-lg font-bold transition-colors",
                    isSelected ? "text-navy" : "text-gray-800"
                  )}
                >
                  {option.title}
                </h3>
                <p className="mt-1 text-sm text-steel">{option.description}</p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex size-6 items-center justify-center rounded-full bg-gold"
                >
                  <Check className="size-4 text-navy" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      <NavigationButtons
        onNext={onNext}
        nextDisabled={!caseType}
        showBack={false}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 2 - Timeline                                                  */
/* ------------------------------------------------------------------ */

function StepTimeline({
  timeline,
  onSelect,
  onNext,
  onBack,
}: {
  timeline: Timeline | null;
  onSelect: (t: Timeline) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-navy md:text-3xl">
        When did this happen?
      </h2>
      <p className="mb-8 text-center text-steel">
        This helps us understand the urgency and applicable statutes.
      </p>

      <div className="mx-auto grid max-w-lg gap-3">
        {TIMELINE_OPTIONS.map((option) => {
          const isSelected = timeline === option.value;
          return (
            <motion.button
              key={option.value}
              type="button"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => onSelect(option.value)}
              className={cn(
                "flex items-center gap-4 rounded-xl border-2 px-6 py-4 text-left font-medium transition-all",
                isSelected
                  ? "border-gold bg-gold/10 text-navy shadow-md shadow-gold/10"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gold/50 hover:bg-gray-50"
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all",
                  isSelected
                    ? "border-gold bg-gold text-white"
                    : "border-gray-300"
                )}
              >
                {isSelected && <Check className="size-3.5" />}
              </span>
              <span className="text-base">{option.label}</span>
            </motion.button>
          );
        })}
      </div>

      <NavigationButtons
        onBack={onBack}
        onNext={onNext}
        nextDisabled={!timeline}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 3 - Details                                                   */
/* ------------------------------------------------------------------ */

function StepDetails({
  data,
  onChange,
  onNext,
  onBack,
}: {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const toggleItem = (
    field: "repoViolations" | "debtViolations" | "creditBureaus" | "creditIssues",
    item: string
  ) => {
    const current = data[field];
    if (current.includes(item)) {
      onChange({ [field]: current.filter((v) => v !== item) });
    } else {
      onChange({ [field]: [...current, item] });
    }
  };

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-navy md:text-3xl">
        Tell us more about your situation
      </h2>
      <p className="mb-8 text-center text-steel">
        Check all that apply. The more detail, the better we can evaluate your
        case.
      </p>

      <div className="space-y-6">
        {/* --- Repossession fields --- */}
        {data.caseType === "repo" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="lenderName" className="text-navy">
                Lender / Finance Company Name
              </Label>
              <Input
                id="lenderName"
                placeholder="e.g. Capital One Auto Finance"
                value={data.lenderName}
                onChange={(e) => onChange({ lenderName: e.target.value })}
                className="h-12 border-gray-300 bg-gray-50 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-navy">
                Which violations occurred? (check all that apply)
              </Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {REPO_VIOLATIONS.map((v) => (
                  <CustomCheckbox
                    key={v}
                    label={v}
                    checked={data.repoViolations.includes(v)}
                    onChange={() => toggleItem("repoViolations", v)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* --- Debt collection fields --- */}
        {data.caseType === "debt" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="collectorName" className="text-navy">
                Debt Collector / Agency Name
              </Label>
              <Input
                id="collectorName"
                placeholder="e.g. Midland Credit Management"
                value={data.collectorName}
                onChange={(e) => onChange({ collectorName: e.target.value })}
                className="h-12 border-gray-300 bg-gray-50 text-base"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-navy">
                Which violations occurred? (check all that apply)
              </Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {DEBT_VIOLATIONS.map((v) => (
                  <CustomCheckbox
                    key={v}
                    label={v}
                    checked={data.debtViolations.includes(v)}
                    onChange={() => toggleItem("debtViolations", v)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* --- Credit report fields --- */}
        {data.caseType === "credit" && (
          <>
            <div className="space-y-3">
              <Label className="text-navy">
                Which credit bureaus have errors? (check all that apply)
              </Label>
              <div className="grid gap-2 sm:grid-cols-3">
                {CREDIT_BUREAUS.map((b) => (
                  <CustomCheckbox
                    key={b}
                    label={b}
                    checked={data.creditBureaus.includes(b)}
                    onChange={() => toggleItem("creditBureaus", b)}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-navy">
                Type of issue (check all that apply)
              </Label>
              <div className="grid gap-2 sm:grid-cols-2">
                {CREDIT_ISSUES.map((issue) => (
                  <CustomCheckbox
                    key={issue}
                    label={issue}
                    checked={data.creditIssues.includes(issue)}
                    onChange={() => toggleItem("creditIssues", issue)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* --- Shared description textarea --- */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-navy">
            Describe what happened (optional but helpful)
          </Label>
          <Textarea
            id="description"
            placeholder="Please provide any additional details about your situation..."
            rows={4}
            value={data.description}
            onChange={(e) => onChange({ description: e.target.value })}
            className="min-h-[120px] border-gray-300 bg-gray-50 text-base"
          />
        </div>
      </div>

      <NavigationButtons onBack={onBack} onNext={onNext} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 4 - Contact Info                                              */
/* ------------------------------------------------------------------ */

function StepContact({
  data,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
  submitError,
}: {
  data: WizardData;
  onChange: (updates: Partial<WizardData>) => void;
  onBack: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  submitError: string | null;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      state: data.state,
      bestTimeToCall: data.bestTimeToCall,
    },
  });

  const handleFormSubmit = (formData: ContactFormValues) => {
    onChange({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      state: formData.state,
      bestTimeToCall: formData.bestTimeToCall || "",
    });
    // Small timeout so state updates before submission
    setTimeout(onSubmit, 0);
  };

  return (
    <div>
      <h2 className="mb-2 text-center font-heading text-2xl font-bold text-navy md:text-3xl">
        Almost done! How can we reach you?
      </h2>
      <p className="mb-8 text-center text-steel">
        Your information is 100% confidential and secure.
      </p>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="space-y-5"
        noValidate
      >
        {/* Name row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-navy">
              First Name <span className="text-red">*</span>
            </Label>
            <Input
              id="firstName"
              placeholder="John"
              {...register("firstName")}
              className={cn(
                "h-12 border-gray-300 bg-gray-50 text-base",
                errors.firstName && "border-red focus-visible:ring-red/20"
              )}
            />
            {errors.firstName && (
              <p className="text-xs text-red">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-navy">
              Last Name <span className="text-red">*</span>
            </Label>
            <Input
              id="lastName"
              placeholder="Doe"
              {...register("lastName")}
              className={cn(
                "h-12 border-gray-300 bg-gray-50 text-base",
                errors.lastName && "border-red focus-visible:ring-red/20"
              )}
            />
            {errors.lastName && (
              <p className="text-xs text-red">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-navy">
            Email Address <span className="text-red">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className={cn(
              "h-12 border-gray-300 bg-gray-50 text-base",
              errors.email && "border-red focus-visible:ring-red/20"
            )}
          />
          {errors.email && (
            <p className="text-xs text-red">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-navy">
            Phone Number <span className="text-red">*</span>
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            {...register("phone")}
            className={cn(
              "h-12 border-gray-300 bg-gray-50 text-base",
              errors.phone && "border-red focus-visible:ring-red/20"
            )}
          />
          {errors.phone && (
            <p className="text-xs text-red">{errors.phone.message}</p>
          )}
        </div>

        {/* State & Best Time row */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-navy">
              State <span className="text-red">*</span>
            </Label>
            <Select
              defaultValue={data.state || undefined}
              onValueChange={(value) => {
                setValue("state", value);
                trigger("state");
              }}
            >
              <SelectTrigger
                className={cn(
                  "h-12 w-full border-gray-300 bg-gray-50 text-base",
                  errors.state && "border-red focus-visible:ring-red/20"
                )}
              >
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent position="popper" className="max-h-60">
                {US_STATES.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.state && (
              <p className="text-xs text-red">{errors.state.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label className="text-navy">Best Time to Call (optional)</Label>
            <Select
              defaultValue={data.bestTimeToCall || undefined}
              onValueChange={(value) => {
                setValue("bestTimeToCall", value);
              }}
            >
              <SelectTrigger className="h-12 w-full border-gray-300 bg-gray-50 text-base">
                <SelectValue placeholder="Select a time" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="morning">Morning (9am - 12pm)</SelectItem>
                <SelectItem value="afternoon">
                  Afternoon (12pm - 5pm)
                </SelectItem>
                <SelectItem value="evening">Evening (5pm - 8pm)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg border border-red/20 bg-red/5 p-4 text-center text-sm text-red"
          >
            {submitError}
          </motion.div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-12 gap-2 border-gray-300 px-6 text-base text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="size-4" />
            Back
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 gap-2 bg-gold px-8 text-base font-bold text-navy hover:bg-gold-dark"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit My Case"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Step 5 - Confirmation                                              */
/* ------------------------------------------------------------------ */

function StepConfirmation() {
  const nextSteps = [
    {
      number: "1",
      text: "A case specialist will review your information",
    },
    {
      number: "2",
      text: "We'll contact you within 24 hours",
    },
    {
      number: "3",
      text: "If you have a case, we handle everything \u2014 no upfront cost",
    },
  ];

  return (
    <div className="text-center">
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="mx-auto mb-6 flex size-24 items-center justify-center rounded-full bg-green-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.3,
          }}
        >
          <Check className="size-12 text-green-600" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-2 font-heading text-2xl font-bold text-navy md:text-3xl"
      >
        Thank You! Your Case is Being Reviewed
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-8 text-steel"
      >
        We appreciate you sharing your situation with us.
      </motion.p>

      {/* What happens next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mx-auto mb-8 max-w-md rounded-xl border border-gray-200 bg-gray-50 p-6"
      >
        <h3 className="mb-4 text-lg font-bold text-navy">
          What happens next?
        </h3>
        <div className="space-y-4 text-left">
          {nextSteps.map((step) => (
            <div key={step.number} className="flex items-start gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-navy">
                {step.number}
              </span>
              <p className="text-sm leading-relaxed text-gray-700">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        <a
          href={VANITY_HREF}
          className="inline-flex h-12 items-center gap-2 rounded-md bg-[#C1121F] px-8 text-base font-bold text-white transition-colors hover:bg-[#C1121F]/90"
        >
          Call Us Now
        </a>
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-md border-2 border-gray-300 px-6 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50"
        >
          Return to Homepage
          <ArrowRight className="size-4" />
        </Link>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Wizard                                                        */
/* ------------------------------------------------------------------ */

export default function IntakeWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [wizardData, setWizardData] = useState<WizardData>({
    caseType: null,
    timeline: null,
    lenderName: "",
    repoViolations: [],
    collectorName: "",
    debtViolations: [],
    creditBureaus: [],
    creditIssues: [],
    description: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "",
    bestTimeToCall: "",
  });

  const updateData = useCallback((updates: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...updates }));
  }, []);

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrentStep((s) => Math.min(s + 1, 5));
  }, []);

  const goBack = useCallback(() => {
    setDirection(-1);
    setCurrentStep((s) => Math.max(s - 1, 1));
  }, []);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(wizardData),
      });

      const result = await response.json();

      if (result.success) {
        setDirection(1);
        setCurrentStep(5);
      } else {
        setSubmitError(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch {
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }, [wizardData]);

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        {/* Progress bar - hidden on confirmation step */}
        {currentStep < 5 && (
          <div className="border-b border-gray-100 bg-gray-50/50 px-6 pt-6 pb-2">
            <ProgressBar currentStep={currentStep} />
          </div>
        )}

        {/* Step content */}
        <div className="relative min-h-[420px] px-6 py-8 md:px-10">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
            >
              {currentStep === 1 && (
                <StepCaseType
                  caseType={wizardData.caseType}
                  onSelect={(type) => updateData({ caseType: type })}
                  onNext={goNext}
                />
              )}

              {currentStep === 2 && (
                <StepTimeline
                  timeline={wizardData.timeline}
                  onSelect={(t) => updateData({ timeline: t })}
                  onNext={goNext}
                  onBack={goBack}
                />
              )}

              {currentStep === 3 && (
                <StepDetails
                  data={wizardData}
                  onChange={updateData}
                  onNext={goNext}
                  onBack={goBack}
                />
              )}

              {currentStep === 4 && (
                <StepContact
                  data={wizardData}
                  onChange={updateData}
                  onBack={goBack}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                />
              )}

              {currentStep === 5 && <StepConfirmation />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Security note */}
      {currentStep < 5 && (
        <p className="mt-4 text-center text-xs text-steel">
          Your information is encrypted and 100% confidential. We will never
          share your data.
        </p>
      )}
    </div>
  );
}

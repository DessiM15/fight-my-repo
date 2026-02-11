// =============================================================================
// Zod Validation Schemas for Sue The Collector
// =============================================================================

import { z } from "zod";

// =============================================================================
// Inline Intake Form Schema (simple contact form)
// =============================================================================

export const inlineIntakeSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-().+]+$/,
      "Please enter a valid phone number"
    ),
  state: z
    .string()
    .min(1, "Please select your state"),
});

export type InlineIntakeValues = z.infer<typeof inlineIntakeSchema>;

// =============================================================================
// Wizard Step Schemas (multi-step intake form)
// =============================================================================

/**
 * Step 1: Contact Information
 */
export const wizardStep1Schema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-().+]+$/,
      "Please enter a valid phone number"
    ),
  state: z
    .string()
    .min(1, "Please select your state"),
});

export type WizardStep1Values = z.infer<typeof wizardStep1Schema>;

/**
 * Step 2: Vehicle & Lender Information
 */
export const wizardStep2Schema = z.object({
  vehicleYear: z
    .string()
    .min(4, "Please enter the vehicle year")
    .max(4, "Please enter a valid 4-digit year"),
  vehicleMake: z
    .string()
    .min(1, "Vehicle make is required"),
  vehicleModel: z
    .string()
    .min(1, "Vehicle model is required"),
  lenderName: z
    .string()
    .min(1, "Lender name is required"),
});

export type WizardStep2Values = z.infer<typeof wizardStep2Schema>;

/**
 * Step 3: Repossession Details
 */
export const wizardStep3Schema = z.object({
  repoDate: z
    .string()
    .min(1, "Approximate repossession date is required"),
  wasCurrentOnPayments: z
    .enum(["yes", "no", "unsure"], {
      error: "Please select whether you were current on payments",
    }),
  receivedNotice: z
    .enum(["yes", "no", "unsure"], {
      error: "Please indicate if you received notice",
    }),
  breachOfPeace: z
    .enum(["yes", "no", "unsure"], {
      error: "Please indicate if there was aggressive behavior",
    }),
});

export type WizardStep3Values = z.infer<typeof wizardStep3Schema>;

/**
 * Step 4: Violations & Additional Details
 */
export const wizardStep4Schema = z.object({
  selectedViolations: z
    .array(z.string())
    .min(1, "Please select at least one violation that applies"),
  additionalDetails: z
    .string()
    .max(2000, "Please keep your description under 2000 characters")
    .optional(),
});

export type WizardStep4Values = z.infer<typeof wizardStep4Schema>;

// =============================================================================
// Combined Full Intake Schema (all wizard steps merged)
// =============================================================================

export const fullIntakeSchema = wizardStep1Schema
  .merge(wizardStep2Schema)
  .merge(wizardStep3Schema)
  .merge(wizardStep4Schema);

export type FullIntakeValues = z.infer<typeof fullIntakeSchema>;

// =============================================================================
// Chat Form Schema (from chatbot flow)
// =============================================================================

export const chatFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-().+]+$/,
      "Please enter a valid phone number"
    ),
  email: z
    .string()
    .email("Please enter a valid email address")
    .optional()
    .or(z.literal("")),
  issueType: z
    .string()
    .min(1, "Issue type is required"),
});

export type ChatFormValues = z.infer<typeof chatFormSchema>;

// =============================================================================
// Newsletter / Simple Email Schema
// =============================================================================

export const emailSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address"),
});

export type EmailValues = z.infer<typeof emailSchema>;

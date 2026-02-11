// =============================================================================
// Violation Data for Sue The Collector - Wrongful Repossession Violations
// =============================================================================

export interface Violation {
  id: string;
  text: string;
  category: string;
  commonValue: number;
}

export interface ViolationCategory {
  name: string;
  icon: string;
  violations: Violation[];
}

export const violationCategories: ViolationCategory[] = [
  {
    name: "Repossession Violations",
    icon: "car",
    violations: [
      { id: "repo-1", text: "Breach of peace during repossession", category: "repo", commonValue: 5000 },
      { id: "repo-2", text: "No proper notice before repossession", category: "repo", commonValue: 3000 },
      { id: "repo-3", text: "Repossessed wrong vehicle", category: "repo", commonValue: 8000 },
      { id: "repo-4", text: "Repossession during active bankruptcy", category: "repo", commonValue: 10000 },
      { id: "repo-5", text: "Self-help repo without legal right", category: "repo", commonValue: 5000 },
    ],
  },
  {
    name: "Notice Violations",
    icon: "mail",
    violations: [
      { id: "notice-1", text: "No right-to-cure notice before repossession", category: "notice", commonValue: 4000 },
      { id: "notice-2", text: "No post-repossession notice sent", category: "notice", commonValue: 3500 },
      { id: "notice-3", text: "Incorrect information in repossession notice", category: "notice", commonValue: 3000 },
      { id: "notice-4", text: "Notice sent to wrong address", category: "notice", commonValue: 2500 },
      { id: "notice-5", text: "No notice of right to redeem the vehicle", category: "notice", commonValue: 4500 },
    ],
  },
  {
    name: "Deficiency Balance Violations",
    icon: "dollar-sign",
    violations: [
      { id: "deficiency-1", text: "Vehicle sold in a commercially unreasonable manner", category: "deficiency", commonValue: 6000 },
      { id: "deficiency-2", text: "Inflated deficiency balance after sale", category: "deficiency", commonValue: 5000 },
      { id: "deficiency-3", text: "No proper accounting of sale proceeds", category: "deficiency", commonValue: 4000 },
      { id: "deficiency-4", text: "Sued for deficiency without proper notice of sale", category: "deficiency", commonValue: 7000 },
    ],
  },
  {
    name: "Personal Property Violations",
    icon: "briefcase",
    violations: [
      { id: "property-1", text: "Personal belongings not returned after repossession", category: "property", commonValue: 3000 },
      { id: "property-2", text: "Personal property damaged during repossession", category: "property", commonValue: 4000 },
      { id: "property-3", text: "Lender refused to allow retrieval of personal items", category: "property", commonValue: 2500 },
      { id: "property-4", text: "Personal property sold or discarded without notice", category: "property", commonValue: 5000 },
    ],
  },
  {
    name: "Harassment & Threats",
    icon: "alert-triangle",
    violations: [
      { id: "harass-1", text: "Threatening arrest or criminal charges over the debt", category: "harassment", commonValue: 5000 },
      { id: "harass-2", text: "Calling at unreasonable hours (before 8am or after 9pm)", category: "harassment", commonValue: 3000 },
      { id: "harass-3", text: "Contacting employer about the debt", category: "harassment", commonValue: 4000 },
      { id: "harass-4", text: "Using obscene or abusive language", category: "harassment", commonValue: 5000 },
      { id: "harass-5", text: "Repeated excessive calls intended to annoy or harass", category: "harassment", commonValue: 3500 },
    ],
  },
  {
    name: "Credit Reporting Violations",
    icon: "file-text",
    violations: [
      { id: "credit-1", text: "Reporting inaccurate repossession information to credit bureaus", category: "credit", commonValue: 4000 },
      { id: "credit-2", text: "Failing to report account as disputed", category: "credit", commonValue: 3000 },
      { id: "credit-3", text: "Reporting debt after it was discharged in bankruptcy", category: "credit", commonValue: 5000 },
      { id: "credit-4", text: "Continuing to report after dispute without investigation", category: "credit", commonValue: 4500 },
      { id: "credit-5", text: "Reporting wrong balance or account status", category: "credit", commonValue: 3500 },
    ],
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get all violations across all categories as a flat array.
 */
export function getAllViolations(): Violation[] {
  return violationCategories.flatMap((cat) => cat.violations);
}

/**
 * Find a violation by its ID.
 */
export function getViolationById(id: string): Violation | undefined {
  return getAllViolations().find((v) => v.id === id);
}

/**
 * Calculate estimated value from an array of violation IDs.
 */
export function calculateEstimatedValue(violationIds: string[]): number {
  return violationIds.reduce((total, id) => {
    const violation = getViolationById(id);
    return total + (violation?.commonValue ?? 0);
  }, 0);
}

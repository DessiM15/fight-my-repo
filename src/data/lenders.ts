// =============================================================================
// Lender Data for Fight My Repo - Auto Finance Lender Profiles
// =============================================================================

export interface LenderData {
  name: string;
  slug: string;
  commonViolations: string[];
  settlementRange: { min: number; max: number };
  description: string;
  isFullPage?: boolean;
  extended?: {
    overview: string;
    violationDetails: Array<{ title: string; description: string }>;
    recentSettlements: Array<{ amount: string; description: string; year: number }>;
  };
}

export const lenders: LenderData[] = [
  // ===========================================================================
  // FULL-PAGE LENDERS
  // ===========================================================================
  {
    name: "Santander Consumer USA",
    slug: "santander-consumer-usa",
    commonViolations: [
      "Breach of peace during repossession",
      "Repossession without proper default notice",
      "Inflated deficiency balances",
      "Failing to sell vehicle in commercially reasonable manner",
      "Predatory subprime lending practices",
    ],
    settlementRange: { min: 5000, max: 50000 },
    description:
      "Santander Consumer USA is one of the largest subprime auto lenders in the United States and has been the subject of numerous federal and state enforcement actions. Consumers frequently report aggressive repossession tactics, lack of proper notices, and inflated deficiency balances.",
    isFullPage: true,
    extended: {
      overview:
        "Santander Consumer USA, headquartered in Dallas, Texas, is a major subprime auto lender that services millions of auto loans nationwide. The company has faced significant regulatory scrutiny from the Consumer Financial Protection Bureau (CFPB), state attorneys general, and class action lawsuits. Santander has been accused of originating loans it knew borrowers could not afford, employing aggressive repossession tactics, and failing to comply with state and federal notice requirements. If your vehicle was repossessed by Santander, you may have strong legal claims.",
      violationDetails: [
        {
          title: "Predatory Lending & Loan Origination",
          description:
            "Santander has been found to approve loans for borrowers with a high likelihood of default, often without verifying income or ability to repay. Multiple state attorneys general have alleged that Santander knowingly set borrowers up to fail, resulting in inevitable repossession.",
        },
        {
          title: "Aggressive Repossession Practices",
          description:
            "Santander frequently uses third-party repo agents who employ breach-of-peace tactics including confrontation, entering closed garages, and repossessing vehicles at inappropriate times. Many consumers report no warning before repossession occurs.",
        },
        {
          title: "Deficiency Balance Abuse",
          description:
            "After repossession, Santander has been accused of selling vehicles for below-market prices and then pursuing consumers for inflated deficiency balances. In many cases, proper notice of the sale was not provided, which may bar deficiency collection.",
        },
        {
          title: "Failure to Provide Required Notices",
          description:
            "Consumers across multiple states have reported not receiving required pre-repossession right-to-cure notices or post-repossession redemption notices, both of which are required under state UCC laws.",
        },
      ],
      recentSettlements: [
        {
          amount: "$550 million",
          description:
            "Multistate settlement with 34 state attorneys general over allegations of subprime auto lending abuses, including originating loans that consumers could not afford.",
          year: 2020,
        },
        {
          amount: "$65 million",
          description:
            "CFPB consent order for charging excessive interest rates and fees on subprime auto loans.",
          year: 2020,
        },
        {
          amount: "$22 million",
          description:
            "Settlement with the Massachusetts Attorney General over deceptive subprime auto loan origination practices.",
          year: 2017,
        },
      ],
    },
  },
  {
    name: "Credit Acceptance Corporation",
    slug: "credit-acceptance-corporation",
    commonViolations: [
      "Predatory loan terms with excessive interest rates",
      "Aggressive debt collection after repossession",
      "Failing to accurately report to credit bureaus",
      "Not providing proper post-repossession notices",
      "Commercially unreasonable sale of repossessed vehicles",
    ],
    settlementRange: { min: 5000, max: 45000 },
    description:
      "Credit Acceptance Corporation is a subprime auto lender known for extremely high interest rates and aggressive collection practices. The company primarily works through buy-here-pay-here dealers and has faced significant legal action from federal and state regulators.",
    isFullPage: true,
    extended: {
      overview:
        "Credit Acceptance Corporation, based in Southfield, Michigan, finances auto loans through a nationwide network of dealers, primarily targeting consumers with poor credit. The company has faced intense regulatory scrutiny for its high interest rates (often exceeding 20%), aggressive collection practices, and dealer relationships that may incentivize predatory lending. The CFPB and multiple state attorneys general have taken action against Credit Acceptance for practices that harm vulnerable consumers. If you have a Credit Acceptance loan and your vehicle was repossessed, you may have significant legal claims.",
      violationDetails: [
        {
          title: "Excessive Interest Rates & Hidden Fees",
          description:
            "Credit Acceptance routinely charges interest rates between 20% and 29%, and in some cases, the total amount paid over the life of the loan exceeds twice the original vehicle price. Many consumers are not fully informed of the true cost of the loan at origination.",
        },
        {
          title: "Aggressive Post-Repossession Collection",
          description:
            "After repossessing and selling vehicles, Credit Acceptance aggressively pursues deficiency balances through calls, letters, and lawsuits. Many consumers report continued collection efforts even after the statute of limitations has expired.",
        },
        {
          title: "Credit Reporting Violations",
          description:
            "Credit Acceptance has been accused of reporting inaccurate information to credit bureaus, failing to note accounts as disputed, and continuing to report debts that were discharged in bankruptcy or barred by the statute of limitations.",
        },
        {
          title: "Dealer Kickback Arrangements",
          description:
            "Credit Acceptance's dealer-partner model has been criticized for incentivizing dealers to steer consumers into high-interest loans regardless of whether better options are available, raising concerns about fair lending violations.",
        },
      ],
      recentSettlements: [
        {
          amount: "$8.22 billion",
          description:
            "CFPB order directing Credit Acceptance to pay redress to harmed borrowers for deceptive lending and collection practices.",
          year: 2023,
        },
        {
          amount: "$27.2 million",
          description:
            "Settlement with the Massachusetts Attorney General over predatory subprime auto lending practices.",
          year: 2020,
        },
        {
          amount: "$9.4 million",
          description:
            "Mississippi Attorney General settlement over deceptive auto lending and collection practices.",
          year: 2019,
        },
      ],
    },
  },
  {
    name: "Capital One Auto Finance",
    slug: "capital-one-auto-finance",
    commonViolations: [
      "Repossession without proper notice of default",
      "Breach of peace during repossession",
      "Failing to provide post-repossession redemption rights",
      "Inaccurate credit reporting after repossession",
      "Deficiency balance collection without proper sale notice",
    ],
    settlementRange: { min: 4000, max: 40000 },
    description:
      "Capital One Auto Finance is one of the nation's largest auto lenders. While it serves both prime and subprime borrowers, consumers have reported issues with aggressive repossession practices, inadequate notice, and difficulties resolving disputes after repossession.",
    isFullPage: true,
    extended: {
      overview:
        "Capital One Auto Finance, a division of Capital One Financial Corporation, is one of the largest auto lenders in the United States, financing millions of vehicles annually. While Capital One serves a broad spectrum of borrowers, its subprime auto lending division has faced criticism for aggressive repossession practices, lack of proper notice to borrowers before and after repossession, and difficulties consumers face when trying to resolve disputes. If Capital One repossessed your vehicle, understanding your rights under both federal and state law is critical.",
      violationDetails: [
        {
          title: "Premature Repossession",
          description:
            "Consumers have reported that Capital One initiated repossession after just one missed payment or while a payment plan was being negotiated. In some cases, payments were made but not properly credited, triggering unwarranted repossession.",
        },
        {
          title: "Notice Failures",
          description:
            "Capital One has been accused of failing to send required right-to-cure notices before repossession and failing to provide adequate post-repossession notices about the right to redeem the vehicle or attend the sale.",
        },
        {
          title: "Credit Reporting Issues",
          description:
            "After repossession, consumers have reported that Capital One reported inaccurate information to credit bureaus, including wrong balances, failure to mark accounts as disputed, and continuing to report after a debt was resolved.",
        },
        {
          title: "Personal Property in Repossessed Vehicles",
          description:
            "Consumers have reported difficulty retrieving personal belongings from repossessed vehicles. Capital One and its third-party agents have been accused of failing to inventory, safeguard, or return personal items left in vehicles.",
        },
      ],
      recentSettlements: [
        {
          amount: "$80 million",
          description:
            "CFPB consent order for deceptive marketing of credit card add-on products. While focused on credit cards, the action highlighted Capital One's broader consumer compliance issues.",
          year: 2014,
        },
        {
          amount: "$3.5 million",
          description:
            "Settlement over allegations of improper repossession practices and failure to provide required notices in multiple states.",
          year: 2021,
        },
        {
          amount: "$1.2 million",
          description:
            "State attorney general settlement over complaints related to wrongful repossession and deficiency balance collection practices.",
          year: 2022,
        },
      ],
    },
  },

  // ===========================================================================
  // STANDARD LENDERS
  // ===========================================================================
  {
    name: "Ally Financial",
    slug: "ally-financial",
    commonViolations: [
      "Repossession without proper default notice",
      "Breach of peace during vehicle recovery",
      "Deficiency balance collection without proper notice of sale",
      "Inaccurate credit reporting post-repossession",
    ],
    settlementRange: { min: 3500, max: 30000 },
    description:
      "Ally Financial is a major auto lender that has faced consumer complaints regarding repossession practices, including inadequate notice before repossession and issues with deficiency balance calculations after the vehicle is sold.",
  },
  {
    name: "Westlake Financial Services",
    slug: "westlake-financial-services",
    commonViolations: [
      "Aggressive repossession without right-to-cure notice",
      "Excessive fees added to loan balances",
      "Harassment and excessive collection calls",
      "Failing to provide redemption notice after repossession",
    ],
    settlementRange: { min: 4000, max: 35000 },
    description:
      "Westlake Financial Services is a subprime auto lender based in Los Angeles known for aggressive collection and repossession practices. Consumers frequently report excessive calls, lack of proper notices, and inflated balances after repossession.",
  },
  {
    name: "DriveTime Automotive",
    slug: "drivetime-automotive",
    commonViolations: [
      "Selling vehicles with known mechanical defects",
      "Repossessing vehicles while warranty claims are pending",
      "Failing to provide proper repossession notices",
      "Inflated deficiency balances after auction sale",
    ],
    settlementRange: { min: 3500, max: 30000 },
    description:
      "DriveTime is a buy-here-pay-here dealer and finance company that has faced complaints about selling defective vehicles, aggressive repossession of vehicles with known mechanical issues, and inadequate notice to consumers.",
  },
  {
    name: "Exeter Finance",
    slug: "exeter-finance",
    commonViolations: [
      "Repossession without proper notice",
      "Aggressive collection tactics post-repossession",
      "Commercially unreasonable sale of vehicles",
      "Failure to accurately credit payments",
    ],
    settlementRange: { min: 3500, max: 28000 },
    description:
      "Exeter Finance is a subprime auto lender headquartered in Irving, Texas. Consumers have reported issues with payment misapplication, aggressive repossession, and pursuit of inflated deficiency balances after vehicle sale.",
  },
  {
    name: "Byrider (J.D. Byrider / CNAC)",
    slug: "byrider",
    commonViolations: [
      "Selling vehicles with undisclosed mechanical problems",
      "GPS tracking and remote disabling of vehicles",
      "Repossession over minor payment disputes",
      "Excessive interest rates and hidden fees",
    ],
    settlementRange: { min: 3000, max: 25000 },
    description:
      "Byrider (formerly J.D. Byrider) is a buy-here-pay-here dealer network that finances vehicles for consumers with poor credit. The company has faced complaints about vehicle quality, GPS tracking, remote vehicle disabling, and aggressive repossession practices.",
  },
  {
    name: "US Auto Sales",
    slug: "us-auto-sales",
    commonViolations: [
      "Breach of peace during repossession",
      "No proper notice before or after repossession",
      "Personal property not returned",
      "Deficiency balance pursued without proper accounting",
    ],
    settlementRange: { min: 3000, max: 25000 },
    description:
      "US Auto Sales is a buy-here-pay-here dealer with locations primarily in the Southeast. Consumers have reported aggressive repossession tactics, failure to provide required notices, and difficulty recovering personal property from repossessed vehicles.",
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Find a lender by its URL slug.
 */
export function getLenderBySlug(slug: string): LenderData | undefined {
  return lenders.find((lender) => lender.slug === slug);
}

/**
 * Returns all lender slugs for static path generation.
 */
export function getAllLenderSlugs(): string[] {
  return lenders.map((lender) => lender.slug);
}

/**
 * Returns only the full-page lenders (Santander, Credit Acceptance, Capital One).
 */
export function getFullPageLenders(): LenderData[] {
  return lenders.filter((lender) => lender.isFullPage);
}

/**
 * Returns standard (non-full-page) lenders.
 */
export function getStandardLenders(): LenderData[] {
  return lenders.filter((lender) => !lender.isFullPage);
}

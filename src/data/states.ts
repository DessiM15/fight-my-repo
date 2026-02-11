// =============================================================================
// State Data for Sue The Collector - Wrongful Repossession by State
// =============================================================================

export interface DetailedStatute {
  name: string;
  code: string;
  description: string;
}

export interface StateFAQ {
  question: string;
  answer: string;
}

export interface StateData {
  name: string;
  abbreviation: string;
  slug: string;
  capital: string;
  majorCities: string[];
  statute: string;
  settlementRange: { min: number; max: number };
  isFullPage: boolean;
  detailedStatutes?: DetailedStatute[];
  localLenders?: string[];
  stateFaq?: StateFAQ[];
}

export const states: StateData[] = [
  // =========================================================================
  // FULL-PAGE STATES (TX, FL, CA)
  // =========================================================================
  {
    name: "Texas",
    abbreviation: "TX",
    slug: "texas-wrongful-repossession",
    capital: "Austin",
    majorCities: ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth", "El Paso", "Arlington"],
    statute: "Tex. Bus. & Com. Code \u00A7 9.609 (Secured Transactions - Right to Take Possession After Default)",
    settlementRange: { min: 5000, max: 50000 },
    isFullPage: true,
    detailedStatutes: [
      {
        name: "UCC Secured Transactions",
        code: "Tex. Bus. & Com. Code \u00A7 9.609",
        description:
          "Governs a secured party\u2019s right to take possession of collateral after default. The repossession must proceed without breach of the peace. Any act of intimidation, confrontation, or trespass into a closed garage can constitute a breach.",
      },
      {
        name: "Texas Debt Collection Act",
        code: "Tex. Fin. Code \u00A7 392.001\u2013392.404",
        description:
          "Prohibits debt collectors from using threats, coercion, harassment, or unconscionable means to collect debts. Violations can result in statutory damages, actual damages, and attorney\u2019s fees.",
      },
      {
        name: "Texas Deceptive Trade Practices Act",
        code: "Tex. Bus. & Com. Code \u00A7 17.41\u201317.63",
        description:
          "Provides consumers broad protection against false, misleading, or deceptive acts. Wrongful repossession paired with misrepresentations about the debt can trigger treble damages.",
      },
      {
        name: "Post-Repossession Notice Requirements",
        code: "Tex. Bus. & Com. Code \u00A7 9.611\u20139.614",
        description:
          "Requires the secured party to send reasonable authenticated notification before disposing of collateral. Failure to provide proper notice can bar the creditor from obtaining a deficiency judgment.",
      },
    ],
    localLenders: [
      "Santander Consumer USA (Dallas HQ)",
      "Capital One Auto Finance",
      "Ally Financial",
      "Westlake Financial Services",
      "DriveTime Automotive (multiple TX locations)",
      "Exeter Finance (Irving, TX)",
      "Texas Auto Finance",
      "Byrider (multiple TX locations)",
    ],
    stateFaq: [
      {
        question: "Is Texas a \u2018self-help\u2019 repossession state?",
        answer:
          "Yes. Texas allows creditors to repossess vehicles without a court order, but only if they can do so without breaching the peace. Any confrontation, threat, or entry into a closed structure (such as a locked garage) constitutes a breach of the peace and makes the repossession wrongful.",
      },
      {
        question: "What is the statute of limitations for a wrongful repossession claim in Texas?",
        answer:
          "Under the Texas Debt Collection Act, you generally have four years to file a lawsuit. However, claims under the FDCPA have a one-year statute of limitations. It is critical to consult an attorney as soon as possible to preserve your rights.",
      },
      {
        question: "Can a Texas creditor pursue a deficiency balance after wrongful repossession?",
        answer:
          "If the repossession or subsequent sale of the vehicle was not conducted in a commercially reasonable manner, or if proper notice was not given, the creditor may be barred from collecting any deficiency balance under Texas Business and Commerce Code \u00A7 9.626.",
      },
      {
        question: "What should I do if my car was wrongfully repossessed in Texas?",
        answer:
          "Document everything immediately: take photos of where the car was parked, note the time and circumstances, save any communications from the lender, and contact a wrongful repossession attorney. Do not sign any voluntary surrender documents.",
      },
    ],
  },
  {
    name: "Florida",
    abbreviation: "FL",
    slug: "florida-wrongful-repossession",
    capital: "Tallahassee",
    majorCities: ["Jacksonville", "Miami", "Tampa", "Orlando", "St. Petersburg", "Hialeah", "Fort Lauderdale"],
    statute: "Fla. Stat. \u00A7 679.6091 (UCC Secured Transactions - Possession After Default)",
    settlementRange: { min: 5000, max: 45000 },
    isFullPage: true,
    detailedStatutes: [
      {
        name: "UCC Secured Transactions",
        code: "Fla. Stat. \u00A7 679.6091",
        description:
          "Establishes the secured party\u2019s right to take possession after default. Repossession must be conducted without breach of the peace. Florida courts have broadly interpreted what constitutes a breach, including verbal confrontation and refusal to leave when asked.",
      },
      {
        name: "Florida Consumer Collection Practices Act",
        code: "Fla. Stat. \u00A7 559.55\u2013559.785",
        description:
          "One of the strongest state-level debt collection statutes in the country. Prohibits harassment, false representation, and unfair practices. Provides for actual damages, statutory damages, and attorney\u2019s fees.",
      },
      {
        name: "Florida Deceptive and Unfair Trade Practices Act",
        code: "Fla. Stat. \u00A7 501.201\u2013501.213",
        description:
          "Prohibits unfair or deceptive acts in trade or commerce. Wrongful repossession schemes involving misrepresentations about payment status or default may trigger FDUTPA claims with potential for attorney\u2019s fees.",
      },
      {
        name: "Post-Repossession Notice and Sale Requirements",
        code: "Fla. Stat. \u00A7 679.6111\u2013679.6141",
        description:
          "Requires that the debtor receive proper notice before the vehicle is sold at auction. The notice must include the time, place, and manner of sale. Failure to comply can eliminate the creditor\u2019s right to a deficiency judgment.",
      },
    ],
    localLenders: [
      "JM Family Enterprises (Deerfield Beach)",
      "Capital One Auto Finance",
      "Santander Consumer USA",
      "Westlake Financial Services",
      "DriveTime Automotive (multiple FL locations)",
      "Ally Financial",
      "Southeast Toyota Finance",
      "Florida Auto Finance",
    ],
    stateFaq: [
      {
        question: "Does Florida require notice before repossession?",
        answer:
          "Florida does not require pre-repossession notice under the UCC. However, the loan agreement may contain provisions requiring notice of default and a right to cure. Additionally, the Florida Consumer Collection Practices Act may impose requirements depending on the circumstances.",
      },
      {
        question: "What constitutes breach of the peace for repossession in Florida?",
        answer:
          "Florida courts have found breach of the peace when repo agents enter a closed garage, use threats or physical force, repossess despite the debtor\u2019s verbal objection, or cause a disturbance. Even raising one\u2019s voice or refusing to leave the property can constitute a breach.",
      },
      {
        question: "Can I recover damages for wrongful repossession in Florida?",
        answer:
          "Yes. Under the Florida Consumer Collection Practices Act and the FDCPA, you may recover actual damages (including emotional distress), statutory damages up to $1,000 per violation under federal law, and attorney\u2019s fees. In some cases, punitive damages may also be available.",
      },
      {
        question: "How long do I have to file a wrongful repossession claim in Florida?",
        answer:
          "The statute of limitations varies by claim. FDCPA claims must be filed within one year. Florida Consumer Collection Practices Act claims generally have a two-year statute of limitations. State UCC claims may have a four-year or five-year window. Consult an attorney promptly.",
      },
    ],
  },
  {
    name: "California",
    abbreviation: "CA",
    slug: "california-wrongful-repossession",
    capital: "Sacramento",
    majorCities: ["Los Angeles", "San Diego", "San Jose", "San Francisco", "Fresno", "Sacramento", "Long Beach"],
    statute: "Cal. Com. Code \u00A7 9609 & Cal. Civ. Code \u00A7 2983.2 (Rees-Levering Motor Vehicle Sales Finance Act)",
    settlementRange: { min: 6000, max: 55000 },
    isFullPage: true,
    detailedStatutes: [
      {
        name: "UCC Secured Transactions",
        code: "Cal. Com. Code \u00A7 9609",
        description:
          "Authorizes self-help repossession without judicial process, but only without breach of the peace. California courts scrutinize repossession conduct closely and have expansive definitions of breach of peace.",
      },
      {
        name: "Rees-Levering Motor Vehicle Sales Finance Act",
        code: "Cal. Civ. Code \u00A7 2981\u20132984.6",
        description:
          "California\u2019s primary auto finance consumer protection statute. Requires specific pre- and post-repossession notices, sets strict timelines, and provides consumers the right to reinstate the contract by paying past-due amounts. Violations can result in the consumer recovering the entire finance charge plus 10% of the cash price.",
      },
      {
        name: "Rosenthal Fair Debt Collection Practices Act",
        code: "Cal. Civ. Code \u00A7 1788\u20131788.33",
        description:
          "California\u2019s state counterpart to the federal FDCPA. Notably, it applies to original creditors as well as third-party collectors, giving California consumers broader protection than federal law alone.",
      },
      {
        name: "California Unfair Competition Law",
        code: "Cal. Bus. & Prof. Code \u00A7 17200",
        description:
          "Provides a catch-all claim for any unlawful, unfair, or fraudulent business act. Wrongful repossession practices can be challenged under this statute, which allows for restitution and injunctive relief.",
      },
    ],
    localLenders: [
      "Capital One Auto Finance",
      "Santander Consumer USA",
      "Westlake Financial Services (Los Angeles HQ)",
      "Ally Financial",
      "DriveTime Automotive (multiple CA locations)",
      "Credit Acceptance Corporation",
      "US Auto Sales",
      "CarMax Auto Finance",
    ],
    stateFaq: [
      {
        question: "What makes California wrongful repossession laws unique?",
        answer:
          "California\u2019s Rees-Levering Act is one of the strongest auto finance consumer protection laws in the nation. It requires specific notices, provides a right to reinstate (not just redeem), and imposes severe penalties for violations\u2014including forfeiture of the entire finance charge.",
      },
      {
        question: "Does California require a right-to-cure notice before repossession?",
        answer:
          "While the UCC does not mandate a pre-repo notice, the Rees-Levering Act requires that the lender provide a notice of the right to reinstate the contract after repossession. Many loan agreements also include contractual cure provisions.",
      },
      {
        question: "What penalties do lenders face for wrongful repossession in California?",
        answer:
          "Under the Rees-Levering Act, a lender that fails to comply with notice requirements may forfeit all finance charges and 10% of the original cash price of the vehicle. Under the Rosenthal Act, statutory damages of up to $1,000 per violation are available, plus actual damages and attorney\u2019s fees.",
      },
      {
        question: "Can original creditors be held liable under California law?",
        answer:
          "Yes. Unlike the federal FDCPA, which generally applies only to third-party debt collectors, California\u2019s Rosenthal Act applies to original creditors as well. This means the bank or finance company that originated your auto loan can be held directly liable for abusive collection and repossession practices.",
      },
    ],
  },

  // =========================================================================
  // REMAINING 47 STATES (alphabetical)
  // =========================================================================
  {
    name: "Alabama",
    abbreviation: "AL",
    slug: "alabama-wrongful-repossession",
    capital: "Montgomery",
    majorCities: ["Birmingham", "Montgomery", "Huntsville", "Mobile", "Tuscaloosa"],
    statute: "Ala. Code \u00A7 7-9A-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Alaska",
    abbreviation: "AK",
    slug: "alaska-wrongful-repossession",
    capital: "Juneau",
    majorCities: ["Anchorage", "Fairbanks", "Juneau", "Sitka", "Ketchikan"],
    statute: "Alaska Stat. \u00A7 45.29.609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 20000 },
    isFullPage: false,
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
    slug: "arizona-wrongful-repossession",
    capital: "Phoenix",
    majorCities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale", "Glendale"],
    statute: "Ariz. Rev. Stat. \u00A7 47-9609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
    slug: "arkansas-wrongful-repossession",
    capital: "Little Rock",
    majorCities: ["Little Rock", "Fort Smith", "Fayetteville", "Springdale", "Jonesboro"],
    statute: "Ark. Code \u00A7 4-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 22000 },
    isFullPage: false,
  },
  {
    name: "Colorado",
    abbreviation: "CO",
    slug: "colorado-wrongful-repossession",
    capital: "Denver",
    majorCities: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Lakewood"],
    statute: "Colo. Rev. Stat. \u00A7 4-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
    slug: "connecticut-wrongful-repossession",
    capital: "Hartford",
    majorCities: ["Bridgeport", "New Haven", "Stamford", "Hartford", "Waterbury"],
    statute: "Conn. Gen. Stat. \u00A7 42a-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "Delaware",
    abbreviation: "DE",
    slug: "delaware-wrongful-repossession",
    capital: "Dover",
    majorCities: ["Wilmington", "Dover", "Newark", "Middletown", "Bear"],
    statute: "Del. Code tit. 6, \u00A7 9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 28000 },
    isFullPage: false,
  },
  {
    name: "Georgia",
    abbreviation: "GA",
    slug: "georgia-wrongful-repossession",
    capital: "Atlanta",
    majorCities: ["Atlanta", "Augusta", "Columbus", "Savannah", "Athens"],
    statute: "Ga. Code \u00A7 11-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
    slug: "hawaii-wrongful-repossession",
    capital: "Honolulu",
    majorCities: ["Honolulu", "Pearl City", "Hilo", "Kailua", "Waipahu"],
    statute: "Haw. Rev. Stat. \u00A7 490:9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Idaho",
    abbreviation: "ID",
    slug: "idaho-wrongful-repossession",
    capital: "Boise",
    majorCities: ["Boise", "Meridian", "Nampa", "Idaho Falls", "Caldwell"],
    statute: "Idaho Code \u00A7 28-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 22000 },
    isFullPage: false,
  },
  {
    name: "Illinois",
    abbreviation: "IL",
    slug: "illinois-wrongful-repossession",
    capital: "Springfield",
    majorCities: ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville", "Springfield"],
    statute: "810 ILCS 5/9-609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 40000 },
    isFullPage: false,
  },
  {
    name: "Indiana",
    abbreviation: "IN",
    slug: "indiana-wrongful-repossession",
    capital: "Indianapolis",
    majorCities: ["Indianapolis", "Fort Wayne", "Evansville", "South Bend", "Carmel"],
    statute: "Ind. Code \u00A7 26-1-9.1-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 28000 },
    isFullPage: false,
  },
  {
    name: "Iowa",
    abbreviation: "IA",
    slug: "iowa-wrongful-repossession",
    capital: "Des Moines",
    majorCities: ["Des Moines", "Cedar Rapids", "Davenport", "Sioux City", "Iowa City"],
    statute: "Iowa Code \u00A7 554.9609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Kansas",
    abbreviation: "KS",
    slug: "kansas-wrongful-repossession",
    capital: "Topeka",
    majorCities: ["Wichita", "Overland Park", "Kansas City", "Olathe", "Topeka"],
    statute: "Kan. Stat. \u00A7 84-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
    slug: "kentucky-wrongful-repossession",
    capital: "Frankfort",
    majorCities: ["Louisville", "Lexington", "Bowling Green", "Owensboro", "Covington"],
    statute: "Ky. Rev. Stat. \u00A7 355.9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
    slug: "louisiana-wrongful-repossession",
    capital: "Baton Rouge",
    majorCities: ["New Orleans", "Baton Rouge", "Shreveport", "Lafayette", "Lake Charles"],
    statute: "La. R.S. \u00A7 10:9-609 (UCC Secured Transactions) & La. R.S. \u00A7 6:966 (Motor Vehicle Sales Finance Act)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Maine",
    abbreviation: "ME",
    slug: "maine-wrongful-repossession",
    capital: "Augusta",
    majorCities: ["Portland", "Lewiston", "Bangor", "South Portland", "Auburn"],
    statute: "Me. Rev. Stat. tit. 11, \u00A7 9-1609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 22000 },
    isFullPage: false,
  },
  {
    name: "Maryland",
    abbreviation: "MD",
    slug: "maryland-wrongful-repossession",
    capital: "Annapolis",
    majorCities: ["Baltimore", "Columbia", "Germantown", "Silver Spring", "Waldorf"],
    statute: "Md. Code, Com. Law \u00A7 9-609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
    slug: "massachusetts-wrongful-repossession",
    capital: "Boston",
    majorCities: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
    statute: "Mass. Gen. Laws ch. 106, \u00A7 9-609 (UCC Secured Transactions) & ch. 255B (Motor Vehicle Installment Sales)",
    settlementRange: { min: 4500, max: 40000 },
    isFullPage: false,
  },
  {
    name: "Michigan",
    abbreviation: "MI",
    slug: "michigan-wrongful-repossession",
    capital: "Lansing",
    majorCities: ["Detroit", "Grand Rapids", "Warren", "Sterling Heights", "Lansing"],
    statute: "Mich. Comp. Laws \u00A7 440.9609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
    slug: "minnesota-wrongful-repossession",
    capital: "St. Paul",
    majorCities: ["Minneapolis", "St. Paul", "Rochester", "Duluth", "Bloomington"],
    statute: "Minn. Stat. \u00A7 336.9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
    slug: "mississippi-wrongful-repossession",
    capital: "Jackson",
    majorCities: ["Jackson", "Gulfport", "Southaven", "Hattiesburg", "Biloxi"],
    statute: "Miss. Code \u00A7 75-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 22000 },
    isFullPage: false,
  },
  {
    name: "Missouri",
    abbreviation: "MO",
    slug: "missouri-wrongful-repossession",
    capital: "Jefferson City",
    majorCities: ["Kansas City", "St. Louis", "Springfield", "Columbia", "Independence"],
    statute: "Mo. Rev. Stat. \u00A7 400.9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Montana",
    abbreviation: "MT",
    slug: "montana-wrongful-repossession",
    capital: "Helena",
    majorCities: ["Billings", "Missoula", "Great Falls", "Bozeman", "Helena"],
    statute: "Mont. Code \u00A7 30-9A-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 20000 },
    isFullPage: false,
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
    slug: "nebraska-wrongful-repossession",
    capital: "Lincoln",
    majorCities: ["Omaha", "Lincoln", "Bellevue", "Grand Island", "Kearney"],
    statute: "Neb. Rev. Stat. UCC \u00A7 9-609 (Secured Transactions)",
    settlementRange: { min: 3000, max: 22000 },
    isFullPage: false,
  },
  {
    name: "Nevada",
    abbreviation: "NV",
    slug: "nevada-wrongful-repossession",
    capital: "Carson City",
    majorCities: ["Las Vegas", "Henderson", "Reno", "North Las Vegas", "Sparks"],
    statute: "Nev. Rev. Stat. \u00A7 104.9609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
    slug: "new-hampshire-wrongful-repossession",
    capital: "Concord",
    majorCities: ["Manchester", "Nashua", "Concord", "Derry", "Dover"],
    statute: "N.H. Rev. Stat. \u00A7 382-A:9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
    slug: "new-jersey-wrongful-repossession",
    capital: "Trenton",
    majorCities: ["Newark", "Jersey City", "Paterson", "Elizabeth", "Edison"],
    statute: "N.J. Stat. \u00A7 12A:9-609 (UCC Secured Transactions)",
    settlementRange: { min: 4500, max: 40000 },
    isFullPage: false,
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
    slug: "new-mexico-wrongful-repossession",
    capital: "Santa Fe",
    majorCities: ["Albuquerque", "Las Cruces", "Rio Rancho", "Santa Fe", "Roswell"],
    statute: "N.M. Stat. \u00A7 55-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 22000 },
    isFullPage: false,
  },
  {
    name: "New York",
    abbreviation: "NY",
    slug: "new-york-wrongful-repossession",
    capital: "Albany",
    majorCities: ["New York City", "Buffalo", "Rochester", "Yonkers", "Syracuse"],
    statute: "N.Y. UCC \u00A7 9-609 (Secured Transactions)",
    settlementRange: { min: 5000, max: 45000 },
    isFullPage: false,
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
    slug: "north-carolina-wrongful-repossession",
    capital: "Raleigh",
    majorCities: ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
    statute: "N.C. Gen. Stat. \u00A7 25-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
    slug: "north-dakota-wrongful-repossession",
    capital: "Bismarck",
    majorCities: ["Fargo", "Bismarck", "Grand Forks", "Minot", "West Fargo"],
    statute: "N.D. Cent. Code \u00A7 41-09-61 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 20000 },
    isFullPage: false,
  },
  {
    name: "Ohio",
    abbreviation: "OH",
    slug: "ohio-wrongful-repossession",
    capital: "Columbus",
    majorCities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
    statute: "Ohio Rev. Code \u00A7 1309.609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
    slug: "oklahoma-wrongful-repossession",
    capital: "Oklahoma City",
    majorCities: ["Oklahoma City", "Tulsa", "Norman", "Broken Arrow", "Edmond"],
    statute: "Okla. Stat. tit. 12A, \u00A7 1-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Oregon",
    abbreviation: "OR",
    slug: "oregon-wrongful-repossession",
    capital: "Salem",
    majorCities: ["Portland", "Salem", "Eugene", "Gresham", "Hillsboro"],
    statute: "Or. Rev. Stat. \u00A7 79.0609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
    slug: "pennsylvania-wrongful-repossession",
    capital: "Harrisburg",
    majorCities: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
    statute: "13 Pa. C.S. \u00A7 9609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
    slug: "rhode-island-wrongful-repossession",
    capital: "Providence",
    majorCities: ["Providence", "Warwick", "Cranston", "Pawtucket", "East Providence"],
    statute: "R.I. Gen. Laws \u00A7 6A-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 28000 },
    isFullPage: false,
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
    slug: "south-carolina-wrongful-repossession",
    capital: "Columbia",
    majorCities: ["Charleston", "Columbia", "North Charleston", "Mount Pleasant", "Rock Hill"],
    statute: "S.C. Code \u00A7 36-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 28000 },
    isFullPage: false,
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
    slug: "south-dakota-wrongful-repossession",
    capital: "Pierre",
    majorCities: ["Sioux Falls", "Rapid City", "Aberdeen", "Brookings", "Watertown"],
    statute: "S.D. Codified Laws \u00A7 57A-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 20000 },
    isFullPage: false,
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
    slug: "tennessee-wrongful-repossession",
    capital: "Nashville",
    majorCities: ["Nashville", "Memphis", "Knoxville", "Chattanooga", "Clarksville"],
    statute: "Tenn. Code \u00A7 47-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Utah",
    abbreviation: "UT",
    slug: "utah-wrongful-repossession",
    capital: "Salt Lake City",
    majorCities: ["Salt Lake City", "West Valley City", "Provo", "West Jordan", "Orem"],
    statute: "Utah Code \u00A7 70A-9a-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Vermont",
    abbreviation: "VT",
    slug: "vermont-wrongful-repossession",
    capital: "Montpelier",
    majorCities: ["Burlington", "Essex", "South Burlington", "Colchester", "Rutland"],
    statute: "Vt. Stat. tit. 9A, \u00A7 9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 22000 },
    isFullPage: false,
  },
  {
    name: "Virginia",
    abbreviation: "VA",
    slug: "virginia-wrongful-repossession",
    capital: "Richmond",
    majorCities: ["Virginia Beach", "Norfolk", "Chesapeake", "Richmond", "Newport News", "Alexandria"],
    statute: "Va. Code \u00A7 8.9A-609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "Washington",
    abbreviation: "WA",
    slug: "washington-wrongful-repossession",
    capital: "Olympia",
    majorCities: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
    statute: "Wash. Rev. Code \u00A7 62A.9A-609 (UCC Secured Transactions)",
    settlementRange: { min: 4000, max: 35000 },
    isFullPage: false,
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
    slug: "west-virginia-wrongful-repossession",
    capital: "Charleston",
    majorCities: ["Charleston", "Huntington", "Morgantown", "Parkersburg", "Wheeling"],
    statute: "W. Va. Code \u00A7 46-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 25000 },
    isFullPage: false,
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
    slug: "wisconsin-wrongful-repossession",
    capital: "Madison",
    majorCities: ["Milwaukee", "Madison", "Green Bay", "Kenosha", "Racine"],
    statute: "Wis. Stat. \u00A7 409.609 (UCC Secured Transactions) & Wis. Stat. \u00A7 425 (Wisconsin Consumer Act)",
    settlementRange: { min: 3500, max: 30000 },
    isFullPage: false,
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
    slug: "wyoming-wrongful-repossession",
    capital: "Cheyenne",
    majorCities: ["Cheyenne", "Casper", "Laramie", "Gillette", "Rock Springs"],
    statute: "Wyo. Stat. \u00A7 34.1-9-609 (UCC Secured Transactions)",
    settlementRange: { min: 3000, max: 20000 },
    isFullPage: false,
  },
];

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Find a state by its URL slug (e.g., "texas-wrongful-repossession").
 */
export function getStateBySlug(slug: string): StateData | undefined {
  return states.find((state) => state.slug === slug);
}

/**
 * Find a state by its two-letter abbreviation (case-insensitive).
 */
export function getStateByAbbreviation(abbr: string): StateData | undefined {
  const normalized = abbr.toUpperCase();
  return states.find((state) => state.abbreviation === normalized);
}

/**
 * Returns all state slugs for static path generation.
 */
export function getAllStateSlugs(): string[] {
  return states.map((state) => state.slug);
}

/**
 * Returns only the full-page states (TX, FL, CA).
 */
export function getFullPageStates(): StateData[] {
  return states.filter((state) => state.isFullPage);
}

/**
 * Returns all state abbreviations (useful for form validation).
 */
export function getAllStateAbbreviations(): string[] {
  return states.map((state) => state.abbreviation);
}

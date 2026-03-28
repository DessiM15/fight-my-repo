// =============================================================================
// FAQ Data for Fight My Repo - Wrongful Repossession FAQs
// =============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    question: "What is wrongful repossession?",
    answer:
      "Wrongful repossession occurs when a lender or its agent takes back your vehicle in violation of state or federal law. This includes repossessing without proper notice, committing a breach of the peace (such as using threats, force, or entering a locked garage), repossessing the wrong vehicle, repossessing while you are current on payments, or repossessing in violation of a bankruptcy automatic stay. If any of these occurred, you may have a legal claim for damages.",
  },
  {
    question: "What does 'breach of the peace' mean during repossession?",
    answer:
      "Breach of the peace refers to any confrontation, threat, or use of force by a repossession agent while taking your vehicle. Examples include verbal threats, physical intimidation, refusing to leave when asked, entering a closed garage or gated property without permission, towing a vehicle while someone is inside, or causing a public disturbance. If a repo agent breached the peace, the repossession is considered wrongful regardless of whether you were behind on payments.",
  },
  {
    question: "Do I need to be behind on payments for my car to be repossessed?",
    answer:
      "Generally, a lender can only repossess your vehicle if you are in default on your loan agreement. However, some lenders repossess vehicles even when payments are current due to clerical errors, misapplied payments, or disputes over insurance requirements. If your car was repossessed while you were current on payments, you likely have a strong claim for wrongful repossession.",
  },
  {
    question: "What should I do immediately after my car is repossessed?",
    answer:
      "First, document everything: write down the date, time, and circumstances of the repossession, including any witnesses. Take photos of where the vehicle was parked. Save all communications from your lender. Do not sign any voluntary surrender documents. Contact an attorney as soon as possible. You should also request a written accounting of your loan balance and any fees being charged. Under most state laws, you have a limited window to redeem (buy back) your vehicle before it is sold.",
  },
  {
    question: "Can I get my personal belongings back from a repossessed car?",
    answer:
      "Yes. Your personal property inside the vehicle does not belong to the lender. Under most state laws, the lender or repossession company must allow you to retrieve your personal belongings within a reasonable time. If they refuse to return your property, damage it, or dispose of it without notice, you may have an additional legal claim for conversion or property damage.",
  },
  {
    question: "What is a deficiency balance, and do I have to pay it?",
    answer:
      "A deficiency balance is the difference between what you owe on your loan and what the lender receives when it sells your repossessed vehicle at auction. However, the lender must sell the vehicle in a 'commercially reasonable manner' and provide you with proper notice of the sale. If the lender failed to send proper notice, sold the vehicle for an unreasonably low price, or did not conduct the sale in a commercially reasonable way, you may be able to challenge or eliminate the deficiency balance entirely.",
  },
  {
    question: "How much does it cost to hire a wrongful repossession attorney?",
    answer:
      "Most wrongful repossession attorneys work on a contingency fee basis, meaning you pay nothing upfront and the attorney only gets paid if you win or settle your case. Under federal laws like the Fair Debt Collection Practices Act (FDCPA), the lender may be required to pay your attorney's fees if you prevail. This means pursuing a wrongful repossession claim is typically free to you as the consumer.",
  },
  {
    question: "What laws protect me from wrongful repossession?",
    answer:
      "Several federal and state laws protect consumers from wrongful repossession. The Uniform Commercial Code (UCC), adopted in all 50 states, requires that repossession occur without breach of the peace and that proper notices be sent. The Fair Debt Collection Practices Act (FDCPA) prohibits abusive collection tactics by third-party collectors. Many states also have their own consumer protection statutes, such as California's Rees-Levering Act, Texas's Debt Collection Act, and Florida's Consumer Collection Practices Act. Each state has specific requirements that lenders must follow.",
  },
  {
    question: "How long do I have to file a wrongful repossession claim?",
    answer:
      "The statute of limitations varies by state and by the type of claim. Federal FDCPA claims must be filed within one year of the violation. State UCC claims typically have a four-year statute of limitations, though this varies by state. State consumer protection claims may have different deadlines ranging from one to six years. Because these deadlines are strict and missing them means losing your right to sue, it is critical to consult with an attorney as soon as possible after a wrongful repossession.",
  },
  {
    question: "What kind of compensation can I receive for wrongful repossession?",
    answer:
      "Compensation for wrongful repossession can include: actual damages (the value of the vehicle, towing costs, rental car expenses, lost wages); statutory damages up to $1,000 per violation under the FDCPA; emotional distress damages for anxiety, humiliation, and stress caused by the wrongful repossession; elimination of any deficiency balance the lender claims you owe; return of the vehicle in some cases; punitive damages in cases of egregious conduct; and attorney's fees and court costs. The total recovery depends on the facts of your case and your state's laws, but settlements commonly range from $3,000 to $50,000 or more.",
  },
];

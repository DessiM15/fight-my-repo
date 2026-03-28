// =============================================================================
// Chat Script Data for Fight My Repo - Guided Intake Chat Flow
// =============================================================================

export interface ChatOption {
  label: string;
  nextId: string;
}

export interface ChatNode {
  id: string;
  message: string;
  options: ChatOption[];
  isEnd?: boolean;
  actionType?: "form" | "phone" | "none";
}

export const chatNodes: Record<string, ChatNode> = {
  // ===========================================================================
  // GREETING / ENTRY POINT
  // ===========================================================================
  greeting: {
    id: "greeting",
    message:
      "Hi there! I can help you figure out if your rights were violated. What best describes your situation?",
    options: [
      { label: "My car was repossessed", nextId: "repo_when" },
      { label: "I'm being harassed by a debt collector", nextId: "debt_type" },
      { label: "There's an error on my credit report", nextId: "credit_error" },
      { label: "Something else", nextId: "other_issue" },
    ],
  },

  // ===========================================================================
  // REPOSSESSION PATH
  // ===========================================================================
  repo_when: {
    id: "repo_when",
    message: "I'm sorry to hear that. When was your vehicle repossessed?",
    options: [
      { label: "Within the last 30 days", nextId: "repo_circumstances" },
      { label: "1-6 months ago", nextId: "repo_circumstances" },
      { label: "6-12 months ago", nextId: "repo_circumstances" },
      { label: "More than a year ago", nextId: "repo_statute" },
    ],
  },

  repo_statute: {
    id: "repo_statute",
    message:
      "Time limits may apply to your claim, but you may still have options. Let's look at the details. Can you describe what happened during the repossession?",
    options: [
      { label: "They were aggressive or threatening", nextId: "repo_breach" },
      { label: "I was current on payments", nextId: "repo_current" },
      { label: "I never received any notice", nextId: "repo_no_notice" },
      { label: "I'm not sure what my rights are", nextId: "repo_qualify" },
    ],
  },

  repo_circumstances: {
    id: "repo_circumstances",
    message: "Can you tell me more about what happened? Did any of the following occur?",
    options: [
      { label: "The repo agent was aggressive or threatening", nextId: "repo_breach" },
      { label: "I was current on my payments", nextId: "repo_current" },
      { label: "I never received any notice beforehand", nextId: "repo_no_notice" },
      { label: "My personal belongings were kept or damaged", nextId: "repo_property" },
    ],
  },

  repo_breach: {
    id: "repo_breach",
    message:
      "Aggressive or threatening behavior during repossession is called a 'breach of the peace' and makes the repossession wrongful under the law. This is a strong basis for a legal claim. Did the repo agent do any of the following?",
    options: [
      { label: "Used threats or physical intimidation", nextId: "repo_qualify" },
      { label: "Entered my locked garage or gated property", nextId: "repo_qualify" },
      { label: "Refused to stop when I objected", nextId: "repo_qualify" },
      { label: "Caused a scene or public disturbance", nextId: "repo_qualify" },
    ],
  },

  repo_current: {
    id: "repo_current",
    message:
      "If you were current on payments when your vehicle was repossessed, that is a serious violation. This sometimes happens due to payment processing errors or miscommunication. Do you have records showing your payments were up to date?",
    options: [
      { label: "Yes, I have bank statements or receipts", nextId: "repo_qualify" },
      { label: "I think so, but I need to check", nextId: "repo_qualify" },
      { label: "No, but I know I was current", nextId: "repo_qualify" },
    ],
  },

  repo_no_notice: {
    id: "repo_no_notice",
    message:
      "Many states require lenders to send a 'right to cure' notice before repossession, giving you a chance to catch up on payments. If you never received this notice, the repossession may be wrongful. Did you receive any letters or calls from the lender before the repo?",
    options: [
      { label: "No notice at all", nextId: "repo_qualify" },
      { label: "I received calls but no written notice", nextId: "repo_qualify" },
      { label: "I'm not sure", nextId: "repo_qualify" },
    ],
  },

  repo_property: {
    id: "repo_property",
    message:
      "Your personal belongings in the vehicle are your property, not the lender's. The repo company is required to let you retrieve your items. Were you able to get your belongings back?",
    options: [
      { label: "No, they refused to return my property", nextId: "repo_qualify" },
      { label: "Some items were missing or damaged", nextId: "repo_qualify" },
      { label: "They charged me a fee to get my belongings", nextId: "repo_qualify" },
      { label: "I haven't tried yet", nextId: "repo_qualify" },
    ],
  },

  repo_qualify: {
    id: "repo_qualify",
    message:
      "Based on what you've described, you may have a strong legal claim. A wrongful repossession attorney can review your case at no cost to you -- most work on contingency, so you pay nothing unless you win. Would you like a free case evaluation?",
    options: [
      { label: "Yes, I'd like a free case evaluation", nextId: "repo_connect" },
      { label: "I have more questions first", nextId: "repo_faq" },
      { label: "No thanks, not right now", nextId: "end_no_thanks" },
    ],
  },

  repo_connect: {
    id: "repo_connect",
    message:
      "Great! Fill out the short form below and an attorney will review your case for free. There is no obligation and no upfront cost.",
    options: [],
    isEnd: true,
    actionType: "form",
  },

  repo_faq: {
    id: "repo_faq",
    message: "Sure, what would you like to know more about?",
    options: [
      { label: "How much could my case be worth?", nextId: "repo_value" },
      { label: "How long does the process take?", nextId: "repo_timeline" },
      { label: "Will this cost me anything?", nextId: "repo_cost" },
      { label: "I'm ready for a free evaluation", nextId: "repo_connect" },
    ],
  },

  repo_value: {
    id: "repo_value",
    message:
      "Wrongful repossession settlements typically range from $3,000 to $50,000 or more, depending on the violations involved. Factors include whether there was a breach of peace, failure to provide notice, emotional distress, and whether you lost your job or incurred expenses because of the repo. An attorney can give you a more specific estimate.",
    options: [
      { label: "I'd like a free case evaluation", nextId: "repo_connect" },
      { label: "I have another question", nextId: "repo_faq" },
    ],
  },

  repo_timeline: {
    id: "repo_timeline",
    message:
      "Most wrongful repossession cases are resolved within 3 to 9 months. Some cases settle quickly through negotiation, while others may take longer if litigation is needed. Your attorney will keep you informed throughout the process.",
    options: [
      { label: "I'd like a free case evaluation", nextId: "repo_connect" },
      { label: "I have another question", nextId: "repo_faq" },
    ],
  },

  repo_cost: {
    id: "repo_cost",
    message:
      "Most wrongful repossession attorneys work on a contingency basis, which means you pay nothing upfront and nothing at all unless you win or settle your case. Under federal law, the lender may even be required to pay your attorney's fees.",
    options: [
      { label: "I'd like a free case evaluation", nextId: "repo_connect" },
      { label: "I have another question", nextId: "repo_faq" },
    ],
  },

  // ===========================================================================
  // DEBT COLLECTION HARASSMENT PATH
  // ===========================================================================
  debt_type: {
    id: "debt_type",
    message:
      "I'm sorry you're dealing with that. What type of harassment are you experiencing?",
    options: [
      { label: "Excessive phone calls", nextId: "debt_calls" },
      { label: "Threats of arrest or legal action", nextId: "debt_threats" },
      { label: "Contacting my family or employer", nextId: "debt_third_party" },
      { label: "Trying to collect a debt I don't owe", nextId: "debt_wrong" },
    ],
  },

  debt_calls: {
    id: "debt_calls",
    message:
      "Under the Fair Debt Collection Practices Act (FDCPA), collectors cannot call you before 8am or after 9pm, and repeated calls intended to annoy or harass you are illegal. How often are they calling?",
    options: [
      { label: "Multiple times a day", nextId: "debt_qualify" },
      { label: "At inappropriate hours", nextId: "debt_qualify" },
      { label: "They keep calling after I asked them to stop", nextId: "debt_qualify" },
    ],
  },

  debt_threats: {
    id: "debt_threats",
    message:
      "Threatening arrest, jail time, or legal action they cannot or do not intend to take is a clear violation of the FDCPA. This is one of the most common and serious violations. Have they threatened you with any of the following?",
    options: [
      { label: "Arrest or criminal charges", nextId: "debt_qualify" },
      { label: "Wage garnishment without a court order", nextId: "debt_qualify" },
      { label: "Lawsuits they haven't actually filed", nextId: "debt_qualify" },
      { label: "Other threats", nextId: "debt_qualify" },
    ],
  },

  debt_third_party: {
    id: "debt_third_party",
    message:
      "Debt collectors are generally prohibited from discussing your debt with anyone other than you, your spouse, or your attorney. Contacting your employer, family members, or neighbors about your debt is a violation of the FDCPA. Who did they contact?",
    options: [
      { label: "My employer or coworkers", nextId: "debt_qualify" },
      { label: "Family members", nextId: "debt_qualify" },
      { label: "Neighbors or friends", nextId: "debt_qualify" },
    ],
  },

  debt_wrong: {
    id: "debt_wrong",
    message:
      "If a collector is trying to collect a debt you don't owe -- or the wrong amount -- that is a violation of the FDCPA. Have you disputed the debt with the collector?",
    options: [
      { label: "Yes, but they keep calling", nextId: "debt_qualify" },
      { label: "No, I haven't disputed it yet", nextId: "debt_qualify" },
      { label: "I sent a written dispute but they ignored it", nextId: "debt_qualify" },
    ],
  },

  debt_qualify: {
    id: "debt_qualify",
    message:
      "Based on what you've described, you likely have a valid FDCPA claim. An attorney can review your case at no cost to you. Would you like a free case evaluation?",
    options: [
      { label: "Yes, I'd like a free evaluation", nextId: "debt_connect" },
      { label: "No thanks, not right now", nextId: "end_no_thanks" },
    ],
  },

  debt_connect: {
    id: "debt_connect",
    message:
      "Fill out the short form below and an attorney will review your case for free. There is no obligation and no upfront cost.",
    options: [],
    isEnd: true,
    actionType: "form",
  },

  // ===========================================================================
  // CREDIT REPORTING ERROR PATH
  // ===========================================================================
  credit_error: {
    id: "credit_error",
    message:
      "Credit reporting errors can seriously harm your financial life. What kind of error are you dealing with?",
    options: [
      { label: "A repossession is reported inaccurately", nextId: "credit_repo" },
      { label: "A debt I don't owe is on my report", nextId: "credit_unknown" },
      { label: "Wrong balance or account status", nextId: "credit_wrong_info" },
      { label: "A discharged bankruptcy debt is still showing", nextId: "credit_bankruptcy" },
    ],
  },

  credit_repo: {
    id: "credit_repo",
    message:
      "If a repossession is reported inaccurately on your credit report -- for example, showing the wrong date, wrong balance, or failing to note that you disputed it -- you may have claims under the Fair Credit Reporting Act (FCRA). Have you disputed this with the credit bureau?",
    options: [
      { label: "Yes, and they didn't fix it", nextId: "credit_qualify" },
      { label: "Yes, but the lender didn't respond", nextId: "credit_qualify" },
      { label: "No, I haven't disputed it yet", nextId: "credit_dispute_info" },
    ],
  },

  credit_unknown: {
    id: "credit_unknown",
    message:
      "Having a debt you don't owe on your credit report is a serious issue. This could be identity theft, a mixed file, or a collector reporting a debt that has been paid or discharged. Have you disputed this with the credit bureau?",
    options: [
      { label: "Yes, and they didn't remove it", nextId: "credit_qualify" },
      { label: "No, I haven't disputed it yet", nextId: "credit_dispute_info" },
    ],
  },

  credit_wrong_info: {
    id: "credit_wrong_info",
    message:
      "Inaccurate balances, wrong account statuses, and other errors can hurt your credit score and your ability to get loans, housing, or even jobs. Have you disputed the error?",
    options: [
      { label: "Yes, and they didn't fix it", nextId: "credit_qualify" },
      { label: "No, I haven't disputed it yet", nextId: "credit_dispute_info" },
    ],
  },

  credit_bankruptcy: {
    id: "credit_bankruptcy",
    message:
      "If a debt was discharged in bankruptcy but is still being reported as active or owed, that is a violation of both the bankruptcy discharge order and potentially the FCRA. Have you notified the credit bureaus about your bankruptcy discharge?",
    options: [
      { label: "Yes, but they haven't updated it", nextId: "credit_qualify" },
      { label: "No, I'm not sure how to do that", nextId: "credit_qualify" },
    ],
  },

  credit_dispute_info: {
    id: "credit_dispute_info",
    message:
      "To build a strong FCRA case, it helps to first dispute the error in writing with the credit bureau. An attorney can help you with this process and then take legal action if the bureau or furnisher fails to correct the error. Would you like a free evaluation?",
    options: [
      { label: "Yes, I'd like a free evaluation", nextId: "credit_connect" },
      { label: "No thanks, not right now", nextId: "end_no_thanks" },
    ],
  },

  credit_qualify: {
    id: "credit_qualify",
    message:
      "It sounds like you may have a valid FCRA claim. Under the FCRA, you can recover actual damages, statutory damages, and attorney's fees. Would you like a free case evaluation?",
    options: [
      { label: "Yes, I'd like a free evaluation", nextId: "credit_connect" },
      { label: "No thanks, not right now", nextId: "end_no_thanks" },
    ],
  },

  credit_connect: {
    id: "credit_connect",
    message:
      "Fill out the short form below and an attorney will review your credit reporting case for free.",
    options: [],
    isEnd: true,
    actionType: "form",
  },

  // ===========================================================================
  // OTHER ISSUE PATH
  // ===========================================================================
  other_issue: {
    id: "other_issue",
    message: "No problem. Can you tell me a bit more about what you're dealing with?",
    options: [
      { label: "I'm being sued for a deficiency balance", nextId: "other_deficiency" },
      { label: "My car was repossessed during bankruptcy", nextId: "other_bankruptcy" },
      { label: "I need general legal advice", nextId: "other_general" },
    ],
  },

  other_deficiency: {
    id: "other_deficiency",
    message:
      "If a lender is suing you for a deficiency balance after repossession, you may have defenses. The lender must prove the vehicle was sold in a commercially reasonable manner and that proper notices were provided. If they failed to do either, the deficiency may be reduced or eliminated. Would you like a free case evaluation?",
    options: [
      { label: "Yes, I'd like a free evaluation", nextId: "other_connect" },
      { label: "No thanks", nextId: "end_no_thanks" },
    ],
  },

  other_bankruptcy: {
    id: "other_bankruptcy",
    message:
      "Repossessing a vehicle during an active bankruptcy violates the automatic stay, which is a serious violation of federal law. The lender can face sanctions, and you may be entitled to damages. This is a strong legal claim. Would you like a free case evaluation?",
    options: [
      { label: "Yes, I'd like a free evaluation", nextId: "other_connect" },
      { label: "No thanks", nextId: "end_no_thanks" },
    ],
  },

  other_general: {
    id: "other_general",
    message:
      "We can connect you with an attorney who specializes in consumer protection and wrongful repossession. The consultation is free and confidential. Would you like to proceed?",
    options: [
      { label: "Yes, connect me with an attorney", nextId: "other_connect" },
      { label: "No thanks, not right now", nextId: "end_no_thanks" },
    ],
  },

  other_connect: {
    id: "other_connect",
    message:
      "Fill out the short form below and an attorney will reach out to discuss your situation. There is no cost or obligation.",
    options: [],
    isEnd: true,
    actionType: "form",
  },

  // ===========================================================================
  // END STATES
  // ===========================================================================
  end_no_thanks: {
    id: "end_no_thanks",
    message:
      "No problem at all. If you change your mind or have questions in the future, we're here to help. You can also call us directly for a free consultation.",
    options: [
      { label: "Actually, I'd like an evaluation", nextId: "repo_connect" },
      { label: "Start over", nextId: "greeting" },
    ],
    isEnd: true,
    actionType: "phone",
  },
};

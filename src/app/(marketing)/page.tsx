"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import {
  Phone,
  FileText,
  Search,
  Shield,
  Car,
  CreditCard,
  Swords,
  CheckCircle2,
  ChevronRight,
  Scale,
  Award,
  MapPin,
  Clock,
  AlertTriangle,
  Ban,
  PhoneOff,
  FileWarning,
  DollarSign,
  Users,
  Star,
  XCircle,
  ShieldOff,
  Siren,
  Package,
} from "lucide-react";
import { cn, VANITY_NUMBER, VANITY_HREF } from "@/lib/utils";
import InlineIntakeForm from "@/components/forms/InlineIntakeForm";
import MapSection from "@/components/map/MapSection";
import { CTABanner } from "@/components/layout/CTABanner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/* ───────────────────────────── constants ───────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

/* ═══════════════════════════════════════════════════════════════════ */
/*  1. HERO SECTION                                                    */
/* ═══════════════════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-[#0D1B2A] overflow-hidden">
      {/* background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-35"
        aria-hidden="true"
      >
        <source src="/money-fall-hero-background.mp4" type="video/mp4" />
      </video>
      {/* navy blue gradient overlay on top of video */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B2A]/80 via-[#1B4965]/70 to-[#0D1B2A]/80" />
      {/* decorative grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
      {/* radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#D4A843]/10 blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* left copy */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-center lg:text-left"
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10 text-[#D4A843] text-sm font-semibold tracking-wide uppercase">
              Consumer Protection Attorneys
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              Wrongfully Repossessed?{" "}
              <span className="text-[#D4A843]">
                Fight Back &amp; Sue for $10K&ndash;$100K+
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[#778DA9] max-w-xl mx-auto lg:mx-0">
              Since 2014, Sue The Collector has helped cancel over{" "}
              <span className="text-white font-semibold">$1 billion in consumer debt</span> and
              recovered millions for people just like you. If your car was wrongfully repossessed, your
              credit report is wrong, or your SCRA rights were violated &mdash;
              we can help.
            </p>

            {/* Vanity phone number — large & prominent */}
            <motion.a
              href={VANITY_HREF}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-8 flex flex-col items-center lg:items-start gap-1"
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-[#C1121F]">
                Call Us Today
              </span>
              <span className="flex items-center gap-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white hover:text-[#D4A843] transition-colors">
                <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-[#C1121F] animate-pulse" />
                {VANITY_NUMBER}
              </span>
              <span className="text-sm text-[#778DA9]">
                Free &amp; confidential. Available 24/7.
              </span>
            </motion.a>
          </motion.div>

          {/* right form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex flex-col items-center"
          >
            {/* Entrepreneur 360 badge */}
            <Image
              src="/entrepreneur-360-badge.webp"
              alt="Entrepreneur 360 - Best Entrepreneurial Companies in America"
              width={280}
              height={280}
              className="mb-4"
            />

            <div className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-1">
                Do You Have a Case?
              </h2>
              <p className="text-[#778DA9] text-sm mb-5">
                Answer 3 quick questions to find out if you&rsquo;re owed $10K&ndash;$100K+
              </p>
              <InlineIntakeForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  3. HOW IT WORKS                                                    */
/* ═══════════════════════════════════════════════════════════════════ */
function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      icon: FileText,
      title: "Tell Us What Happened",
      desc: "Fill out a quick form or call us. It takes less than 2 minutes.",
    },
    {
      icon: Search,
      title: "Free Case Evaluation",
      desc: "Our attorneys review your situation at no cost and no obligation.",
    },
    {
      icon: Shield,
      title: "We Fight For You",
      desc: "If you have a case, we handle everything. You pay nothing upfront.",
    },
  ];

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A]">
            How It Works
          </h2>
          <p className="mt-3 text-[#778DA9] text-lg max-w-2xl mx-auto">
            Three simple steps to pursue the compensation you deserve.
          </p>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-12 md:gap-8">
          {/* dotted connector */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] border-t-2 border-dashed border-[#D4A843]/30" />

          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#D4A843]/10 border border-[#D4A843]/20 flex items-center justify-center mb-6">
                <step.icon className="w-7 h-7 text-[#D4A843]" />
              </div>
              <span className="absolute -top-2 -left-2 md:static md:mb-2 w-8 h-8 rounded-full bg-[#D4A843] text-[#0D1B2A] font-bold text-sm flex items-center justify-center">
                {i + 1}
              </span>
              <h3 className="text-xl font-bold text-[#0D1B2A] mb-2">
                {step.title}
              </h3>
              <p className="text-[#778DA9]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  4. PRACTICE AREA CARDS                                             */
/* ═══════════════════════════════════════════════════════════════════ */
function PracticeAreaCards() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const areas = [
    {
      href: "/wrongful-repossession",
      icon: Car,
      title: "Wrongful Repossession",
      desc: "Your car was taken illegally. State & federal laws protect you from wrongful repo tactics.",
      range: "$10,000 - $100,000+",
    },
    {
      href: "/fcra-credit-report-errors",
      icon: CreditCard,
      title: "FCRA Credit Report Errors",
      desc: "Errors on your credit report? The Fair Credit Reporting Act gives you the right to sue.",
      range: "$1,000 - $50,000+",
    },
    {
      href: "/military-scra-protection",
      icon: Swords,
      title: "Military SCRA Protection",
      desc: "Active duty service members have special protections. We enforce the SCRA nationwide.",
      range: "$10,000 - $100,000+",
    },
  ];

  return (
    <section ref={ref} className="bg-[#0D1B2A] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How We Can Help You
          </h2>
          <p className="mt-3 text-[#778DA9] text-lg">
            Click a practice area to learn more about your rights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {areas.map((area, i) => (
            <motion.div
              key={area.href}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              variants={fadeUp}
            >
              <Link
                href={area.href}
                className="group block h-full bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-[#D4A843]/40 hover:bg-[#D4A843]/5 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#D4A843]/10 flex items-center justify-center mb-6 group-hover:bg-[#D4A843]/20 transition-colors">
                  <area.icon className="w-7 h-7 text-[#D4A843]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4A843] transition-colors">
                  {area.title}
                </h3>
                <p className="text-[#778DA9] mb-6">{area.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[#D4A843] font-bold text-lg">
                    {area.range}
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#D4A843] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  4b. THINGS REPO MEN CANNOT DO                                      */
/* ═══════════════════════════════════════════════════════════════════ */

const cannotDoItems = [
  {
    icon: Ban,
    title: "Breach the Peace",
    desc: "They cannot yell, threaten, curse, push you, or argue when you object to the repossession.",
  },
  {
    icon: ShieldOff,
    title: "Enter Private Property",
    desc: "They cannot enter a closed garage, cut locks, break gates, or damage your property to take the vehicle.",
  },
  {
    icon: Car,
    title: "Take a Vehicle with Someone Inside",
    desc: "They cannot repossess the car if you or anyone else is inside it or about to drive it.",
  },
  {
    icon: Siren,
    title: "Impersonate Law Enforcement",
    desc: "They cannot use fake police lights, badges, or pretend to be law enforcement to trick you.",
  },
  {
    icon: Scale,
    title: "Repo After Bankruptcy Filing",
    desc: "They cannot repossess your car after you've filed bankruptcy — that violates the automatic stay.",
  },
  {
    icon: Package,
    title: "Keep Your Personal Belongings",
    desc: "They must return personal items left in the vehicle — tools, child seats, documents, clothing, and more.",
  },
  {
    icon: FileWarning,
    title: "Skip Required Notices",
    desc: "They cannot skip sending you a proper Notice of Sale or collect a deficiency balance without following the law.",
  },
  {
    icon: DollarSign,
    title: "Charge Illegal Fees",
    desc: "They cannot charge you retrieval fees for your belongings or tack on unauthorized charges after repossession.",
  },
];

function ThingsRepoMenCannotDo() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#0D1B2A] py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Things Repo Men &amp; Lenders{" "}
            <span className="text-[#C1121F]">CANNOT DO</span>
          </h2>
          <p className="mt-3 text-[#778DA9] text-lg max-w-2xl mx-auto">
            When repossessing your car, the law protects you. If any of these happened, you may have a case.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cannotDoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              variants={fadeUp}
              className="group bg-white/5 border border-white/10 rounded-xl p-5 hover:border-[#C1121F]/40 hover:bg-[#C1121F]/5 transition-all duration-300"
            >
              <div className="relative mb-4 w-12 h-12 rounded-xl bg-[#C1121F]/10 border border-[#C1121F]/20 flex items-center justify-center group-hover:bg-[#C1121F]/20 transition-colors">
                <item.icon className="w-6 h-6 text-[#C1121F]" />
                <XCircle className="absolute -top-1.5 -right-1.5 w-5 h-5 text-[#C1121F] bg-[#0D1B2A] rounded-full" />
              </div>
              <h3 className="font-extrabold text-white text-base sm:text-lg mb-2 group-hover:text-[#C1121F] transition-colors">
                {item.title}
              </h3>
              <p className="text-[#778DA9] text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={8}
          variants={fadeUp}
          className="mt-10 text-center"
        >
          <Link
            href="#violations"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#C1121F] text-white font-bold hover:bg-[#C1121F]/90 transition-colors shadow-lg shadow-[#C1121F]/20"
          >
            Did any of these happen to you? Check below <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  5. VIOLATIONS CHECKLIST                                            */
/* ═══════════════════════════════════════════════════════════════════ */
function ViolationsChecklist() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const categories = [
    {
      label: "Repossession Violations",
      icon: Car,
      items: [
        { text: "Car taken without proper notice", value: 15000 },
        { text: "Breach of the peace during repo", value: 20000 },
        { text: "Personal property not returned", value: 5000 },
      ],
    },
    {
      label: "Credit Reporting Errors",
      icon: CreditCard,
      items: [
        { text: "Incorrect balance reported", value: 5000 },
        { text: "Account not marked as disputed", value: 3000 },
        { text: "Identity mixed with another person", value: 10000 },
      ],
    },
    {
      label: "Illegal Debt Collection",
      icon: PhoneOff,
      items: [
        { text: "Called before 8am or after 9pm", value: 3000 },
        { text: "Threatened arrest or jail", value: 10000 },
        { text: "Called your workplace after being told not to", value: 5000 },
      ],
    },
    {
      label: "Deficiency Balance Issues",
      icon: DollarSign,
      items: [
        { text: "Sued for remaining balance after repo", value: 15000 },
        { text: "Vehicle sold for unreasonably low price", value: 10000 },
      ],
    },
    {
      label: "Notice Violations",
      icon: FileWarning,
      items: [
        { text: "No right-to-cure notice sent", value: 10000 },
        { text: "No post-repo sale notice", value: 8000 },
      ],
    },
    {
      label: "Military / SCRA Violations",
      icon: Shield,
      items: [
        { text: "Repo while on active duty", value: 25000 },
        { text: "Interest rate not reduced to 6%", value: 15000 },
      ],
    },
  ];

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const total = Object.entries(checked).reduce((sum, [key, val]) => {
    if (!val) return sum;
    for (const cat of categories) {
      for (const item of cat.items) {
        if (item.text === key) return sum + item.value;
      }
    }
    return sum;
  }, 0);

  const toggle = (text: string) =>
    setChecked((prev) => ({ ...prev, [text]: !prev[text] }));

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A]">
            Check Your Violations
          </h2>
          <p className="mt-3 text-[#778DA9] text-lg max-w-2xl mx-auto">
            Select everything that happened to you. We&rsquo;ll estimate what
            your case could be worth.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {categories.map((cat) => (
            <div
              key={cat.label}
              className="bg-gray-50 rounded-xl border border-gray-200 p-5"
            >
              <div className="flex items-center gap-2 mb-4">
                <cat.icon className="w-5 h-5 text-[#D4A843]" />
                <h3 className="font-bold text-[#0D1B2A] text-sm">
                  {cat.label}
                </h3>
              </div>
              <ul className="space-y-3">
                {cat.items.map((item) => (
                  <li key={item.text}>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={!!checked[item.text]}
                        onChange={() => toggle(item.text)}
                        className="mt-0.5 w-5 h-5 rounded border-gray-300 text-[#D4A843] focus:ring-[#D4A843] accent-[#D4A843]"
                      />
                      <span className="text-sm text-[#0D1B2A] group-hover:text-[#D4A843] transition-colors">
                        {item.text}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* running total */}
        <motion.div
          animate={{ scale: total > 0 ? [1, 1.02, 1] : 1 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "rounded-2xl p-8 text-center transition-colors duration-300",
            total > 0
              ? "bg-[#D4A843] text-[#0D1B2A]"
              : "bg-gray-100 text-gray-500"
          )}
        >
          {total > 0 ? (
            <>
              <p className="text-lg font-semibold mb-1">
                Based on your selections, you may be entitled to
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold">
                ${total.toLocaleString()}+
              </p>
              <Link
                href="#hero-form"
                className="mt-6 inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#0D1B2A] text-white font-bold hover:bg-[#1B4965] transition-colors"
              >
                Get Your Free Case Review <ChevronRight className="w-4 h-4" />
              </Link>
            </>
          ) : (
            <p className="text-lg">
              Select the violations that apply to you above.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  6. KNOWN COMPANIES                                                 */
/* ═══════════════════════════════════════════════════════════════════ */
function KnownCompanies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const companies = [
    "Santander Consumer USA",
    "Credit Acceptance Corp",
    "Capital One Auto",
    "Westlake Financial",
    "Ally Financial",
    "DriveTime / Carvana",
    "JPMorgan Chase Auto",
    "GM Financial",
    "CarMax Auto Finance",
  ];

  return (
    <section ref={ref} className="bg-[#0D1B2A] py-20 lg:py-28">
      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            We Sue These Companies
          </h2>
          <p className="mt-3 text-[#778DA9] text-lg">
            Our firm has filed cases against the biggest lenders in the country.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {companies.map((name, i) => (
            <motion.div
              key={name}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              variants={fadeUp}
              className="bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-center text-white font-semibold text-sm hover:border-[#D4A843]/40 hover:text-[#D4A843] transition-all cursor-default"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  7. SOCIAL PROOF / COUNTERS                                         */
/* ═══════════════════════════════════════════════════════════════════ */
function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

function SocialProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: 10000, prefix: "", suffix: "+", label: "Consumers Helped" },
    { value: 1, prefix: "$", suffix: "B+", label: "Debt Canceled" },
    { value: 50, prefix: "", suffix: "", label: "States Covered" },
    { value: 2014, prefix: "", suffix: "", label: "Founded" },
  ];

  const caseResults = [
    { amount: "$1.2M", desc: "Wrongful repossession class action", state: "TX" },
    { amount: "$875K", desc: "SCRA violation against major lender", state: "FL" },
    { amount: "$450K", desc: "FCRA credit reporting lawsuit", state: "CA" },
  ];

  return (
    <section ref={ref} className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={i}
              variants={fadeUp}
              className="text-center py-8 px-4 rounded-2xl bg-[#0D1B2A]"
            >
              <p className="text-3xl sm:text-4xl font-extrabold text-[#D4A843]">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-[#778DA9] text-sm font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Founder & Company credentials */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mb-6">
              Founded by Jarred D. Johnson
            </h2>
            <p className="text-[#778DA9] mb-4">
              After being personally harassed by debt collectors over non-collectible debts,
              Jarred D. Johnson founded Sue The Collector in 2014 to help consumers fight back.
              Based in Franklin, Tennessee, the company partners with law firms across the
              United States to take on illegal debt collectors, predatory lenders, and credit
              reporting violations.
            </p>
            <ul className="space-y-3 text-[#778DA9]">
              {[
                "Named #162 on Entrepreneur Magazine's 2018 Entrepreneur360 List",
                "Helped cancel over $1 billion in consumer debt",
                "Partnered with attorneys in all 50 states",
                "No fees to consumers — attorneys recover fees from defendants",
                "Covers FDCPA, TCPA, SCRA, TILA, RESPA & state law violations",
                "Helping consumers fight back since 2014",
              ].map((cred) => (
                <li key={cred} className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-[#D4A843] flex-shrink-0 mt-0.5" />
                  <span>{cred}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* case highlights */}
          <div className="space-y-4">
            {caseResults.map((result, i) => (
              <motion.div
                key={i}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={i + 2}
                variants={fadeUp}
                className="flex items-center gap-5 bg-gray-50 rounded-xl p-5 border border-gray-200"
              >
                <span className="text-2xl font-extrabold text-[#D4A843]">
                  {result.amount}
                </span>
                <div>
                  <p className="font-semibold text-[#0D1B2A]">{result.desc}</p>
                  <p className="text-sm text-[#778DA9]">{result.state}</p>
                </div>
              </motion.div>
            ))}
            <p className="text-xs text-[#778DA9] italic">
              * Past results do not guarantee future outcomes. Each case is
              unique and results vary.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  8. FAQ ACCORDION                                                   */
/* ═══════════════════════════════════════════════════════════════════ */
const faqs = [
  {
    q: "How much does it cost to hire your firm?",
    a: "Nothing upfront. We work on a contingency basis, meaning you only pay if we win your case. There are no out-of-pocket costs to you.",
  },
  {
    q: "What is wrongful repossession?",
    a: "Wrongful repossession occurs when a lender takes your vehicle without following proper legal procedures, such as failing to send required notices, breaching the peace during the repo, or repossessing a vehicle you are current on.",
  },
  {
    q: "How much can I recover in a wrongful repo case?",
    a: "Recovery amounts vary, but typical cases settle for $10,000 to $100,000 or more depending on the circumstances, including statutory damages, actual damages, emotional distress, and attorney fees.",
  },
  {
    q: "Can I sue if my credit report has errors?",
    a: "Yes. Under the Fair Credit Reporting Act (FCRA), you have the right to sue credit bureaus and furnishers that fail to correct inaccurate information after you dispute it. Damages can include statutory damages up to $1,000, plus actual damages and attorney fees.",
  },
  {
    q: "Do you handle cases in my state?",
    a: "Yes. Sue The Collector partners with consumer protection attorneys in all 50 states through our nationwide network. No matter where you are, we can help.",
  },
  {
    q: "What is the SCRA and does it apply to me?",
    a: "The Servicemembers Civil Relief Act (SCRA) protects active-duty military members from certain civil actions, including repossessions, foreclosures, and high interest rates. If you are or were on active duty, you may have additional legal protections.",
  },
  {
    q: "How long does a case typically take?",
    a: "Most cases resolve within 3 to 12 months, depending on complexity. Some cases settle quickly while others may go to trial. We keep you informed every step of the way.",
  },
];

function FAQAccordionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <section ref={ref} className="bg-gray-50 py-20 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-3xl px-4">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="bg-white rounded-xl border border-gray-200 px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-[#0D1B2A] hover:text-[#D4A843] py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#778DA9] pb-5">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                               */
/* ═══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <PracticeAreaCards />
      <ThingsRepoMenCannotDo />
      <ViolationsChecklist />

      {/* State Map */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              We Fight in All 50 States
            </h2>
            <p className="mt-3 text-[#778DA9] text-lg max-w-2xl mx-auto">
              Click your state to see your local repossession laws and how we can help.
            </p>
          </div>
          <MapSection />
        </div>
      </section>

      <KnownCompanies />
      <SocialProof />
      <FAQAccordionSection />
      <CTABanner
        variant="gold"
        title="Wrongfully Repossessed? Get Your Free Case Review Now"
        subtitle="No fees unless we win. Speak with an attorney today."
        showPhone
      />
    </>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import {
  Phone,
  Award,
  Scale,
  Star,
  ChevronRight,
  Shield,
  Users,
  Trophy,
  Quote,
  CheckCircle2,
} from "lucide-react";
import { VANITY_NUMBER, VANITY_HREF } from "@/lib/utils";
import { CTABanner } from "@/components/layout/CTABanner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "Case Results & Reviews | Sue The Collector | $1B+ in Debt Canceled",
  description:
    "See our case results and client reviews. Sue The Collector has helped cancel over $1 billion in consumer debt nationwide. Entrepreneur 360 honoree.",
};

const caseResults = [
  {
    amount: "$1.2 Million",
    type: "Wrongful Repossession",
    description:
      "Class action against major subprime lender for systematic failure to send pre-repossession notices in Texas.",
    state: "Texas",
    year: "2023",
  },
  {
    amount: "$875,000",
    type: "SCRA Violation",
    description:
      "Active-duty service member's vehicle repossessed without court order. Lender also failed to reduce interest rate to 6%.",
    state: "Florida",
    year: "2023",
  },
  {
    amount: "$450,000",
    type: "FCRA Violation",
    description:
      "Credit bureau continued reporting inaccurate information after multiple disputes. Mixed file with another consumer.",
    state: "California",
    year: "2022",
  },
  {
    amount: "$325,000",
    type: "Wrongful Repossession",
    description:
      "Breach of peace during repossession. Repo agent entered locked garage and physically confronted consumer.",
    state: "Georgia",
    year: "2023",
  },
  {
    amount: "$215,000",
    type: "Debt Collection Violation",
    description:
      "Collector called employer repeatedly after being told to stop, threatened arrest, and attempted to collect a time-barred debt.",
    state: "New York",
    year: "2022",
  },
  {
    amount: "$180,000",
    type: "Wrongful Repossession",
    description:
      "Vehicle repossessed while payments were current. Lender misapplied payments and failed to investigate dispute.",
    state: "Illinois",
    year: "2023",
  },
];

const credentials = [
  "Named #162 on Entrepreneur Magazine's 2018 Entrepreneur360 List",
  "Helped cancel over $1 billion in consumer debt",
  "Partnered with consumer protection attorneys in all 50 states",
  "No fees to consumers — attorneys recover fees from defendants",
  "Covers FDCPA, TCPA, SCRA, TILA, RESPA & state law violations",
  "Founded in 2014, headquartered in Franklin, Tennessee",
  "Helped tens of thousands of consumers obtain legal assistance",
];

const awards = [
  {
    icon: Trophy,
    title: "Entrepreneur 360",
    desc: "Named one of the Best Entrepreneurial Companies in America by Entrepreneur Magazine",
  },
  {
    icon: Award,
    title: "$1B+ Debt Canceled",
    desc: "Helped cancel over $1 billion in consumer debt nationwide",
  },
  {
    icon: Star,
    title: "Nationwide Coverage",
    desc: "Partnered with consumer protection attorneys across all 50 states",
  },
  {
    icon: Scale,
    title: "Since 2014",
    desc: "Tens of thousands of consumers helped since founding in Franklin, TN",
  },
];

const testimonials = [
  {
    quote:
      "Sue The Collector fought for me when no one else would. My car was wrongfully repossessed and they got me a settlement I never expected.",
    name: "Verified Client",
    location: "Texas",
    rating: 5,
  },
  {
    quote:
      "They handled my SCRA case with incredible professionalism. As a service member, I felt like they truly cared about protecting my rights.",
    name: "Verified Client",
    location: "Florida",
    rating: 5,
  },
  {
    quote:
      "My credit report had errors for years. After contacting Sue The Collector, the errors were fixed and I received compensation for the damage it caused.",
    name: "Verified Client",
    location: "California",
    rating: 5,
  },
];

export default function ResultsReviewsPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-[#0D1B2A] via-[#1B4965] to-[#0D1B2A] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Results & Reviews" },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10">
              <Trophy className="w-4 h-4 text-[#D4A843]" />
              <span className="text-[#D4A843] text-sm font-semibold">
                Proven Track Record
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Over{" "}
              <span className="text-[#D4A843]">$1 Billion in Debt Canceled</span>{" "}
              for Consumers Nationwide
            </h1>

            <p className="mt-6 text-lg text-[#778DA9] max-w-xl">
              Since 2014, Sue The Collector has been fighting for consumer
              rights. Here are just a few of our case results and what our
              clients say about working with us.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="/#hero-form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4A843] text-[#0D1B2A] font-bold hover:bg-[#D4A843]/90 transition-colors"
              >
                Get Your Free Case Review <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={VANITY_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {VANITY_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Case Results ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A]">
              Notable Case Results
            </h2>
            <p className="mt-3 text-[#778DA9] text-lg max-w-2xl mx-auto">
              These cases represent a sampling of our firm&rsquo;s results across
              various practice areas.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseResults.map((result, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-6 hover:border-[#D4A843]/40 hover:shadow-lg transition-all group"
              >
                <div className="text-3xl font-extrabold text-[#D4A843] mb-3">
                  {result.amount}
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-[#0D1B2A] text-white text-xs font-semibold mb-3">
                  {result.type}
                </div>
                <p className="text-[#778DA9] text-sm mb-4">
                  {result.description}
                </p>
                <div className="flex items-center justify-between text-xs text-[#778DA9]">
                  <span>{result.state}</span>
                  <span>{result.year}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#778DA9] italic max-w-2xl mx-auto">
            * Past results do not guarantee future outcomes. Each case is unique
            and depends on its own facts and circumstances. The amounts shown
            include settlements and verdicts before any fees and costs.
          </p>
        </div>
      </section>

      {/* ─── Founder Bio ─── */}
      <section className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Bio */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                Founded by Jarred D. Johnson
              </h2>
              <p className="text-[#778DA9] text-lg mb-6">
                After being personally harassed by debt collectors over
                non-collectible debts, entrepreneur Jarred D. Johnson founded
                Sue The Collector in 2014 to help consumers fight back. Based
                in Franklin, Tennessee, the company has since helped cancel
                over $1 billion in consumer debt and assisted tens of thousands
                of consumers in obtaining legal representation.
              </p>
              <p className="text-[#778DA9] mb-8">
                Sue The Collector was named one of the Best Entrepreneurial
                Companies in America by Entrepreneur Magazine&apos;s 2018
                Entrepreneur360 list, ranked #162. The company partners with
                law firms across all 50 states to take on illegal debt
                collectors, predatory lenders, and credit reporting violations
                &mdash; at no cost to consumers.
              </p>

              <ul className="space-y-2">
                {credentials.map((cred) => (
                  <li key={cred} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#D4A843] flex-shrink-0 mt-1" />
                    <span className="text-[#778DA9] text-sm">{cred}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Awards */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">
                Awards & Recognition
              </h3>
              {awards.map((award) => (
                <div
                  key={award.title}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center flex-shrink-0">
                    <award.icon className="w-6 h-6 text-[#D4A843]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{award.title}</h4>
                    <p className="text-[#778DA9] text-sm">{award.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A]">
              What Our Clients Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl border border-gray-200 p-6"
              >
                <Quote className="w-8 h-8 text-[#D4A843]/30 mb-4" />
                <p className="text-[#0D1B2A] mb-6 italic leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 fill-[#D4A843] text-[#D4A843]"
                    />
                  ))}
                </div>
                <p className="font-semibold text-[#0D1B2A] text-sm">
                  {t.name}
                </p>
                <p className="text-[#778DA9] text-xs">{t.location}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[#778DA9] italic">
            * Client identities protected for privacy. Reviews represent
            individual experiences and are not guarantees of outcomes.
          </p>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTABanner
        variant="gold"
        title="Ready to Fight Back? Get Your Free Case Review"
        subtitle="Over $1B in debt canceled. No fees unless we win your case."
        showPhone
      />
    </>
  );
}

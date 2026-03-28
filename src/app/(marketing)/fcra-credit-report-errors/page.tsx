import { Metadata } from "next";
import Link from "next/link";
import {
  CreditCard,
  AlertTriangle,
  Shield,
  CheckCircle2,
  ChevronRight,
  FileText,
  Scale,
  DollarSign,
  Users,
  Eye,
  Ban,
  Phone,
} from "lucide-react";
import { VANITY_HREF } from "@/lib/utils";
import InlineIntakeForm from "@/components/forms/InlineIntakeForm";
import { CTABanner } from "@/components/layout/CTABanner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title: "FCRA Credit Report Error Lawyers | Sue for $1K-$50K+ | Fight My Repo",
  description:
    "Errors on your credit report? The Fair Credit Reporting Act gives you the right to sue. Free case review. No fees unless we win.",
};

const bureaus = [
  {
    name: "Equifax",
    color: "from-red-600 to-red-700",
    disputes: "equifax.com/personal/credit-report-services",
    phone: "1-866-349-5191",
    desc: "One of the largest credit bureaus, Equifax has faced massive scrutiny including a 2017 data breach affecting 147 million consumers.",
  },
  {
    name: "Experian",
    color: "from-blue-600 to-blue-700",
    disputes: "experian.com/disputes/main.html",
    phone: "1-888-397-3742",
    desc: "Experian is the world's largest credit bureau. They are frequently named in FCRA lawsuits for failing to properly investigate disputes.",
  },
  {
    name: "TransUnion",
    color: "from-sky-600 to-sky-700",
    disputes: "transunion.com/credit-disputes",
    phone: "1-800-916-8800",
    desc: "TransUnion maintains files on over 1 billion consumers worldwide. They must investigate disputes within 30 days under the FCRA.",
  },
];

const violations = [
  {
    icon: AlertTriangle,
    title: "Inaccurate Account Information",
    desc: "Wrong balances, incorrect payment history, accounts that don't belong to you, or accounts showing as open when they're closed.",
  },
  {
    icon: Users,
    title: "Mixed Credit Files",
    desc: "Your credit file is mixed with someone else's, often someone with a similar name or Social Security number.",
  },
  {
    icon: Ban,
    title: "Failure to Investigate Disputes",
    desc: "Credit bureaus are required to conduct a reasonable investigation within 30 days. Rubber-stamping furnisher responses is not sufficient.",
  },
  {
    icon: Eye,
    title: "Unauthorized Hard Inquiries",
    desc: "Hard inquiries on your report from companies you never authorized to check your credit.",
  },
  {
    icon: FileText,
    title: "Outdated Negative Information",
    desc: "Negative items that should have aged off your report (most must be removed after 7 years).",
  },
  {
    icon: Scale,
    title: "Furnisher Violations",
    desc: "Banks, lenders, and collectors that report false information or fail to update after a dispute are also liable.",
  },
];

const rights = [
  "Right to a free annual credit report from each bureau",
  "Right to dispute inaccurate information and receive investigation results within 30 days",
  "Right to have inaccurate information corrected or removed",
  "Right to know who has accessed your credit report",
  "Right to sue for willful or negligent FCRA violations",
  "Right to actual damages, statutory damages up to $1,000 per violation, and attorney fees",
  "Right to place a fraud alert or credit freeze",
  "Right to be notified if information in your file is used against you",
];

export default function FCRAPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "FCRA Credit Report Errors" },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10">
                <CreditCard className="w-4 h-4 text-[#D4A843]" />
                <span className="text-[#D4A843] text-sm font-semibold">
                  FCRA Violations
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Credit Report Errors?{" "}
                <span className="text-[#D4A843]">
                  Sue for $1,000&ndash;$50,000+
                </span>
              </h1>

              <p className="mt-6 text-lg text-[#8A8A8A] max-w-xl">
                The Fair Credit Reporting Act (FCRA) gives you the right to sue
                credit bureaus and furnishers that report inaccurate information
                and refuse to fix it. We handle these cases nationwide on
                contingency.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#intake"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4A843] text-[#0A0A0A] font-bold text-lg hover:bg-[#D4A843]/90 transition-colors"
                >
                  Free Case Review
                </Link>
                <a
                  href={VANITY_HREF}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#C1121F]/30 text-[#C1121F] font-bold hover:bg-[#C1121F]/5 transition-colors"
                >
                  Call Us Now
                </a>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-4">
                FCRA Settlement Ranges
              </h2>
              <ul className="space-y-3">
                {[
                  ["Statutory damages (per violation)", "Up to $1,000"],
                  ["Actual damages", "$5,000 - $50,000+"],
                  ["Emotional distress damages", "Varies by case"],
                  ["Attorney fees & costs", "Paid by defendant"],
                  ["Punitive damages (willful violation)", "Uncapped"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between py-2 border-b border-white/5"
                  >
                    <span className="text-[#8A8A8A] text-sm">{label}</span>
                    <span className="text-[#D4A843] font-bold text-sm">
                      {value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── What is FCRA ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] mb-6 text-center">
            What is the Fair Credit Reporting Act?
          </h2>
          <div className="prose prose-lg max-w-none text-[#8A8A8A]">
            <p>
              The <strong className="text-[#0A0A0A]">Fair Credit Reporting Act (FCRA)</strong>{" "}
              is a federal law enacted in 1970 that regulates the collection,
              dissemination, and use of consumer credit information. It was
              designed to ensure the accuracy, fairness, and privacy of the
              information in consumer credit bureau files.
            </p>
            <p>
              Under the FCRA, credit reporting agencies (Equifax, Experian, and
              TransUnion) must follow strict procedures when collecting, sharing,
              and verifying your credit information. If they fail to do so, you
              have the right to sue for damages.
            </p>
            <p>
              The law also places obligations on{" "}
              <strong className="text-[#0A0A0A]">furnishers</strong> &mdash; the banks,
              lenders, and collection agencies that provide information to the
              credit bureaus. Furnishers must report accurate information and
              properly investigate disputes.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Three Bureau Cards ─── */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] mb-12 text-center">
            The Three Credit Bureaus
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {bureaus.map((bureau) => (
              <div
                key={bureau.name}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div
                  className={`bg-gradient-to-r ${bureau.color} px-6 py-4`}
                >
                  <h3 className="text-xl font-bold text-white">
                    {bureau.name}
                  </h3>
                </div>
                <div className="p-6">
                  <p className="text-[#8A8A8A] text-sm mb-4">{bureau.desc}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#D4A843]" />
                      <span className="text-[#0A0A0A] font-medium">
                        {bureau.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#D4A843]" />
                      <span className="text-[#8A8A8A] text-xs break-all">
                        {bureau.disputes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Common Violations ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
              Common FCRA Violations
            </h2>
            <p className="mt-3 text-[#8A8A8A] text-lg max-w-2xl mx-auto">
              If any of these apply to you, the credit bureau or furnisher may
              be liable for damages.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {violations.map((v) => (
              <div
                key={v.title}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-[#D4A843]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-[#D4A843]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                  {v.title}
                </h3>
                <p className="text-[#8A8A8A] text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Your Rights ─── */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-10 text-center">
            Your Rights Under the FCRA
          </h2>
          <div className="space-y-4">
            {rights.map((right, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#D4A843] flex-shrink-0 mt-0.5" />
                <span className="text-[#8A8A8A]">{right}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Intake Form ─── */}
      <section id="intake" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-[#0A0A0A]">
              Get Your Free FCRA Case Review
            </h2>
            <p className="mt-3 text-[#8A8A8A]">
              Tell us about the errors on your credit report. We&rsquo;ll review
              your case at no cost.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8">
            <InlineIntakeForm />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTABanner
        variant="gold"
        title="Credit Report Errors? Get Your Free Case Review"
        subtitle="No fees unless we win. Our FCRA attorneys are ready to help."
        showPhone
      />
    </>
  );
}

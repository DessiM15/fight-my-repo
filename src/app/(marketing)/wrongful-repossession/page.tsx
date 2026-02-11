import { Metadata } from "next";
import Link from "next/link";
import {
  Car,
  AlertTriangle,
  FileWarning,
  Phone,
  ChevronRight,
  Shield,
  Scale,
  Ban,
  DollarSign,
} from "lucide-react";
import { VANITY_NUMBER, VANITY_HREF } from "@/lib/utils";
import InlineIntakeForm from "@/components/forms/InlineIntakeForm";
import { CTABanner } from "@/components/layout/CTABanner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import MapSection from "@/components/map/MapSection";

export const metadata: Metadata = {
  title:
    "Wrongful Repossession Lawyers | Sue for $10K-$100K+ | Sue The Collector",
  description:
    "Was your car wrongfully repossessed? Our attorneys fight lenders nationwide. Free case review. No fees unless we win. Recover $10,000 to $100,000+.",
};

const violations = [
  {
    icon: Ban,
    title: "No Right-to-Cure Notice",
    desc: "Many states require lenders to notify you before repossession, giving you a chance to catch up on payments.",
  },
  {
    icon: AlertTriangle,
    title: "Breach of the Peace",
    desc: "Repo agents cannot use threats, force, break into a closed garage, or cause a confrontation.",
  },
  {
    icon: FileWarning,
    title: "Missing Post-Sale Notice",
    desc: "After selling your vehicle, lenders must send you a notice of the sale price and any deficiency balance.",
  },
  {
    icon: DollarSign,
    title: "Commercially Unreasonable Sale",
    desc: "Your vehicle must be sold in a commercially reasonable manner. Fire-sale prices can void the deficiency.",
  },
  {
    icon: Car,
    title: "Personal Property Not Returned",
    desc: "Lenders must return personal belongings found in your vehicle. Failure to do so is a violation.",
  },
  {
    icon: Scale,
    title: "Wrongful Deficiency Judgment",
    desc: "If the repo was improper, the lender may lose the right to collect any remaining balance from you.",
  },
];

export default function WrongfulRepossessionPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-[#0D1B2A] via-[#1B4965] to-[#0D1B2A] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Wrongful Repossession" },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10">
                <Car className="w-4 h-4 text-[#D4A843]" />
                <span className="text-[#D4A843] text-sm font-semibold">
                  Wrongful Repossession
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                Your Car Was Taken Illegally.{" "}
                <span className="text-[#D4A843]">
                  We&rsquo;ll Get You $10K&ndash;$100K+
                </span>
              </h1>

              <p className="mt-6 text-lg text-[#778DA9] max-w-xl">
                Every state has strict rules lenders must follow before and
                during a repossession. If they broke the law, you can sue for
                significant compensation &mdash; and we handle everything on
                contingency.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#intake"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4A843] text-[#0D1B2A] font-bold text-lg hover:bg-[#D4A843]/90 transition-colors"
                >
                  Free Case Review
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

            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-2">
                Common Recovery Amounts
              </h2>
              <ul className="space-y-3 mt-4">
                {[
                  ["Statutory damages", "$10,000 - $25,000"],
                  ["Actual damages (car value)", "Full vehicle value"],
                  ["Emotional distress", "$5,000 - $50,000"],
                  ["Attorney fees & costs", "Paid by the lender"],
                  ["Punitive damages", "Up to $100,000+"],
                ].map(([label, value]) => (
                  <li
                    key={label}
                    className="flex items-center justify-between py-2 border-b border-white/5"
                  >
                    <span className="text-[#778DA9] text-sm">{label}</span>
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

      {/* ─── Map + Search ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A]">
              Find Your State&rsquo;s Repossession Laws
            </h2>
            <p className="mt-3 text-[#778DA9] text-lg max-w-2xl mx-auto">
              Click your state on the map or search below to see your specific
              rights and protections.
            </p>
          </div>

          <MapSection />
        </div>
      </section>

      {/* ─── Violations Overview ─── */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D1B2A]">
              Common Repossession Violations
            </h2>
            <p className="mt-3 text-[#778DA9] text-lg max-w-2xl mx-auto">
              If any of these happened to you, you likely have a strong case.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {violations.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-[#D4A843]/40 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-[#D4A843]" />
                </div>
                <h3 className="text-lg font-bold text-[#0D1B2A] mb-2">
                  {v.title}
                </h3>
                <p className="text-[#778DA9] text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Intake Form ─── */}
      <section id="intake" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white">
              Get Your Free Case Evaluation
            </h2>
            <p className="mt-3 text-[#778DA9]">
              Tell us what happened. If you have a case, we fight for you at no
              upfront cost.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 sm:p-8">
            <InlineIntakeForm />
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <CTABanner
        variant="gold"
        title="Was Your Car Wrongfully Repossessed?"
        subtitle="Get a free case evaluation today. No fees unless we win."
        showPhone
      />
    </>
  );
}

import { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Star,
  Scale,
  Home,
  Car,
  CreditCard,
  DollarSign,
  Users,
  Flag,
  Swords,
} from "lucide-react";
import { VANITY_HREF } from "@/lib/utils";
import InlineIntakeForm from "@/components/forms/InlineIntakeForm";
import { CTABanner } from "@/components/layout/CTABanner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export const metadata: Metadata = {
  title:
    "Military SCRA Protection Lawyers | Servicemembers Civil Relief Act | Fight My Repo",
  description:
    "Active duty military? The SCRA protects you from wrongful repossession, foreclosure, and high interest rates. Free case review. We fight for service members nationwide.",
};

const eligibility = [
  {
    title: "Active Duty Military",
    desc: "All branches: Army, Navy, Air Force, Marines, Coast Guard, Space Force",
    icon: Swords,
  },
  {
    title: "National Guard",
    desc: "When activated under federal orders (Title 10)",
    icon: Shield,
  },
  {
    title: "Reservists",
    desc: "When called to active duty for more than 30 consecutive days",
    icon: Star,
  },
  {
    title: "Dependents",
    desc: "Spouses and dependents of active-duty service members may also qualify",
    icon: Users,
  },
];

const protections = [
  {
    icon: DollarSign,
    title: "6% Interest Rate Cap",
    desc: "Interest rates on pre-service debts (including auto loans, credit cards, and mortgages) must be reduced to 6% during active duty.",
  },
  {
    icon: Car,
    title: "Repossession Protection",
    desc: "Your vehicle cannot be repossessed without a court order while you are on active duty or within 90 days after.",
  },
  {
    icon: Home,
    title: "Foreclosure Protection",
    desc: "Lenders cannot foreclose on your home without a court order during service and up to one year after.",
  },
  {
    icon: Scale,
    title: "Default Judgment Protection",
    desc: "Courts must appoint an attorney if you cannot appear due to military service. Default judgments can be set aside.",
  },
  {
    icon: CreditCard,
    title: "Lease Termination Rights",
    desc: "You can terminate residential and vehicle leases early when receiving PCS orders or deployment orders.",
  },
  {
    icon: Shield,
    title: "Stay of Proceedings",
    desc: "You can request a stay (postponement) of any civil court proceedings while on active duty.",
  },
];

const violations = [
  {
    title: "Vehicle Repossessed During Active Duty",
    desc: "Lenders that repossess a service member's vehicle without a court order violate the SCRA.",
    damages: "$10,000 - $50,000+",
  },
  {
    title: "Interest Rate Not Reduced to 6%",
    desc: "If you requested the 6% rate cap and your lender refused or failed to apply it, you have a claim.",
    damages: "$5,000 - $25,000+",
  },
  {
    title: "Foreclosure Without Court Order",
    desc: "Mortgage servicers that foreclose without obtaining a court order during active duty violate the SCRA.",
    damages: "$25,000 - $100,000+",
  },
  {
    title: "Lease Termination Denied",
    desc: "Landlords and auto dealers that refuse to honor SCRA lease termination rights are liable.",
    damages: "$5,000 - $25,000+",
  },
  {
    title: "Default Judgment Entered",
    desc: "If a default judgment was entered against you during service without the court appointing an attorney.",
    damages: "$10,000 - $50,000+",
  },
  {
    title: "Denial of Stay of Proceedings",
    desc: "Courts that deny your request for a stay without good cause may have violated the SCRA.",
    damages: "Varies",
  },
];

export default function MilitarySCRAPage() {
  return (
    <>
      {/* ─── Hero (Patriotic Theme) ─── */}
      <section className="relative bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] py-20 lg:py-28 overflow-hidden">
        {/* Subtle patriotic accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-white to-red-600" />

        <div className="relative mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Military SCRA Protection" },
            ]}
          />

          <div className="mt-8 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10">
                <Shield className="w-4 h-4 text-[#D4A843]" />
                <span className="text-[#D4A843] text-sm font-semibold">
                  Military SCRA Protection
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
                You Served Your Country.{" "}
                <span className="text-[#D4A843]">
                  Now Let Us Fight for You.
                </span>
              </h1>

              <p className="mt-6 text-lg text-[#8A8A8A] max-w-xl">
                The Servicemembers Civil Relief Act (SCRA) provides powerful
                legal protections to active-duty military members. If a lender
                violated your SCRA rights, you can sue for substantial
                compensation.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="#intake"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4A843] text-[#0A0A0A] font-bold text-lg hover:bg-[#D4A843]/90 transition-colors"
                >
                  Free Case Review for Veterans
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
              <h2 className="text-xl font-bold text-white mb-2">
                SCRA Recovery Ranges
              </h2>
              <p className="text-[#8A8A8A] text-sm mb-4">
                Military members have recovered significant amounts for SCRA violations.
              </p>
              <ul className="space-y-3">
                {[
                  ["Vehicle repossession", "$10,000 - $50,000+"],
                  ["Foreclosure violation", "$25,000 - $100,000+"],
                  ["Interest rate violation", "$5,000 - $25,000+"],
                  ["Attorney fees & costs", "Paid by the lender"],
                  ["Punitive damages", "Case dependent"],
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

      {/* ─── SCRA Overview ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A] mb-6 text-center">
            What is the Servicemembers Civil Relief Act?
          </h2>
          <div className="prose prose-lg max-w-none text-[#8A8A8A]">
            <p>
              The <strong className="text-[#0A0A0A]">Servicemembers Civil Relief Act (SCRA)</strong>,
              formerly known as the Soldiers&rsquo; and Sailors&rsquo; Civil
              Relief Act, is a federal law that provides legal protections to
              military personnel while they are on active duty. The law
              recognizes that military service can make it difficult for service
              members to meet financial obligations and participate in civil
              legal proceedings.
            </p>
            <p>
              The SCRA covers a wide range of protections including interest rate
              caps, protection from eviction and foreclosure, protection from
              repossession, the right to terminate leases, and stays of civil
              proceedings. Violations of the SCRA carry both civil and criminal
              penalties.
            </p>
            <p>
              Major banks and lenders have paid{" "}
              <strong className="text-[#0A0A0A]">hundreds of millions of dollars</strong>{" "}
              in settlements for SCRA violations, including JPMorgan Chase ($56M),
              Capital One ($12M), and Santander ($9.35M).
            </p>
          </div>
        </div>
      </section>

      {/* ─── Eligibility Grid ─── */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
              Who Qualifies for SCRA Protection?
            </h2>
            <p className="mt-3 text-[#8A8A8A] text-lg">
              The SCRA applies to the following service members and their dependents.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {eligibility.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl border border-gray-200 p-6 flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-[#D4A843]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-[#8A8A8A] text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Protections List ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0A]">
              SCRA Protections
            </h2>
            <p className="mt-3 text-[#8A8A8A] text-lg max-w-2xl mx-auto">
              Key protections provided by the Servicemembers Civil Relief Act.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {protections.map((p) => (
              <div
                key={p.title}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6 hover:border-[#D4A843]/40 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center mb-4">
                  <p.icon className="w-6 h-6 text-[#D4A843]" />
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                  {p.title}
                </h3>
                <p className="text-[#8A8A8A] text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Violations ─── */}
      <section className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Common SCRA Violations
            </h2>
            <p className="mt-3 text-[#8A8A8A] text-lg">
              If any of these happened to you during active duty, you may have a case.
            </p>
          </div>

          <div className="space-y-4">
            {violations.map((v) => (
              <div
                key={v.title}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-1">
                    {v.title}
                  </h3>
                  <p className="text-[#8A8A8A] text-sm">{v.desc}</p>
                </div>
                <div className="flex-shrink-0 px-4 py-2 bg-[#D4A843]/10 border border-[#D4A843]/30 rounded-lg">
                  <span className="text-[#D4A843] font-bold text-sm whitespace-nowrap">
                    {v.damages}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Intake Form ─── */}
      <section id="intake" className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10">
              <Flag className="w-4 h-4 text-[#D4A843]" />
              <span className="text-[#D4A843] text-sm font-semibold">
                Free for Service Members
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#0A0A0A]">
              Get Your Free SCRA Case Review
            </h2>
            <p className="mt-3 text-[#8A8A8A]">
              Tell us about your situation. We proudly serve those who serve our
              country.
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
        title="Military Member? We'll Fight for Your SCRA Rights"
        subtitle="Free case evaluation for service members and veterans."
        showPhone
      />
    </>
  );
}

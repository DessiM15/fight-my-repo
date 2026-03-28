import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Scale,
  DollarSign,
  Shield,
  FileWarning,
  Users,
  Car,
} from "lucide-react";
import { VANITY_HREF } from "@/lib/utils";
import InlineIntakeForm from "@/components/forms/InlineIntakeForm";
import { CTABanner } from "@/components/layout/CTABanner";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import {
  lenders,
  getLenderBySlug,
  getAllLenderSlugs,
  type LenderData,
} from "@/data/lenders";

/* ═══════════════════════════════════════════════════════════════════ */
/*  STATIC PARAMS                                                      */
/* ═══════════════════════════════════════════════════════════════════ */
export async function generateStaticParams() {
  return getAllLenderSlugs().map((slug) => ({ lenderSlug: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lenderSlug: string }>;
}): Promise<Metadata> {
  const { lenderSlug } = await params;
  const lender = getLenderBySlug(lenderSlug);
  if (!lender) return { title: "Lender Not Found" };
  return {
    title: `Sue ${lender.name} | Wrongful Repossession Lawyers | Fight My Repo`,
    description: `Has ${lender.name} wrongfully repossessed your vehicle or violated your rights? Free case review. No fees unless we win.`,
  };
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                               */
/* ═══════════════════════════════════════════════════════════════════ */
export default async function LenderPage({
  params,
}: {
  params: Promise<{ lenderSlug: string }>;
}) {
  const { lenderSlug } = await params;
  const lender = getLenderBySlug(lenderSlug);
  if (!lender) notFound();

  const isFullPage = lender.isFullPage;
  const ext = lender.extended;
  const rangeStr = `$${lender.settlementRange.min.toLocaleString()} - $${lender.settlementRange.max.toLocaleString()}+`;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Wrongful Repossession", href: "/wrongful-repossession" },
              { label: lender.name },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#C1121F]/30 bg-[#C1121F]/10">
              <AlertTriangle className="w-4 h-4 text-[#C1121F]" />
              <span className="text-[#C1121F] text-sm font-semibold">
                Lender Spotlight
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              Sue{" "}
              <span className="text-[#D4A843]">{lender.name}</span>
            </h1>

            <p className="mt-6 text-lg text-[#8A8A8A] max-w-xl">
              {lender.description}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="#intake"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4A843] text-[#0A0A0A] font-bold hover:bg-[#D4A843]/90 transition-colors"
              >
                Free Case Review <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={VANITY_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#C1121F]/30 text-[#C1121F] font-bold hover:bg-[#C1121F]/5 transition-colors"
              >
                Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Common Violations ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-3xl font-extrabold text-[#0A0A0A] mb-8">
            Common {lender.name} Violations
          </h2>
          <div className="space-y-4">
            {lender.commonViolations.map((v, i) => (
              <div
                key={i}
                className="flex items-start gap-4 bg-gray-50 rounded-xl border border-gray-200 p-5"
              >
                <CheckCircle2 className="w-5 h-5 text-[#D4A843] flex-shrink-0 mt-0.5" />
                <span className="text-[#0A0A0A]">{v}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-[#D4A843] rounded-2xl p-8 text-center">
            <p className="text-[#0A0A0A] font-semibold mb-1">
              Typical Settlement Range vs {lender.name}
            </p>
            <p className="text-4xl font-extrabold text-[#0A0A0A]">
              {rangeStr}
            </p>
          </div>
        </div>
      </section>

      {/* ─── Full-page: Extended Overview ─── */}
      {isFullPage && ext && (
        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] mb-6">
              About {lender.name}
            </h2>
            <p className="text-[#8A8A8A] text-lg leading-relaxed">
              {ext.overview}
            </p>
          </div>
        </section>
      )}

      {/* ─── Full-page: Violation Details ─── */}
      {isFullPage && ext?.violationDetails && ext.violationDetails.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] mb-8">
              Detailed Violation Analysis
            </h2>
            <div className="space-y-4">
              {ext.violationDetails.map((detail, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-xl border border-gray-200 p-6"
                >
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-[#8A8A8A]">{detail.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Full-page: Recent Settlements ─── */}
      {isFullPage && ext?.recentSettlements && ext.recentSettlements.length > 0 && (
        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] mb-8">
              Regulatory Actions &amp; Settlements
            </h2>
            <div className="space-y-4">
              {ext.recentSettlements.map((settlement, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-4 bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex-shrink-0">
                    <span className="text-2xl font-extrabold text-[#D4A843]">
                      {settlement.amount}
                    </span>
                    <span className="block text-xs text-[#8A8A8A]">
                      ({settlement.year})
                    </span>
                  </div>
                  <p className="text-[#0A0A0A]">{settlement.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-[#8A8A8A] italic">
              * Regulatory settlements are separate from individual consumer
              claims. Your case value depends on your specific circumstances.
            </p>
          </div>
        </section>
      )}

      {/* ─── Templated content for non-full pages ─── */}
      {!isFullPage && (
        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-extrabold text-[#0A0A0A] mb-6">
              Your Rights Against {lender.name}
            </h2>
            <p className="text-[#8A8A8A] text-lg mb-6">
              If {lender.name} has wrongfully repossessed your vehicle, violated
              the SCRA, or engaged in unfair collection practices, federal and
              state consumer protection laws give you the right to sue for
              damages. These damages can include:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: DollarSign, text: "Statutory damages (per violation)" },
                { icon: Car, text: "Return of your vehicle or its value" },
                { icon: Shield, text: "Emotional distress damages" },
                { icon: Scale, text: "Attorney fees paid by the lender" },
                { icon: FileWarning, text: "Punitive damages for willful violations" },
                { icon: Users, text: "Class action eligibility" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4"
                >
                  <item.icon className="w-5 h-5 text-[#D4A843] flex-shrink-0" />
                  <span className="text-[#0A0A0A] text-sm font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Intake Form ─── */}
      <section id="intake" className="bg-[#0A0A0A] py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white">
              Free Case Review vs {lender.name}
            </h2>
            <p className="mt-3 text-[#8A8A8A]">
              Tell us what {lender.name} did. Our attorneys will evaluate your
              case at no cost.
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
        title={`Wronged by ${lender.name}?`}
        subtitle="Get a free case evaluation. No fees unless we win."
        showPhone
      />
    </>
  );
}

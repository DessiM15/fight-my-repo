import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Phone,
  Car,
  Shield,
  Scale,
  AlertTriangle,
  FileWarning,
  ChevronRight,
  MapPin,
  CheckCircle2,
  Award,
} from "lucide-react";
import { VANITY_NUMBER, VANITY_HREF } from "@/lib/utils";
import InlineIntakeForm from "@/components/forms/InlineIntakeForm";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTABanner } from "@/components/layout/CTABanner";
import {
  states,
  getStateBySlug,
  getAllStateSlugs,
  type StateData,
} from "@/data/states";

/* ═══════════════════════════════════════════════════════════════════ */
/*  STATIC PARAMS                                                      */
/* ═══════════════════════════════════════════════════════════════════ */
export async function generateStaticParams() {
  return getAllStateSlugs().map((slug) => ({ stateSlug: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}): Promise<Metadata> {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) return { title: "State Not Found" };
  return {
    title: `${state.name} Wrongful Repossession Lawyers | Sue for $10K-$100K+`,
    description: `Wrongfully repossessed in ${state.name}? Our attorneys know ${state.abbreviation} repo law. Free case review. No fees unless we win.`,
  };
}

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                               */
/* ═══════════════════════════════════════════════════════════════════ */
export default async function StatePage({
  params,
}: {
  params: Promise<{ stateSlug: string }>;
}) {
  const { stateSlug } = await params;
  const state = getStateBySlug(stateSlug);
  if (!state) notFound();

  const isFullPage = state.isFullPage;
  const ext = state.detailedStatutes;
  const faqs = state.stateFaq;
  const lenders = state.localLenders;
  const rangeStr = `$${state.settlementRange.min.toLocaleString()} - $${state.settlementRange.max.toLocaleString()}+`;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-[#0D1B2A] via-[#1B4965] to-[#0D1B2A] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Wrongful Repossession", href: "/wrongful-repossession" },
              { label: state.name },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-[#D4A843]/30 bg-[#D4A843]/10">
              <MapPin className="w-4 h-4 text-[#D4A843]" />
              <span className="text-[#D4A843] text-sm font-semibold">
                {state.name} ({state.abbreviation})
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
              {state.name} Wrongful Repossession Lawyers
            </h1>

            <p className="mt-6 text-lg text-[#778DA9]">
              If your vehicle was wrongfully repossessed in {state.name}, you
              may be entitled to {rangeStr} in damages. Our attorneys
              handle {state.abbreviation} repo cases on contingency &mdash; you
              pay nothing unless we win.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link
                href="#intake"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4A843] text-[#0D1B2A] font-bold hover:bg-[#D4A843]/90 transition-colors"
              >
                Free Case Review <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href={VANITY_HREF}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-bold hover:bg-white/5 transition-colors"
              >
                <Phone className="w-5 h-5" /> {VANITY_NUMBER}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── State Law Overview ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-extrabold text-[#0D1B2A] mb-10">
            {state.name} Repossession Law Overview
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Scale,
                label: "Governing Statute",
                value: state.statute,
              },
              {
                icon: Shield,
                label: "Capital",
                value: state.capital,
              },
              {
                icon: MapPin,
                label: "Major Cities",
                value: state.majorCities.slice(0, 4).join(", "),
              },
              {
                icon: AlertTriangle,
                label: "Settlement Range",
                value: rangeStr,
              },
              {
                icon: Car,
                label: "Full Page Coverage",
                value: isFullPage
                  ? "Comprehensive state-specific content"
                  : "Standard coverage with key statutes",
              },
              {
                icon: Scale,
                label: "Primary Protection",
                value: "UCC Article 9 - No breach of peace",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-xl border border-gray-200 p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="w-5 h-5 text-[#D4A843]" />
                  <span className="font-bold text-[#0D1B2A] text-sm">
                    {item.label}
                  </span>
                </div>
                <p className="text-[#778DA9] text-sm">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Detailed Statutes (full page only) ─── */}
      {isFullPage && ext && ext.length > 0 && (
        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mb-8">
              Key {state.name} Statutes &amp; Protections
            </h2>
            <div className="space-y-4">
              {ext.map((statute, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <Scale className="w-5 h-5 text-[#D4A843] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-bold text-[#0D1B2A]">
                        {statute.name}
                      </h3>
                      <p className="text-xs text-[#D4A843] font-mono mt-0.5">
                        {statute.code}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#778DA9] text-sm mt-3">
                    {statute.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Local Lenders (full page only) ─── */}
      {isFullPage && lenders && lenders.length > 0 && (
        <section className="bg-white py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mb-8">
              Common Lenders in {state.name}
            </h2>
            <p className="text-[#778DA9] mb-6">
              We have experience suing these lenders on behalf of {state.name}{" "}
              consumers:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {lenders.map((lender, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl border border-gray-200 p-4"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#D4A843] flex-shrink-0" />
                  <span className="text-[#0D1B2A] text-sm font-medium">
                    {lender}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── State FAQ (full page only) ─── */}
      {isFullPage && faqs && faqs.length > 0 && (
        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="text-3xl font-extrabold text-[#0D1B2A] mb-8">
              {state.name} Wrongful Repossession FAQ
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <h3 className="font-bold text-[#0D1B2A] mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-[#778DA9] text-sm">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Settlement Range Banner ─── */}
      <section className="bg-[#D4A843] py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-[#0D1B2A] font-semibold mb-1">
            Typical {state.name} Settlement Range
          </p>
          <p className="text-4xl font-extrabold text-[#0D1B2A]">{rangeStr}</p>
          <p className="text-[#0D1B2A]/70 text-sm mt-2">
            * Past results do not guarantee future outcomes.
          </p>
        </div>
      </section>

      {/* ─── Intake Form ─── */}
      <section id="intake" className="bg-[#0D1B2A] py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-white">
              Free {state.name} Case Evaluation
            </h2>
            <p className="mt-3 text-[#778DA9]">
              Tell us about your {state.abbreviation} repossession. No cost, no
              obligation.
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
        title={`Wrongfully Repo'd in ${state.name}?`}
        subtitle="Get a free case evaluation. No fees unless we win."
        showPhone
      />
    </>
  );
}

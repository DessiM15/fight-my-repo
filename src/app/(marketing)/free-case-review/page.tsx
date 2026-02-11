import type { Metadata } from "next";
import { Shield, Scale, Award } from "lucide-react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import IntakeWizard from "@/components/forms/IntakeWizard";

export const metadata: Metadata = {
  title: "Free Case Review | Sue The Collector",
  description:
    "Get your free case review in minutes. Find out if you have a wrongful repossession, debt collection harassment, or credit report error case. No obligation. No cost.",
  openGraph: {
    title: "Free Case Review | Sue The Collector",
    description:
      "Find out if you have a case in minutes. No obligation. No cost. Our attorneys have recovered millions for consumers.",
  },
};

const TRUST_INDICATORS = [
  {
    icon: Shield,
    title: "No Upfront Costs",
    description: "You pay nothing unless we win your case",
  },
  {
    icon: Scale,
    title: "Entrepreneur 360 Honoree",
    description: "Recognized as one of America's best entrepreneurial companies",
  },
  {
    icon: Award,
    title: "Millions Recovered",
    description: "Exposed violations and won significant settlements",
  },
];

export default function FreeCaseReviewPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-navy">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light/30 to-navy" />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-16 sm:px-6 md:pb-16 md:pt-20 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Free Case Review" },
            ]}
            variant="dark"
          />

          <div className="mt-4 text-center">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              Get Your Free{" "}
              <span className="text-gold">Case Review</span>
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-steel-light md:text-xl">
              Find out if you have a case in minutes. No obligation. No cost.
            </p>
          </div>
        </div>
      </section>

      {/* Wizard Section */}
      <section className="relative bg-gray-50 py-12 md:py-16">
        {/* Top decorative edge */}
        <div className="absolute inset-x-0 -top-1 h-2 bg-gradient-to-r from-gold via-gold-dark to-gold" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <IntakeWizard />
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="border-t border-gray-200 bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {TRUST_INDICATORS.map((indicator) => {
              const Icon = indicator.icon;
              return (
                <div
                  key={indicator.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-navy/5">
                    <Icon className="size-7 text-gold" />
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-navy">
                    {indicator.title}
                  </h3>
                  <p className="text-sm text-steel">{indicator.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

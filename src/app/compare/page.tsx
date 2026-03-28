"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  X,
  Monitor,
  Smartphone,
  Layout,
  MousePointer,
  ChevronRight,
  Star,
  Zap,
  BarChart3,
  Eye,
} from "lucide-react";
import { cn, VANITY_HREF } from "@/lib/utils";

/* ═══════════════════════════════════════════════════════════════════ */
/*  TYPES & DATA                                                       */
/* ═══════════════════════════════════════════════════════════════════ */

type DesignView = "old" | "new";

interface ComparisonSection {
  id: string;
  title: string;
  icon: typeof Monitor;
  description: string;
  oldDesign: {
    label: string;
    features: { text: string; good: boolean }[];
    mockContent: React.ReactNode;
  };
  newDesign: {
    label: string;
    features: { text: string; good: boolean }[];
    mockContent: React.ReactNode;
  };
}

const stats = [
  { label: "Expected Conversion Lift", value: "3-5x", icon: BarChart3 },
  { label: "Mobile Performance", value: "95+", icon: Smartphone },
  { label: "SEO Pages", value: "60+", icon: Eye },
  { label: "Avg. Load Time", value: "<1.5s", icon: Zap },
];

const sections: ComparisonSection[] = [
  {
    id: "hero",
    title: "Hero Section",
    icon: Monitor,
    description:
      "The first thing visitors see. Critical for first impressions and conversions.",
    oldDesign: {
      label: "CURRENT SITE",
      features: [
        { text: "Generic stock imagery", good: false },
        { text: "Weak headline with no clear value prop", good: false },
        { text: "No inline form - clicks to separate page", good: false },
        { text: "No social proof or trust signals", good: false },
        { text: "Static, no animations", good: false },
      ],
      mockContent: (
        <div className="bg-gray-800 rounded-lg p-6 h-64 flex flex-col justify-center items-center text-center">
          <div className="w-32 h-20 bg-gray-600 rounded mb-4" />
          <div className="h-4 bg-gray-600 rounded w-48 mb-2" />
          <div className="h-3 bg-gray-700 rounded w-36 mb-4" />
          <div className="h-8 bg-gray-600 rounded w-24" />
        </div>
      ),
    },
    newDesign: {
      label: "NEW DESIGN",
      features: [
        { text: "Bold headline with clear $10K-$100K value prop", good: true },
        { text: "Inline intake form - no extra clicks", good: true },
        { text: "Jarred D. Johnson & Entrepreneur 360 credentials front and center", good: true },
        { text: "Click-to-call phone number prominent", good: true },
        { text: "Framer Motion fade-in animations", good: true },
      ],
      mockContent: (
        <div className="bg-gradient-to-br from-[#0A0A0A] to-[#1A1A1A] rounded-lg p-6 h-64 flex flex-col justify-center">
          <div className="h-2 bg-[#D4A843]/30 rounded w-24 mb-3" />
          <div className="h-5 bg-white/80 rounded w-56 mb-2" />
          <div className="h-5 bg-[#D4A843]/80 rounded w-48 mb-3" />
          <div className="h-3 bg-white/30 rounded w-40 mb-6" />
          <div className="flex gap-3">
            <div className="h-10 bg-[#D4A843] rounded-lg w-32" />
            <div className="h-10 bg-[#C1121F] rounded-lg w-28" />
          </div>
        </div>
      ),
    },
  },
  {
    id: "navigation",
    title: "Navigation & Structure",
    icon: Layout,
    description:
      "How content is organized and how easily visitors can find what they need.",
    oldDesign: {
      label: "CURRENT SITE",
      features: [
        { text: "Flat navigation - all pages same level", good: false },
        { text: "No state-specific pages", good: false },
        { text: "No lender-specific pages", good: false },
        { text: "Generic practice area pages", good: false },
        { text: "Poor internal linking", good: false },
      ],
      mockContent: (
        <div className="bg-gray-100 rounded-lg p-4 h-48">
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 bg-gray-300 rounded w-16" />
            ))}
          </div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      ),
    },
    newDesign: {
      label: "NEW DESIGN",
      features: [
        { text: "Hierarchical nav: Practice Area > State > Lender", good: true },
        { text: "50 state-specific pages with local law info", good: true },
        { text: "9+ lender-specific landing pages", good: true },
        { text: "Interactive US map for state selection", good: true },
        { text: "Breadcrumbs and strong internal links", good: true },
      ],
      mockContent: (
        <div className="bg-gray-50 rounded-lg p-4 h-48">
          <div className="flex gap-2 mb-3">
            {["Home", "Repo", "FCRA", "SCRA", "Results"].map((label) => (
              <div
                key={label}
                className="h-6 px-2 bg-[#0A0A0A] rounded text-white text-[10px] flex items-center"
              >
                {label}
              </div>
            ))}
          </div>
          <div className="text-[9px] text-gray-400 mb-2 flex gap-1 items-center">
            Home <ChevronRight className="w-2 h-2" /> Repo{" "}
            <ChevronRight className="w-2 h-2" /> Texas
          </div>
          <div className="grid grid-cols-3 gap-1">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-8 bg-[#1A1A1A]/20 rounded text-[8px] flex items-center justify-center text-[#1A1A1A]"
              >
                State {i}
              </div>
            ))}
          </div>
        </div>
      ),
    },
  },
  {
    id: "mobile",
    title: "Mobile Experience",
    icon: Smartphone,
    description: "Over 70% of traffic is mobile. The mobile experience is critical.",
    oldDesign: {
      label: "CURRENT SITE",
      features: [
        { text: "Not fully responsive", good: false },
        { text: "Tiny text on mobile screens", good: false },
        { text: "Forms break on small screens", good: false },
        { text: "Slow loading (large images)", good: false },
        { text: "No mobile-specific CTAs", good: false },
      ],
      mockContent: (
        <div className="flex justify-center">
          <div className="w-32 h-56 bg-gray-800 rounded-2xl p-2 border-4 border-gray-600">
            <div className="bg-gray-200 rounded h-full flex flex-col items-center justify-center p-2">
              <div className="h-2 bg-gray-400 rounded w-full mb-2" />
              <div className="h-2 bg-gray-400 rounded w-3/4 mb-2" />
              <div className="h-10 bg-gray-300 rounded w-full mb-2" />
              <div className="h-2 bg-gray-400 rounded w-1/2" />
            </div>
          </div>
        </div>
      ),
    },
    newDesign: {
      label: "NEW DESIGN",
      features: [
        { text: "Mobile-first responsive design", good: true },
        { text: "Touch-optimized tap targets (48px+)", good: true },
        { text: "Click-to-call buttons everywhere", good: true },
        { text: "Next.js optimized images & lazy loading", good: true },
        { text: "Sticky mobile CTA bar", good: true },
      ],
      mockContent: (
        <div className="flex justify-center">
          <div className="w-32 h-56 bg-[#0A0A0A] rounded-2xl p-2 border-4 border-[#1A1A1A]">
            <div className="bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] rounded h-full flex flex-col p-2">
              <div className="h-2 bg-[#D4A843]/50 rounded w-16 mb-2" />
              <div className="h-2 bg-white/80 rounded w-full mb-1" />
              <div className="h-2 bg-[#D4A843] rounded w-3/4 mb-3" />
              <div className="flex-1 bg-white/10 rounded p-1 mb-2">
                <div className="h-2 bg-white/20 rounded mb-1" />
                <div className="h-2 bg-white/20 rounded mb-1" />
                <div className="h-4 bg-[#D4A843] rounded" />
              </div>
              <div className="h-6 bg-[#C1121F] rounded flex items-center justify-center">
                <Phone className="w-2 h-2 text-white" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  },
  {
    id: "lead-capture",
    title: "Lead Capture",
    icon: MousePointer,
    description:
      "How effectively the site converts visitors into leads and cases.",
    oldDesign: {
      label: "CURRENT SITE",
      features: [
        { text: "Single contact form on separate page", good: false },
        { text: "No contextual CTAs", good: false },
        { text: "No chat widget or interactive tools", good: false },
        { text: "No violation calculator", good: false },
        { text: "No urgency or social proof near forms", good: false },
      ],
      mockContent: (
        <div className="bg-gray-100 rounded-lg p-4 h-48 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-40 shadow-sm">
            <div className="h-2 bg-gray-300 rounded mb-2" />
            <div className="h-5 bg-gray-200 rounded mb-2" />
            <div className="h-5 bg-gray-200 rounded mb-2" />
            <div className="h-5 bg-gray-200 rounded mb-3" />
            <div className="h-6 bg-gray-400 rounded" />
          </div>
        </div>
      ),
    },
    newDesign: {
      label: "NEW DESIGN",
      features: [
        { text: "Inline intake forms on every page", good: true },
        { text: "Interactive violation calculator", good: true },
        { text: "AI-powered chat widget with decision tree", good: true },
        { text: "Click-to-call CTAs throughout", good: true },
        { text: "Social proof and urgency near all forms", good: true },
      ],
      mockContent: (
        <div className="bg-[#0A0A0A] rounded-lg p-4 h-48 flex items-center justify-center gap-3">
          <div className="bg-white/10 border border-white/20 rounded-lg p-3 w-28">
            <div className="h-2 bg-white/50 rounded mb-2" />
            <div className="h-4 bg-white/20 rounded mb-1" />
            <div className="h-4 bg-white/20 rounded mb-1" />
            <div className="h-4 bg-[#D4A843] rounded" />
          </div>
          <div className="space-y-2">
            <div className="bg-[#D4A843] rounded-full w-8 h-8 flex items-center justify-center">
              <Star className="w-4 h-4 text-[#0A0A0A]" />
            </div>
            <div className="bg-[#C1121F] rounded-lg px-2 py-1 flex items-center gap-1">
              <Phone className="w-3 h-3 text-white" />
              <span className="text-white text-[8px]">Call</span>
            </div>
          </div>
        </div>
      ),
    },
  },
];

/* ═══════════════════════════════════════════════════════════════════ */
/*  PAGE                                                               */
/* ═══════════════════════════════════════════════════════════════════ */
export default function ComparePage() {
  const [activeView, setActiveView] = useState<DesignView>("new");

  return (
    <div className="pb-20">
      {/* ─── Hero ─── */}
      <section className="bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Website Redesign:{" "}
            <span className="text-[#D4A843]">Before & After</span>
          </h1>
          <p className="mt-4 text-lg text-[#8A8A8A] max-w-2xl mx-auto">
            See how the new design transforms the Fight My Repo website from
            a basic template into a high-converting, SEO-optimized lead
            generation machine.
          </p>

          {/* Toggle */}
          <div className="mt-10 inline-flex items-center bg-white/10 rounded-xl p-1.5">
            {(["old", "new"] as DesignView[]).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={cn(
                  "px-6 py-2.5 rounded-lg font-bold text-sm transition-all",
                  activeView === view
                    ? view === "new"
                      ? "bg-[#D4A843] text-[#0A0A0A]"
                      : "bg-white text-[#0A0A0A]"
                    : "text-white/60 hover:text-white"
                )}
              >
                {view === "old" ? "CURRENT SITE" : "NEW DESIGN"}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Stats Bar ─── */}
      <section className="bg-white border-b border-gray-200 py-8">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="w-6 h-6 text-[#D4A843] mx-auto mb-2" />
                <p className="text-2xl font-extrabold text-[#0A0A0A]">
                  {stat.value}
                </p>
                <p className="text-xs text-[#8A8A8A] font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Comparison Sections ─── */}
      {sections.map((section, sectionIndex) => (
        <section
          key={section.id}
          className={cn(
            "py-16 lg:py-24",
            sectionIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
          )}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex items-center gap-3 mb-2">
              <section.icon className="w-6 h-6 text-[#D4A843]" />
              <h2 className="text-2xl font-extrabold text-[#0A0A0A]">
                {section.title}
              </h2>
            </div>
            <p className="text-[#8A8A8A] mb-10">{section.description}</p>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Old Design */}
              <div
                className={cn(
                  "rounded-2xl border-2 p-6 transition-all",
                  activeView === "old"
                    ? "border-[#C1121F] bg-white shadow-lg"
                    : "border-gray-200 bg-white/50 opacity-60"
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-gray-200 text-xs font-bold text-gray-600">
                    {section.oldDesign.label}
                  </span>
                </div>
                <div className="mb-6">{section.oldDesign.mockContent}</div>
                <ul className="space-y-2">
                  {section.oldDesign.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {f.good ? (
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#C1121F] mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-[#8A8A8A]">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* New Design */}
              <div
                className={cn(
                  "rounded-2xl border-2 p-6 transition-all",
                  activeView === "new"
                    ? "border-[#D4A843] bg-white shadow-lg"
                    : "border-gray-200 bg-white/50 opacity-60"
                )}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-[#D4A843]/10 text-xs font-bold text-[#D4A843]">
                    {section.newDesign.label}
                  </span>
                </div>
                <div className="mb-6">{section.newDesign.mockContent}</div>
                <ul className="space-y-2">
                  {section.newDesign.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      {f.good ? (
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 text-[#C1121F] mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-[#0A0A0A]">{f.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* ─── CTA ─── */}
      <section className="bg-[#0A0A0A] py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Ready to See the{" "}
            <span className="text-[#D4A843]">New Design Live?</span>
          </h2>
          <p className="text-[#8A8A8A] text-lg mb-8">
            The new website is designed to convert more visitors into qualified
            leads with better SEO, faster performance, and a modern user
            experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#D4A843] text-[#0A0A0A] font-bold text-lg hover:bg-[#D4A843]/90 transition-colors"
            >
              View New Homepage <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href={VANITY_HREF}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[#C1121F]/30 text-[#C1121F] font-bold hover:bg-[#C1121F]/5 transition-colors"
            >
              Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

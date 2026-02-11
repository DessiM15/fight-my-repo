import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Design Comparison | Sue The Collector | Before & After",
  description:
    "Compare the current website design with the new redesign. See the improvements in hero, navigation, mobile experience, and lead capture.",
  robots: "noindex, nofollow",
};

export default function CompareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#0D1B2A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Main Site
          </Link>
          <span className="text-sm font-semibold text-[#0D1B2A]">
            Design Comparison
          </span>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

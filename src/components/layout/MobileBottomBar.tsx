"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { VANITY_NUMBER, VANITY_HREF } from "@/lib/utils";

export function MobileBottomBar() {
  const pathname = usePathname();

  // Hide on the free case review page since it's redundant
  if (pathname === "/free-case-review") {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-navy md:hidden">
      <div
        className="flex items-stretch"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <Link
          href="/free-case-review"
          className="flex flex-1 items-center justify-center gap-2 bg-gold px-4 py-3 text-sm font-bold text-navy transition-colors hover:bg-gold-dark"
        >
          Free Case Review
        </Link>
        <a
          href={VANITY_HREF}
          className="flex flex-1 items-center justify-center gap-2 bg-red px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-red-dark"
        >
          <Phone className="size-4" />
          Call Now
        </a>
      </div>
    </div>
  );
}

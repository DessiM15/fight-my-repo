"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, ChevronDown, X, Scale } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn, VANITY_NUMBER, VANITY_HREF } from "@/lib/utils";

const practiceAreas = [
  { label: "Wrongful Repossession", href: "/wrongful-repossession" },
  { label: "FCRA Credit Report Errors", href: "/fcra-credit-report-errors" },
  { label: "Military SCRA Protection", href: "/military-scra-protection" },
];

const popularStates = [
  { label: "Texas", href: "/texas-wrongful-repossession" },
  { label: "Florida", href: "/florida-wrongful-repossession" },
  { label: "California", href: "/california-wrongful-repossession" },
  { label: "Georgia", href: "/georgia-wrongful-repossession" },
  { label: "Ohio", href: "/ohio-wrongful-repossession" },
  { label: "North Carolina", href: "/north-carolina-wrongful-repossession" },
  { label: "View All States", href: "/wrongful-repossession" },
];

function DesktopDropdown({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-white/90 transition-colors hover:text-gold"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 min-w-[220px] rounded-lg border border-white/10 bg-navy-light p-2 shadow-xl"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-md px-4 py-2.5 text-sm text-white/90 transition-colors hover:bg-white/10 hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavSection({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="flex w-full items-center justify-between px-4 py-3 text-sm font-semibold text-white"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-steel transition-transform duration-200",
            expanded && "rotate-180"
          )}
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-3">
              {items.map((item) => (
                <SheetClose key={item.href} asChild>
                  <Link
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/10 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-navy/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <Scale className="size-6 text-gold" />
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold leading-tight tracking-wide text-white">
              SUE THE COLLECTOR
            </span>
            <span className="h-0.5 w-full origin-left scale-x-100 bg-gold transition-transform group-hover:scale-x-110" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          <DesktopDropdown label="Practice Areas" items={practiceAreas} />
          <Link
            href="/results-reviews"
            className={cn(
              "px-3 py-2 text-sm font-medium transition-colors hover:text-gold",
              pathname === "/results-reviews"
                ? "text-gold"
                : "text-white/90"
            )}
          >
            Results & Reviews
          </Link>
          <DesktopDropdown label="States" items={popularStates} />
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={VANITY_HREF}
            className="flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gold"
          >
            <Phone className="size-4" />
            {VANITY_NUMBER}
          </a>
          <Button
            asChild
            className="bg-gold text-navy font-semibold hover:bg-gold-dark"
            size="sm"
          >
            <Link href="/free-case-review">Free Case Review</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="flex size-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] border-white/10 bg-navy p-0 sm:max-w-[350px]"
            showCloseButton={false}
          >
            <SheetHeader className="flex flex-row items-center justify-between border-b border-white/10 p-4">
              <SheetTitle className="flex items-center gap-2 text-white">
                <Scale className="size-5 text-gold" />
                <span className="font-heading text-base font-bold tracking-wide">
                  SUE THE COLLECTOR
                </span>
              </SheetTitle>
              <SheetClose asChild>
                <button
                  className="flex size-8 items-center justify-center rounded-md text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </SheetClose>
            </SheetHeader>

            <div className="flex flex-1 flex-col overflow-y-auto">
              <MobileNavSection
                title="Practice Areas"
                items={practiceAreas}
              />

              <SheetClose asChild>
                <Link
                  href="/results-reviews"
                  className="border-b border-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Results & Reviews
                </Link>
              </SheetClose>

              <MobileNavSection title="States" items={popularStates} />

              {/* Phone */}
              <a
                href={VANITY_HREF}
                className="flex items-center gap-3 border-b border-white/10 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <Phone className="size-4 text-gold" />
                {VANITY_NUMBER}
              </a>

              {/* CTA */}
              <div className="p-4">
                <SheetClose asChild>
                  <Button
                    asChild
                    className="w-full bg-gold text-navy font-semibold hover:bg-gold-dark"
                  >
                    <Link href="/free-case-review">Free Case Review</Link>
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

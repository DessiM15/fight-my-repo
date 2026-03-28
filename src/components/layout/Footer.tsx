import Link from "next/link";
import { Logo } from "./Logo";
import { VANITY_HREF } from "@/lib/utils";

const practiceAreaLinks = [
  { label: "Wrongful Repossession", href: "/wrongful-repossession" },
  { label: "FCRA Credit Report Errors", href: "/fcra-credit-report-errors" },
  { label: "Military SCRA Protection", href: "/military-scra-protection" },
  { label: "Free Case Review", href: "/free-case-review" },
];

const resourceLinks = [
  { label: "Results & Reviews", href: "/results-reviews" },
  { label: "Texas", href: "/texas-wrongful-repossession" },
  { label: "Florida", href: "/florida-wrongful-repossession" },
  { label: "California", href: "/california-wrongful-repossession" },
  { label: "All States", href: "/wrongful-repossession" },
];

const lenderLinks = [
  { label: "Santander", href: "/lender/santander-consumer-usa" },
  { label: "Credit Acceptance", href: "/lender/credit-acceptance-corporation" },
  { label: "Capital One", href: "/lender/capital-one-auto-finance" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-heading mb-4 text-sm font-bold uppercase tracking-wider text-gold">
        {title}
      </h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-steel-light transition-colors hover:text-gold"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="group mb-4 inline-flex items-center gap-2.5">
              <Logo size="md" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-steel-light">
              Founded by Jarred D. Johnson, Fight My Repo partners with
              attorneys nationwide to fight for consumers who have been
              wrongfully repossessed, harassed by debt collectors,
              or had their rights violated.
            </p>
            <a
              href={VANITY_HREF}
              className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#C1121F] transition-colors hover:text-[#C1121F]/80"
            >
              Call Us Now
            </a>
          </div>

          {/* Practice Areas */}
          <FooterLinkColumn title="Practice Areas" links={practiceAreaLinks} />

          {/* Resources */}
          <FooterLinkColumn title="Resources" links={resourceLinks} />

          {/* Lenders We Sue */}
          <FooterLinkColumn title="Lenders We Sue" links={lenderLinks} />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
          <p className="text-xs leading-relaxed text-steel">
            <span className="font-semibold">Attorney Advertising.</span> The
            information on this website is for general information purposes
            only. Nothing on this site should be taken as legal advice for any
            individual case or situation. This information is not intended to
            create, and receipt or viewing does not constitute, an
            attorney-client relationship.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 sm:flex-row lg:px-8">
          <p className="text-xs text-steel">
            &copy; {new Date().getFullYear()} Fight My Repo. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy-policy"
              className="text-xs text-steel transition-colors hover:text-gold"
            >
              Privacy Policy
            </Link>
            <span className="text-steel/40">|</span>
            <Link
              href="/terms-of-service"
              className="text-xs text-steel transition-colors hover:text-gold"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

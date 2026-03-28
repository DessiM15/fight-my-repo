import Link from "next/link";
import { cn, VANITY_HREF } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CTABannerProps {
  variant: "gold" | "red" | "navy";
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  showPhone?: boolean;
}

const variantStyles = {
  gold: {
    container: "bg-gold text-navy",
    button: "bg-navy text-white hover:bg-navy-light",
    phone: "text-navy/80 hover:text-navy",
  },
  red: {
    container: "bg-red text-white",
    button: "bg-white text-red hover:bg-white/90",
    phone: "text-white/80 hover:text-white",
  },
  navy: {
    container: "bg-navy-light text-white",
    button: "bg-gold text-navy hover:bg-gold-dark",
    phone: "text-white/80 hover:text-white",
  },
} as const;

export function CTABanner({
  variant,
  title,
  subtitle,
  buttonText = "Free Case Review",
  buttonHref = "/free-case-review",
  showPhone = false,
}: CTABannerProps) {
  const styles = variantStyles[variant];

  return (
    <section className={cn("px-4 py-12 md:py-16", styles.container)}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-heading text-2xl font-bold md:text-3xl lg:text-4xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-3 max-w-xl text-base opacity-90 md:text-lg">
            {subtitle}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {buttonHref && (
            <Button
              asChild
              size="lg"
              className={cn("px-8 text-base font-semibold", styles.button)}
            >
              <Link href={buttonHref}>{buttonText}</Link>
            </Button>
          )}
          {showPhone && (
            <a
              href={VANITY_HREF}
              className="flex items-center gap-2 text-base font-bold text-[#C1121F] transition-colors hover:text-[#C1121F]/80"
            >
              Call Us Now
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

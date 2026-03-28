import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
  const sizes = {
    sm: { shield: "w-8 h-9", text: "text-xs", sub: "text-[9px]" },
    md: { shield: "w-10 h-11", text: "text-sm", sub: "text-[10px]" },
    lg: { shield: "w-14 h-16", text: "text-lg", sub: "text-xs" },
  };

  const s = sizes[size];

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* SVG Shield Badge */}
      <svg
        viewBox="0 0 40 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.shield}
        aria-hidden="true"
      >
        {/* Shield shape */}
        <path
          d="M20 1L3 8v14c0 11.5 7.2 22.2 17 25 9.8-2.8 17-13.5 17-25V8L20 1z"
          fill="currentColor"
          className="text-gold"
          stroke="#B8922E"
          strokeWidth="1.5"
        />
        {/* Fist / fight icon inside shield */}
        <g transform="translate(10, 12) scale(0.85)">
          {/* Simple raised fist silhouette */}
          <path
            d="M12 2C10.5 2 9.5 3 9.5 4.5V10H8V6C8 4.5 7 3.5 5.5 3.5S3 4.5 3 6v9c0 4 3 7 7 7h4c3 0 6-2.5 6-6v-5c0-1.5-1-2.5-2.5-2.5S15 9.5 15 11v-1c0-1.5-1-2.5-2.5-2.5S10 8.5 10 10V4.5c0-1.5 1-2.5 2-2.5z"
            fill="#0A0A0A"
            opacity="0.85"
          />
        </g>
      </svg>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading font-extrabold tracking-wider text-white uppercase",
            s.text
          )}
        >
          FIGHT MY REPO
        </span>
        <span className="mt-0.5 h-0.5 w-full bg-gold" />
      </div>
    </div>
  );
}

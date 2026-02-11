"use client";

import { useState, memo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { cn } from "@/lib/utils";
import { getStateByAbbreviation } from "@/data/states";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

/* ───────── FIPS -> Abbreviation ───────── */
const FIPS_TO_ABBR: Record<string, string> = {
  "01": "AL", "02": "AK", "04": "AZ", "05": "AR", "06": "CA",
  "08": "CO", "09": "CT", "10": "DE", "11": "DC", "12": "FL",
  "13": "GA", "15": "HI", "16": "ID", "17": "IL", "18": "IN",
  "19": "IA", "20": "KS", "21": "KY", "22": "LA", "23": "ME",
  "24": "MD", "25": "MA", "26": "MI", "27": "MN", "28": "MS",
  "29": "MO", "30": "MT", "31": "NE", "32": "NV", "33": "NH",
  "34": "NJ", "35": "NM", "36": "NY", "37": "NC", "38": "ND",
  "39": "OH", "40": "OK", "41": "OR", "42": "PA", "44": "RI",
  "45": "SC", "46": "SD", "47": "TN", "48": "TX", "49": "UT",
  "50": "VT", "51": "VA", "53": "WA", "54": "WV", "55": "WI",
  "56": "WY",
};

function abbrToSlug(abbr: string): string {
  const state = getStateByAbbreviation(abbr);
  if (state) return state.slug;
  return abbr.toLowerCase();
}

function abbrToName(abbr: string): string {
  const state = getStateByAbbreviation(abbr);
  if (state) return state.name;
  return abbr;
}

/* ───────── Component ───────── */
interface USMapProps {
  className?: string;
}

function USMap({ className }: USMapProps) {
  const router = useRouter();
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    },
    []
  );

  const handleClick = useCallback(
    (abbr: string) => {
      const slug = abbrToSlug(abbr);
      router.push(`/${slug}`);
    },
    [router]
  );

  return (
    <div className={cn("relative", className)} onMouseMove={handleMouseMove}>
      {/* Tooltip */}
      {hoveredState && (
        <div
          className="pointer-events-none fixed z-50 px-3 py-1.5 bg-[#0D1B2A] text-white text-sm font-semibold rounded-lg shadow-lg border border-[#D4A843]/30"
          style={{
            left: tooltipPos.x + 12,
            top: tooltipPos.y - 30,
          }}
        >
          {abbrToName(hoveredState)}
          <span className="block text-xs text-[#D4A843] font-normal">
            Click to view laws
          </span>
        </div>
      )}

      <ComposableMap
        projection="geoAlbersUsa"
        projectionConfig={{ scale: 1000 }}
        width={800}
        height={500}
        className="w-full h-auto"
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const fips = geo.id as string;
              const abbr = FIPS_TO_ABBR[fips];
              if (!abbr) return null;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => setHoveredState(abbr)}
                  onMouseLeave={() => setHoveredState(null)}
                  onClick={() => handleClick(abbr)}
                  style={{
                    default: {
                      fill: "#1B4965",
                      stroke: "#0D1B2A",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: "pointer",
                      transition: "fill 0.2s ease",
                    },
                    hover: {
                      fill: "#D4A843",
                      stroke: "#0D1B2A",
                      strokeWidth: 1,
                      outline: "none",
                      cursor: "pointer",
                    },
                    pressed: {
                      fill: "#b8912e",
                      stroke: "#0D1B2A",
                      strokeWidth: 1,
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

export default memo(USMap);

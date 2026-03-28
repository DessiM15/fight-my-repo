"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { states } from "@/data/states";

/* ───────── Derived list for search ───────── */
const ALL_STATES = states.map((s) => ({
  name: s.name,
  abbr: s.abbreviation,
  slug: s.slug,
}));

interface StateSearchProps {
  className?: string;
}

export default function StateSearch({ className }: StateSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const filtered = query.trim()
    ? ALL_STATES.filter(
        (s) =>
          s.name.toLowerCase().includes(query.toLowerCase()) ||
          s.abbr.toLowerCase().includes(query.toLowerCase())
      )
    : ALL_STATES;

  const navigate = useCallback(
    (slug: string) => {
      router.push(`/${slug}`);
      setQuery("");
      setIsOpen(false);
    },
    [router]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && filtered[highlightedIndex]) {
      navigate(filtered[highlightedIndex].slug);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Reset highlight when query changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.parentElement?.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      item?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex]);

  return (
    <div className={cn("relative w-full max-w-md", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8A8A8A]" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search your state..."
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-[#0A0A0A] placeholder:text-[#8A8A8A]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A843] focus:border-transparent text-sm"
          aria-label="Search for a state"
          aria-expanded={isOpen}
          aria-controls="state-search-list"
          role="combobox"
          aria-autocomplete="list"
        />
      </div>

      {isOpen && filtered.length > 0 && (
        <ul
          ref={listRef}
          id="state-search-list"
          role="listbox"
          className="absolute z-50 mt-2 w-full max-h-60 overflow-auto rounded-xl border border-gray-200 bg-white shadow-xl"
        >
          {filtered.map((state, i) => (
            <li
              key={state.abbr}
              role="option"
              aria-selected={i === highlightedIndex}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors",
                i === highlightedIndex
                  ? "bg-[#D4A843]/10 text-[#D4A843]"
                  : "text-[#0A0A0A] hover:bg-gray-50"
              )}
              onMouseEnter={() => setHighlightedIndex(i)}
              onClick={() => navigate(state.slug)}
            >
              <MapPin className="w-4 h-4 flex-shrink-0 text-[#D4A843]" />
              <span className="font-medium">{state.name}</span>
              <span className="ml-auto text-xs text-[#8A8A8A]">
                {state.abbr}
              </span>
            </li>
          ))}
        </ul>
      )}

      {isOpen && filtered.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-xl p-4 text-center text-sm text-[#8A8A8A]">
          No states found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  );
}

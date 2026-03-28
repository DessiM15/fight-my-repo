"use client";

import dynamic from "next/dynamic";

const USMap = dynamic(() => import("@/components/map/USMap"), { ssr: false });
const StateSearch = dynamic(() => import("@/components/map/StateSearch"), {
  ssr: false,
});

export default function MapSection() {
  return (
    <>
      <div className="flex justify-center mb-8">
        <StateSearch />
      </div>
      <div className="max-w-4xl mx-auto bg-[#0A0A0A] rounded-2xl p-4 sm:p-8">
        <USMap />
      </div>
    </>
  );
}

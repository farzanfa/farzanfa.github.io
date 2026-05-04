"use client";

import React from "react";

export function VinylCard() {
  return (
    <a href="https://github.com/farzanfa" target="_blank" rel="noopener noreferrer" className="hidden lg:block absolute left-[40px] top-[410px] z-30 transition-all duration-300 -rotate-[5deg] hover:rotate-[2deg] hover:scale-110 hover:-translate-y-5 cursor-pointer group/vinyl hero-entrance" style={{ overflow: "visible", animation: "hero-slide-left 0.7s cubic-bezier(0.4,0,0.2,1) 2.5s both" }}>
      <div className="relative w-[240px]" style={{ overflow: "visible" }}>
        {/* Vinyl record — outside card, centered with margin */}
        <div className="absolute inset-x-0 top-[24px] flex justify-center z-10 pointer-events-none" style={{ overflow: "visible" }}>
          <img
            src="/Vinyl.png"
            alt="Vinyl record"
            className="w-36 h-36 vinyl-spin transition-all duration-500 ease-out group-hover/vinyl:scale-[2.3] group-hover/vinyl:-translate-y-[70px] group-hover/vinyl:-translate-x-[20px] group-hover/vinyl:drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
            style={{ willChange: "transform" }}
            draggable={false}
          />
        </div>
        {/* Card */}
        {/* Rotating gradient border — visible on hover */}
        <div
          className="absolute inset-[-1px] rounded-2xl opacity-0 transition-opacity duration-400 group-hover/vinyl:opacity-100 pointer-events-none"
          style={{
            background: "conic-gradient(from var(--vinyl-angle), #39FF14, #FAEF5D, transparent, transparent, #39FF14)",
            animation: "vinyl-border-rotate 3s linear infinite",
          }}
        />
        <div
          className="relative rounded-2xl flex flex-col items-center w-[240px] pt-6 pb-6 overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle dotted overlay for texture */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          {/* Animated blobs — hidden by default, appear on hover (now using screen blend so they glow on dark) */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none opacity-0 transition-opacity duration-500 ease-out group-hover/vinyl:opacity-100"
            style={{ mixBlendMode: "screen" }}
          >
            <div className="vinyl-blob vinyl-blob-1" />
            <div className="vinyl-blob vinyl-blob-2" />
            <div className="vinyl-blob vinyl-blob-3" />
          </div>
          {/* Spacer matching default vinyl size */}
          <div className="relative z-[1] w-36 h-36" />
          {/* Info */}
          <div className="relative z-[1] mt-4 text-center">
            <p className="font-mono text-[10px] text-emerald-400 uppercase tracking-[0.2em] mb-1.5">
              <span className="text-emerald-500/70">~/</span>playlist
            </p>
            <h3 className="font-[family-name:var(--font-noto)] text-stone-100 font-bold text-lg leading-tight mb-1">
              Engineering Mix
            </h3>
            <p className="font-mono text-[11px] text-stone-400 mb-2 tracking-wide">
              Cloud · Containers · CI/CD
            </p>
            <p className="font-[family-name:var(--font-noto)] text-stone-500 text-[12px] font-medium leading-snug italic">
              Learning by building
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

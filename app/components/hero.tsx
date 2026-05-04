"use client";

import React, { useState, useEffect } from "react";

/* ── Typing effect hook ── */
export function useTypingEffect(text: string, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

/* ── Star background ── */
export function StarBackground() {
  const [stars, setStars] = useState<
    { id: number; left: string; top: string; size: number; delay: number; duration: number }[]
  >([]);

  useEffect(() => {
    const s = [];
    for (let i = 0; i < 60; i++) {
      s.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      });
    }
    setStars(s);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-text-muted/20"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

/* ── Mac folder icon ── */
export function MacFolder() {
  return (
    <div
      className="hidden lg:block absolute left-[400px] top-[560px] z-30 group cursor-pointer rotate-[6deg] transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:rotate-[2deg] hero-entrance"
      style={{ perspective: "500px", animation: "hero-slide-up 0.7s cubic-bezier(0.4,0,0.2,1) 2.8s both" }}
    >
      <div className="relative w-[155px] h-[155px] transition-all duration-300 group-hover:drop-shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
        {/* Back panel — stays in place */}
        <img
          src="/mac-folder-back-opt.svg"
          alt=""
          className="absolute inset-0 w-full h-full z-0"
          draggable={false}
        />
        {/* Items that pop out on hover */}
        {/* iPad + notebook — left */}
        <img
          src="/Ipad and notebook.svg"
          alt="iPad and notebook"
          className="absolute left-1/2 bottom-[30%] w-[105px] -translate-x-1/2 transition-all duration-500 ease-out opacity-0 group-hover:opacity-100 group-hover:-translate-y-[75px] group-hover:-translate-x-[140px] group-hover:rotate-[-15deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Claude logo — upper center-right */}
        <img
          src="/Claude logo.svg"
          alt="Claude"
          className="absolute left-1/2 bottom-[30%] w-[65px] -translate-x-1/2 transition-all duration-500 ease-out delay-75 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[95px] group-hover:-translate-x-[30px] group-hover:rotate-[5deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Laptop — right */}
        <img
          src="/laptop.svg"
          alt="Laptop"
          className="absolute left-1/2 bottom-[30%] w-[105px] -translate-x-1/2 transition-all duration-500 ease-out delay-150 opacity-0 group-hover:opacity-100 group-hover:-translate-y-[65px] group-hover:translate-x-[40px] group-hover:rotate-[10deg] z-10"
          style={{ filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.25))" }}
          draggable={false}
        />
        {/* Front panel — rotates open on hover */}
        <img
          src="/mac-folder-front-opt.svg"
          alt="Folder"
          className="absolute inset-0 w-full h-full z-20 transition-transform duration-500 ease-out origin-bottom group-hover:[transform:rotateX(-22deg)]"
          draggable={false}
        />
      </div>
    </div>
  );
}

/* ── Hanging name badge ── */
export function NameBadge() {
  return (
    <div className="hidden lg:flex flex-col items-center absolute left-[65px] top-[-80px] z-20">
     <a href="https://www.linkedin.com/in/farzanfa" target="_blank" rel="noopener noreferrer" className="badge-swing flex flex-col items-center cursor-pointer group/badge">
      {/* Lanyard strap — extra tall to avoid gap when swinging */}
      <div className="w-[26px] h-[240px] bg-stone-800 relative shadow-sm z-0">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
        }} />
        <span className="absolute bottom-[40%] left-1/2 -translate-x-1/2 -rotate-90 font-mono text-[6px] font-bold text-white/60 tracking-[0.2em] uppercase whitespace-nowrap select-none">
          farzanfa.com
        </span>
      </div>

      {/* Badge card — overlaps lanyard so strap threads through */}
      <div className="rounded-xl w-[210px] -mt-8 relative" style={{ perspective: "800px" }}>
       <div className="rounded-xl p-[6px] relative" style={{
        background: "linear-gradient(170deg, #57534e 0%, #44403c 15%, #292524 60%, #1c1917 100%)",
        borderTop: "1.5px solid rgba(255,255,255,0.15)",
        borderLeft: "1px solid rgba(255,255,255,0.08)",
        borderRight: "1px solid rgba(0,0,0,0.3)",
        borderBottom: "2px solid rgba(0,0,0,0.4)",
        transform: "rotateX(1deg)",
        transformStyle: "preserve-3d",
      }}>
        {/* Glossy reflection sweep */}
        <div className="absolute inset-0 rounded-xl pointer-events-none z-20" style={{
          background: "linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 15%, transparent 40%, transparent 85%, rgba(255,255,255,0.03) 100%)",
        }} />
        {/* Lanyard pass-through behind card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[26px] h-[22px] bg-stone-800 z-0 rounded-b-sm" />
        {/* Slot hole */}
        <div className="relative z-10 flex justify-center pt-1 pb-0">
          <div className="w-8 h-[6px] rounded-full border border-stone-500/50" style={{
            background: "linear-gradient(180deg, #1c1917, #292524)",
            boxShadow: "inset 0 1px 2px rgba(0,0,0,0.5)",
          }} />
        </div>
        <div className="rounded-lg overflow-hidden flex flex-col relative z-10" style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(0,0,0,0.3)",
        }}>
          {/* Top section — with grid + name */}
          <div className="relative px-4 pt-4 pb-4" style={{
            background: "linear-gradient(175deg, #6b6560 0%, #57534e 20%, #44403c 100%)",
          }}>
            {/* Grid lines overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }} />
            {/* Name */}
            <div className="relative z-10">
              <h3 className="text-white font-extrabold text-[28px] leading-[1.05] tracking-[0.15em]">FARZAN</h3>
              <p className="font-[family-name:var(--font-noto)] text-white/50 text-[11px] tracking-[0.05em] mt-2 leading-relaxed">Love automating, building,<br />troubleshooting, and reliability craft</p>
            </div>
          </div>

          {/* Bottom section — dark with profile photo */}
          <div className="px-4 pt-5 pb-5 flex flex-col items-center" style={{
            background: "linear-gradient(180deg, #1c1917, #0c0a09)",
          }}>
            <div
              className="w-32 h-32 rounded-full overflow-hidden bg-stone-600 relative transition-all duration-500 ease-out group-hover/badge:shadow-[0_0_0_4px_rgba(245,158,11,0.35),0_0_28px_rgba(245,158,11,0.55)]"
              style={{ border: "3px solid #57534e" }}
            >
              <img
                src="/farzanfa.jpeg"
                alt="Farzan F A"
                className="w-full h-full object-cover transition-all duration-500 ease-out group-hover/badge:scale-110 group-hover/badge:saturate-150 group-hover/badge:brightness-110"
                draggable={false}
              />
              {/* Hover sheen — amber wash that sweeps in on hover */}
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(245,158,11,0.0) 30%, rgba(245,158,11,0.18) 50%, rgba(245,158,11,0.0) 70%)",
                  mixBlendMode: "screen",
                }}
              />
              {/* Conic ring that rotates in on hover */}
              <div
                className="pointer-events-none absolute -inset-[3px] rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500 badge-ring"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgba(245,158,11,0.0), rgba(245,158,11,0.65), rgba(217,119,6,0.0), rgba(245,158,11,0.65), rgba(245,158,11,0.0))",
                  WebkitMask:
                    "radial-gradient(circle, transparent calc(100% - 4px), #000 calc(100% - 4px))",
                  mask:
                    "radial-gradient(circle, transparent calc(100% - 4px), #000 calc(100% - 4px))",
                }}
              />
            </div>
          </div>
        </div>
       </div>
      </div>
     </a>
    </div>
  );
}

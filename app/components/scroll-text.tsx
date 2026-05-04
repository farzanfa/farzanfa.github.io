"use client";

import React, { useState, useEffect, useRef } from "react";
import { EasterEggCell, easterEggCells } from "./easter-egg";

/* ── Scroll-triggered text reveal ── */
export function TypedText({ text, start, delay = 0 }: { text: string; start: boolean; delay?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!start) return;
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [start, delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span className="relative">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0">
        {started ? displayed : ""}
        {started && displayed.length < text.length && (
          <span className="inline-block w-[2px] h-[1em] bg-stone-300 align-middle animate-pulse ml-[1px]" />
        )}
      </span>
    </span>
  );
}

export function ScrollRevealText() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-[800px] mx-auto px-6 py-12 text-center">
      {/* Easter egg grid cells */}
      {easterEggCells.map((cell, i) => (
        <EasterEggCell
          key={i}
          containerRef={ref}
          col={cell.col}
          row={cell.row}
          animIdx={cell.animIdx}
          cardOffset={cell.cardOffset}
          cardRotate={cell.cardRotate}
        />
      ))}
      {/* Left: computer (hidden) */}
      {/* Right: earbuds (hidden) */}

      <p
        className="font-[family-name:var(--font-courier-prime)] text-[17px] md:text-[20px] text-stone-300 leading-relaxed transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "0.3s",
        }}
      >
        I turn brittle deploys{" "}
        <img
          src="/messy.svg"
          alt=""
          className="inline-block w-[45px] h-auto align-middle -mt-6 -mx-3"
          draggable={false}
        />{" "}
        into reliable, observable{" "}
        <span className="relative inline-block">
          <img
            src="/highlights.svg"
            alt=""
            className="absolute -top-4 left-[10%] -translate-x-1/2 w-[22px] h-auto pointer-events-none"
            draggable={false}
          />
          systems
        </span>{" "}
        and keep production{" "}
        <span className="inline-flex items-center border border-stone-400 px-2.5 pt-[2px] pb-[0px] rounded-sm">
          <TypedText text="calm at 3 am." start={visible} delay={700} />
        </span>
      </p>
      <p
        className="font-[family-name:var(--font-courier-prime)] text-[17px] md:text-[20px] text-stone-300 leading-relaxed mt-6 transition-all duration-700 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(20px)",
          transitionDelay: "1s",
        }}
      >
        <img
          src="/star.svg"
          alt=""
          className="inline-block w-[36px] h-auto align-middle -ml-0.5 mr-1 -mt-1"
          draggable={false}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1) rotate(0deg)" : "scale(0) rotate(-180deg)",
            transition: "opacity 0.5s ease-out 1.2s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s",
          }}
        />
        <span className="inline-flex items-center border border-stone-400 pl-2.5 pr-2 pt-[2px] pb-[0px] rounded-sm">
          <TypedText text="I automate everything," start={visible} delay={1400} />
        </span>{" "}
        prototype pipelines, and grow the<br />AWS community in Trivandrum.
      </p>
    </div>
  );
}

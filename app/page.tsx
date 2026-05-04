"use client";

import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { renderBold } from "@/lib/renderBold";

import { useTypingEffect, StarBackground, MacFolder, NameBadge } from "./components/hero";
import { DotMatrixBoard } from "./components/dot-matrix";
import { VinylCard } from "./components/vinyl-card";
import { RetroWindows } from "./components/retro-windows";
import { ScrollRevealText } from "./components/scroll-text";
import { RippedPaperNote } from "./components/ripped-paper";
import { PortfolioViewer } from "./components/finder-window";
import { ScatterBoard } from "./components/scatter-board";
import { ClickBurst } from "./components/click-burst";
import { NavHeader } from "./components/nav-header";
import { CursorHint } from "./components/cursor-hint";
import { OpeningAnimation } from "./components/opening-animation";
import { YellowDotCursor } from "./components/yellow-dot-cursor";
import { MobileBanner } from "./components/mobile-banner";
import { MobileHero } from "./components/mobile-hero";
import { DevOpsToolsWall, DevOpsTicket, KubernetesSticker } from "./components/devops-tools";
import { Experience } from "./components/experience";
import { Skills } from "./components/skills";
import { Contact } from "./components/contact";

/* ── Polaroid photo stack — three little snapshots stacked on the desk ── */
function PhotoStack() {
  const photos = [
    {
      label: "EKS prod",
      caption: "Multi-AZ",
      rotate: "-9deg",
      offset: "translate(-14px, 6px)",
      gradient: "linear-gradient(135deg, #326CE5 0%, #1f4cae 100%)",
      glyph: (
        <img
          src="https://cdn.simpleicons.org/kubernetes/FFFFFF"
          alt=""
          className="w-9 h-9 opacity-90"
          draggable={false}
        />
      ),
    },
    {
      label: "Pipeline",
      caption: "main · green",
      rotate: "4deg",
      offset: "translate(0px, 0px)",
      gradient: "linear-gradient(135deg, #18181b 0%, #2a2a30 100%)",
      glyph: (
        <div className="font-mono text-[10px] text-emerald-300 leading-tight text-left">
          <p>$ git push</p>
          <p className="text-stone-400">→ deploy</p>
          <p className="text-emerald-400">✓ ok</p>
        </div>
      ),
    },
    {
      label: "On-call",
      caption: "all clear",
      rotate: "-3deg",
      offset: "translate(14px, -8px)",
      gradient: "linear-gradient(135deg, #F46800 0%, #c64d00 100%)",
      glyph: (
        <img
          src="https://cdn.simpleicons.org/grafana/FFFFFF"
          alt=""
          className="w-9 h-9 opacity-95"
          draggable={false}
        />
      ),
    },
  ];

  // Per-card spread offsets — applied on hover for a fan-out effect.
  const spreadFor = (i: number): string => {
    if (i === 0) return "translate(-46px, 8px) rotate(-18deg)";
    if (i === 1) return "translate(0px, -10px) rotate(2deg)";
    return "translate(46px, 8px) rotate(14deg)";
  };

  return (
    <div className="relative w-[110px] h-[130px]">
      {photos.map((p, i) => (
        <div
          key={p.label}
          className="absolute inset-0 transition-transform duration-500 ease-out"
          style={{
            transform: `${p.offset} rotate(${p.rotate})`,
            zIndex: i + 1,
          }}
          data-photo-index={i}
        >
          <div
            className="w-[110px] h-[130px] bg-[#fafaf8] rounded-[3px] p-[6px] pb-[18px] flex flex-col transition-transform duration-500 ease-out group-hover/photos:[transform:var(--spread)]"
            style={{
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.2)",
              ["--spread" as string]: spreadFor(i),
            }}
          >
            <div
              className="flex-1 rounded-[2px] flex items-center justify-center px-2"
              style={{ background: p.gradient }}
            >
              {p.glyph}
            </div>
            <div className="px-1 pt-1.5 flex items-center justify-between">
              <span className="font-[family-name:var(--font-courier-prime)] text-[8px] text-stone-700 font-bold">
                {p.label}
              </span>
              <span className="font-mono text-[7px] text-stone-400">
                {p.caption}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Isolated click-burst layer — owns its own state so page-wide clicks don't re-render the whole tree ── */
function PageBurstLayer() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const counter = useRef(0);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || target.closest("a, button, iframe")) return;
      const id = counter.current++;
      setBursts((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {bursts.map((b) => (
        <ClickBurst key={b.id} x={b.x} y={b.y} onDone={() => setBursts((prev) => prev.filter((p) => p.id !== b.id))} />
      ))}
    </>
  );
}

/* ── Tab definitions ── */
const tabs = siteConfig.sections.map((s) => ({
  id: s.id,
  label: s.id
    .split("-")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" "),
}));

/* ── Main page ── */
export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const { displayed, done } = useTypingEffect(siteConfig.name, 80);
  const activeSection = siteConfig.sections[activeTab];
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [imgZIndex, setImgZIndex] = useState<number[]>([1, 1, 2, 3, 3, 1, 1, 4, 1, 1, 1]);
  const zCounterRef = useRef(10);
  const [arrowVisible, setArrowVisible] = useState(false);
  const onArrowVisible = useRef(() => setArrowVisible(true)).current;
  const [showOpening, setShowOpening] = useState(true);

  return (
    <div className="relative" style={{ overflowX: "clip" }}>
      {showOpening && <OpeningAnimation onComplete={() => setShowOpening(false)} />}
      <YellowDotCursor active={!showOpening} />
      <div style={{ opacity: showOpening ? 0 : 1 }}><NavHeader /></div>
      <StarBackground />
      <PageBurstLayer />

      {/* Mobile banner — only visible on small screens */}
      {!showOpening && <MobileBanner />}

      {/* Mobile hero — stacked layout for small screens */}
      <MobileHero />

      {/* Hero — full viewport, centered (desktop only) */}
      <CursorHint label="Hover on items" delay={5} duration={5}>
      <div className="hidden lg:flex min-h-screen items-center justify-center px-4 relative z-10">
      <div className="relative w-[1400px] h-[900px] overflow-visible" style={{ maxWidth: "100vw", transform: "translateX(-25px)" }}>
        <MacFolder />
        <DotMatrixBoard />
        <VinylCard />
        <NameBadge />
        <RetroWindows />
        {/* Ripped paper + ice coffee + plant */}
        <div className="hidden lg:block absolute top-[20px] left-[600px] -translate-x-1/2 z-20 rotate-[-5deg] transition-all duration-300 hover:scale-110 hover:rotate-[1deg] group/paper hero-entrance" style={{ animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 2.65s both" }}>
          <img
            src="/ripped-paper.png"
            alt="Ripped paper note"
            className="w-[520px] opacity-100 drop-shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-300"
            draggable={false}
          />
          {/* AWS User Group Leader hexagonal badge — Trivandrum chapter */}
          <a
            href="https://awsugtrivandrum.in"
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-[48%] left-[72%] -translate-x-1/2 -translate-y-1/2 group/badge cursor-pointer"
            aria-label="UG Lead · AWS Users Group Trivandrum"
          >
            <img
              src="/aws-user-group-leader.png"
              alt="UG Lead · AWS Users Group Trivandrum"
              className="w-[120px] drop-shadow-[0_6px_14px_rgba(255,153,0,0.3)] transition-all duration-500 ease-out rotate-[8deg] group-hover/badge:scale-110 group-hover/badge:rotate-[-2deg] group-hover/badge:-translate-y-2"
              draggable={false}
            />
            {/* Caption pill — always visible, tucked just below the badge */}
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-5 px-3 py-1.5 rounded-full font-mono text-[10px] font-semibold uppercase tracking-[0.12em] whitespace-nowrap pointer-events-none transition-all duration-300 group-hover/badge:scale-105 group-hover/badge:-bottom-7"
              style={{
                background: "#1c1917",
                color: "#FFFFFF",
                border: "1.5px solid #FF9900",
                boxShadow:
                  "0 6px 18px rgba(0,0,0,0.5), 0 0 14px rgba(255,153,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              <span className="text-amber-400 mr-1">●</span>
              UG Lead
              <span className="text-stone-500 mx-1.5">·</span>
              <span className="text-amber-300">AWS UG Trivandrum</span>
            </span>
          </a>
          {/* Polaroid photo stack — replaces the plant */}
          <div className="absolute top-[55%] left-[20%] -translate-x-1/2 -translate-y-1/2 group/photos">
            <PhotoStack />
          </div>
        </div>

        {/* Kubernetes wheel sticker — replaces the flower vase */}
        <KubernetesSticker />


        {/* SRE Ticket — replaces "DESIGN x TECHNOLOGY" */}
        <DevOpsTicket />

        {/* DevOps tools wall — replaces the photo collage */}
        <DevOpsToolsWall />
        {/* Center text */}
        <div className="absolute top-[42%] left-[calc(50%+30px)] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
          <div className="relative mb-4 hero-entrance overflow-hidden" style={{ animation: "hero-blur-in 0.6s ease-out 0.3s both" }}>
            <h1
              className="font-[family-name:var(--font-noto)] text-stone-100 font-extrabold leading-none tracking-[-0.02em] text-[64px] md:text-[88px]"
              aria-label="Farzan F A"
            >
              Farzan F A
            </h1>
            {/* Glare sweep */}
            <div className="absolute inset-0 pointer-events-none" style={{ animation: "hero-glare 1.2s ease-in-out 5s both" }}>
              <div className="absolute top-0 h-full w-[60%] -skew-x-12" style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 25%, rgba(255,255,255,0.8) 48%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.8) 52%, rgba(255,255,255,0.25) 75%, transparent 100%)",
              }} />
            </div>
          </div>
          <p className="font-[family-name:var(--font-noto)] text-xs md:text-base text-stone-400 text-center tracking-[0.2em] uppercase hero-entrance ml-3" style={{ lineHeight: "1.8", animation: "hero-fade-in 0.5s cubic-bezier(0.4,0,0.2,1) 1.9s both" }}>
            I think, then I build
          </p>
        </div>
      </div>
      </div>
      </CursorHint>

      {/* Ripped paper quote + bio with decorative images */}
      <div id="about" className="mt-[120px] scroll-mt-16" />
      <div className="relative translate-x-0 lg:-translate-x-[20px]">
        <RippedPaperNote />
        <ScrollRevealText />
      </div>

      {/* Portfolio — folder view / book view */}
      <PortfolioViewer />

      {/* Experience timeline */}
      <Experience />

      {/* Skills grid */}
      <Skills />

      {/* Bulletin board */}
      <div id="playground" className="mt-8 lg:mt-12 scroll-mt-16" />
      <ScatterBoard
        imgZIndex={imgZIndex}
        setImgZIndex={setImgZIndex}
        zCounterRef={zCounterRef}
        arrowVisible={arrowVisible}
        setBursts={setBursts}
        bursts={bursts}
      />

      {/* Contact */}
      <Contact />

      {/* Social icons */}
      <motion.div
        className="flex justify-center gap-6 pt-12 pb-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        {/* Email */}
        <motion.a variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }} href="mailto:hello@farzanfa.com" className="relative font-[family-name:var(--font-noto)] text-[14px] text-stone-300 flex items-center justify-center social-morph">
          <span className="social-morph-text">{`{Email}`}</span>
          <svg className="social-morph-icon w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
        </motion.a>
        {/* LinkedIn */}
        <motion.a variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }} href="https://www.linkedin.com/in/farzanfa" target="_blank" rel="noopener noreferrer" className="relative font-[family-name:var(--font-noto)] text-[14px] text-stone-300 flex items-center justify-center social-morph">
          <span className="social-morph-text">{`{LinkedIn}`}</span>
          <svg className="social-morph-icon w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </motion.a>
        {/* Github */}
        <motion.a variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }} transition={{ duration: 0.4 }} href="https://github.com/farzanfa" target="_blank" rel="noopener noreferrer" className="relative font-[family-name:var(--font-noto)] text-[14px] text-stone-300 flex items-center justify-center social-morph">
          <span className="social-morph-text">{`{Github}`}</span>
          <svg className="social-morph-icon w-[16px] h-[16px]" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
        </motion.a>
      </motion.div>

      {/* Footer */}
      <motion.footer
        className="w-full px-6 lg:px-12 pt-8 pb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="mx-auto max-w-[1100px]">
          {/* Hairline divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

          {/* Three-zone footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
            {/* Left — copyright */}
            <p className="font-mono text-[11px] text-stone-500">
              <span className="text-emerald-400">$</span> echo &quot;© 2026 Farzan F A · {" "}
              <a
                href="https://farzanfa.com"
                className="text-stone-300 hover:text-white transition-colors"
              >
                farzanfa.com
              </a>
              &quot;
            </p>

            {/* Center — build credits */}
            <div className="flex items-center gap-3">
              <img
                src="/star.svg"
                alt=""
                className="w-3 h-3 invert opacity-50 animate-spin"
                style={{ animationDuration: "5s" }}
                draggable={false}
              />
              <p className="font-mono text-[11px] text-stone-500 whitespace-nowrap">
                Built with{" "}
                <a
                  href="https://www.anthropic.com/claude-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Claude Code
                </a>
                {" "}· Shipped on{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stone-300 hover:text-white transition-colors"
                >
                  Vercel
                </a>
              </p>
              <img
                src="/star.svg"
                alt=""
                className="w-3 h-3 invert opacity-50 animate-spin"
                style={{ animationDuration: "5s", animationDirection: "reverse" }}
                draggable={false}
              />
            </div>

            {/* Right — inspired by */}
            <p className="font-mono text-[11px] text-stone-500">
              Inspired by{" "}
              <a
                href="https://yanliuportfolio.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-amber-200 underline decoration-amber-300/40 hover:decoration-amber-200 underline-offset-2 transition-colors"
              >
                Yan Liu&apos;s portfolio
              </a>
              {" "}↗
            </p>
          </div>

          {/* Terminal sign-off + back-to-top */}
          <div className="mt-6 flex items-center justify-between font-mono text-[10px] text-stone-600">
            <span>
              <span className="text-emerald-400">$</span> # made in trivandrum,
              kerala — with chai &amp; curiosity
            </span>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="hover:text-stone-300 transition-colors group"
            >
              <span>back to top</span>
              <span className="ml-1 inline-block transition-transform group-hover:-translate-y-0.5">
                ↑
              </span>
            </a>
          </div>
        </div>
      </motion.footer>



      {/* Sections — hidden for now */}
      <div className="hidden flex-col items-center px-4 pb-24 relative z-10">
        {/* Navigation pills */}
        <nav className="flex flex-wrap justify-center gap-3 mb-16">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-2 rounded-full font-mono text-xs transition-all ${
                i === activeTab
                  ? "bg-accent/15 text-accent border border-accent/30"
                  : "text-text-muted hover:text-text-secondary border border-editor-border hover:border-text-muted/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Section content card */}
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <h2 className="font-sans text-4xl md:text-5xl text-text-primary">
                {activeSection.title}
              </h2>
              <p className="text-text-secondary leading-relaxed text-base md:text-lg">
                {renderBold(activeSection.description)}
              </p>
              {activeSection.highlights.length > 0 && (
                <ul className="space-y-3">
                  {activeSection.highlights.map((h, i) => (
                    <li key={i} className="flex gap-3 text-text-secondary/90 leading-relaxed">
                      <span className="text-accent mt-1 shrink-0">-</span>
                      <span>{renderBold(h.text)}</span>
                    </li>
                  ))}
                </ul>
              )}
              {activeSection.cta && activeSection.cta.url && (
                <a
                  href={activeSection.cta.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block font-mono text-sm text-accent hover:text-accent/80 transition-colors underline decoration-accent/30 hover:decoration-accent underline-offset-4"
                >
                  {activeSection.cta.label} &rarr;
                </a>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="mt-24 text-center">
          <p className="font-mono text-xs text-text-muted">
            Build with Claude Code · Shipped on Vercel
          </p>
        </footer>
      </div>
    </div>
  );
}

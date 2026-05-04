"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

/* ── Dot matrix data ── */
const FIGMA_COLS = 18;
// prettier-ignore
const figmaGrid = [
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,1,1,1,1,0,1,1,1,1,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,0,0,
  0,0,0,0,1,1,1,1,1,0,1,1,1,1,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
];

function getFigmaColor(i: number) {
  const row = Math.floor(i / FIGMA_COLS);
  const col = i % FIGMA_COLS;
  const isLeft = col < 9;
  if (row <= 6) return isLeft ? "#F24E1E" : "#FF7262";
  if (row <= 10) return isLeft ? "#A259FF" : "#1ABCFE";
  return "#0ACF83";
}

const figmaDotOrder = figmaGrid.reduce<number[]>((acc, val, i) => { if (val) acc.push(i); return acc; }, []);
const dotSequenceMap = new Map<number, number>();
figmaDotOrder.forEach((dotIndex, seqIndex) => dotSequenceMap.set(dotIndex, seqIndex));

/* ── Terminal typing ── */
const terminalLines = [
  { prompt: "$ whoami", output: "Site Reliability Engineer with 2+ years experience" },
  { prompt: "$ ls interests/", output: "aws/kubernetes/terraform/observability" },
];

function MobileTerminal() {
  const [display, setDisplay] = useState<string[]>([]);
  const [tapped, setTapped] = useState(false);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let delay = 1200;

    terminalLines.forEach((line, lineIdx) => {
      for (let c = 1; c <= line.prompt.length; c++) {
        timeouts.push(setTimeout(() => {
          setDisplay(prev => {
            const next = [...prev];
            next[lineIdx * 2] = line.prompt.slice(0, c);
            return next;
          });
        }, delay));
        delay += 25;
      }
      delay += 300;
      timeouts.push(setTimeout(() => {
        setDisplay(prev => {
          const next = [...prev];
          next[lineIdx * 2 + 1] = line.output;
          return next;
        });
      }, delay));
      delay += 400;
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const allDone = display.length > 0 && display[terminalLines.length * 2 - 1] !== undefined;

  return (
    <div
      className="w-full rounded-lg overflow-hidden transition-transform duration-300"
      style={{
        background: "#ffffff",
        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        border: "1px solid #e7e5e4",
        transform: tapped ? "scale(1.03)" : "scale(1)",
      }}
      onPointerDown={(e) => { if (allDone) { e.stopPropagation(); setTapped(t => !t); } }}
    >
      <div className="flex items-center justify-between px-3 py-2" style={{ background: "linear-gradient(to bottom, #FAFAF9, #F0EFED)", borderBottom: "1px solid #e7e5e4" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-[9px] h-[9px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
          <div className="w-[9px] h-[9px] rounded-full bg-[#28C840] border border-[#1AAB29]" />
        </div>
        <span className="text-[10px] text-stone-400 select-none">farzan-fa — zsh</span>
        <div className="w-[40px]" />
      </div>
      <div className="w-full p-3 font-mono text-[11px] leading-[1.7]" style={{ minHeight: "80px" }}>
        {terminalLines.map((line, i) => (
          <div key={i}>
            {display[i * 2] !== undefined && (
              <div className="text-stone-800">
                <span className="text-emerald-600">~</span>{" "}
                {display[i * 2]}
                {display[i * 2 + 1] === undefined && (
                  <span className="inline-block w-[5px] h-[10px] bg-stone-400 ml-[1px] align-text-bottom" style={{ animation: "blink 1s step-end infinite" }} />
                )}
              </div>
            )}
            {display[i * 2 + 1] !== undefined && (
              <div className="text-stone-500 mb-1">{display[i * 2 + 1]}</div>
            )}
          </div>
        ))}
        {tapped && allDone && (
          <div className="flex justify-center mt-1">
            <img src="/cat-dance.gif" alt="Dancing cat" className="h-[70px]" draggable={false} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Mobile Hero Layout ── */
export function MobileHero() {
  const [badgeTapped, setBadgeTapped] = useState(false);
  const [ticketTapped, setTicketTapped] = useState(false);
  const [vinylTapped, setVinylTapped] = useState(false);
  const [folderTapped, setFolderTapped] = useState(false);
  const [matrixTapped, setMatrixTapped] = useState(false);

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="lg:hidden flex flex-col items-center px-6 pt-3 pb-12 gap-6 relative z-10">

      {/* Row 1: Badge (left) + Ticket & Vinyl stacked (right) */}
      <motion.div
        className="flex items-start justify-center w-full gap-4"
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Name badge — tap to toggle video */}
        <div
          className="flex flex-col items-center shrink-0 transition-transform duration-300 badge-swing -mt-10 ml-1"
          style={{ transform: badgeTapped ? "scale(1.05) rotate(1deg)" : "scale(1)" }}
          onPointerDown={(e) => { e.stopPropagation(); setBadgeTapped(t => !t); }}
        >
          <div className="w-[20px] h-[50px] bg-stone-800 relative shadow-sm">
            <div className="absolute inset-0 opacity-20" style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)",
            }} />
          </div>
          <div className="rounded-xl w-[155px] -mt-4">
            <div className="rounded-xl p-[5px]" style={{
              background: "linear-gradient(170deg, #57534e 0%, #44403c 15%, #292524 60%, #1c1917 100%)",
              borderTop: "1.5px solid rgba(255,255,255,0.15)",
              borderBottom: "2px solid rgba(0,0,0,0.4)",
            }}>
              <div className="relative z-10 flex justify-center pt-1">
                <div className="w-6 h-[4px] rounded-full border border-stone-500/50" style={{ background: "linear-gradient(180deg, #1c1917, #292524)" }} />
              </div>
              <div className="rounded-lg overflow-hidden flex flex-col relative z-10">
                <div className="relative px-3 pt-3 pb-3" style={{ background: "linear-gradient(175deg, #6b6560 0%, #57534e 20%, #44403c 100%)" }}>
                  <div className="absolute inset-0 pointer-events-none opacity-[0.12]" style={{
                    backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                    backgroundSize: "14px 14px",
                  }} />
                  <div className="relative z-10">
                    <h3 className="text-white font-extrabold text-[22px] leading-[1.05] tracking-[0.15em]">FARZAN</h3>
                    <p className="font-[family-name:var(--font-noto)] text-white/50 text-[8px] tracking-[0.05em] mt-1.5 leading-relaxed">Love automating,<br />building,<br />troubleshooting, and<br />reliability craft</p>
                  </div>
                </div>
                <div className="px-3 pt-3 pb-3 flex flex-col items-center" style={{ background: "linear-gradient(180deg, #1c1917, #0c0a09)" }}>
                  <div
                    className="w-[72px] h-[72px] rounded-full overflow-hidden bg-stone-600 relative transition-all duration-500 ease-out"
                    style={{
                      border: "2px solid #57534e",
                      boxShadow: badgeTapped
                        ? "0 0 0 3px rgba(245,158,11,0.35), 0 0 18px rgba(245,158,11,0.55)"
                        : "none",
                    }}
                  >
                    <img
                      src="/farzanfa.jpeg"
                      alt="Farzan F A"
                      className="w-full h-full object-cover transition-all duration-500 ease-out"
                      style={{
                        transform: badgeTapped ? "scale(1.12)" : "scale(1)",
                        filter: badgeTapped ? "saturate(1.5) brightness(1.1)" : "none",
                      }}
                      draggable={false}
                    />
                    {/* Amber wash overlay on tap */}
                    <div
                      className="pointer-events-none absolute inset-0 transition-opacity duration-500"
                      style={{
                        opacity: badgeTapped ? 1 : 0,
                        background:
                          "linear-gradient(135deg, rgba(245,158,11,0) 30%, rgba(245,158,11,0.2) 50%, rgba(245,158,11,0) 70%)",
                        mixBlendMode: "screen",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Ticket + Vinyl stacked */}
        <div className="flex flex-col gap-4 mt-1">
          {/* SRE ticket — tap for shimmer */}
          <div
            className="w-[200px] rotate-[4deg] relative overflow-hidden transition-transform duration-300 rounded-sm shadow-md"
            style={{
              transform: ticketTapped ? "scale(1.08) rotate(1deg)" : "rotate(4deg)",
              background: "linear-gradient(135deg, #fafaf8 0%, #f0ede6 100%)",
            }}
            onPointerDown={(e) => { e.stopPropagation(); setTicketTapped(t => !t); }}
          >
            <div className="flex">
              <div
                className="w-[34px] flex flex-col items-center justify-between py-2 border-r border-dashed border-stone-400"
                style={{ background: "#1c1917" }}
              >
                <p className="font-mono text-[6px] text-stone-300 [writing-mode:vertical-rl] rotate-180">SRE</p>
                <p className="font-mono text-[6px] text-stone-400">★</p>
              </div>
              <div className="flex-1 px-2.5 py-2">
                <p className="font-mono text-[6px] text-stone-500 uppercase tracking-[0.2em] mb-0.5">All-Access</p>
                <h3 className="font-[family-name:var(--font-noto)] font-extrabold text-stone-900 text-[12px] leading-[1.05]">
                  AUTOMATE<span className="mx-1 text-stone-400">×</span>DEPLOY
                </h3>
                <p className="font-mono text-[7px] text-stone-500 mt-1">24/7 · prod · multi-AZ</p>
              </div>
              <div className="w-[24px] flex items-center justify-center border-l border-dashed border-stone-400">
                <div className="flex gap-[1px] items-end h-[26px]">
                  {[3, 5, 2, 6, 3, 4, 5, 2, 6].map((w, i) => (
                    <div
                      key={i}
                      className="bg-stone-800"
                      style={{ width: i % 2 === 0 ? 1 : 1.5, height: `${w * 14}%`, minHeight: 8 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            {ticketTapped && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                  className="absolute top-0 -left-full w-full h-full"
                  style={{
                    animation: "ticket-scan 2.2s ease-in-out infinite",
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,200,50,0.12) 35%, rgba(255,255,255,0.4) 50%, rgba(100,180,255,0.12) 65%, transparent 100%)",
                    filter: "blur(1.5px)",
                  }}
                />
              </div>
            )}
          </div>

          {/* Vinyl card — tap to expand vinyl */}
          <div
            className="relative w-[145px] self-center -ml-2 cursor-pointer"
            onPointerDown={(e) => { e.stopPropagation(); setVinylTapped(t => !t); }}
          >
            <div className="absolute inset-x-0 top-[12px] flex justify-center z-10 pointer-events-none transition-all duration-500"
              style={{
                transform: vinylTapped ? "scale(1.8) translateY(-35px) translateX(-10px)" : "none",
                filter: vinylTapped ? "drop-shadow(0 12px 30px rgba(0,0,0,0.35))" : "none",
              }}
            >
              <img src="/Vinyl.png" alt="Vinyl record" className={`w-20 h-20 vinyl-spin ${vinylTapped ? "vinyl-spin-active" : ""}`} draggable={false} />
            </div>
            <div
              className="relative rounded-xl flex flex-col items-center w-[145px] pt-7 pb-3 overflow-hidden"
              style={{
                background:
                  "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow:
                  "0 8px 20px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.06]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />
              <div className="w-20 h-20" />
              <p className="font-mono text-[10px] text-emerald-400 tracking-[0.2em] uppercase mt-1">
                <span className="text-emerald-500/70">~/</span>playlist
              </p>
              <p className="font-[family-name:var(--font-noto)] text-[11px] text-stone-300 mt-0.5">
                Engineering Mix
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Row 2: Dot matrix (left) | Name+tagline (center) | Folder (right) */}
      <motion.div
        className="flex items-center justify-center gap-3 w-full"
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        {/* Dot matrix — tap to scale */}
        <div
          className={`shrink-0 rounded-xl p-1.5 transition-all duration-300 cursor-pointer ${matrixTapped ? "dot-matrix-active" : ""}`}
          style={{
            background: "linear-gradient(160deg, #4a4a4a 0%, #3a3a3a 30%, #2d2d2d 100%)",
            boxShadow: matrixTapped
              ? "0 8px 25px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(162,89,255,0.3)"
              : "0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)",
            transform: matrixTapped ? "scale(1.2) rotate(3deg)" : "scale(1)",
          }}
          onPointerDown={(e) => { e.stopPropagation(); setMatrixTapped(t => !t); }}
        >
          <div className="grid gap-[1.5px]" style={{ gridTemplateColumns: `repeat(${FIGMA_COLS}, 1fr)` }}>
            {figmaGrid.map((on, i) => {
              const seq = dotSequenceMap.get(i) ?? 0;
              const color = on ? getFigmaColor(i) : "";
              return (
                <div
                  key={i}
                  className={`dot-led w-[3px] h-[3px] rounded-full${on ? " dot-on" : ""}`}
                  style={{
                    "--dot-color": color,
                    "--dot-delay": `${seq * 12}ms`,
                  } as React.CSSProperties}
                />
              );
            })}
          </div>
        </div>

        {/* Name + tagline */}
        <div className="flex flex-col items-center">
          <h1
            className="font-[family-name:var(--font-noto)] text-stone-100 font-extrabold leading-none tracking-[-0.02em] text-[36px] mb-1.5"
            aria-label="Farzan F A"
          >
            Farzan F A
          </h1>
          <p className="font-[family-name:var(--font-noto)] text-[9px] text-stone-400 text-center tracking-[0.18em] uppercase" style={{ lineHeight: "1.8" }}>
            I think, then I build.
          </p>
        </div>

        {/* Yellow folder — tap to open */}
        <div
          className="shrink-0 w-[90px] h-[90px] relative transition-transform duration-300"
          style={{
            perspective: "500px",
            transform: folderTapped ? "scale(1.1) rotate(-2deg) translateY(-5px)" : "scale(1)",
          }}
          onPointerDown={(e) => { e.stopPropagation(); setFolderTapped(t => !t); }}
        >
          <img src="/mac-folder-back-opt.svg" alt="" className="absolute inset-0 w-full h-full z-0" draggable={false} />
          {/* Items that pop out on tap */}
          <img
            src="/Claude logo.svg"
            alt="Claude"
            className="absolute left-1/2 bottom-[30%] w-[40px] -translate-x-1/2 transition-all duration-500 ease-out z-10"
            style={{
              opacity: folderTapped ? 1 : 0,
              transform: folderTapped ? "translate(-50%, -55px) rotate(5deg)" : "translate(-50%, 0)",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.25))",
            }}
            draggable={false}
          />
          <img
            src="/mac-folder-front-opt.svg"
            alt="Folder"
            className="absolute inset-0 w-full h-full z-20 transition-transform duration-500 ease-out origin-bottom"
            style={{ transform: folderTapped ? "rotateX(-22deg)" : "none" }}
            draggable={false}
          />
        </div>
      </motion.div>

      {/* Row 3: Terminal */}
      <motion.div
        className="w-full max-w-[360px]"
        {...fadeUp}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <MobileTerminal />
      </motion.div>

      {/* Row 4: DevOps tools strip */}
      <motion.div
        className="w-full max-w-[360px]"
        {...fadeUp}
        transition={{ duration: 0.6, delay: 1.1 }}
      >
        <MobileDevOpsStrip />
      </motion.div>
    </div>
  );
}

const mobileTools = [
  { name: "AWS",        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", bg: "#232F3E" },
  { name: "K8s",        iconSrc: "https://cdn.simpleicons.org/kubernetes/FFFFFF",  bg: "#326CE5" },
  { name: "Docker",     iconSrc: "https://cdn.simpleicons.org/docker/FFFFFF",      bg: "#2496ED" },
  { name: "TF",         iconSrc: "https://cdn.simpleicons.org/terraform/FFFFFF",   bg: "#7B42BC" },
  { name: "Jenkins",    iconSrc: "https://cdn.simpleicons.org/jenkins/FFFFFF",     bg: "#D24939" },
  { name: "Grafana",    iconSrc: "https://cdn.simpleicons.org/grafana/FFFFFF",     bg: "#F46800" },
  { name: "GH",         iconSrc: "https://cdn.simpleicons.org/github/FFFFFF",      bg: "#181717" },
  { name: "GitLab",     iconSrc: "https://cdn.simpleicons.org/gitlab/FFFFFF",      bg: "#FC6D26" },
  { name: "Helm",       iconSrc: "https://cdn.simpleicons.org/helm/FFFFFF",        bg: "#0F1689" },
  { name: "Ansible",    iconSrc: "https://cdn.simpleicons.org/ansible/FFFFFF",     bg: "#1A1A1A" },
  { name: "Prom",       iconSrc: "https://cdn.simpleicons.org/prometheus/FFFFFF",  bg: "#E6522C" },
  { name: "Linux",      iconSrc: "https://cdn.simpleicons.org/linux/000000",       bg: "#FCC624" },
];

function MobileDevOpsStrip() {
  return (
    <div
      className="rounded-xl p-3"
      style={{
        background: "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.35)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-2.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400">~/stack</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {mobileTools.map((tool) => (
          <div key={tool.name} className="flex flex-col items-center gap-1">
            <div
              className="w-[40px] h-[40px] rounded-lg flex items-center justify-center"
              style={{
                background: tool.bg,
                boxShadow: "0 3px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
              }}
            >
              <img
                src={tool.iconSrc}
                alt={tool.name}
                className="w-[22px] h-[22px]"
                draggable={false}
                loading="lazy"
              />
            </div>
            <span className="font-mono text-[8px] text-stone-400">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

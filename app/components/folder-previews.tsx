"use client";

import React, { useEffect, useState } from "react";

/* ──────────────────────────────────────────────────────────
 * Themed preview panels — one per folder.
 * Replace the legacy /projects-at-work.mp4 etc. videos.
 * Each preview fills the same 580×340 (lg) frame.
 * ────────────────────────────────────────────────────────── */

const containerCls =
  "relative w-full h-full overflow-hidden flex items-stretch";

/* 1 ── Projects at Work — terminal showing live kubectl output */
export function PreviewProjectsAtWork() {
  const lines = [
    { txt: "$ kubectl get pods -n production", k: "cmd" },
    { txt: "NAME                STATUS    AGE", k: "head" },
    { txt: "api-server-7d8f9    Running   24d", k: "row", color: "#34D399" },
    { txt: "worker-deploy-2k3l  Running   24d", k: "row", color: "#34D399" },
    { txt: "ingress-nginx-x7v2  Running   24d", k: "row", color: "#34D399" },
    { txt: "istio-gateway-9p4q  Running   24d", k: "row", color: "#34D399" },
    { txt: "redis-cluster-q8h1  Running   18d", k: "row", color: "#34D399" },
    { txt: "$ helm list", k: "cmd" },
    { txt: "platform-api  v2.14.3  deployed", k: "row", color: "#A78BFA" },
    { txt: "ingress-stack v1.8.0   deployed", k: "row", color: "#A78BFA" },
    { txt: "$ # SLO budget: 99.95% — green", k: "ok" },
  ];

  const [visible, setVisible] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => (v >= lines.length ? 0 : v + 1));
    }, 500);
    return () => clearInterval(id);
  }, [lines.length]);

  return (
    <div
      className={containerCls}
      style={{
        background:
          "linear-gradient(160deg, #0c0c0f 0%, #131318 50%, #0a0a0d 100%)",
      }}
    >
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />
      <div className="relative flex-1 p-5 overflow-hidden font-mono text-[12px] leading-[1.7]">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)] animate-pulse" />
          <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em]">
            production · live
          </span>
        </div>
        {lines.slice(0, visible).map((l, i) => {
          if (l.k === "cmd")
            return (
              <div key={i} className="text-emerald-400">
                {l.txt}
              </div>
            );
          if (l.k === "head")
            return (
              <div
                key={i}
                className="text-stone-500 border-b border-white/5 pb-1 mt-1 mb-1"
              >
                {l.txt}
              </div>
            );
          if (l.k === "ok")
            return (
              <div key={i} className="text-emerald-300 mt-1">
                {l.txt}
              </div>
            );
          return (
            <div key={i} className="flex items-center gap-2">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: l.color, boxShadow: `0 0 6px ${l.color}99` }}
              />
              <span className="text-stone-200">{l.txt}</span>
            </div>
          );
        })}
        <div className="text-emerald-400 mt-1">
          $<span className="inline-block w-[7px] h-[14px] bg-emerald-400/80 ml-1 align-middle animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* 2 ── Building with AI — Go code editor with audio-stream waveform */
export function PreviewBuildingWithAI() {
  return (
    <div
      className={containerCls}
      style={{
        background:
          "linear-gradient(160deg, #0c0c0f 0%, #131318 50%, #0a0a0d 100%)",
      }}
    >
      <div className="relative flex-1 p-5 font-mono text-[11.5px] leading-[1.7] overflow-hidden">
        {/* Editor tab strip */}
        <div className="flex items-center gap-2 mb-3 text-[10px]">
          <span className="px-2 py-0.5 rounded text-stone-200 bg-white/[0.06] border border-white/10">
            transcribe.go
          </span>
          <span className="text-stone-500">main</span>
          <span className="ml-auto text-amber-400/80">
            ●&nbsp;<span className="text-stone-500">amazonaws/transcribe</span>
          </span>
        </div>

        {/* Code with syntax highlight */}
        <pre className="text-stone-300 whitespace-pre-wrap leading-relaxed">
          <Token c="#A78BFA">package</Token> main
          <br />
          <Token c="#A78BFA">import</Token> (
          <br />
          <span className="ml-4">
            <Token c="#34D399">&quot;context&quot;</Token>
          </span>
          <br />
          <span className="ml-4">
            <Token c="#34D399">&quot;github.com/aws/aws-sdk-go-v2/service/transcribestreaming&quot;</Token>
          </span>
          <br />)
          <br />
          <br />
          <Token c="#A78BFA">func</Token>{" "}
          <Token c="#22D3EE">TranscribeStream</Token>(
          <Token c="#F59E0B">ctx</Token> context.Context){" "}
          <Token c="#A78BFA">error</Token> {"{"}
          <br />
          <span className="ml-4 text-stone-500">// stream audio → S3 transcripts</span>
          <br />
          <span className="ml-4">
            client := transcribestreaming.<Token c="#22D3EE">NewFromConfig</Token>(cfg)
          </span>
          <br />
          <span className="ml-4">
            stream, _ := client.<Token c="#22D3EE">StartStreamTranscription</Token>(ctx, ...)
          </span>
          <br />
          <span className="ml-4">
            <Token c="#A78BFA">for</Token> evt := <Token c="#A78BFA">range</Token> stream.Events() {"{"}
          </span>
          <br />
          <span className="ml-8">
            <Token c="#22D3EE">log</Token>.Println(evt.Transcript)
          </span>
          <br />
          <span className="ml-4">{"}"}</span>
          <br />
          <span className="text-stone-300">{"}"}</span>
        </pre>

        {/* Live waveform */}
        <div className="absolute left-0 right-0 bottom-3 px-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.7)] animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-mono">
              transcribing · live
            </span>
          </div>
          <Waveform />
        </div>
      </div>
    </div>
  );
}

function Token({ c, children }: { c: string; children: React.ReactNode }) {
  return <span style={{ color: c }}>{children}</span>;
}

function Waveform() {
  const bars = 60;
  return (
    <div className="flex items-end gap-[2px] h-[28px]">
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm wave-bar"
          style={{
            background: "linear-gradient(to top, #F59E0B, #FBBF24)",
            animationDelay: `${(i * 60) % 1500}ms`,
          }}
        />
      ))}
      <style jsx>{`
        .wave-bar {
          height: 30%;
          animation: waveform 1.2s ease-in-out infinite;
          transform-origin: bottom;
        }
        @keyframes waveform {
          0%,
          100% {
            transform: scaleY(0.3);
            opacity: 0.6;
          }
          50% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

/* 3 ── Community Impact — contribution heatmap */
export function PreviewCommunityImpact() {
  const cols = 28;
  const rows = 7;
  const cells: number[] = Array.from({ length: cols * rows }, (_, i) => {
    // pseudo-random pattern, deterministic so SSR matches
    const v = Math.sin(i * 12.9898) * 43758.5453;
    const r = v - Math.floor(v);
    if (r < 0.4) return 0;
    if (r < 0.65) return 1;
    if (r < 0.85) return 2;
    return 3;
  });

  const palette = [
    "rgba(255,255,255,0.05)",
    "rgba(16,185,129,0.35)",
    "rgba(16,185,129,0.65)",
    "rgba(52,211,153,1)",
  ];

  const events = [
    { y: "now", label: "AWS UG Trivandrum · UG Lead", color: "#FF9900" },
    { y: "2025", label: "Sport On Media co-founded", color: "#10B981" },
    { y: "2020", label: "EdgyHack co-founded", color: "#FC6D26" },
    { y: "2020", label: "Hack Club Lead", color: "#F59E0B" },
    { y: "2019", label: "AngelHack Ambassador", color: "#A78BFA" },
    { y: "2017", label: "Meta Dev Circle: Kochi", color: "#326CE5" },
  ];

  return (
    <div
      className={containerCls}
      style={{
        background:
          "linear-gradient(160deg, #0c0c0f 0%, #131318 50%, #0a0a0d 100%)",
      }}
    >
      <div className="relative flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
            $ git contrib --community
          </span>
        </div>

        {/* heatmap */}
        <div
          className="grid gap-[3px]"
          style={{
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridAutoRows: "10px",
          }}
        >
          {cells.map((v, i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{
                background: palette[v],
                boxShadow:
                  v === 3 ? "0 0 4px rgba(52,211,153,0.5)" : "none",
              }}
            />
          ))}
        </div>

        {/* events as labels */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {events.map((e) => (
            <span
              key={e.label}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono"
              style={{
                background: `${e.color}1a`,
                border: `1px solid ${e.color}33`,
                color: e.color,
              }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: e.color }}
              />
              {e.y} · {e.label}
            </span>
          ))}
        </div>

        {/* legend */}
        <div className="mt-auto flex items-center justify-end gap-2 font-mono text-[9px] text-stone-500 pt-3">
          <span>less</span>
          {palette.map((p, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-[2px]"
              style={{ background: p }}
            />
          ))}
          <span>more</span>
        </div>
      </div>
    </div>
  );
}

/* 4 ── Side Projects — Mailweaver bulk-send composer */
export function PreviewSideProjects() {
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 2));
      setCount((c) => (c >= 500 ? 0 : c + 10));
    }, 90);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={containerCls}
      style={{
        background:
          "linear-gradient(160deg, #0c0c0f 0%, #131318 50%, #0a0a0d 100%)",
      }}
    >
      <div className="relative flex-1 p-5 flex flex-col gap-3 font-mono text-[11px]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shadow-[0_0_6px_rgba(251,113,133,0.6)] animate-pulse" />
          <span className="text-stone-400 text-[10px] uppercase tracking-[0.2em]">
            mailweaver · bulk send
          </span>
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.03] p-3 space-y-1.5">
          <Field label="From" value="hello@farzanfa.com" />
          <Field label="To" value="bulk_recipients.csv (500 addresses)" />
          <Field label="Subject" value="{{firstName}}, here's an update for {{company}}" />
        </div>

        <div className="rounded-md border border-white/10 bg-white/[0.02] p-3">
          <div className="text-stone-300 leading-relaxed text-[11px]">
            Hi <span className="text-amber-400">{"{{firstName}}"}</span>,<br />
            Thanks for being a customer at{" "}
            <span className="text-amber-400">{"{{company}}"}</span>.
            <br />
            <span className="text-stone-500">— Farzan</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-1.5 text-[10px]">
            <span className="text-stone-400 uppercase tracking-[0.2em]">
              sending
            </span>
            <span className="text-emerald-400">
              {count}/500 · {progress}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-linear"
              style={{
                width: `${progress}%`,
                background:
                  "linear-gradient(90deg, #F472B6 0%, #F59E0B 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2 text-[11px]">
      <span className="text-stone-500 w-[58px] shrink-0">{label}</span>
      <span className="text-stone-200 truncate">{value}</span>
    </div>
  );
}

/* 5 ── Learning & Growth — certificate / badge stack */
export function PreviewLearningGrowth() {
  const certs = [
    { title: "AWS User Group Leader", sub: "AWS Community Builder", color: "#FF9900" },
    { title: "Kubernetes for Beginners", sub: "Hands-on Tutorial", color: "#326CE5" },
    { title: "DevOps, Cloud & Agile", sub: "Foundations Specialization", color: "#10B981" },
    { title: "Google Cloud Skill Badges", sub: "21 earned", color: "#4285F4" },
    { title: "Technical Support Fundamentals", sub: "Coursera", color: "#A78BFA" },
  ];

  return (
    <div
      className={containerCls}
      style={{
        background:
          "linear-gradient(160deg, #0c0c0f 0%, #131318 50%, #0a0a0d 100%)",
      }}
    >
      <div className="relative flex-1 p-5 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
            $ ls ~/certificates
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {certs.map((c, i) => (
            <div
              key={c.title}
              className="flex items-center gap-3 rounded-lg p-2.5 transition-transform duration-300 hover:translate-x-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                animation: `slideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                  i * 0.08
                }s both`,
              }}
            >
              <div
                className="shrink-0 w-9 h-9 rounded-md flex items-center justify-center"
                style={{
                  background: c.color,
                  boxShadow: `0 4px 10px ${c.color}55, inset 0 1px 0 rgba(255,255,255,0.18)`,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="6" />
                  <polyline points="8.21 13.89 7 22 12 19 17 22 15.79 13.88" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-stone-100 text-[12.5px] font-semibold leading-tight">
                  {c.title}
                </p>
                <p className="text-stone-400 text-[10px] font-mono mt-0.5">
                  {c.sub}
                </p>
              </div>
              <span
                className="font-mono text-[9px] px-2 py-0.5 rounded-full uppercase tracking-[0.1em]"
                style={{
                  color: c.color,
                  background: `${c.color}1a`,
                  border: `1px solid ${c.color}33`,
                }}
              >
                earned
              </span>
            </div>
          ))}
        </div>
        <style jsx>{`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-12px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
}

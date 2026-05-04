"use client";

import React from "react";

/* ──────────────────────────────────────────────────────────
 * Themed bulletin cards — one per pinned item on the Playground.
 * Replace the legacy /bulletin/*.jpg design portfolio thumbnails.
 * Each card is a self-contained 240–340 px wide DevOps-flavored
 * "screenshot" rendered in pure React + CSS.
 * ────────────────────────────────────────────────────────── */

const ICON = (slug: string, color = "FFFFFF") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

function CardShell({
  accent,
  title,
  subtitle,
  children,
  variant = "dark",
}: {
  accent: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const isLight = variant === "light";
  return (
    <div
      className="rounded-md overflow-hidden"
      style={{
        background: isLight
          ? "linear-gradient(160deg, #fafaf8 0%, #f0ede6 100%)"
          : "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
        border: isLight
          ? "1px solid rgba(0,0,0,0.06)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow:
          "0 8px 22px rgba(0,0,0,0.45), 0 2px 4px rgba(0,0,0,0.25)",
      }}
    >
      {/* Title strip */}
      <div
        className="flex items-center gap-2 px-3 py-1.5"
        style={{
          background: isLight
            ? "rgba(0,0,0,0.04)"
            : "rgba(255,255,255,0.03)",
          borderBottom: isLight
            ? "1px solid rgba(0,0,0,0.06)"
            : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: accent, boxShadow: `0 0 6px ${accent}99` }}
        />
        <span
          className={`font-mono text-[9px] uppercase tracking-[0.18em] ${isLight ? "text-stone-700" : "text-stone-300"}`}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={`ml-auto font-mono text-[8px] ${isLight ? "text-stone-500" : "text-stone-500"}`}
          >
            {subtitle}
          </span>
        )}
      </div>
      <div className={`p-3 ${isLight ? "text-stone-700" : "text-stone-200"}`}>
        {children}
      </div>
    </div>
  );
}

/* 1 ── EKS pod grid */
export function CardEKS() {
  // 12 pods: 11 running, 1 pending (deterministic)
  const pods = Array.from({ length: 12 }, (_, i) => (i === 7 ? "pending" : "running"));
  return (
    <CardShell accent="#326CE5" title="eks · prod" subtitle="us-east-1">
      <div className="flex items-center gap-2 mb-3">
        <img src={ICON("kubernetes")} alt="" className="w-4 h-4" />
        <span className="font-mono text-[11px] text-stone-100">12 / 12 pods</span>
        <span className="ml-auto font-mono text-[9px] text-emerald-400">healthy</span>
      </div>
      <div className="grid grid-cols-6 gap-1.5">
        {pods.map((s, i) => (
          <div
            key={i}
            className="aspect-square rounded-[3px] flex items-center justify-center"
            style={{
              background:
                s === "running"
                  ? "rgba(16,185,129,0.18)"
                  : "rgba(251,191,36,0.18)",
              border:
                s === "running"
                  ? "1px solid rgba(16,185,129,0.45)"
                  : "1px solid rgba(251,191,36,0.45)",
            }}
          >
            <span
              className="w-1 h-1 rounded-full"
              style={{
                background: s === "running" ? "#34D399" : "#FBBF24",
                animation:
                  s === "running" && i % 3 === 0
                    ? "pulse 1.6s ease-in-out infinite"
                    : "none",
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between font-mono text-[9px] text-stone-500">
        <span>cpu 38%</span>
        <span>mem 52%</span>
        <span>net 12mb/s</span>
      </div>
    </CardShell>
  );
}

/* 2 ── Istio service mesh */
export function CardIstio() {
  const nodes = [
    { x: 30, y: 40, c: "#326CE5" },
    { x: 130, y: 25, c: "#34D399" },
    { x: 220, y: 60, c: "#A78BFA" },
    { x: 70, y: 95, c: "#F59E0B" },
    { x: 180, y: 110, c: "#F472B6" },
  ];
  const edges: [number, number][] = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [1, 4],
    [2, 4],
  ];
  return (
    <CardShell accent="#466BB0" title="istio · mesh" subtitle="mtls on">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[11px] text-stone-100">5 services</span>
        <span className="ml-auto font-mono text-[9px] text-emerald-400">● 99.97% sli</span>
      </div>
      <svg viewBox="0 0 250 140" className="w-full h-[110px]">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke="rgba(70,107,176,0.45)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r="9"
              fill={`${n.c}33`}
              stroke={n.c}
              strokeWidth="1.5"
            />
            <circle cx={n.x} cy={n.y} r="3" fill={n.c}>
              <animate
                attributeName="r"
                values="3;5;3"
                dur="2.4s"
                begin={`${i * 0.3}s`}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </CardShell>
  );
}

/* 3 ── Terraform plan */
export function CardTerraform() {
  return (
    <CardShell accent="#7B42BC" title="terraform · plan" subtitle="aws">
      <div className="flex items-center gap-2 mb-2">
        <img src={ICON("terraform")} alt="" className="w-4 h-4" />
        <span className="font-mono text-[11px] text-stone-100">23 to add</span>
      </div>
      <pre className="font-mono text-[10px] leading-[1.5] text-stone-300 whitespace-pre-wrap">
        <span className="text-emerald-400">+ resource</span>{" "}
        <span className="text-amber-300">&quot;aws_eks_cluster&quot;</span>{" "}
        <span className="text-stone-400">&quot;prod&quot;</span>
        {"\n  "}
        <span className="text-stone-500">version = </span>
        <span className="text-amber-300">&quot;1.30&quot;</span>
        {"\n"}
        <span className="text-emerald-400">+ resource</span>{" "}
        <span className="text-amber-300">&quot;aws_iam_role&quot;</span>
        {"\n"}
        <span className="text-emerald-400">+ resource</span>{" "}
        <span className="text-amber-300">&quot;aws_vpc&quot;</span>
        {"\n"}
        <span className="text-stone-500">~ 4 to change · 0 to destroy</span>
      </pre>
    </CardShell>
  );
}

/* 4 ── GitHub Actions workflow */
export function CardGHActions() {
  const steps = [
    { name: "checkout", status: "ok" },
    { name: "test", status: "ok" },
    { name: "build", status: "ok" },
    { name: "scan", status: "ok" },
    { name: "deploy", status: "running" },
  ];
  return (
    <CardShell accent="#22D3EE" title="ci · main" subtitle="push #842">
      <div className="flex items-center gap-2 mb-2">
        <img src={ICON("githubactions")} alt="" className="w-4 h-4" />
        <span className="font-mono text-[11px] text-stone-100">deploy.yaml</span>
        <span className="ml-auto font-mono text-[9px] text-emerald-400">2m 14s</span>
      </div>
      <ol className="space-y-1">
        {steps.map((s, i) => (
          <li key={s.name} className="flex items-center gap-2 font-mono text-[10px]">
            <span
              className="w-3 h-3 rounded-full flex items-center justify-center shrink-0"
              style={{
                background:
                  s.status === "ok"
                    ? "rgba(16,185,129,0.2)"
                    : "rgba(34,211,238,0.2)",
                border:
                  s.status === "ok"
                    ? "1px solid #10B981"
                    : "1px solid #22D3EE",
              }}
            >
              {s.status === "ok" ? (
                <svg width="7" height="7" viewBox="0 0 12 12">
                  <polyline
                    points="2 6 5 9 10 3"
                    fill="none"
                    stroke="#34D399"
                    strokeWidth="2"
                  />
                </svg>
              ) : (
                <span className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse" />
              )}
            </span>
            <span className="text-stone-200">{s.name}</span>
            {i < steps.length - 1 && (
              <span className="ml-auto text-stone-600">·</span>
            )}
          </li>
        ))}
      </ol>
    </CardShell>
  );
}

/* 5 ── AWS Transcribe waveform */
export function CardTranscribe() {
  const bars = 36;
  return (
    <CardShell accent="#FF9900" title="aws · transcribe" subtitle="streaming">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[11px] text-stone-100">
          live → s3
        </span>
        <span className="ml-auto font-mono text-[9px] text-amber-300 animate-pulse">
          ● rec
        </span>
      </div>
      <div className="flex items-end gap-[2px] h-[42px]">
        {Array.from({ length: bars }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              background: "linear-gradient(to top, #F59E0B, #FBBF24)",
              height: "30%",
              animation: `tx-wave 1.1s ease-in-out infinite`,
              animationDelay: `${(i * 60) % 1100}ms`,
              transformOrigin: "bottom",
            }}
          />
        ))}
      </div>
      <p className="mt-2 font-mono text-[9px] text-stone-400 truncate">
        &quot;the patient reports persistent…&quot;
      </p>
      <style jsx>{`
        @keyframes tx-wave {
          0%,100% { transform: scaleY(0.3); opacity: 0.6; }
          50%     { transform: scaleY(1);   opacity: 1; }
        }
      `}</style>
    </CardShell>
  );
}

/* 6 ── Mailweaver send progress */
export function CardMailweaver() {
  return (
    <CardShell accent="#F472B6" title="mailweaver" subtitle="bulk send">
      <div className="flex items-center gap-2 mb-2">
        <span className="font-mono text-[11px] text-stone-100">347 / 500</span>
        <span className="ml-auto font-mono text-[9px] text-pink-300">69%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden mb-3">
        <div
          className="h-full rounded-full"
          style={{
            width: "69%",
            background: "linear-gradient(90deg, #F472B6 0%, #F59E0B 100%)",
          }}
        />
      </div>
      <ul className="space-y-1 font-mono text-[10px] text-stone-300">
        <li className="flex justify-between">
          <span>delivered</span>
          <span className="text-emerald-400">347</span>
        </li>
        <li className="flex justify-between">
          <span>opened</span>
          <span className="text-stone-200">218</span>
        </li>
        <li className="flex justify-between">
          <span>queued</span>
          <span className="text-stone-400">153</span>
        </li>
      </ul>
    </CardShell>
  );
}

/* 7 ── Grafana + Loki dashboard */
export function CardGrafana() {
  // deterministic line chart
  const points = Array.from({ length: 24 }, (_, i) => {
    const v = (Math.sin(i * 0.7) + 1) * 30 + (i * 1.4) + 10 + Math.sin(i * 2.1) * 6;
    return Math.max(8, Math.min(58, v));
  });
  const W = 240,
    H = 70,
    step = W / (points.length - 1);
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * step},${H - p}`).join(" ");
  const area = `${path} L ${W},${H} L 0,${H} Z`;

  return (
    <CardShell accent="#F46800" title="grafana · loki" subtitle="last 1h">
      <div className="flex items-center gap-2 mb-2">
        <img src={ICON("grafana")} alt="" className="w-4 h-4" />
        <span className="font-mono text-[11px] text-stone-100">p99 latency</span>
        <span className="ml-auto font-mono text-[9px] text-emerald-400">142ms</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[70px]">
        <defs>
          <linearGradient id="g-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#F46800" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F46800" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[18, 36, 54].map((y) => (
          <line key={y} x1="0" x2={W} y1={y} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
        ))}
        <path d={area} fill="url(#g-fill)" />
        <path d={path} fill="none" stroke="#F46800" strokeWidth="1.5" />
      </svg>
      <div className="mt-2 flex justify-between font-mono text-[9px] text-stone-500">
        <span>err 0.02%</span>
        <span>rps 1.2k</span>
        <span>logs 4.3M</span>
      </div>
    </CardShell>
  );
}

/* 8 ── Jenkins + Flyway pipeline */
export function CardJenkins() {
  const stages = ["build", "migrate", "test", "deploy"];
  return (
    <CardShell accent="#D24939" title="jenkins · flyway" subtitle="job #214">
      <div className="flex items-center gap-2 mb-3">
        <img src={ICON("jenkins")} alt="" className="w-4 h-4" />
        <span className="font-mono text-[11px] text-stone-100">migration v23</span>
        <span className="ml-auto font-mono text-[9px] text-emerald-400">success</span>
      </div>
      <div className="flex items-center gap-1">
        {stages.map((s, i) => (
          <React.Fragment key={s}>
            <div
              className="flex-1 rounded-sm py-1.5 text-center font-mono text-[9px]"
              style={{
                background: "rgba(16,185,129,0.15)",
                border: "1px solid rgba(16,185,129,0.35)",
                color: "#6ee7b7",
              }}
            >
              {s}
            </div>
            {i < stages.length - 1 && (
              <span className="text-emerald-400">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <p className="mt-3 font-mono text-[9px] text-stone-500">
        ✓ V23__add_audit_table.sql · 142ms
      </p>
    </CardShell>
  );
}

/* 9 ── Docker container stack */
export function CardDocker() {
  const services = [
    { name: "api", img: "node:20", up: true },
    { name: "worker", img: "go:1.22", up: true },
    { name: "redis", img: "redis:7", up: true },
    { name: "nginx", img: "nginx:1.27", up: true },
  ];
  return (
    <CardShell accent="#2496ED" title="docker compose" subtitle="up">
      <div className="flex items-center gap-2 mb-2">
        <img src={ICON("docker")} alt="" className="w-4 h-4" />
        <span className="font-mono text-[11px] text-stone-100">{services.length} services</span>
        <span className="ml-auto font-mono text-[9px] text-emerald-400">healthy</span>
      </div>
      <ul className="space-y-1">
        {services.map((s) => (
          <li
            key={s.name}
            className="flex items-center gap-2 font-mono text-[10px] py-1 px-2 rounded"
            style={{
              background: "rgba(36,150,237,0.08)",
              border: "1px solid rgba(36,150,237,0.18)",
            }}
          >
            <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_4px_#34D399]" />
            <span className="text-stone-200">{s.name}</span>
            <span className="ml-auto text-stone-500">{s.img}</span>
          </li>
        ))}
      </ul>
    </CardShell>
  );
}

/* 10 ── Rancher multi-cluster */
export function CardRancher() {
  const clusters = [
    { name: "prod-us", nodes: 6, c: "#10B981" },
    { name: "prod-eu", nodes: 4, c: "#34D399" },
    { name: "stage", nodes: 3, c: "#22D3EE" },
    { name: "dev", nodes: 2, c: "#A78BFA" },
  ];
  return (
    <CardShell accent="#0075A8" title="rancher" subtitle="4 clusters">
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-[11px] text-stone-100">15 nodes total</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {clusters.map((c) => (
          <div
            key={c.name}
            className="rounded p-2"
            style={{
              background: `${c.c}14`,
              border: `1px solid ${c.c}40`,
            }}
          >
            <div className="font-mono text-[10px] text-stone-100">
              {c.name}
            </div>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: c.nodes }).map((_, i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: c.c, boxShadow: `0 0 4px ${c.c}aa` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </CardShell>
  );
}

/* 11 ── ArgoCD sync */
export function CardArgoCD() {
  return (
    <CardShell accent="#EF7B4D" title="argocd · sync" subtitle="auto">
      <div className="flex items-center gap-2 mb-3">
        <img src={ICON("argo")} alt="" className="w-4 h-4" />
        <span className="font-mono text-[11px] text-stone-100">platform-api</span>
        <span className="ml-auto font-mono text-[9px] text-emerald-400">healthy</span>
      </div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 text-center">
          <div className="font-mono text-[9px] text-stone-500 uppercase tracking-wider mb-1">
            git
          </div>
          <div className="font-mono text-[10px] text-stone-200">
            a3f9c1d
          </div>
          <div className="font-mono text-[8px] text-stone-500 mt-0.5">
            main
          </div>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] text-emerald-300">→ sync</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <div className="flex-1 text-center">
          <div className="font-mono text-[9px] text-stone-500 uppercase tracking-wider mb-1">
            cluster
          </div>
          <div className="font-mono text-[10px] text-stone-200">
            a3f9c1d
          </div>
          <div className="font-mono text-[8px] text-emerald-400 mt-0.5">
            ✓ in sync
          </div>
        </div>
      </div>
      <div className="mt-3 grid grid-cols-8 gap-[2px]">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="h-1 rounded-sm"
            style={{
              background:
                i < 14 ? "rgba(16,185,129,0.6)" : "rgba(255,255,255,0.08)",
            }}
          />
        ))}
      </div>
    </CardShell>
  );
}

/* ── Indexed list — order matches BOARD_IMAGES in scatter-board ── */
export const BULLETIN_CARDS: React.FC[] = [
  CardEKS,         // 0 — was bulletin/1.jpg
  CardIstio,       // 1 — was bulletin/6.jpg
  CardTerraform,   // 2 — was bulletin/2.jpg
  CardGHActions,   // 3 — was bulletin/10.jpg
  CardTranscribe,  // 4 — was bulletin/11.jpg
  CardMailweaver,  // 5 — was bulletin/5.jpg
  CardGrafana,     // 6 — was bulletin/3.jpg
  CardJenkins,     // 7 — was bulletin/9.jpg
  CardDocker,      // 8 — was bulletin/7.jpg
  CardRancher,     // 9 — was bulletin/12.jpg
  CardArgoCD,      // 10 — was bulletin/8.jpg
];

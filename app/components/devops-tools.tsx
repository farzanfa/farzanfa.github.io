"use client";

import React from "react";

type Tool = {
  name: string;
  iconSrc: string;
  color: string;
  bg: string;
  rotate: string;
  href: string;
};

/* ── 12 tools, 4×3 grid ── */
const tools: Tool[] = [
  // simpleicons doesn't host the AWS smile (brand restriction); use devicon
  { name: "AWS",        iconSrc: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "FFFFFF", bg: "#232F3E", rotate: "-4deg", href: "https://aws.amazon.com" },
  { name: "Kubernetes", iconSrc: "https://cdn.simpleicons.org/kubernetes/FFFFFF",  color: "FFFFFF", bg: "#326CE5", rotate: "3deg",  href: "https://kubernetes.io" },
  { name: "Docker",     iconSrc: "https://cdn.simpleicons.org/docker/FFFFFF",      color: "FFFFFF", bg: "#2496ED", rotate: "-2deg", href: "https://www.docker.com" },
  { name: "Terraform",  iconSrc: "https://cdn.simpleicons.org/terraform/FFFFFF",   color: "FFFFFF", bg: "#7B42BC", rotate: "5deg",  href: "https://www.terraform.io" },
  { name: "Jenkins",    iconSrc: "https://cdn.simpleicons.org/jenkins/FFFFFF",     color: "FFFFFF", bg: "#D24939", rotate: "-3deg", href: "https://www.jenkins.io" },
  { name: "Grafana",    iconSrc: "https://cdn.simpleicons.org/grafana/FFFFFF",     color: "FFFFFF", bg: "#F46800", rotate: "2deg",  href: "https://grafana.com" },
  { name: "GitHub",     iconSrc: "https://cdn.simpleicons.org/github/FFFFFF",      color: "FFFFFF", bg: "#181717", rotate: "-5deg", href: "https://github.com" },
  { name: "GitLab",     iconSrc: "https://cdn.simpleicons.org/gitlab/FFFFFF",      color: "FFFFFF", bg: "#FC6D26", rotate: "4deg",  href: "https://gitlab.com" },
  { name: "Helm",       iconSrc: "https://cdn.simpleicons.org/helm/FFFFFF",        color: "FFFFFF", bg: "#0F1689", rotate: "-2deg", href: "https://helm.sh" },
  { name: "Ansible",    iconSrc: "https://cdn.simpleicons.org/ansible/FFFFFF",     color: "FFFFFF", bg: "#1A1A1A", rotate: "3deg",  href: "https://www.ansible.com" },
  { name: "Prometheus", iconSrc: "https://cdn.simpleicons.org/prometheus/FFFFFF",  color: "FFFFFF", bg: "#E6522C", rotate: "-3deg", href: "https://prometheus.io" },
  { name: "Linux",      iconSrc: "https://cdn.simpleicons.org/linux/000000",       color: "000000", bg: "#FCC624", rotate: "5deg",  href: "https://www.linux.org" },
];

export function DevOpsToolsWall() {
  return (
    <div
      className="hidden lg:block absolute right-[-10px] top-[160px] z-10 rotate-[5deg] transition-transform duration-300 ease-out hover:rotate-[2deg] hover:scale-[1.02] group/wall hero-entrance"
      style={{
        willChange: "transform",
        animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 3.4s both",
      }}
    >
      <div
        className="relative w-[360px] rounded-2xl p-5"
        style={{
          background:
            "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow:
            "0 12px 32px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle grid + noise overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        {/* Header */}
        <div className="relative flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400">
              ~/stack
            </p>
          </div>
          <p className="font-mono text-[9px] text-stone-500">v2026.05</p>
        </div>

        {/* Tool grid — 4 columns × 3 rows = 12 */}
        <div className="relative grid grid-cols-4 gap-x-3 gap-y-4 justify-items-center">
          {tools.map((tool, i) => (
            <a
              key={tool.name}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group/tool flex flex-col items-center gap-1.5 cursor-pointer w-[68px]"
              title={tool.name}
              style={{
                animation: `hero-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${3.6 + i * 0.05}s both`,
              }}
            >
              <div
                className="relative w-[54px] h-[54px] rounded-xl flex items-center justify-center transition-all duration-300 ease-out group-hover/tool:scale-110 group-hover/tool:-translate-y-1 group-hover/tool:rotate-[6deg]"
                style={{
                  background: tool.bg,
                  rotate: tool.rotate,
                  boxShadow:
                    "0 4px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <img
                  src={tool.iconSrc}
                  alt={tool.name}
                  className="w-[28px] h-[28px] select-none"
                  draggable={false}
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover/tool:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: `0 0 20px ${tool.bg}88` }}
                />
              </div>
              <span className="font-mono text-[9px] text-stone-400 group-hover/tool:text-stone-200 transition-colors text-center leading-tight">
                {tool.name}
              </span>
            </a>
          ))}
        </div>

        {/* Footer caption */}
        <div className="relative mt-5 pt-3 border-t border-white/5">
          <p className="font-mono text-[10px] text-stone-500 text-center">
            <span className="text-emerald-400">$</span> echo &quot;production stack&quot;
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── DevOps Ticket — replaces the design×tech ticket ── */
export function DevOpsTicket() {
  return (
    <div
      className="hidden lg:block absolute right-[20px] top-[60px] z-30 w-[340px] rotate-[4deg] transition-transform duration-300 ease-out hover:scale-[1.05] hover:rotate-[1deg] group/ticket hero-entrance"
      style={{
        willChange: "transform",
        animation: "hero-fade-in 0.7s cubic-bezier(0.4,0,0.2,1) 3.25s both",
      }}
    >
      <div
        className="relative rounded-md overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #fafaf8 0%, #f0ede6 100%)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35), 0 2px 4px rgba(0,0,0,0.25)",
        }}
      >
        <div className="flex">
          <div
            className="relative w-[60px] flex flex-col items-center justify-between py-3 border-r border-dashed border-stone-400"
            style={{ background: "#1c1917" }}
          >
            <p className="font-mono text-[7px] text-stone-400 uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180">
              Ticket No.
            </p>
            <p className="font-mono text-[8px] text-stone-300 [writing-mode:vertical-rl] rotate-180">
              SRE-2026-001
            </p>
            <p className="font-mono text-[7px] text-stone-400 uppercase tracking-[0.2em]">
              ★
            </p>
          </div>

          <div className="flex-1 px-4 py-3">
            <p className="font-mono text-[8px] text-stone-500 uppercase tracking-[0.2em] mb-1">
              All-Access Pass
            </p>
            <h3 className="font-[family-name:var(--font-noto)] font-extrabold text-stone-900 text-[19px] leading-[1.05] tracking-[-0.01em]">
              AUTOMATE
              <span className="mx-1.5 text-stone-400">×</span>
              DEPLOY
            </h3>
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-[9px] font-mono">
              <div>
                <span className="text-stone-400 uppercase tracking-wider">Time</span>
                <p className="text-stone-700">24 / 7</p>
              </div>
              <div>
                <span className="text-stone-400 uppercase tracking-wider">Pager</span>
                <p className="text-stone-700">On-call</p>
              </div>
              <div>
                <span className="text-stone-400 uppercase tracking-wider">Region</span>
                <p className="text-stone-700">Multi-AZ</p>
              </div>
              <div>
                <span className="text-stone-400 uppercase tracking-wider">Env</span>
                <p className="text-stone-700">prod</p>
              </div>
            </div>
          </div>

          <div className="w-[58px] flex flex-col items-center justify-between py-3 border-l border-dashed border-stone-400 px-2">
            <p className="font-mono text-[7px] text-stone-500 uppercase tracking-wider">SEAT</p>
            <div className="flex gap-[1.5px] items-end h-[42px]">
              {[3, 5, 2, 6, 3, 4, 5, 2, 6, 3, 4, 2, 5].map((w, i) => (
                <div
                  key={i}
                  className="bg-stone-800"
                  style={{ width: i % 2 === 0 ? 1.5 : 2.5, height: `${w * 12}%`, minHeight: 16 }}
                />
              ))}
            </div>
            <p className="font-mono text-[8px] text-stone-700 font-bold">A1</p>
          </div>
        </div>

        {/* Scan shimmer on hover */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover/ticket:opacity-100">
          <div
            className="absolute top-0 -left-full w-full h-full group-hover/ticket:animate-[ticket-scan_2.2s_ease-in-out_infinite]"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,200,50,0.12) 35%, rgba(255,255,255,0.4) 50%, rgba(100,180,255,0.12) 65%, transparent 100%)",
              filter: "blur(1.5px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Kubernetes wheel sticker — sits in the lower-center, between vinyl and folder ── */
export function KubernetesSticker() {
  return (
    <div
      className="hidden lg:block absolute left-[610px] top-[720px] z-20 group/k8s hero-entrance"
      style={{ animation: "hero-pop 0.7s cubic-bezier(0.4,0,0.2,1) 3.1s both" }}
    >
      <div
        className="relative w-[88px] h-[88px] rotate-[-8deg] transition-all duration-500 ease-out group-hover/k8s:scale-[1.45] group-hover/k8s:rotate-[8deg] group-hover/k8s:-translate-y-3 group-hover/k8s:z-40"
        style={{ willChange: "transform" }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 6px 18px rgba(0,0,0,0.35), 0 1px 2px rgba(0,0,0,0.25), inset 0 -2px 0 rgba(0,0,0,0.06)",
          }}
        />
        <div
          className="absolute inset-[6px] rounded-full flex items-center justify-center overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 30% 25%, #5a8ee8 0%, #326CE5 55%, #2557c4 100%)",
          }}
        >
          <img
            src="https://cdn.simpleicons.org/kubernetes/FFFFFF"
            alt="Kubernetes"
            className="w-[52px] h-[52px] transition-transform duration-500 group-hover/k8s:rotate-[60deg]"
            draggable={false}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-[6px] rounded-full opacity-50 mix-blend-screen"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 45%)",
          }}
        />
      </div>
    </div>
  );
}

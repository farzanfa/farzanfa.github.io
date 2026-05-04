"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTilt } from "./use-tilt";

type Role = {
  company: string;
  role: string;
  period: string;
  location: string;
  current?: boolean;
  initial: string;
  accent: string;
  version: string;
  highlights: string[];
};

const roles: Role[] = [
  {
    company: "AWS Users Group Trivandrum",
    role: "User Group Leader",
    period: "Present",
    location: "Trivandrum, India",
    current: true,
    initial: "A",
    accent: "#FF9900",
    version: "v2026.community",
    highlights: [
      "Leading the AWS Users Group Trivandrum — organizing meetups, talks, and hands-on workshops for the local cloud community.",
      "Connecting builders, sharing knowledge on AWS, DevOps, and SRE practices, and growing the local AWS ecosystem.",
    ],
  },
  {
    company: "JIFFY.ai",
    role: "Site Reliability Engineer",
    period: "Mar 2026 — Present",
    location: "Trivandrum, India",
    current: true,
    initial: "J",
    accent: "#10B981",
    version: "v2026.03",
    highlights: [
      "Owning reliability for production services — SLOs, on-call response, and incident response.",
      "Tightening release safety with deeper CI/CD guards and progressive delivery.",
    ],
  },
  {
    company: "Nubinix Technologies",
    role: "DevOps Engineer",
    period: "May 2025 — Feb 2026",
    location: "Kochi, India",
    initial: "N",
    accent: "#326CE5",
    version: "v2025.05",
    highlights: [
      "Managed and optimized Kubernetes workloads on Amazon EKS; implemented Istio service mesh for secure service-to-service traffic.",
      "Led EKS cluster upgrades — including production — with zero/minimal downtime through careful planning and backup strategies.",
      "Built AWS Transcribe + Go integration enabling real-time speech-to-text for client applications.",
      "Provisioned AWS infrastructure with Terraform, enforcing security best practices end-to-end.",
      "Designed and tuned GitHub Actions CI/CD pipelines for microservices — faster builds, more reliable deploys.",
    ],
  },
  {
    company: "Sport On Media",
    role: "Co-Founder",
    period: "Mar 2025 — Feb 2026",
    location: "Kochi, India",
    initial: "S",
    accent: "#F59E0B",
    version: "v2025.03",
    highlights: [
      "Co-founded a media venture; oversaw infra, automation, and operations alongside engineering work.",
    ],
  },
  {
    company: "Feathersoft Info Solutions",
    role: "Linux DevOps Engineer",
    period: "May 2023 — Oct 2024",
    location: "Kochi, India",
    initial: "F",
    accent: "#FC6D26",
    version: "v2023.05",
    highlights: [
      "Orchestrated containerized microservices with Docker and Kubernetes across dev, staging, and production.",
      "Designed Jenkins CI/CD pipelines integrating Flyway for automated, version-controlled DB migrations.",
      "Stood up Grafana + Loki monitoring/logging — proactive issue detection and faster MTTR.",
      "Resolved networking, container, and orchestration issues across environments; improved uptime.",
      "Linux administration: patching, upgrades, performance tuning, and capacity monitoring.",
      "Led R&D on emerging DevOps tooling, feeding wins back into pipelines.",
    ],
  },
  {
    company: "Feathersoft Info Solutions",
    role: "Support Engineer Trainee",
    period: "Mar 2023 — May 2023",
    location: "Kochi, India",
    initial: "F",
    accent: "#FC6D26",
    version: "v2023.03",
    highlights: [
      "Trained on Linux fundamentals, ticketing workflows, and on-call practices.",
    ],
  },
  {
    company: "EA SPORTS",
    role: "Data Reviewer",
    period: "Oct 2021 — Dec 2022",
    location: "Remote",
    initial: "E",
    accent: "#FF1E1E",
    version: "v2021.10",
    highlights: [
      "Reviewed and validated game-data quality for live sports titles.",
    ],
  },
];

export function Experience() {
  return (
    <section
      id="experience"
      className="relative w-full px-4 lg:px-6 pt-20 pb-12 scroll-mt-16"
    >
      <div className="mx-auto max-w-[980px]">
        {/* macOS-style window wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden board-float"
          style={{
            background:
              "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 16px 40px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            animationDelay: "0s",
          }}
        >
          {/* Subtle dotted texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />

          {/* Title bar */}
          <div
            className="relative flex items-center gap-2 px-4 py-2.5 border-b"
            style={{
              borderColor: "rgba(255,255,255,0.06)",
              background:
                "linear-gradient(to bottom, rgba(35,35,40,0.9), rgba(20,20,24,0.9))",
            }}
          >
            <div className="flex gap-1.5">
              <div className="w-[11px] h-[11px] rounded-full bg-[#FF5F57] border border-[#E0443E]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
              <div className="w-[11px] h-[11px] rounded-full bg-[#28C840] border border-[#1AAB29]" />
            </div>
            <div className="flex-1 text-center">
              <span className="font-mono text-[11px] text-stone-400 select-none">
                ~/farzan/CHANGELOG.md
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* Content */}
          <div className="relative px-5 py-7 md:px-8 md:py-9">
            {/* Terminal command */}
            <div className="flex items-center gap-2 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
                $ cat CHANGELOG.md | head -n {roles.length}
              </p>
            </div>

            {/* Release feed */}
            <ol className="space-y-5">
              {roles.map((role, i) => (
                <ReleaseEntry
                  key={`${role.company}-${role.period}`}
                  role={role}
                  index={i}
                  isLast={i === roles.length - 1}
                />
              ))}
            </ol>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-stone-500">
              <span>
                <span className="text-emerald-400">$</span> git tag --list | wc
                -l
                <span className="ml-2 text-stone-300">{roles.length}</span>
              </span>
              <span className="opacity-60">main · clean</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ReleaseEntry({
  role,
  index,
  isLast,
}: {
  role: Role;
  index: number;
  isLast: boolean;
}) {
  const tilt = useTilt({ max: 6, scale: 1.015 });
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative flex gap-4 group"
    >
      {/* Left rail — version tag + dot + line */}
      <div className="flex flex-col items-center shrink-0 pt-2">
        {/* Version tag */}
        <div
          className="font-mono text-[10px] px-2 py-0.5 rounded-md mb-2 whitespace-nowrap"
          style={{
            color: role.accent,
            background: `${role.accent}1a`,
            border: `1px solid ${role.accent}33`,
          }}
        >
          {role.version}
        </div>
        {/* Status dot */}
        <div
          className="relative w-[10px] h-[10px] rounded-full"
          style={{
            background: role.current ? role.accent : "transparent",
            border: `2px solid ${role.accent}`,
            boxShadow: role.current
              ? `0 0 10px ${role.accent}aa`
              : "none",
          }}
        >
          {role.current && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: role.accent, opacity: 0.45 }}
            />
          )}
        </div>
        {/* Connector line down */}
        {!isLast && (
          <div
            className="flex-1 w-px mt-2 min-h-[40px]"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
            }}
          />
        )}
      </div>

      {/* Release card */}
      <article
        ref={tilt.ref}
        onMouseEnter={tilt.onMouseEnter}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="flex-1 rounded-xl p-4 md:p-5 group"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderLeft: `2px solid ${role.accent}66`,
          ...tilt.style,
        }}
      >
        {/* Header row */}
        <header className="flex items-start justify-between gap-3 mb-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-[family-name:var(--font-noto)] text-stone-100 text-[16px] md:text-[17px] font-semibold leading-tight">
              {role.role}
            </h3>
            <p className="font-mono text-[12px] text-stone-400 mt-1">
              <span className="text-stone-500">@</span>{" "}
              <span style={{ color: role.accent }}>{role.company}</span>{" "}
              <span className="text-stone-600">·</span>{" "}
              <span className="text-stone-500">{role.location}</span>
            </p>
          </div>
          {role.current ? (
            <span
              className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full"
              style={{
                background: "rgba(16,185,129,0.15)",
                color: "#6ee7b7",
                border: "1px solid rgba(16,185,129,0.35)",
              }}
            >
              ● live
            </span>
          ) : (
            <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full text-stone-500 border border-white/10">
              shipped
            </span>
          )}
        </header>

        {/* Date pill */}
        <div className="font-mono text-[10.5px] text-stone-500 mb-3">
          released · {role.period}
        </div>

        {/* Diff-style highlights */}
        <ul className="space-y-1">
          {role.highlights.map((h, hi) => (
            <li
              key={hi}
              className="font-mono text-[12px] leading-relaxed flex gap-2 text-stone-300 transition-colors duration-200 hover:text-stone-100"
            >
              <span className="shrink-0 select-none text-emerald-400/80">+</span>
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </article>
    </motion.li>
  );
}

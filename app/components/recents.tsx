"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const impactStats = [
  { endNum: 21, suffix: "", label: "GOOGLE CLOUD SKILL BADGES" },
  { endNum: 2, suffix: "+", label: "YEARS DEVOPS EXPERIENCE" },
  { endNum: 4, suffix: "+", label: "YEARS CO-FOUNDER (EDGYHACK)" },
];

function CountUp({ end, suffix, duration = 1500, autoStart = false }: { end: number; suffix: string; duration?: number; autoStart?: boolean }) {
  const [count, setCount] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!autoStart && key === 0) return;
    setCount(0);
    let startTime: number | null = null;
    let raf: number;

    function tick(ts: number) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [autoStart, key, end, duration]);

  return (
    <span onMouseEnter={() => setKey(k => k + 1)} className="cursor-default">
      {count}{suffix}
    </span>
  );
}

const aiProjects = [
  {
    year: "2026",
    title: "Site Reliability Engineer · JIFFY.ai",
    detail: "Joined JIFFY.ai as SRE in March 2026 (Trivandrum)",
    tags: [{ label: "ROLE", color: "#9a8058", bg: "#f2ead8" }],
  },
  {
    year: "2025",
    title: "EKS Production Cluster Upgrade",
    detail: "Planned and executed zero/minimal-downtime EKS upgrades with backup strategies",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2025",
    title: "Istio Service Mesh on EKS",
    detail: "Implemented Istio for secure service-to-service comms and traffic management",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2025",
    title: "AWS Transcribe Medical with Go",
    detail: "Real-time medical transcription · WebSockets · S3 · Terraform · Docker",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2025",
    title: "Mailweaver — Bulk email web app",
    detail: "Gmail OAuth · CSV personalization · smart recipients · real-time tracking",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2025",
    title: "GitHub Actions CI/CD",
    detail: "Designed and optimized pipelines for microservices — faster, more reliable releases",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2024",
    title: "Grafana + Loki Observability",
    detail: "Deployed monitoring & logging stack at Feathersoft for proactive issue detection",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2024",
    title: "Flyway Schema Migrations",
    detail: "Automated DB migrations integrated into Jenkins release pipelines",
    tags: [{ label: "SHIPPED", color: "#a08060", bg: "#f0e4d6" }],
  },
  {
    year: "2025",
    title: "Sport On Media",
    detail: "Co-Founder · launched March 2025 (Kochi)",
    tags: [{ label: "FOUNDED", color: "#9a8058", bg: "#f2ead8" }],
  },
];

const additionalAchievements = [
  { year: "2025", title: "Nubinix Technologies", detail: "DevOps Engineer · EKS, Istio, Terraform, GitHub Actions (May 2025 – Feb 2026)" },
  { year: "2023", title: "Feathersoft Info Solutions", detail: "Linux DevOps Engineer · Docker, Kubernetes, Jenkins, Grafana, Loki (May 2023 – Oct 2024)" },
  { year: "2022", title: "BTech, Computer Science", detail: "Toc H Institute of Science & Technology, Ernakulam (2017 – 2022)" },
  { year: "2021", title: "EA SPORTS", detail: "Data Reviewer (Oct 2021 – Dec 2022)" },
  { year: "2020", title: "EdgyHack", detail: "Co-Founder · 4+ years (Mar 2020 – Aug 2024)" },
  { year: "2020", title: "Hack Club Kochi", detail: "Club Lead (Aug 2020 – May 2022)" },
  { year: "2019", title: "AngelHack", detail: "Ambassador, Kochi (2019 – 2020)" },
  { year: "2017", title: "Meta Developer Circle: Kochi", detail: "Event Planner / Coordinator · 5+ years" },
];

export function RecentStatus() {
  const [visible, setVisible] = useState(false);
  const [countStarted, setCountStarted] = useState(false);
  useEffect(() => {
    setVisible(true);
    const t = setTimeout(() => setCountStarted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 6 },
    animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 },
    transition: { duration: 0.3, delay },
  });

  return (
    <div className="p-5 overflow-y-auto h-full font-[family-name:var(--font-noto)]">
      {/* Impact at a Glance */}
      <motion.div {...fadeIn(0)} className="text-[11px] text-stone-500 uppercase tracking-[0.2em] font-mono mb-4">
        Impact at a Glance
      </motion.div>
      <motion.div {...fadeIn(0.05)} className="grid grid-cols-3 gap-3 mb-8">
        {impactStats.map((stat, i) => (
          <div
            key={i}
            className="rounded-lg px-3 py-3"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div className="text-[22px] font-semibold text-stone-100 leading-tight">
              <CountUp end={stat.endNum} suffix={stat.suffix} autoStart={countStarted} />
            </div>
            <div className="text-[10px] text-stone-500 uppercase tracking-[0.1em] mt-1 font-mono">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* AI Projects & Builds */}
      <motion.div {...fadeIn(0.1)} className="text-[11px] text-stone-500 uppercase tracking-[0.2em] font-mono mb-3 pb-2 border-b border-white/10">
        AI Projects & Builds
      </motion.div>
      <div className="space-y-0">
        {aiProjects.map((item, i) => (
          <motion.div
            key={i}
            {...fadeIn(0.15 + i * 0.05)}
            className="flex gap-4 py-3 pl-3 -ml-3 rounded-lg relative cursor-default transition-all duration-200 hover:bg-white/5 hover:pl-5 group"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="absolute left-0 top-[12px] bottom-[12px] w-[3px] rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="text-[11px] text-stone-500 font-mono w-[36px] shrink-0 pt-[2px]">{item.year}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-stone-100 font-semibold leading-snug">{item.title}</div>
              <div className="text-[12px] text-stone-400 mt-0.5 leading-relaxed inline">
                {item.detail}
                {item.tags.map((tag, ti) => (
                  <span
                    key={ti}
                    className="text-[10px] font-mono font-medium tracking-[0.08em] uppercase px-2 py-0.5 rounded ml-1.5 inline-block align-middle"
                    style={{ color: tag.color, background: tag.bg }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional Achievements */}
      <motion.div {...fadeIn(0.5)} className="text-[11px] text-stone-500 uppercase tracking-[0.2em] font-mono mt-8 mb-3 pb-2 border-b border-white/10">
        Additional Achievements
      </motion.div>
      <div className="space-y-0">
        {additionalAchievements.map((item, i) => (
          <motion.div
            key={i}
            {...fadeIn(0.55 + i * 0.05)}
            className="flex gap-4 py-3 pl-3 -ml-3 rounded-lg relative cursor-default transition-all duration-200 hover:bg-white/5 hover:pl-5 group"
            style={{ borderBottom: i < additionalAchievements.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}
          >
            <div className="absolute left-0 top-[12px] bottom-[12px] w-[3px] rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            <span className="text-[11px] text-stone-500 font-mono w-[36px] shrink-0 pt-[2px]">{item.year}</span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] text-stone-100 font-semibold leading-snug">{item.title}</div>
              <div className="text-[12px] text-stone-400 mt-0.5">{item.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export const randomIdeas = [
  "Automate a flaky deploy step you keep redoing",
  "Visualize your cluster's pod restarts over the week",
  "Turn an outage runbook into a one-click script",
  "Build a tiny dashboard for SLO budget burn",
  "Write a Terraform module for the resource you spin up most",
  "Generate a daily reliability check report",
  "Design a Grafana panel that surfaces real signals",
  "Turn screenshots of incidents into post-mortems",
  "Create a map of service dependencies",
  "Visualize how latency drifts after each deploy",
  "Build a tool that turns alerts into actionable steps",
  "Generate a random chaos-engineering exercise",
  "Turn unfinished automation scripts into Helm charts",
  "Build a tiny CLI that makes daily ops easier",
  "Turn ad-hoc kubectl commands into reusable scripts",
  "Generate a new infrastructure constraint every day",
  "Visualize how cost evolves with traffic",
  "Turn shell snippets into reusable functions",
  "Build a playful CI status notifier",
  "Turn outages into reliability experiments",
  "Create an on-call calmness dashboard",
  "Turn release notes into a visual archive",
  "Generate a daily DevOps challenge",
  "Turn pod logs into searchable patterns",
  "Build a tiny AI assistant for kubectl commands",
  "Turn your services into a branching dependency tree",
  "Create a visual diary of experiments",
  "Generate weird CI pipeline ideas",
  "Turn random metrics into reliability scores",
  "Build a tiny automation engine",
  "Visualize your energy throughout the on-call shift",
  "Turn metrics into generative visuals",
  "Build a random IaC prototype generator",
  "Turn DevOps principles into a game",
  "Create a map of unfinished automation projects",
  "Turn daily observations into reliability ideas",
  "Generate a tool that simplifies something annoying",
  "Turn random YAML into Helm templates",
  "Build a curiosity playground for cloud labs",
  "Turn everyday ops tasks into automations",
  "Generate an idea worth prototyping today",
  "Turn AI prompts into infrastructure experiments",
  "Create a tiny tool that sparks reliability",
  "Turn boredom into a chaos-engineering experiment",
  "Build something weird just to see what happens",
  "Turn inspiration into runnable code",
  "Create a random DevOps lab",
  "Turn a simple idea into a deploy in one hour",
  "Build a tool that visualizes infra imagination",
  "Generate an idea you would never normally try",
];

export const ideaFrequency = [2, 5, 3, 7, 4, 8, 6, 9, 5, 7, 3, 6];

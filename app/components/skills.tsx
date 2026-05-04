"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTilt } from "./use-tilt";

type Skill = {
  name: string;
  iconSrc?: string;
};

type Category = {
  title: string;
  caption: string;
  accent: string;
  skills: Skill[];
};

const ICON = (slug: string, color = "FFFFFF") =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

const AWS_ICON =
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg";

const categories: Category[] = [
  {
    title: "Cloud",
    caption: "AWS first",
    accent: "#FF9900",
    skills: [
      { name: "AWS", iconSrc: AWS_ICON },
      { name: "EC2" },
      { name: "S3" },
      { name: "EKS" },
      { name: "ECS" },
      { name: "IAM" },
      { name: "VPC" },
      { name: "ELB / ALB / NLB" },
      { name: "Auto Scaling" },
    ],
  },
  {
    title: "Containers & Orchestration",
    caption: "pods, charts, meshes",
    accent: "#326CE5",
    skills: [
      { name: "Kubernetes", iconSrc: ICON("kubernetes") },
      { name: "Docker", iconSrc: ICON("docker") },
      { name: "Helm", iconSrc: ICON("helm") },
      { name: "Istio" },
      { name: "ArgoCD", iconSrc: ICON("argo") },
      { name: "Rancher", iconSrc: ICON("rancher") },
      { name: "RKE" },
    ],
  },
  {
    title: "CI/CD & IaC",
    caption: "pipelines + automation",
    accent: "#7B42BC",
    skills: [
      { name: "Jenkins", iconSrc: ICON("jenkins") },
      { name: "GitHub Actions", iconSrc: ICON("githubactions") },
      { name: "GitLab CI/CD", iconSrc: ICON("gitlab") },
      { name: "Bitbucket Pipelines", iconSrc: ICON("bitbucket") },
      { name: "Terraform", iconSrc: ICON("terraform") },
      { name: "Ansible", iconSrc: ICON("ansible") },
      { name: "Flyway" },
      { name: "Shell / Bash", iconSrc: ICON("gnubash") },
    ],
  },
  {
    title: "Observability",
    caption: "metrics, logs, alerts",
    accent: "#F46800",
    skills: [
      { name: "Grafana", iconSrc: ICON("grafana") },
      { name: "Loki" },
      { name: "Prometheus", iconSrc: ICON("prometheus") },
    ],
  },
  {
    title: "OS & Scripting",
    caption: "hands-on linux",
    accent: "#FCC624",
    skills: [
      { name: "Linux", iconSrc: ICON("linux", "FCC624") },
      { name: "Bash", iconSrc: ICON("gnubash") },
      { name: "Shell scripting" },
      { name: "System tuning" },
    ],
  },
  {
    title: "Source & Data",
    caption: "version control + storage",
    accent: "#10B981",
    skills: [
      { name: "Git", iconSrc: ICON("git") },
      { name: "GitHub", iconSrc: ICON("github") },
      { name: "GitLab", iconSrc: ICON("gitlab") },
      { name: "MySQL", iconSrc: ICON("mysql") },
    ],
  },
  {
    title: "Practices",
    caption: "how I work",
    accent: "#22D3EE",
    skills: [
      { name: "Agile" },
      { name: "DevOps best practices" },
      { name: "Microservices" },
      { name: "On-call & incident response" },
      { name: "SLO / SLI driven" },
    ],
  },
  {
    title: "Community",
    caption: "where I show up",
    accent: "#FF9900",
    skills: [
      { name: "UG Lead · AWS UG Trivandrum", iconSrc: AWS_ICON },
      { name: "AWS Community Builder" },
      { name: "Meetups & talks" },
      { name: "Hands-on workshops" },
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full px-4 lg:px-6 pt-12 pb-20 scroll-mt-16"
    >
      <div className="mx-auto max-w-[1100px]">
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
            animationDelay: "1.3s",
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
                ~/farzan/skills.yaml
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* Content */}
          <div className="relative px-5 py-8 md:px-10 md:py-10">
            {/* Section caption */}
            <div className="flex items-center gap-2 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
                $ cat skills.yaml | yq
              </p>
            </div>

            {/* Categories grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((cat, i) => (
                <CategoryCard key={cat.title} cat={cat} index={i} />
              ))}
            </div>

            {/* Footer line */}
            <div className="mt-10 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-stone-500">
              <span>
                <span className="text-emerald-400">$</span> echo &quot;{categories.reduce((n, c) => n + c.skills.length, 0)} tools · always learning&quot;
              </span>
              <span className="opacity-60">v2026.05</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const tilt = useTilt({ max: 8, scale: 1.02 });
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      ref={tilt.ref}
      onMouseEnter={tilt.onMouseEnter}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className="rounded-xl p-4"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(2px)",
        ...tilt.style,
      }}
    >
      <header className="mb-3">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="font-[family-name:var(--font-noto)] text-stone-100 text-[14px] font-semibold leading-tight">
            {cat.title}
          </h3>
          <span
            className="font-mono text-[9px] tracking-[0.1em] px-2 py-0.5 rounded-full lowercase"
            style={{
              color: cat.accent,
              background: `${cat.accent}1a`,
            }}
          >
            {cat.caption}
          </span>
        </div>
        <div
          className="mt-2.5 h-px w-full"
          style={{
            background: `linear-gradient(90deg, ${cat.accent}80 0%, transparent 100%)`,
          }}
        />
      </header>

      <ul className="flex flex-wrap gap-1.5">
        {cat.skills.map((skill) => (
          <li key={skill.name}>
            <span
              className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md font-mono text-[10.5px] text-stone-200 transition-colors duration-200 hover:text-white"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${cat.accent}33`,
              }}
            >
              {skill.iconSrc && (
                <img
                  src={skill.iconSrc}
                  alt=""
                  className="w-[12px] h-[12px]"
                  draggable={false}
                  loading="lazy"
                />
              )}
              {skill.name}
            </span>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

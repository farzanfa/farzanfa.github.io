"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/lib/siteConfig";
import { renderBold } from "@/lib/renderBold";
import { DesktopWidgets } from "./desktop-widgets";
import { RecentStatus } from "./recents";
import { Garden } from "./garden";
import {
  PreviewProjectsAtWork,
  PreviewBuildingWithAI,
  PreviewCommunityImpact,
  PreviewSideProjects,
  PreviewLearningGrowth,
} from "./folder-previews";

const folderColors = [
  { bg: "#8EB4CE", tab: "#7EA4BE", label: "white" },
  { bg: "#DEBB8E", tab: "#CEAB7E", label: "white" },
  { bg: "#8DC4AB", tab: "#7DB49B", label: "white" },
  { bg: "#E09D98", tab: "#D08D88", label: "white" },
  { bg: "#B09AD0", tab: "#A08AC0", label: "white" },
];

const folderIcons = [
  "/folder-icon-work.svg",
  "/folder-icon-ai.svg",
  "/folder-icon-community.svg",
  "/folder-icon-lens.svg",
  "/folder-icon-sketch.svg",
];

const folderContent = [
  {
    title: "Projects at Work",
    description: "From **EKS cluster operations** to **Istio service mesh** and **Terraform-driven infrastructure**, I turn brittle deployments into reliable, observable systems—planning zero-downtime upgrades and shipping production changes safely.\n\nI also lead CI/CD pipeline work with GitHub Actions and Jenkins, microservices build optimization, and day-to-day monitoring across staging and production environments at JIFFY.ai and Nubinix Technologies.",
    note: "Feel free to reach out if you'd like to hear more about what I'm working on.",
  },
  {
    title: "Building with AI and beyond",
    description: "Experimenting and building with cloud + AI tools — prototyping ideas quickly and shipping projects along the way.\n\nHighlights include **AWS Transcribe Medical with Go**, a real-time medical transcription system using Amazon Transcribe Medical, WebSockets, S3, Terraform, and Docker, and contributing reliability tooling that streamlines microservice delivery.",
    cta: { label: "Projects on GitHub", url: "https://github.com/farzanfa" },
  },
  {
    title: "Community Impact",
    description: "Currently leading the **AWS Users Group Trivandrum** — organizing meetups, talks, and hands-on workshops to grow the local cloud community.\n\nLong-time community builder: **Co-Founder of EdgyHack** (4+ years) and **Sport On Media**, **Hack Club Lead**, **Meta Developer Circle: Kochi** event coordinator (5+ years), and **AngelHack Ambassador**.\n\nIf you build with AWS in Kerala — come say hi.",
    cta: [
      { label: "awsugtrivandrum.in", url: "https://awsugtrivandrum.in" },
      { label: "Connect on LinkedIn", url: "https://www.linkedin.com/in/farzanfa" },
    ],
  },
  {
    title: "Side Projects",
    description: "Building outside of work helps me stay sharp and explore new technologies.\n\n**Mailweaver** is a bulk email web app I built with Gmail OAuth integration, CSV-based personalization, smart recipient management, and real-time tracking for reliable outreach.",
    cta: { label: "Projects on GitHub", url: "https://github.com/farzanfa" },
  },
  {
    title: "Learning & Growth",
    description: "Continuous learning is at the core of staying effective in DevOps and SRE work. I invest time in cloud, container, and platform skills through hands-on labs and certifications.\n\nCompleted the **DevOps, Cloud, And Agile Foundations Specialization**, **Kubernetes for the Absolute Beginners**, and **Technical Support Fundamentals** — plus **21 Google Cloud skill badges**. BTech in Computer Science from Toc H Institute of Science & Technology (2017–2022).",
    cta: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/farzanfa" },
      { label: "GitHub", url: "https://github.com/farzanfa" },
    ],
  },
];

const sidebarItems = [
  { id: "farzan", label: "Projects", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { id: "desktop", label: "Snapshot", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { id: "recents", label: "Achievements", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2196F3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { id: "garden", label: "Garden", icon: <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#2196F3" }}>psychiatry</span> },
];

function FolderIcon({ color, title, onClick, isSelected, icon }: {
  color: typeof folderColors[number];
  title: string;
  onClick: () => void;
  isSelected: boolean;
  icon: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-2.5 group cursor-pointer w-[100px]"
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative w-[96px] h-[80px]" style={{
        filter: isSelected ? `drop-shadow(0 2px 8px ${color.bg}66)` : "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
        perspective: "200px",
      }}>
        <svg viewBox="0 0 96 80" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="12" width="96" height="68" rx="8" fill={color.tab} />
          <path
            d="M0 20 C0 14.5, 4.5 10, 10 10 L32 10 Q36 10, 38 6 Q40 2, 44 2 L86 2 Q94 2, 96 10 L96 20 L0 20 Z"
            fill={color.tab}
          />
        </svg>
        {/* Inner "papers" visible when folder opens */}
        <div
          className="absolute left-[6px] right-[6px] bottom-[6px] h-[50px] rounded-[4px] transition-opacity duration-200"
          style={{
            background: "rgba(255,255,255,0.5)",
            opacity: hovered ? 1 : 0,
          }}
        />
        {/* Front panel — tilts up on hover */}
        <motion.div
          className="absolute left-[1px] right-[1px] bottom-[1px] h-[62px] rounded-[7px]"
          style={{
            backgroundColor: color.bg,
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.06)",
            transformOrigin: "bottom center",
          }}
          animate={{
            rotateX: hovered ? -18 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <img
            src={icon}
            alt=""
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] object-contain pointer-events-none"
            style={{ filter: "brightness(0) saturate(0)", opacity: 0.1, mixBlendMode: "multiply" }}
          />
        </motion.div>
      </div>
      <span className={`text-[11px] leading-tight text-center whitespace-nowrap min-h-[28px] transition-colors duration-200 ${
        isSelected ? "text-stone-100 font-medium" : "text-stone-400 group-hover:text-stone-200"
      }`}>
        {title}
      </span>
    </motion.button>
  );
}

function FolderSideSheet({ folderIndex, onClose, onNavigate }: {
  folderIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const content = folderContent[folderIndex];
  const color = folderColors[folderIndex];
  const icon = folderIcons[folderIndex];
  const nextIndex = (folderIndex + 1) % folderContent.length;
  const dirRef = useRef(1);
  const prevIndexRef = useRef(folderIndex);
  if (folderIndex !== prevIndexRef.current) {
    dirRef.current = folderIndex > prevIndexRef.current ? 1 : -1;
    prevIndexRef.current = folderIndex;
  }

  return (
    <motion.div
      className="absolute inset-0 z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="absolute inset-0 backdrop-blur-sm bg-black/40 cursor-pointer"
        onClick={onClose}
      />
      <motion.div
        className="absolute top-0 right-0 z-20 h-full w-[480px] shadow-xl overflow-hidden rounded-l-xl"
        style={{
          background:
            "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
        }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05] rounded-l-xl overflow-hidden"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div
          className="relative flex items-center justify-between px-5 py-3 border-b z-10"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: `${color.bg}1a`,
          }}
        >
          <div className="flex items-center gap-2.5">
            <img src={icon} alt="" className="w-5 h-5 object-contain" style={{ filter: `brightness(0) invert(1) opacity(0.7)` }} />
            <span className="text-[14px] text-stone-100 font-medium">
              {content.title}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="relative h-[calc(100%-45px)] overflow-hidden">
          <AnimatePresence initial={false} custom={dirRef.current}>
            <motion.div
              key={folderIndex}
              custom={dirRef.current}
              initial="enter"
              animate="center"
              exit="exit"
              variants={{
                enter: (dir: number) => ({ x: dir * -480 }),
                center: { x: 0 },
                exit: (dir: number) => ({ x: dir * 480 }),
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{ position: "absolute", top: 0, left: 0, right: 0 }}
            >
              <div className="relative w-full h-[260px]">
                {folderIndex === 0 ? (
                  <PreviewProjectsAtWork />
                ) : folderIndex === 1 ? (
                  <PreviewBuildingWithAI />
                ) : folderIndex === 2 ? (
                  <PreviewCommunityImpact />
                ) : folderIndex === 3 ? (
                  <PreviewSideProjects />
                ) : (
                  <PreviewLearningGrowth />
                )}
              </div>

              <div className="relative p-5 space-y-4">
                {content.description.split("\n\n").map((para, i) => (
                  <p key={i} className="text-stone-300 leading-relaxed text-[14px]">
                    {renderBold(para)}
                  </p>
                ))}
                {"note" in content && content.note && (
                  <p className="text-stone-400 italic text-[13px] leading-relaxed">
                    {content.note}
                  </p>
                )}
                {content.cta && (
                  <div className="flex gap-4">
                    {(Array.isArray(content.cta) ? content.cta : [content.cta]).map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-[13px] px-4 py-1.5 rounded-md border border-white/15 text-stone-200 hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="absolute bottom-4 right-5 flex items-center gap-3 z-10">
          {folderIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(folderIndex - 1); }}
              className="flex items-center gap-1 text-[13px] text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span>Back</span>
            </button>
          )}
          {folderIndex < folderContent.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); onNavigate(folderIndex + 1); }}
              className="flex items-center gap-1 text-[13px] text-stone-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Next</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function LockNotification({ onUnlock }: { onUnlock: () => void }) {
  return (
    <motion.div
      className="absolute inset-0 z-20 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-white/60 px-6 py-5 w-[340px] text-center"
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.97 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
      >
        <div className="flex justify-center mb-3">
          <div className="bg-stone-100 rounded-full px-3 py-1.5 flex items-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-500 bell-shake">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
          </div>
        </div>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-stone-500 mb-1.5">Reminder</p>
        <p className="text-[14px] text-stone-700 leading-snug mb-4">
          Tools evolve. Curiosity stays.<br />Small steps move things forward.
        </p>
        <div className="flex border-t border-stone-200">
          <button
            onClick={onUnlock}
            className="flex-1 py-2.5 text-[14px] text-blue-500 font-medium hover:bg-stone-50 transition-colors border-r border-stone-200 rounded-bl-2xl"
          >
            Okay!
          </button>
          <button
            onClick={onUnlock}
            className="flex-1 py-2.5 text-[14px] text-blue-500 font-medium hover:bg-stone-50 transition-colors rounded-br-2xl"
          >
            Got it!
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function FolderWindowContent() {
  const [openFolder, setOpenFolder] = useState<number | null>(null);
  const [unlocked, setUnlocked] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("farzan");
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  return (
    <div className="flex justify-center px-4 lg:px-0">
      <div className="w-[calc(100vw-32px)] lg:w-full max-w-[1200px] font-[family-name:var(--font-noto)]">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(160deg, #1f1f24 0%, #18181b 50%, #0f0f12 100%)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow:
              "0 16px 40px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Subtle dotted texture */}
          <div
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.05]"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div
            className="relative z-[2] flex items-center gap-2 px-4 py-2.5 border-b"
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
                ~/farzan/{{ farzan: "project", desktop: "snapshot", garden: "garden", recents: "achievements" }[activeSidebar] || activeSidebar}
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* Mobile top tabs */}
          <div
            className="relative z-[2] lg:hidden flex border-b"
            style={{
              borderColor: "rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.02)",
            }}
          >
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSidebar(item.id); setOpenFolder(null); }}
                className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-2 text-[11px] cursor-pointer transition-colors ${
                  activeSidebar === item.id
                    ? "bg-white/10 text-stone-100 font-medium"
                    : "text-stone-400"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <div className="relative z-[2] h-[500px] lg:h-[700px] lg:min-w-[1200px] overflow-hidden flex w-full">
            {/* Desktop sidebar */}
            <div
              className="hidden lg:block w-[170px] shrink-0 backdrop-blur-sm border-r py-3 px-2"
              style={{
                borderColor: "rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.02)",
              }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-500 px-2 mb-2">
                Favorites
              </p>
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveSidebar(item.id); setOpenFolder(null); }}
                  className={`w-full flex items-center gap-2 px-2 py-[5px] rounded-md text-[12px] text-left cursor-pointer transition-colors ${
                    activeSidebar === item.id
                      ? "bg-white/10 text-stone-100"
                      : "text-stone-400 hover:bg-white/5 hover:text-stone-200"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="relative flex-1 min-h-[500px] lg:min-h-[700px] overflow-hidden min-w-0 w-full">
              <AnimatePresence>
                {!unlocked && (
                  <motion.div
                    className="absolute inset-0 z-10 backdrop-blur-md bg-black/40"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {!unlocked && (
                  <LockNotification onUnlock={() => setUnlocked(true)} />
                )}
              </AnimatePresence>

              <AnimatePresence mode="wait">
                {activeSidebar === "farzan" ? (
                  <motion.div
                    key="farzan"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-full flex"
                  >
                    {/* Left: Folders */}
                    <div
                      className="pt-6 lg:pt-8 pl-4 lg:pl-8 pr-4 lg:pr-6 w-full lg:shrink-0 lg:transition-[width] lg:duration-[350ms] lg:ease-out"
                      style={!isMobile ? { width: openFolder !== null ? 420 : "100%" } : undefined}
                    >
                      <div className={`grid grid-cols-3 ${openFolder !== null ? "lg:grid-cols-3" : "lg:grid-cols-5"} gap-x-4 lg:gap-x-10 gap-y-4 lg:gap-y-6 content-start w-fit`}>
                        {siteConfig.sections.map((section, i) => (
                          <FolderIcon
                            key={section.id}
                            color={folderColors[i]}
                            title={section.title}
                            icon={folderIcons[i]}
                            isSelected={openFolder === i}
                            onClick={() => setOpenFolder(openFolder === i ? null : i)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Right: Content preview */}
                    <AnimatePresence>
                      {openFolder !== null && (
                        <motion.div
                          key="preview"
                          className="absolute lg:relative inset-0 lg:inset-auto border-l-0 lg:border-l h-full lg:h-[700px] w-full lg:w-[580px] shrink-0 ml-auto flex flex-col z-10"
                          initial={{ opacity: 0, x: 40 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 40 }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                          style={{
                            backgroundColor: "#0f0f12",
                            borderLeftColor: "rgba(255,255,255,0.06)",
                          }}
                        >
                          <button
                            onClick={() => setOpenFolder(null)}
                            className="absolute top-2 right-2 z-10 w-6 h-6 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                          <div className="flex-1 overflow-y-auto">
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={openFolder}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                              >
                                <div className="relative w-full aspect-video lg:aspect-auto lg:h-[340px] overflow-hidden">
                                  {openFolder === 0 ? (
                                    <PreviewProjectsAtWork />
                                  ) : openFolder === 1 ? (
                                    <PreviewBuildingWithAI />
                                  ) : openFolder === 2 ? (
                                    <PreviewCommunityImpact />
                                  ) : openFolder === 3 ? (
                                    <PreviewSideProjects />
                                  ) : (
                                    <PreviewLearningGrowth />
                                  )}
                                </div>
                                <div className="p-5 space-y-4">
                                  <h3 className="text-[16px] font-medium text-stone-100">{folderContent[openFolder].title}</h3>
                                  {folderContent[openFolder].description.split("\n\n").map((para, i) => (
                                    <p key={i} className="text-stone-300 leading-relaxed text-[14px]">
                                      {renderBold(para)}
                                    </p>
                                  ))}
                                  {"note" in folderContent[openFolder] && folderContent[openFolder].note && (
                                    <p className="text-stone-400 italic text-[13px] leading-relaxed">
                                      {folderContent[openFolder].note}
                                    </p>
                                  )}
                                  {folderContent[openFolder]?.cta && (() => {
                                    const cta = folderContent[openFolder].cta;
                                    const links = Array.isArray(cta) ? cta.flat() : [cta];
                                    return (
                                      <div className="flex gap-4 flex-wrap pt-2">
                                        {links.map((link, li) => (
                                          <a
                                            key={li}
                                            href={(link as {label: string; url: string}).url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-[13px] px-4 py-1.5 rounded-md border border-white/15 text-stone-200 hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors"
                                          >
                                            {(link as {label: string; url: string}).label}
                                          </a>
                                        ))}
                                      </div>
                                    );
                                  })()}
                                </div>
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : activeSidebar === "desktop" ? (
                  <motion.div
                    key="desktop"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-auto lg:h-[700px] overflow-hidden origin-top-left"
                  >
                    <DesktopWidgets isMobile={isMobile} />
                  </motion.div>
                ) : activeSidebar === "recents" ? (
                  <motion.div
                    key="recents"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[500px] lg:h-[700px] overflow-y-auto origin-top-left"
                  >
                    <RecentStatus />
                  </motion.div>
                ) : activeSidebar === "garden" ? (
                  <motion.div
                    key="garden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[500px] lg:h-[700px] overflow-hidden"
                  >
                    <Garden isMobile={isMobile} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="h-[700px]"
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PortfolioViewer() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  React.useEffect(() => { setIsMobileView(window.innerWidth < 1024); }, []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [2, 0]);

  return (
    <section
      ref={ref}
      id="work"
      className="flex flex-col items-center px-0 lg:px-6 pt-20 lg:pt-52 pb-12 overflow-hidden lg:overflow-visible scroll-mt-16"
      style={!isMobileView ? { scrollMarginTop: "-180px" } : undefined}
    >
      <motion.div style={{ y, scale, rotate }}>
        <FolderWindowContent />
      </motion.div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTilt } from "./use-tilt";

type Channel = {
  key: string;
  label: string;
  href: string;
  display: string;
  copy?: string;
  accent: string;
  icon: React.ReactNode;
  external?: boolean;
};

const channels: Channel[] = [
  {
    key: "email",
    label: "email",
    href: "mailto:hello@farzanfa.com",
    display: "hello@farzanfa.com",
    copy: "hello@farzanfa.com",
    accent: "#10B981",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "linkedin",
    href: "https://www.linkedin.com/in/farzanfa",
    display: "/in/farzanfa",
    copy: "https://www.linkedin.com/in/farzanfa",
    accent: "#0A66C2",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "github",
    label: "github",
    href: "https://github.com/farzanfa",
    display: "/farzanfa",
    copy: "https://github.com/farzanfa",
    accent: "#A78BFA",
    external: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[14px] h-[14px]">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    key: "phone",
    label: "phone",
    href: "tel:+918714817223",
    display: "+91 8714 817 223",
    copy: "+918714817223",
    accent: "#F59E0B",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.7 3.05a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l2.03-2.03a2 2 0 0 1 2.11-.45c.98.33 2 .57 3.05.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
  },
];

const meta = [
  { key: "location", value: "Trivandrum, Kerala, India", color: "#FC6D26" },
  { key: "timezone", value: "IST · UTC+05:30", color: "#326CE5" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full px-4 lg:px-6 pt-12 pb-20 scroll-mt-16"
    >
      <div className="mx-auto max-w-[820px]">
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
            animationDelay: "2.6s",
          }}
        >
          {/* dotted texture */}
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
                ~/farzan/contact.yaml
              </span>
            </div>
            <div className="w-[52px]" />
          </div>

          {/* Content */}
          <div className="relative px-5 py-7 md:px-8 md:py-9">
            {/* Terminal command */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)] animate-pulse" />
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
                $ cat contact.yaml
              </p>
              <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(16,185,129,0.12)",
                  color: "#6ee7b7",
                  border: "1px solid rgba(16,185,129,0.25)",
                }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                available
              </span>
            </div>

            {/* YAML-style channel list */}
            <ul className="space-y-1.5">
              {channels.map((ch) => (
                <ChannelRow key={ch.key} ch={ch} />
              ))}

              {/* Meta rows (location, timezone — non-interactive) */}
              {meta.map((m) => (
                <li
                  key={m.key}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                    style={{
                      background: `${m.color}1a`,
                      border: `1px solid ${m.color}33`,
                      color: m.color,
                    }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
                      {m.key === "location" ? (
                        <>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </>
                      ) : (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </>
                      )}
                    </svg>
                  </div>
                  <span className="font-mono text-[12px] text-stone-500 w-[80px] shrink-0">
                    {m.key}:
                  </span>
                  <span className="font-mono text-[12.5px] text-stone-200">
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>

            {/* Action buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="mailto:hello@farzanfa.com"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-[12px] text-stone-100 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(16,185,129,0.18) 0%, rgba(16,185,129,0.08) 100%)",
                  border: "1px solid rgba(16,185,129,0.35)",
                  boxShadow: "0 4px 12px rgba(16,185,129,0.15)",
                }}
              >
                <span className="text-emerald-400">$</span>
                <span>send message</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px] transition-transform duration-200 group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/farzanfa"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-mono text-[12px] text-stone-200 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/[0.06]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[12px] h-[12px]">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>connect on linkedin</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px] transition-transform duration-200 group-hover:translate-x-1">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>

            {/* Footer */}
            <div className="mt-7 pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[10px] text-stone-500">
              <span>
                <span className="text-emerald-400">$</span> echo &quot;open dm · fast reply&quot;
              </span>
              <span className="opacity-60">replies usually within 24h</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ChannelRow({ ch }: { ch: Channel }) {
  const [copied, setCopied] = useState(false);
  const tilt = useTilt({ max: 5, scale: 1.015 });

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!ch.copy) return;
    try {
      await navigator.clipboard.writeText(ch.copy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — clipboard may be unavailable
    }
  };

  return (
    <li>
      <a
        href={ch.href}
        target={ch.external ? "_blank" : undefined}
        rel={ch.external ? "noopener noreferrer" : undefined}
        ref={tilt.ref as React.RefObject<HTMLAnchorElement>}
        onMouseEnter={tilt.onMouseEnter}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/[0.04]"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
          ...tilt.style,
        }}
      >
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
          style={{
            background: `${ch.accent}1a`,
            border: `1px solid ${ch.accent}33`,
            color: ch.accent,
          }}
        >
          {ch.icon}
        </div>
        <span className="font-mono text-[12px] text-stone-500 w-[80px] shrink-0">
          {ch.label}:
        </span>
        <span className="font-mono text-[12.5px] text-stone-200 truncate flex-1">
          {ch.display}
        </span>
        {ch.copy && (
          <button
            onClick={handleCopy}
            className="shrink-0 font-mono text-[9px] uppercase tracking-[0.15em] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white/10"
            style={{
              color: copied ? "#6ee7b7" : "#a8a29e",
              border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.12)"}`,
            }}
            aria-label={`Copy ${ch.label}`}
          >
            {copied ? "copied" : "copy"}
          </button>
        )}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px] text-stone-500 shrink-0 transition-all duration-200 group-hover:text-stone-200 group-hover:translate-x-0.5">
          {ch.external ? (
            <>
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </>
          ) : (
            <>
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </>
          )}
        </svg>
      </a>
    </li>
  );
}

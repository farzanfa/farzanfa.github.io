"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useTransform, useMotionValueEvent, useMotionValue, AnimatePresence } from "framer-motion";
import { ClickBurst } from "./click-burst";
import { BULLETIN_CARDS } from "./bulletin-cards";

/* ── Board pin data — order matches BULLETIN_CARDS ── */
const BOARD_IMAGES = [
  { top: "1%",  left: "8%",  rotate: "-5deg", w: 240, z: 1, side: "left"  as const, startVY: 0.1,  label: "EKS cluster topology (Kubernetes)" },
  { top: "3%",  left: "32%", rotate: "-2deg", w: 250, z: 1, side: "left"  as const, startVY: 0.05, label: "Istio service mesh dashboard" },
  { top: "4%",  left: "55%", rotate: "3deg",  w: 230, z: 1, side: "right" as const, startVY: 0.15, label: "Terraform infrastructure modules" },
  { top: "2%",  left: "80%", rotate: "6deg",  w: 235, z: 1, side: "right" as const, startVY: 0.2,  label: "GitHub Actions CI/CD pipelines" },
  { top: "30%", left: "2%",  rotate: "4deg",  w: 230, z: 1, side: "left"  as const, startVY: 0.4,  label: "AWS Transcribe Medical (Go)" },
  { top: "28%", left: "26%", rotate: "6deg",  w: 250, z: 3, side: "right" as const, startVY: 0.35, label: "Mailweaver — bulk email web app" },
  { top: "33%", left: "52%", rotate: "2deg",  w: 280, z: 1, side: "right" as const, startVY: 0.45, label: "Grafana + Loki observability stack" },
  { top: "30%", left: "78%", rotate: "-4deg", w: 250, z: 1, side: "right" as const, startVY: 0.5,  label: "Jenkins + Flyway release pipeline" },
  { top: "72%", left: "5%",  rotate: "-3deg", w: 240, z: 1, side: "left"  as const, startVY: 0.7,  label: "Docker microservice templates" },
  { top: "70%", left: "32%", rotate: "-3deg", w: 250, z: 1, side: "right" as const, startVY: 0.7,  label: "Rancher cluster management" },
  { top: "70%", left: "63%", rotate: "5deg",  w: 270, z: 2, side: "right" as const, startVY: 0.65, label: "ArgoCD GitOps workflow" },
];

/* ── ScatterImage — scroll-driven fly-in ── */
function ScatterImage({
  img,
  index,
  scrollYProgress,
  landed,
  arrowVisible,
  imgZIndex,
  setImgZIndex,
  zCounterRef,
  setBursts,
}: {
  img: typeof BOARD_IMAGES[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  landed: boolean;
  arrowVisible: boolean;
  imgZIndex: number[];
  setImgZIndex: React.Dispatch<React.SetStateAction<number[]>>;
  zCounterRef: React.MutableRefObject<number>;
  setBursts: React.Dispatch<React.SetStateAction<{ id: number; x: number; y: number }[]>>;
}) {
  const sideIndex = BOARD_IMAGES.slice(0, index).filter(b => b.side === img.side).length;

  const BOARD_W = 972;
  const BOARD_H = 578;
  const stackCenterX = img.side === "left" ? BOARD_W * 0.0 : BOARD_W * 0.85;
  const stackCenterY = -BOARD_H * 0.85;

  const finalX = parseFloat(img.left) / 100 * BOARD_W;
  const finalY = parseFloat(img.top) / 100 * BOARD_H;

  const jitterL = [0, 30, -20, 15, -10, 25, -15, 20, -25, 10];
  const jitterR = [0, -30, 20, -15, 10, -25, 15, -20, 25, -10];
  const spreadX = img.side === "left"
    ? (sideIndex - 2) * 50 + (jitterL[sideIndex] ?? 0)
    : (sideIndex - 2) * -50 + (jitterR[sideIndex] ?? 0);
  const spreadY = sideIndex * 70;

  const startX = (stackCenterX + spreadX) - finalX;
  const startY = (stackCenterY + spreadY) - finalY;

  const moveStart = 0.3;
  const moveEnd = 0.85;

  const scrollX = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startX, startX, 0]);
  const scrollY = useTransform(scrollYProgress, [0, moveStart, moveEnd], [startY, startY, 0]);
  const scrollOpacity = useTransform(scrollYProgress, [0.25, 0.45, 0.85, 1], [0, 1, 1, 1]);

  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const imgRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const cachedRect = useRef<DOMRect | null>(null);
  const tiltRaf = useRef<number | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    zCounterRef.current += 1;
    setImgZIndex((prev) => { const next = [...prev]; next[index] = zCounterRef.current; return next; });
    if (imgRef.current) cachedRect.current = imgRef.current.getBoundingClientRect();
  }, [index, setImgZIndex, zCounterRef]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cachedRect.current;
    if (!rect) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (tooltipRef.current) {
      tooltipRef.current.style.transform = `translate3d(${clientX + 14}px, ${clientY + 14}px, 0)`;
    }
    if (tiltRaf.current != null) return;
    tiltRaf.current = requestAnimationFrame(() => {
      tiltRaf.current = null;
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: -y * 20, rotateY: x * 20 });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (tiltRaf.current != null) { cancelAnimationFrame(tiltRaf.current); tiltRaf.current = null; }
    setTilt({ rotateX: 0, rotateY: 0 });
    setHovered(false);
    cachedRect.current = null;
  }, []);

  useEffect(() => () => {
    if (tiltRaf.current != null) cancelAnimationFrame(tiltRaf.current);
  }, []);

  return (
    <motion.div
      ref={imgRef}
      drag={landed}
      dragMomentum={false}
      whileDrag={{ scale: 1.08 }}
      onDragStart={() => {
        zCounterRef.current += 1;
        setImgZIndex((prev) => { const next = [...prev]; next[index] = zCounterRef.current; return next; });
      }}
      onTap={(e) => {
        const evt = e as unknown as MouseEvent;
        setBursts((prev) => [...prev, { id: Date.now(), x: evt.clientX, y: evt.clientY }]);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute cursor-grab active:cursor-grabbing"
      style={{
        top: img.top,
        left: img.left,
        width: img.w,
        rotate: img.rotate,
        zIndex: imgZIndex[index],
        x: landed ? dragX : scrollX,
        y: landed ? dragY : scrollY,
        opacity: scrollOpacity,
        perspective: 600,
      }}
    >
      <motion.div
        className="w-full"
        animate={{
          rotateX: tilt.rotateX,
          rotateY: tilt.rotateY,
          scale: tilt.rotateX !== 0 || tilt.rotateY !== 0 ? 1.18 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ pointerEvents: landed ? "auto" : "none" }}
      >
        {(() => {
          const Card = BULLETIN_CARDS[index];
          return Card ? <Card /> : null;
        })()}
      </motion.div>
      {/* Cursor tooltip — portaled to body to escape parent transforms */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {hovered && (
            <div
              ref={tooltipRef}
              className="fixed top-0 left-0 pointer-events-none"
              style={{ zIndex: 9999, willChange: "transform" }}
            >
              <motion.div
                className="px-3 py-1.5 rounded-full bg-stone-900 text-white text-[11px] font-[family-name:var(--font-noto)] whitespace-nowrap"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                {img.label}
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}

/* ── ScatterBoard — scroll-tracked wrapper ── */
export function ScatterBoard({
  imgZIndex,
  setImgZIndex,
  zCounterRef,
  setBursts,
  bursts,
  arrowVisible,
}: {
  imgZIndex: number[];
  setImgZIndex: React.Dispatch<React.SetStateAction<number[]>>;
  zCounterRef: React.MutableRefObject<number>;
  setBursts: React.Dispatch<React.SetStateAction<{ id: number; x: number; y: number }[]>>;
  bursts: { id: number; x: number; y: number }[];
  arrowVisible: boolean;
}) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [landed, setLanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const { scrollYProgress } = useScroll({
    target: boardRef,
    offset: ["start end", "center center"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v >= 0.9 && !landed) setLanded(true);
    if (v < 0.85 && landed) setLanded(false);
  });

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  return (
    <>
      <motion.div
        className="w-full flex justify-center px-4 lg:px-6 pt-4 pb-4"
        initial={{ opacity: 0, y: 150, scale: 0.85 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true, margin: "-150px" }}
      >
        <div className="w-[calc(100vw-32px)] lg:w-full max-w-[1200px] board-float">
          <div className="rounded-3xl p-[14px]" style={{
            background:
              "linear-gradient(160deg, #2a2a30 0%, #1f1f24 30%, #18181b 100%)",
            boxShadow:
              "0 16px 40px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(0,0,0,0.4)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
          {/* Header strip — looks like a window/board title bar */}
          <div className="flex items-center gap-2 px-3 pt-1 pb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.7)]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
              ~/farzan/playground · pinboard
            </span>
            <span className="ml-auto font-mono text-[10px] text-stone-500">
              {BOARD_IMAGES.length} pinned
            </span>
          </div>
          <div ref={boardRef} className={`${isMobile ? "min-h-[420px]" : "min-h-[750px]"} rounded-xl relative overflow-hidden`} style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%), linear-gradient(160deg, #18181b 0%, #0f0f12 100%)",
            boxShadow: "inset 0 2px 6px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)",
          }}>
            {/* Subtle dotted texture (white-on-dark instead of warm tan) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.06]" style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }} />
            {/* Coordinates */}
            <div className="absolute top-0 left-0 bottom-0 w-[24px] flex flex-col pointer-events-none select-none">
              {"8.5241°N 76.9366°E".split("").map((ch, i) => (
                <span key={i} className="font-mono text-[9px] text-stone-500 text-center" style={{ height: "29px", lineHeight: "29px" }}>
                  {ch}
                </span>
              ))}
            </div>
            {/* Scaled inner wrapper for mobile */}
            <div
              className="absolute inset-0"
              style={isMobile ? {
                transform: "scale(0.55)",
                transformOrigin: "top left",
                width: `${100 / 0.55}%`,
                height: `${100 / 0.55}%`,
              } : undefined}
            >
            {/* Showcase cards — scatter animation */}
            {BOARD_IMAGES.map((img, i) =>
              isMobile ? (
                <motion.div
                  key={i}
                  drag
                  dragMomentum={false}
                  whileDrag={{ scale: 1.08 }}
                  onDragStart={() => {
                    zCounterRef.current += 1;
                    setImgZIndex((prev) => { const next = [...prev]; next[i] = zCounterRef.current; return next; });
                  }}
                  onTap={(e) => {
                    const evt = e as unknown as MouseEvent;
                    setBursts((prev) => [...prev, { id: Date.now(), x: evt.clientX, y: evt.clientY }]);
                  }}
                  className="absolute cursor-grab active:cursor-grabbing"
                  style={{
                    top: img.top,
                    left: img.left,
                    width: img.w,
                    rotate: img.rotate,
                    zIndex: imgZIndex[i],
                  }}
                >
                  {(() => {
                    const Card = BULLETIN_CARDS[i];
                    return Card ? <Card /> : null;
                  })()}
                </motion.div>
              ) : (
                <ScatterImage
                  key={i}
                  img={img}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  landed={landed}
                  arrowVisible={arrowVisible}
                  imgZIndex={imgZIndex}
                  setImgZIndex={setImgZIndex}
                  zCounterRef={zCounterRef}
                  setBursts={setBursts}
                />
              )
            )}
            </div>
            {/* Click burst particles */}
            {bursts.map((b) => (
              <ClickBurst key={b.id} x={b.x} y={b.y} onDone={() => setBursts((prev) => prev.filter((p) => p.id !== b.id))} />
            ))}
          </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

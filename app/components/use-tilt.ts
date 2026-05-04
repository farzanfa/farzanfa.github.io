"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cursor-tracking 3D tilt — same physics as the Playground pinboard items.
 * Returns refs/handlers + a `style` object you can spread onto a card.
 *
 *   const { ref, style, onMouseEnter, onMouseMove, onMouseLeave } = useTilt({ max: 8 });
 *   <div ref={ref} style={style} onMouseEnter={onMouseEnter} ... />
 */
export function useTilt({ max = 10, scale = 1.02 }: { max?: number; scale?: number } = {}) {
  const ref = useRef<HTMLElement | null>(null);
  const cachedRect = useRef<DOMRect | null>(null);
  const tiltRaf = useRef<number | null>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number; active: boolean }>({
    rx: 0,
    ry: 0,
    active: false,
  });

  const onMouseEnter = useCallback(() => {
    if (ref.current) cachedRect.current = ref.current.getBoundingClientRect();
    setTilt((t) => ({ ...t, active: true }));
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = cachedRect.current;
      if (!rect) return;
      const cx = e.clientX;
      const cy = e.clientY;
      if (tiltRaf.current != null) return;
      tiltRaf.current = requestAnimationFrame(() => {
        tiltRaf.current = null;
        const x = (cx - rect.left) / rect.width - 0.5;
        const y = (cy - rect.top) / rect.height - 0.5;
        setTilt({ rx: -y * max, ry: x * max, active: true });
      });
    },
    [max]
  );

  const onMouseLeave = useCallback(() => {
    if (tiltRaf.current != null) {
      cancelAnimationFrame(tiltRaf.current);
      tiltRaf.current = null;
    }
    cachedRect.current = null;
    setTilt({ rx: 0, ry: 0, active: false });
  }, []);

  useEffect(
    () => () => {
      if (tiltRaf.current != null) cancelAnimationFrame(tiltRaf.current);
    },
    []
  );

  const style: React.CSSProperties = {
    transform: `perspective(700px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${tilt.active ? scale : 1})`,
    transformStyle: "preserve-3d",
    transition: tilt.active
      ? "transform 0.12s ease-out"
      : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
    willChange: "transform",
  };

  return { ref, style, onMouseEnter, onMouseMove, onMouseLeave };
}

"use client";

import React from "react";
import { motion } from "framer-motion";

export function RippedPaperNote() {
  return (
    <motion.div
      className="w-full flex justify-center px-6 -mt-14 pb-8"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="relative select-none" style={{ transform: "rotate(2deg)" }}>
        {/* Sticky note SVG as background */}
        <div
          className="relative w-[420px] md:w-[520px]"
          style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.12)) drop-shadow(0 2px 4px rgba(0,0,0,0.08))" }}
        >
          <img
            src="/sticky-notes.svg"
            alt=""
            className="w-full h-auto block"
            draggable={false}
          />

          {/* Text overlay */}
          <div className="absolute inset-0">
            <div className="relative z-10 px-9 md:px-11 pt-[15%] pb-[6%]">
              <p
                className="text-left text-[14px] md:text-[15px] text-stone-600 leading-[1.7] tracking-[0.03em] font-[family-name:var(--font-noto)]"
              >
                <span className="font-semibold text-stone-800">SRE @ JIFFY.ai</span> &middot; <span className="font-semibold text-stone-800">UG Lead, AWS Users Group Trivandrum</span>. I care about reliability, automation, and building systems that hold up at 3&nbsp;am &mdash; curious, building, and learning out loud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

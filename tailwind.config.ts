import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0E",
        "editor-surface": "#F5F5F4",
        "editor-border": "#2A2A2E",
        "text-primary": "#E7E5E4",
        "text-secondary": "#A8A29E",
        "text-muted": "#78716C",
        accent: "#F59E0B",
        "syn-keyword": "#A78BFA",
        "syn-string": "#34D399",
        "syn-property": "#22D3EE",
        "syn-comment": "#78716C",
        "syn-value": "#F87171",
        "syn-plain": "#E7E5E4",
      },
      fontFamily: {
        sans: ["var(--font-noto)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;

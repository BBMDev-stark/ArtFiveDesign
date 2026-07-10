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
        ivory: "#FAFAF8",
        paper: "#FDFCF9",
        white: "#FFFFFF",
        charcoal: "#1A1917",
        ink: "#121110",
        bronze: "#8B7355",
        "bronze-light": "#A69076",
        champagne: "#C9B896",
        line: "#E5E0D8",
        "line-dark": "#2A2825",
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "Cambria", "serif"],
        sans: ["var(--font-body)", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.6rem", { lineHeight: "1.4" }],
        xs: ["0.75rem", { lineHeight: "1.5" }],
        sm: ["0.875rem", { lineHeight: "1.6" }],
        base: ["1rem", { lineHeight: "1.7" }],
        lg: ["1.125rem", { lineHeight: "1.6" }],
        xl: ["1.25rem", { lineHeight: "1.5" }],
        "2xl": ["1.5rem", { lineHeight: "1.4" }],
        "3xl": ["1.875rem", { lineHeight: "1.3" }],
        "4xl": ["2.25rem", { lineHeight: "1.2" }],
        "5xl": ["3rem", { lineHeight: "1.1" }],
        "6xl": ["3.75rem", { lineHeight: "1.05" }],
        "7xl": ["4.5rem", { lineHeight: "1" }],
        "8xl": ["6rem", { lineHeight: "0.95" }],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
      maxWidth: {
        content: "1400px",
        "8xl": "88rem",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.4, 0, 0.2, 1)",
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        "soft": "0 2px 15px rgba(26, 25, 23, 0.05)",
        "medium": "0 4px 25px rgba(26, 25, 23, 0.08)",
        "lifted": "0 20px 40px rgba(26, 25, 23, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;

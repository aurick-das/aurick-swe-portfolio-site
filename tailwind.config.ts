import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#070B14",
          soft: "#0D1321",
          elevated: "#121B2E"
        },
        accent: {
          DEFAULT: "#7C8CFF",
          hover: "#93A0FF",
          muted: "#4B568B"
        },
        text: {
          DEFAULT: "#E9EEFF",
          muted: "#A6B0D4"
        },
        border: "#23304A"
      },
      boxShadow: {
        card: "0 10px 35px rgba(0,0,0,0.35)"
      },
      backgroundImage: {
        "surface-gradient": "radial-gradient(circle at top, rgba(124,140,255,0.14), transparent 42%)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        marquee: "marquee 24s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;

import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0A0A0F",
          surface: "#0F0F18",
          elevated: "#141420",
        },
        brand: {
          purple: "#7B2FFF",
          cyan: "#00C8FF",
        },
        text: {
          heading: "#F0EFF5",
          body: "#A09FB8",
          muted: "rgba(255,255,255,0.30)",
        },
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.035em",
        display: "-0.025em",
      },
    },
  },
  plugins: [],
};

export default config;

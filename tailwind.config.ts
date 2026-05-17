import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        heart: {
          primary: "#A91D45",
          dark: "#4A1525",
          blush: "#F8E8EC",
          muted: "#8B6B73",
          cream: "#FFFBFA",
          lavender: "#E8D4E8",
          peach: "#FFD4C4",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      backgroundImage: {
        "heart-gradient":
          "linear-gradient(135deg, #FFFBFA 0%, #F8E8EC 40%, #F5D0D8 100%)",
        "heart-gradient-dark":
          "linear-gradient(135deg, #2A1520 0%, #4A1525 50%, #3A2030 100%)",
      },
      animation: {
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;

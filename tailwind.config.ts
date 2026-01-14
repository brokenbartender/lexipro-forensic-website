import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        navy: {
          950: "#071428",
          900: "#0a192f",
          800: "#112240",
          700: "#233554",
        },
        slate: {
          850: "#1e293b",
        },
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        bounceShort: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.5s ease-out",
        "bounce-short": "bounceShort 1s ease-in-out 1",
      },
    },
  },
  plugins: [],
};

export default config;

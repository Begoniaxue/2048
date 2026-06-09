/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        board: "#8b7355",
        "board-cell": "#d4c5b0",
        "tile-2": "#eee4da",
        "tile-4": "#ede0c8",
        "tile-8": "#f2b179",
        "tile-16": "#f59563",
        "tile-32": "#f67c5f",
        "tile-64": "#f65e3b",
        "tile-128": "#edcf72",
        "tile-256": "#edcc61",
        "tile-512": "#edc850",
        "tile-1024": "#edc53f",
        "tile-2048": "#edc22e",
        "tile-super": "#3c3a32",
        "tile-hover": "#f5f0e8",
        "correct-cell": "#22c55e",
        "wrong-cell": "#ef4444",
        accent: "#6366f1",
        "text-dark": "#4a3f35",
        "text-light": "#f9f6f2",
      },
      keyframes: {
        appear: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "card-appear": {
          "0%": { transform: "scale(0) rotate(-10deg)", opacity: "0" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" },
        },
        "slot-in": {
          "0%": { transform: "translateY(-30px) scale(0.8)", opacity: "0" },
          "100%": { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0)" },
          "50%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        },
        pop: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.18)" },
          "100%": { transform: "scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-4px)" },
          "40%": { transform: "translateX(4px)" },
          "60%": { transform: "translateX(-3px)" },
          "80%": { transform: "translateX(3px)" },
        },
        "eliminate": {
          "0%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.3)", opacity: "0.8" },
          "100%": { transform: "scale(0)", opacity: "0" },
        },
        "sparkle": {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "scale(1.5) rotate(180deg)", opacity: "0" },
        },
      },
      animation: {
        appear: "appear 0.2s ease-in-out",
        "card-appear": "card-appear 0.3s ease-out forwards",
        "slot-in": "slot-in 0.3s ease-out forwards",
        "bounce-in": "bounce-in 0.4s ease-out forwards",
        pop: "pop 0.2s ease-in-out",
        "fade-in": "fade-in 0.3s ease-in-out",
        shake: "shake 0.4s ease-in-out",
        "eliminate": "eliminate 0.4s ease-out forwards",
        "sparkle": "sparkle 0.6s ease-out forwards",
      },
    },
  },
  plugins: [],
};

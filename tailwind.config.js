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
        board: "#bbada0",
        "board-cell": "#cdc1b4",
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
        "text-dark": "#776e65",
        "text-light": "#f9f6f2",
      },
      keyframes: {
        appear: {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
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
      },
      animation: {
        appear: "appear 0.2s ease-in-out",
        pop: "pop 0.2s ease-in-out",
        "fade-in": "fade-in 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#c0522a",
          dark:    "#a03e1a",
          light:   "#e8956d",
          pale:    "#f5ede6",
        },
        surface: {
          DEFAULT: "#f5f0e8",
          card:    "#ffffff",
          input:   "#f0ece4",
        },
        ink: {
          DEFAULT: "#2c2a27",
          muted:   "#6b6560",
          faint:   "#9e9890",
        },
        sidebar: {
          DEFAULT: "#1c1a17",
          active:  "#2e2a24",
        },
        border: "#e0d9cf",
      },
      fontFamily: {
        display: ["'Playfair Display'", "serif"],
        body:    ["'Lato'", "sans-serif"],
      },
      borderRadius: {
        card: "14px",
        btn:  "8px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.09)",
        sm:   "0 2px 8px rgba(0,0,0,0.06)",
      },
      keyframes: {
        fadeUp: {
          "0%":   { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up":   "fadeUp 0.4s ease both",
        "fade-up-1": "fadeUp 0.4s 0.06s ease both",
        "fade-up-2": "fadeUp 0.4s 0.14s ease both",
        "fade-up-3": "fadeUp 0.4s 0.22s ease both",
      },
    },
  },
  plugins: [],
};

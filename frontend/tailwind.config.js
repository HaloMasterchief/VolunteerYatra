/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          400: "#60a5fa",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        slate: {
          100: "#f1f5f9",
          400: "#94a3b8",
          600: "#475569",
          700: "#334155",
          900: "#0f172a",
        },
        green: {
          600: "#16a34a",
        },
        red: {
          50: "#fef2f2",
          600: "#dc2626",
          700: "#b91c1c",
        },
        white: "#ffffff",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

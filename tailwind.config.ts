import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#0f172a",
        cyan: "#06b6d4",
        silver: "#c7d2fe"
      },
      boxShadow: {
        glow: "0 0 35px rgba(6, 182, 212, 0.32)"
      }
    }
  },
  plugins: []
};

export default config;

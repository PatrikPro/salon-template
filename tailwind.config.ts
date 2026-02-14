import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Primární teplá kávová */
        coffee: {
          DEFAULT: "#6B4F3A",
          50: "#F5EDE2",
          100: "#EDE0D0",
          200: "#D4C0A8",
          300: "#BB9F80",
          400: "#A27F58",
          500: "#6B4F3A",
          600: "#5A4231",
          700: "#493528",
          800: "#38291F",
          900: "#271C16",
        },
        /** Sekundární krémová */
        cream: {
          DEFAULT: "#F5EDE2",
          50: "#FFFDF9",
          100: "#FAF5EE",
          200: "#F5EDE2",
          300: "#E8D9C8",
          400: "#DBC5AE",
        },
        /** Akcentní zelená */
        accent: {
          DEFAULT: "#7FB77E",
          50: "#EFF7EF",
          100: "#DFEFDE",
          200: "#BFDFBD",
          300: "#9FCF9D",
          400: "#7FB77E",
          500: "#5FA05E",
          600: "#4A7D49",
          700: "#365B35",
          800: "#213921",
          900: "#0D170D",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;

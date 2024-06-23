import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      boxShadow: {
        "profile-shadow-inset": "0px 0px 1px 0.5px rgba(0, 0, 0, 0.05) inset",
        "profile-shadow": "0px 2px 5px 0.3px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui(), require("@tailwindcss/line-clamp")],
};
export default config;

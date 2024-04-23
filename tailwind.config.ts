import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          "50": "#edfefe",
          "100": "#d1fcfc",
          "200": "#aaf5f7",
          "300": "#6fedf1",
          "400": "#2ddae3",
          "500": "#11bdc9",
          "600": "#12a2b4",
          "700": "#157a89",
          "800": "#1a6270",
          "900": "#1a525f",
          "950": "#0b3641",
        },
      },
    },
  },
  plugins: [],
};
export default config;

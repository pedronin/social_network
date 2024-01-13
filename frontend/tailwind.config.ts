import type { Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        accordion: "height, margin, opacity",
        visibility: "visibility",
      },
    },
    screens: {
      xl: { max: "1400px" },
      lg: { max: "1025px" },
      md: { max: "769px" },
      mdd: { max: "630px" },
      sm: { max: "426px" },
      ss: { max: "376px" },
      xs: { max: "321px" },
    },
    fontFamily: {
      sans: ["var(--font-open-sans)"],
    },
  },
  plugins: [
    // @ts-ignore
    plugin(function ({ addVariant }) {
      addVariant("optional", "&:optional");
      addVariant("hocus", ["&:hover", "&:focus"]);
      addVariant("inverted-colors", "@media (inverted-colors: inverted)");
      addVariant("not-last", "&:not(:last-child)");
    }),
  ],
};
export default config;

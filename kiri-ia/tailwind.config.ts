import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bosque: { DEFAULT: "#14432A", 700: "#1B5E38", 600: "#227046", 50: "#EAF3EE" },
        hoja: { DEFAULT: "#3FA66A", 400: "#57C685" },
      },
    },
  },
  plugins: [],
};
export default config;

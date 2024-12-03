/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
      sans: "Roboto Mono, monospace",
    },
    fontSize: {
      huge: ["80rem", { lineHeight: "1" }],
    },
      height: {
        screen: "100dvh",
      },
    },
  },
  plugins: [],
};

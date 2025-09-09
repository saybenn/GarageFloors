/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0B1C2C", // navy ink
        light: "#F5F6F8", // light neutral
        accent: "#D97706", // amber CTA
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "ui-sans-serif",
          "Segoe UI",
          "Helvetica",
          "Arial",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      boxShadow: {
        // a soft, reusable elevated shadow similar to our mockups
        elev: "0 10px 30px -10px rgba(0,0,0,.25)",
      },
      ringColor: {
        DEFAULT: "rgba(59,130,246,.35)", // nicer focus ring default
      },
    },
  },
  plugins: [
    // Uncomment if you want nicer default form styles (then: npm i -D @tailwindcss/forms)
    require("@tailwindcss/forms"),
  ],
};

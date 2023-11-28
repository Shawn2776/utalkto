/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        oxford_blue: "#0A2342",
        zomp: "#2CA58D",
        cambridge_blue: "#84bc9c",
        bittersweet: "#FE5F55",
        umber: "#725e54",
      },
    },
  },
  plugins: [],
};

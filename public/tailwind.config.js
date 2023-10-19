/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "airbnb-gradient":
          "linear-gradient(to right, #0000FF 0%, #000033 100%)",
      },
      colors: {
        "airbnb-theme-color": "#000033",
        "airbnb-light-black": "#222222",
        "airbnb-light-gray": "#717171",
      },
      gridTemplateRows: {
        "new-listing": "10vh 80vh 10vh",
      },
    },
  },
  plugins: [],
};

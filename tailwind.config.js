module.exports = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: "#F6F6F6",
        dark: {
          DEFAULT: "#2d2d2d",
          50: "#454547",
          100: "#323232",
          200: "#2c2c2c",
          300: "#2d2d2d",
        },
        golden: {
          DEFAULT: "#FECC75",
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFF9EF",
          300: "#FFEAC6",
          400: "#FEDB9E",
          500: "#FECC75",
          600: "#FEB73D",
          700: "#FDA306",
          800: "#C98001",
          900: "#925D01",
        },
      },
    },
  },
  plugins: [],
};

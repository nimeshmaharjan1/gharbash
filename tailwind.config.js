/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      serif: ["Mulish"],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#c20009",

          secondary: "#b5c5f4",

          accent: "#6366f1",

          neutral: "#27313F",

          "base-100": "#edebeb",

          info: "#82D1F3",

          success: "#1ACB70",

          warning: "#F6AA28",

          error: "#EC4158",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

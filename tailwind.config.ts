import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: "#FFB61D",
        secondary: "#555555",
        tertiary: "#5F6368",
        customYellow: '#FFB61D', // Customize color names as needed
        customGray: '#555555',
        background: "var(--background)",
        foreground: "var(--foreground)",
        textColor: {
          primary: "#000000",
          secondary: "#555555",
        },
        danger: "#DB0821",
        colorStatus: {
          toDo: "#5F6368",
          inProgress: "#FFB61D",
          done: "#1EC360"
        }
      },
    },
  },
  plugins: [],
};
export default config;

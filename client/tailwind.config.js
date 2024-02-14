/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // JavaScript and TypeScript files
  ],
  theme: {
    extend: {
      colors: {
        customPink: "#FF6F6F",
        customWhite: "#F8F8F8",
        customPink2: "#FFDBDB",
      },
      fontSize:{
        xxs: '0.6rem',
        
      }
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'back' : '#E3651D',
        'sec': '#FB8B24'
      }
    },
  },
  plugins: [],
}


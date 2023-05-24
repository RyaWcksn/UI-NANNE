/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage:{
        'chat': "url('/src/assets/bgChat.svg')"
      }
    },
  },
  plugins: [],
}

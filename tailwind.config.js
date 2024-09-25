/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  // remove unused styles reset css
  theme: {
    extend: {},
  },
  plugins: [],
  /*important: '#app',*/
  corePlugins: {
     preflight: false,
  }
}


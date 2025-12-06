export default {
  // Ensure Tailwind scans the correct files — index.html is at the project root for Vite
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html', './public/index.html'],
  darkMode: false, // You can set it to 'media' or 'class' if needed
  theme: {
    extend: {},
  },
  plugins: [],
};
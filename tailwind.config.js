
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./public/**/*.json" // ← falls du JSON-Dateien überwachen willst (optional)
  ],
  safelist: [
    "bg-yellow-100", "text-yellow-900",
    "bg-blue-100", "text-blue-900",
    "bg-green-100", "text-green-900",
    "bg-purple-100", "text-purple-900",
    "bg-pink-100", "text-pink-900",
    "bg-gray-100", "text-gray-800",
    "bg-orange-100", "text-orange-900",
    "bg-red-100", "text-red-800"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

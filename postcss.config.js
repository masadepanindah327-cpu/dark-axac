-- tailwind.config.js --
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        axac: {
          bg: '#050505',
          panel: '#0f0f11',
          border: '#1f1f23',
          primary: '#ff0033',   // Merah menyala untuk aksen
          primaryHover: '#cc0022',
          text: '#e2e8f0',
          muted: '#71717a',
          nsfw: '#f43f5e'       // Warna khusus untuk indikator NSFW
        }
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      }
    },
  },
  plugins: [],
}

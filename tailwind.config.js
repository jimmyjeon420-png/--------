/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // 프리미엄 미니멀리즘 색상 시스템
        background: '#121212',
        primary: '#4CAF50',
        error: '#CF6679',
        dark: {
          50: '#f5f5f5',
          100: '#eeeeee',
          900: '#121212',
        },
      },
      backgroundColor: {
        base: '#121212',
      },
    },
  },
  plugins: [],
}

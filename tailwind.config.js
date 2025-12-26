/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // [cite: 6]
  ],
  theme: {
    extend: {
      colors: {
        'terminal-black': '#050505',
        'terminal-green': '#00ff41', // Standard Matrix Green
        'terminal-dim': '#008F11',
        'alert-red': '#FF0000',
        'hacker-cyan': '#00F3FF',
      },
      fontFamily: {
        // You must import 'Share Tech Mono' or 'JetBrains Mono' in layout.js
        mono: ['"Share Tech Mono"', 'monospace'], 
      },
      backgroundImage: {
        'scanlines': "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
      },
      animation: {
        'cursor-blink': 'blink 1s step-end infinite',
        'phosphor-pulse': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'pulse-glow': {
          '0%, 100%': { textShadow: '0 0 10px opacity(0.5)' },
          '50%': { textShadow: '0 0 20px opacity(1)' },
        }
      }
    },
  },
  plugins: [],
};
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0a0a0f',
          surface: '#111118',
          card: '#18181f',
          elevated: '#1e1e28',
        },
        border: {
          DEFAULT: '#2a2a3a',
          hover: '#3a3a4a',
        },
        accent: {
          DEFAULT: '#8b7cf7',
          hover: '#9d8ff9',
          glow: 'rgba(139, 124, 247, 0.3)',
        },
        priority: {
          p1: '#ff5555',
          p2: '#ffb347',
          p3: '#50c878',
        },
        effort: {
          s: '#50c878',
          m: '#ffb347',
          l: '#ff8c69',
        },
        type: {
          frontend: '#61dafb',
          backend: '#68d391',
          design: '#f687b3',
          infra: '#ffa726',
          research: '#a78bfa',
        },
        text: {
          DEFAULT: '#e8e8f0',
          muted: '#6a6a88',
          dim: '#4a4a68',
        }
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(139, 124, 247, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 124, 247, 0.5)' },
        }
      },
      boxShadow: {
        'glow': '0 0 30px rgba(139, 124, 247, 0.15)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}

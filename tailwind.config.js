/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 24px rgba(59,130,246,0.22), 0 4px 16px rgba(0,0,0,0.5)',
        'glow-blue-sm': '0 0 12px rgba(59,130,246,0.15)',
        'card': '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px rgba(0,0,0,0.5)',
        'header': '0 1px 0 rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
}

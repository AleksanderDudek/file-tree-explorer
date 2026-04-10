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
        'fade-in':      'fadeIn 0.2s ease-out',
        'fade-in-slow': 'fadeIn 0.4s ease-out',
        'slide-up':     'slideUp 0.25s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-left':'slideInLeft 0.25s cubic-bezier(0.16,1,0.3,1)',
        'pulse-slow':   'pulse 3s ease-in-out infinite',
        'float':        'float 4s ease-in-out infinite',
        'shimmer':      'shimmer 2.5s linear infinite',
        'spin-slow':    'spin 8s linear infinite',
        'bounce-subtle':'bounceSlight 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-8px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-6px)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% center' },
          to:   { backgroundPosition: '200% center' },
        },
        bounceSlight: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(-3px)' },
        },
      },
      boxShadow: {
        'glow-blue':    '0 0 24px rgba(59,130,246,0.22), 0 4px 16px rgba(0,0,0,0.5)',
        'glow-blue-sm': '0 0 12px rgba(59,130,246,0.15)',
        'glow-amber':   '0 0 18px rgba(245,158,11,0.2)',
        'card':         '0 1px 0 rgba(255,255,255,0.04) inset, 0 8px 40px rgba(0,0,0,0.5)',
        'header':       '0 1px 0 rgba(255,255,255,0.04)',
      },
    },
  },
  plugins: [],
}

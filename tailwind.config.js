/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter var', 'Inter', 'sans-serif'],
      },
      colors: {
        ink: {
          50:  '#f8f9fb',
          100: '#eef0f4',
          200: '#dde2eb',
          300: '#c2cad8',
          400: '#9fa8bd',
          500: '#7884a0',
          600: '#5b6680',
          700: '#454e64',
          800: '#2d3346',
          900: '#16192a',
          950: '#0a0c18',
        },
        accent: {
          50:  '#eef4ff',
          100: '#dde9ff',
          200: '#bcd2ff',
          300: '#94b1ff',
          400: '#6585ff',
          500: '#3b62fa',
          600: '#2546e0',
          700: '#1e36b8',
          800: '#1c2f93',
          900: '#1c2a76',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(15,18,40,0.04), 0 4px 12px rgba(15,18,40,0.06)',
        glow: '0 0 0 4px rgba(59,98,250,0.15)',
        ring: '0 1px 2px rgba(15,18,40,0.06), 0 1px 1px rgba(15,18,40,0.03)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.95)' },
          to: { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
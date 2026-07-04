/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Canvas (White / Creamy White / Light Warm Gray)
        canvas: {
          50:  '#ffffff', // Pure White
          100: '#fafaf9', // Ivory/Warm White
          200: '#f5f5f3', // Off-White
          300: '#eae9e6', // Soft Light Gray
          400: '#d5d4d0',
        },
        // Rich Maroon Accent
        maroon: {
          50:  '#fdf4f4', // Soft maroon tint background
          100: '#fbe5e5',
          200: '#f7cece',
          300: '#f0aaaa',
          400: '#e17b7b',
          500: '#c94c4c',
          600: '#ab3333',
          700: '#8c1f1f', // Primary Maroon
          800: '#751919', // Darker Maroon
          900: '#5e1414',
          950: '#3d0a0a',
        },
        // Charcoal (for crisp high-contrast dark text in light mode)
        charcoal: {
          50:  '#f4f4f5',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#1c1c1f', // Dark Gray
          900: '#141416', // Near Black
          950: '#0f0f11', // Pure Black Text
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'scale-in':   'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in':   'slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },
      boxShadow: {
        // Mature, elegant, soft deep shadows
        'subtle':  '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 3px -1px rgba(0, 0, 0, 0.02)',
        'mature':  '0 12px 34px -10px rgba(122, 28, 28, 0.06), 0 4px 12px -4px rgba(0, 0, 0, 0.03)',
        'elevated': '0 24px 48px -12px rgba(122, 28, 28, 0.10), 0 8px 24px -8px rgba(0, 0, 0, 0.04)',
        'focus':   '0 0 0 3px rgba(140, 31, 31, 0.15)',
      },
      borderColor: {
        'light': 'rgba(0, 0, 0, 0.06)',
        'subtle': 'rgba(0, 0, 0, 0.10)',
        'maroon': 'rgba(140, 31, 31, 0.15)',
      },
    },
  },
  plugins: [],
}

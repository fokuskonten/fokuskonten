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
        // Core Background
        ink: {
          50:  '#f4f4f5',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b',
          850: '#111113',
          900: '#0c0c0e',
          950: '#09090b',
        },
        // Copper-Gold Accent
        copper: {
          50:  '#fdf8f0',
          100: '#f9edda',
          200: '#f2d9b2',
          300: '#e9c07e',
          400: '#dda855',
          500: '#c5a880',
          600: '#b8924a',
          700: '#9a7a3d',
          800: '#7c6232',
          900: '#5c4924',
        },
        // Ivory / Light
        ivory: {
          50:  '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'slide-in':   'slideIn 0.4s ease forwards',
        'float':      'float 7s ease-in-out infinite',
        'shimmer':    'shimmer 2.5s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(197, 168, 128, 0.15)' },
          '50%':      { boxShadow: '0 0 40px rgba(197, 168, 128, 0.30)' },
        },
      },
      backgroundImage: {
        'copper-gradient':   'linear-gradient(135deg, #c5a880 0%, #dda855 50%, #c5a880 100%)',
        'surface-gradient':  'linear-gradient(180deg, #111113 0%, #09090b 100%)',
        'card-gradient':     'linear-gradient(145deg, rgba(39,39,42,0.6) 0%, rgba(24,24,27,0.8) 100%)',
      },
      boxShadow: {
        'copper':    '0 0 30px rgba(197, 168, 128, 0.2)',
        'copper-sm': '0 0 12px rgba(197, 168, 128, 0.12)',
        'elevated':  '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)',
        'card':      '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04)',
        'modal':     '0 40px 100px rgba(0,0,0,0.7)',
      },
      borderColor: {
        'surface': 'rgba(255,255,255,0.06)',
        'subtle':  'rgba(255,255,255,0.10)',
        'copper':  'rgba(197,168,128,0.30)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}

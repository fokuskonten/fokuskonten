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
        dark: {
          50: '#f0f0f5',
          100: '#d1d1e0',
          200: '#a3a3c0',
          300: '#7575a0',
          400: '#474780',
          500: '#1a1a40',
          600: '#151535',
          700: '#10102a',
          800: '#0a0a1f',
          900: '#050510',
        },
        accent: {
          50: '#e6f7ff',
          100: '#b3ecff',
          200: '#80e0ff',
          300: '#4dd4ff',
          400: '#1ac8ff',
          500: '#00b4e6',
          600: '#0090b8',
          700: '#006c8a',
          800: '#00485c',
          900: '#00242e',
        },
        vibrant: {
          50: '#f3e6ff',
          100: '#d9b3ff',
          200: '#bf80ff',
          300: '#a64dff',
          400: '#8c1aff',
          500: '#7300e6',
          600: '#5c00b8',
          700: '#45008a',
          800: '#2e005c',
          900: '#17002e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#1e56ff',
          DEFAULT: '#1447d7',
          accent: '#183ea8',
          dark: '#0f3fb8',
          deep: '#0a2a85',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          50: '#FDFDFE',
          100: '#F1F5F9',
          200: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist Sans', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        bg: {
          gray: {
            900: '#121212',
            700: '#1E1E1E',
          },
        },
        brand: {
          900: '#2D132C',
          700: '#801336',
          500: '#C72C41',
          400: '#EE4540',
          300: '#F47370',
        },
        gray: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        white: '#FFFFFF',
        black: '#000000',
      },
    },
  },
} satisfies Config;

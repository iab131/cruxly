/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF7', // chalk white
        foreground: '#111827', // gray-900
        primary: {
          DEFAULT: '#3B82F6', // blue-500
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#F3F4F6', // gray-100
          foreground: '#374151', // gray-700
        },
        muted: {
          DEFAULT: '#6B7280', // gray-500
          foreground: '#9CA3AF', // gray-400
        },
        accent: {
          DEFAULT: '#F3F4F6', // gray-100
          foreground: '#111827', // gray-900
        },
        destructive: {
          DEFAULT: '#EF4444', // red-500
          foreground: '#FFFFFF',
        },
        border: '#E5E7EB', // gray-200
        input: '#E5E7EB', // gray-200
        ring: '#3B82F6', // blue-500
      },
      borderRadius: {
        lg: '1rem', // 16px
        xl: '1.5rem', // 24px
        '2xl': '2rem', // 32px
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
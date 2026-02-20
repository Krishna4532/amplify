/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom branding for Amplify
        amplify: {
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            600: '#2563eb', // Primary Action Color
            700: '#1d4ed8',
          },
          green: '#10b981', // Impact Color
          dark: '#0f172a',  // Rich Navy for text
        }
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem', // Used for those premium-looking cards
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      }
    },
  },
  plugins: [],
}
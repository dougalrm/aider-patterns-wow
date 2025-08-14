/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './lib/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f7',
          100: '#ffd7ea',
          500: '#ff4d8d',
          600: '#e11d74',
          700: '#be185d'
        }
      },
      dropShadow: {
        neon: '0 0 8px rgba(34,211,238,0.65), 0 0 16px rgba(244,63,94,0.45)',
        'neon-sm': '0 0 6px rgba(34,211,238,0.5)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ]
};

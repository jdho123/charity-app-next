/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        gloria: ['var(--font-gloria)'],
        inter: ['var(--font-inter)'],
        verdana: ['Verdana', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      colors: {
        'custom-blue': '#0E26A5',
        'custom-beige': '#E6DBC4',
      },
    },
  },
  plugins: [],
}

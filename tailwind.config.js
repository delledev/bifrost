module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'class',
  content: [
    // If using the src directory, add:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@tremor/**/*.{js,ts,jsx,tsx}', // Tremor module
  ],
  theme: {
    fontFamily: {
      sans: ['sans-serif'],
      serif: ['Ilisarniq'],
      mono: ['JetBrains Mono', 'monospace'],
      graphik: 'Graphik',
    },
    extend: {
      boxShadow: {
        '3xl': '0 6px 20px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.15)',
      },
      colors: {
        old1: '#2c0a50',
        old2: '#100b50',
        secondary: '#050a1f',
        primary: '#002EFF',
        stieglitz: '#6176A1',
        umbra: '#1E1E1E',
        'wave-blue': '#8AACF4',
        'white-dark': '#F6F9FF',
        'cod-gray': '#0E1119',
        green: '#4fbf67;',
        bordercolor: '#2d2d32;',
      },
      minWidth: {
        400: '400px',
        640: '640px',
      },
      margin: {
        1.75: '0.41rem',
      },
      spacing: {
        84: '21rem',
      },
      gridTemplateColumns: {
        new: 'minmax(0px, auto);',
        '1fr': 'auto auto 1fr;',
      },
      gridAutoColumns: {
        new: ' minmax(min-content, max-content);',
      },
    },
  },

  plugins: [],
};

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        gopher: '#00ADD8',
        'dark-gopher': '#009BC2'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}

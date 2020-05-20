const plugin = require('tailwindcss/plugin')

module.exports = {
  theme: {
    extend: {
      fontSize: {
        '7xl': '5rem'
      },
      width: {
        '160': '40rem'
      },
      height: {
        '160': '40rem'
      },
      padding: {
        'full': '100%'
      }
    }
  },
  variants: {},
  plugins: [
    plugin(function ({ addUtilities }) {
      const containers = {
        '.container': {
          width: '90%',
          maxWidth: '900px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }
      }

      addUtilities(containers, ['responsive'])
    })
  ]
}

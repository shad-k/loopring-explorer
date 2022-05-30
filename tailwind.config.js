module.exports = {
  content: ['./**/*.html', './**/*.tsx'],
  theme: {
    extend: {
      colors: {
        loopring: {
          blue: '#256BE5',
          darkBlue: '#084BE8',
          lightBlue: '#5076B7',
          gray: '#656567',
          dark: {
            blue: '#385FFF',
            background: '#1F2034',
            darkBlue: '#282A42',
            gray: '#9AA1B9',
          },
        },
        indigo: {
          60: '#F6F8FF',
        },
      },
      boxShadow: {
        custom: '0px 14px 11px -5px #EBEFFF',
      },
      minHeight: {
        table: '500px',
        page: 'calc(100vh - 56px)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '375px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    extend: {
      fontFamily: {
        primary: ['Rubik', 'sans-serif'],
      },
      fontSize: {
        '2.5xl': '28px',
      },
      colors: {
        primary: {
          red: '#f25f3a',
          blue: '#242d52',
        },
        light: {
          orange: '#FFF0EB',
          gray: '#fafafa',
        },
        dark: {
          blue: '#1D1E25',
          graishBlue: '#9095A7',
        },
      },
    },
  },
  plugins: [require('autoprefixer'), require('postcss')],
};

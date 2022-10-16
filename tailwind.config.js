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
          red: '#FB2671',
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
      width: {
        1600: '1600px',
        400: '400px',
        450: '450px',
        210: '210px',
        550: '550px',
        260: '260px',
        650: '650px',
      },
      height: {
        600: '600px',
        280: '280px',
        900: '900px',
        458: '458px',
        '88vh': '88vh',
      },
      top: {
        ' 50%': '50%',
      },
      backgroundColor: {
        primary: {
          red: '#FB2671',
          blue: '#242d52',
        },
        blur: '#030303',
      },
      backgroundImage: {
        'blurred-img':
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsaaJ7s4lqcBF4IDROVPzrlL5fexcwRmDlnuEYQenWTt1DejFY5kmYDref2a0Hp2eE4aw&usqp=CAU')",
      },
    },
  },
  plugins: [require('autoprefixer'), require('postcss')],
};

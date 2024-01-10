module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        LexendDeca: ['Lexend Deca', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

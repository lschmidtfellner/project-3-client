/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'off-white': '#EDE9E6',
      'off-red': '#E58888',
      'off-yellow': '#D8B44C',
    },
    fontFamily: {
      'west-avenue': ['west-avenue, serif'],
      'radio-grotesk': ['radio-grotesk, sans-serif']
    },
    fontWeight: {
      'regular': 400,
      'bold': 700,
    },
    height: {
      '128': '32rem',
    },
    width: {
      '701': '43.813rem',
    },
    zIndex: {
      '100': '100',
    },
  },
};
export const plugins = [
  require('@tailwindcss/aspect-ratio'),
];
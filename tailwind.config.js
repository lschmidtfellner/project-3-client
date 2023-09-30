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
    }
  },
};
export const plugins = [];
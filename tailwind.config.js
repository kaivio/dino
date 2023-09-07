module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./docs/**/*.{md,mdx}",
    "./blog/**/*.{md,mdx}"
  ],
  theme: {
    extend: {
      screens: {
        'pointer': {
          'raw': '(hover: hover) and (pointer: fine)'
        }
      },
    },
  },
  plugins: [],
};


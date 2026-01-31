/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                basteleur: ['Basteleur', 'serif'],
                uncut: ['"Uncut Sans"', 'sans-serif'],
            },
            colors: {
                space: {
                    100: '#e0e7ff', // Very light indigo
                    200: '#c084fc', // Bright Purple
                    300: '#a855f7', // Vivid Purple
                    400: '#e879f9', // Fuchsia Pink
                    500: '#9333ea', // Electric Purple (Primary)
                    600: '#7e22ce', // Deep Violet
                    dark: '#0b0f19', // Deepest Space Black
                    light: '#f3f4f6', // Bright Gray/White
                    accent: '#f472b6', // Pink Accent
                    'button-light': '#be185d', // Deep Pink (High Contrast for Light Mode)
                }
            }
        },
    },
    plugins: [],
}

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
        },
    },
    plugins: [],
}

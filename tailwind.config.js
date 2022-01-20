module.exports = {
    purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                navy: '#0B486B',
                lightnavy: '#507184',
                drakgreen: '#3B8686',
                grey: '#E8E8E8',
                lightred: '#F0D7C4',
                lightgreen: '#DAE2B8',
                lime: '#809917',
                lightblue: '#D0E1DA',
            },
            fontFamily: {
                sans: ['Catamaran', 'sans-serif'],
            },
        },
    },
    mode: 'jit',
    variants: {
        extend: {},
    },
    plugins: [],
};

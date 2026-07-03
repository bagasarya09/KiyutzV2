import forms from '@tailwindcss/forms';

export default {
    content: [
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.jsx',
    ],
    theme: {
        extend: {
            colors: {
                primary:   '#0B1F33',  // Base teks / heading
                secondary: '#6C7095',  // Teks sekunder
                tertiary:  '#F2F2F2',  // Surface abu muda
                base:      '#F8F9FE',  // Background utama
                accent:    '#CA79BE',  // Aksen (pink/ungu)
            },
            fontFamily: {
                sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            },
            fontSize: {
                // [ukuran, { line-height, font-weight }]
                display: ['64px', { lineHeight: '110%', fontWeight: '700' }], // Display Title
                h1:      ['48px', { lineHeight: '120%', fontWeight: '700' }], // Display Sub Title
                h2:      ['36px', { lineHeight: '125%', fontWeight: '700' }], // Sub Heading
                h3:      ['32px', { lineHeight: '130%', fontWeight: '700' }], // Sub Heading
                h4:      ['24px', { lineHeight: '140%', fontWeight: '600' }], // Small Heading
                h5:      ['20px', { lineHeight: '140%', fontWeight: '600' }], // Small Heading
                'body-lg': ['16px', { lineHeight: '150%', fontWeight: '400' }],
                'body':    ['14px', { lineHeight: '150%', fontWeight: '400' }],
                'body-sm': ['12px', { lineHeight: '150%', fontWeight: '400' }],
            },
        },
    },
    plugins: [forms],
};
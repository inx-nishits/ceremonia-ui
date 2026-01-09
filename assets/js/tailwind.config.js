// CeremonIA Strict Clone Config
// Reference: https://www.ceremoniedereve.com/

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'goldney': ['Goldney', 'serif'],
                'luz': ['LuzSans-Book', 'sans-serif']
            },
            colors: {
                // The reference uses very specific warm greys and off-whites
                bg: {
                    DEFAULT: '#F5F5F0', // The main background color (Stone/Ivory)
                    paper: '#FFFFFF',   // Pure white for cards
                    dark: '#1C1C1C'     // Dark sections
                },
                text: {
                    main: '#1C1C1C',    // Soft Black
                    muted: '#666666',   // Grey text
                    light: '#8C8C8C'    // Lighter captions
                },
                accent: {
                    DEFAULT: '#BD9A47', // Muted Gold (from original prompt, but used sparingly)
                    plum: '#823AAF'     // Keeping your brand accent but minimizing use
                },
                border: {
                    DEFAULT: '#E5E5E5', // Very light borders
                    strong: '#D4D4D4'
                }
            },
            fontSize: {
                'xs': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.1em' }], // Minimum 14px
                'sm': ['1rem', { lineHeight: '1.5rem' }], // 16px
                'base': ['1.125rem', { lineHeight: '1.75rem' }], // 18px
                'lg': ['1.25rem', { lineHeight: '2rem' }], // 20px
                'serif-xl': ['3rem', { lineHeight: '1.1' }],
                'serif-2xl': ['4.5rem', { lineHeight: '1' }],
                'serif-3xl': ['6rem', { lineHeight: '0.9' }],
            },
            spacing: {
                'container': '1400px', // Max width constraint
                'block': '80px',       // Standard vertical rhythm
            },
            letterSpacing: {
                'tight-serif': '-0.03em',
                'wide-caps': '0.15em',
            }
        }
    }
}

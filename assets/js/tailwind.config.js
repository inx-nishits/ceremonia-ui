// CeremonIA Strict Clone Config
// Reference: https://www.ceremoniedereve.com/

tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                'goldney': ['Goldney', 'serif'],
                'luz': ['LuzSans-Book', 'sans-serif'],
                'sans': ['LuzSans-Book', 'sans-serif']
            },
            colors: {
                cream: '#F9F8F6',      // Warm White Background
                paper: '#FFFFFF',      // Pure White
                charcoal: '#2A2826',   // Dark Text/Background
                taupe: '#6B665F',      // Muted/Grey Text
                gold: '#BD9A47',       // Muted Gold
                plum: '#823AAF',       // Primary Purple
                'plum-light': '#9B4FC4', // Lighter Purple for Hoverum
                lavender: '#E6D9F2',   // Light Purple (Filters)
                beige: '#E5E2DD',      // Warm Beige Borders
                silver: '#D4D4D4'      // Stronger Borders
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

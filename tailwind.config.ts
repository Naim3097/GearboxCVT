import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './modules/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent:  '#AB2020',
        'accent-hover': '#8f1a1a',
        ink:     '#000000',
        surface: '#FFFFFF',
        muted:   '#1A1A1A',
        subtle:  '#F5F5F5',
        border:  'rgba(0,0,0,0.08)',
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem,6vw,6rem)',   { lineHeight: '1.1' }],
        'display-lg': ['clamp(2.25rem,4.5vw,4rem)', { lineHeight: '1.15' }],
        'display-md': ['clamp(1.75rem,3vw,2.5rem)',  { lineHeight: '1.2' }],
      },
      maxWidth: {
        site: '1440px',
        prose: '740px',
      },
      spacing: {
        section: '7rem',
        'section-sm': '4rem',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'cubic-bezier(0, 0.4, 0, 1)',
        'ease-in-custom':  'cubic-bezier(1, 0, 1, 0.6)',
        'ease-inout':      'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
}

export default config

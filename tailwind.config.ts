import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Cinematic near-black ramp
        ink: {
          DEFAULT: '#050505',
          900: '#050505',
          800: '#0A0A0A',
          700: '#111111',
          600: '#161616',
          500: '#1C1C1C',
        },
        // Warm off-white (primary text)
        bone: '#F4F1EA',
        // Muted gray (secondary text)
        ash: '#8A8A82',
        'ash-dim': '#5A5A54',
        // Subtle champagne accent (no blue/cyan anywhere)
        champagne: {
          DEFAULT: '#C9BBA0',
          dim: '#9E9070',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        meta: '0.28em',
        tight2: '-0.02em',
        tight3: '-0.035em',
      },
      fontSize: {
        display: ['clamp(3.5rem, 13vw, 13rem)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2.5rem, 8vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.02em' }],
      },
      transitionTimingFunction: {
        cinema: 'cubic-bezier(0.65, 0, 0.35, 1)',
        'cinema-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      maxWidth: {
        shell: '1680px',
      },
    },
  },
  plugins: [],
};

export default config;

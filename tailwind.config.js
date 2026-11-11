/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#FAF8F5',
        surface: '#FFFFFF',
        'card-alt': '#F4F1EA',
        'border-primary': '#E7E4DC',
        'border-secondary': '#E2DFD7',
        'border-brand': '#D0E2D8',
        'ink-primary': '#1B1E1D',
        'ink-secondary': '#4B524E',
        'ink-body': '#525955',
        'ink-muted': '#6B726F',
        brand: {
          primary: '#1A3D34',
          hover: '#132E27',
          pine: '#122A23',
          accent: '#267256',
          soft: '#EAF2EE'
        },
        gold: {
          accent: '#C98E3A',
          bg: '#F9F3EA',
          ink: '#8F5A17'
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft-card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
        'hero-live': '0 20px 40px -15px rgba(26, 61, 52, 0.08), 0 0 1px 1px rgba(0, 0, 0, 0.04)',
        'focus-ring': '0 0 0 1px rgba(26, 61, 52, 0.12), 0 8px 24px -4px rgba(26, 61, 52, 0.12)'
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      }
    },
  },
  plugins: [],
}

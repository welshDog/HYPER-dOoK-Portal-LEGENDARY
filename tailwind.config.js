/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // ADHD-optimized font families (Lexend for dyslexia)
      fontFamily: {
        'primary': ['Lexend', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'dyslexic': ['OpenDyslexic', 'Comic Sans MS', 'cursive'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'display': ['Lexend Deca', 'system-ui', 'sans-serif']
      },

      // ADHD-friendly color palette with high contrast
      colors: {
        // Primary ADHD-optimized colors (4.5:1 contrast minimum)
        'adhd': {
          'focus': '#00D4FF',      // Bright cyan for attention
          'success': '#00FF88',    // Dopamine green for achievements
          'warning': '#FFB800',    // Clear yellow for alerts
          'error': '#FF4757',      // High-contrast red for errors
          'calm': '#667EEA',       // Soothing blue for relaxation
          'energy': '#F093FB',     // Motivating pink for action
        },

        // BROski brand colors
        'broski': {
          'blue': '#0EA5E9',
          'green': '#22C55E', 
          'pink': '#EC4899',
          'purple': '#8B5CF6',
          'orange': '#F59E0B',
          'teal': '#14B8A6'
        },

        // Neurodivergent-friendly backgrounds
        'neuro': {
          'bg-light': '#FAFBFC',   // Soft white (reduces eye strain)
          'bg-dark': '#1A202C',    // Deep blue-gray (not pure black)
          'bg-cream': '#FEF7ED',   // Warm cream (dyslexia-friendly)
          'bg-mint': '#F0FDF4',    // Gentle mint (calming)
          'surface': '#F7FAFC',
          'surface-dark': '#2D3748'
        },

        // High contrast text colors
        'text': {
          'primary-light': '#1A202C',
          'primary-dark': '#F7FAFC',
          'secondary-light': '#4A5568',
          'secondary-dark': '#A0AEC0',
          'muted-light': '#718096',
          'muted-dark': '#718096'
        }
      },

      // ADHD-optimized spacing (consistent rhythm)
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        'xs': '0.5rem',
        'sm': '1rem', 
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '3rem',
        '2xl': '4rem',
        '3xl': '6rem'
      },

      // Enhanced border radius for friendly UI
      borderRadius: {
        'adhd': '0.75rem',        // Perfect balance for ADHD users
        'crystal': '1.5rem',      // For memory crystals
        'celebration': '2rem',    // For celebration elements
      },

      // Custom animations for dopamine hits
      animation: {
        'celebration': 'celebration 0.6s ease-out',
        'crystal-float': 'crystal-float 3s ease-in-out infinite',
        'broski-bounce': 'broski-bounce 0.5s ease-out',
        'focus-pulse': 'focus-pulse 2s ease-in-out infinite',
        'success-wiggle': 'success-wiggle 0.8s ease-in-out',
        'gentle-fade': 'gentle-fade 0.3s ease-out',
        'hyperfocus-glow': 'hyperfocus-glow 1.5s ease-in-out infinite alternate'
      },

      keyframes: {
        'celebration': {
          '0%': { transform: 'scale(1) rotate(0deg)', opacity: '1' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '0.8' },
          '100%': { transform: 'scale(1) rotate(360deg)', opacity: '1' }
        },
        'crystal-float': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(180deg)' }
        },
        'broski-bounce': {
          '0%': { transform: 'translateY(0px) scale(1)' },
          '50%': { transform: 'translateY(-8px) scale(1.05)' },
          '100%': { transform: 'translateY(0px) scale(1)' }
        },
        'focus-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 212, 255, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(0, 212, 255, 0)' }
        },
        'success-wiggle': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-3deg)' },
          '75%': { transform: 'rotate(3deg)' }
        },
        'gentle-fade': {
          'from': { opacity: '0', transform: 'translateY(10px)' },
          'to': { opacity: '1', transform: 'translateY(0px)' }
        },
        'hyperfocus-glow': {
          'from': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          'to': { boxShadow: '0 0 30px rgba(0, 212, 255, 0.6), 0 0 40px rgba(0, 212, 255, 0.4)' }
        }
      },

      // Typography scale optimized for dyslexia
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5' }],
        'sm': ['0.875rem', { lineHeight: '1.6' }],
        'base': ['1rem', { lineHeight: '1.75' }],     // Increased line height
        'lg': ['1.125rem', { lineHeight: '1.75' }],
        'xl': ['1.25rem', { lineHeight: '1.75' }],
        '2xl': ['1.5rem', { lineHeight: '1.6' }],
        '3xl': ['1.875rem', { lineHeight: '1.5' }],
        '4xl': ['2.25rem', { lineHeight: '1.4' }],
        '5xl': ['3rem', { lineHeight: '1.3' }],
        '6xl': ['3.75rem', { lineHeight: '1.2' }]
      },

      // Box shadows for depth and focus
      boxShadow: {
        'adhd-focus': '0 0 0 3px rgba(0, 212, 255, 0.3)',
        'crystal': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'celebration': '0 0 50px rgba(34, 197, 94, 0.4)',
        'broski': '0 4px 20px rgba(139, 92, 246, 0.3)',
        'gentle': '0 2px 8px rgba(0, 0, 0, 0.05)'
      },

      // Grid layouts for crystal organization
      gridTemplateColumns: {
        'crystal': 'repeat(auto-fit, minmax(280px, 1fr))',
        'dashboard': 'repeat(auto-fit, minmax(320px, 1fr))',
        'gallery': 'repeat(auto-fill, minmax(250px, 1fr))'
      }
    }
  },

  plugins: [
    // Custom utilities for ADHD-friendly design
    function({ addUtilities }) {
      addUtilities({
        '.adhd-focus': {
          'outline': '3px solid #00D4FF',
          'outline-offset': '2px',
          'transition': 'outline 0.2s ease-out'
        },
        '.dyslexic-text': {
          'letter-spacing': '0.05em',
          'word-spacing': '0.16em', 
          'line-height': '1.75'
        },
        '.celebration-glow': {
          'box-shadow': '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)'
        },
        '.crystal-surface': {
          'background': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          'backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255,255,255,0.2)'
        }
      })
    }
  ]
}
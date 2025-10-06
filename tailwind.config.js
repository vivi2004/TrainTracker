/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: 'var(--color-border)', // slate-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-800
        background: 'var(--color-background)', // slate-50
        foreground: 'var(--color-foreground)', // slate-800
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-800
          foreground: 'var(--color-primary-foreground)', // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // blue-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-100
          foreground: 'var(--color-muted-foreground)', // slate-500
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // orange-400
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)', // slate-800
        },
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)', // slate-800
        },
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)', // white
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
        surface: {
          DEFAULT: 'var(--color-surface)', // slate-100
          foreground: 'var(--color-surface-foreground)', // slate-800
        },
        // Transit Authority Theme Colors
        'transit-blue': 'var(--color-transit-blue)', // blue-800
        'transit-blue-light': 'var(--color-transit-blue-light)', // blue-500
        'safety-orange': 'var(--color-safety-orange)', // orange-400
        'status-green': 'var(--color-status-green)', // emerald-500
        'delay-amber': 'var(--color-delay-amber)', // amber-500
        'disruption-red': 'var(--color-disruption-red)', // red-500
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "data-flow": "dataFlow 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite",
        "pulse-community": "pulse 1.2s ease-out infinite",
        "breathe": "breathe 2s ease-in-out infinite",
        "confidence-progress": "confidenceProgress 3s ease-out forwards",
        "spotlight": "spotlight 4s ease-in-out infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "dataFlow": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "pulse": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "breathe": {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" },
        },
        "confidenceProgress": {
          "0%": { 
            opacity: "0.3", 
            transform: "scale(0.8)",
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1)",
          },
        },
        "spotlight": {
          "0%, 100%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
        },
      },
      boxShadow: {
        'transit': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        'transit-lg': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'info-layer': '0 4px 20px rgba(30, 58, 138, 0.15)',
        'info-layer-hover': '0 8px 30px rgba(30, 58, 138, 0.2)',
      },
      transitionDuration: {
        '150': '150ms',
        '250': '250ms',
        '300': '300ms',
      },
      transitionTimingFunction: {
        'transit': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      gridTemplateColumns: {
        '8': 'repeat(8, 1fr)',
        '16': 'repeat(16, 1fr)',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "2rem",
			},
			colors: {
				'bg-main': 'rgba(30, 41, 59, 1)',
		  		'bg-mainActive': '#18212F',
		  		'bg-secondary': 'rgba(51, 65, 85, 1)',
		  		'bg-secondaryHov': 'rgba(60, 75, 95, 1)',
		  		'bg-secondaryActive': '#2B344A',
		  		'brand': 'rgba(20, 184, 166, 1)',
		  		'brandHov': '#35E9D5',
		  		'text-gray': 'rgba(148, 163, 184, 1)',
		  		'text-white': 'rgba(248, 250, 252, 1)',
		  		'text-whiteHov': 'rgba(248, 250, 252, 0.9)',
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			fontSize: {
				'clampHuge': 'clamp(2.5rem, 2.1250rem + 1.6667vw, 3rem)',
				'clampBig': 'clamp(1.5rem, 1.0000rem + 1.6667vw, 1.875rem)',
				'clampMedium': 'clamp(0.875rem, 0.2500rem + 1.6667vw, 1.125rem)',
			  }
		}
	},
};

export default config;

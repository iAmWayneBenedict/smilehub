import tailwindCSSAnimate from "tailwindcss-animate";
import { nextui } from "@nextui-org/theme";
import fluid, { extract, screens, fontSize } from "fluid-tailwind";
export const darkMode = ["class"];
export const content = {
	files: [
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
		"./node_modules/@nextui-org/theme/dist/components/(accordion|autocomplete|breadcrumbs|button|chip|divider|dropdown|input|modal|select|slider|tabs|user|ripple|spinner|listbox|popover|scroll-shadow|menu|avatar).js",
		"./pages/**/*.{js,jsx}",
		"./components/**/*.{js,jsx}",
		"./app/**/*.{js,jsx}",
		"./src/**/*.{js,jsx}",
	],
	extract,
};
export const prefix = "";
export const theme = {
	darkMode: "class",
	container: {
		center: true,
		padding: "2rem",
		screens: {
			"2xl": "1400px",
		},
	},
	screens,
	fontSize: {
		...fontSize,
		"45xl": ["2.75rem", "1"],
		"55xl": ["3.25rem", "1"],
	},
	extend: {
		fontFamily: {
			Mukta: ["Mukta", "sans-serif"],
		},
		width: {
			120: "33rem",
			// 120: "40rem",
		},
		maxWidth: {
			120: "33rem",
		},
		minWidth: {
			120: "33rem",
		},
		colors: {
			border: "hsl(var(--border))",
			input: "hsl(var(--input))",
			ring: "hsl(var(--ring))",
			background: "hsl(var(--background))",
			foreground: "hsl(var(--foreground))",
			primary: {
				DEFAULT: "hsl(var(--primary))",
				foreground: "hsl(var(--primary-foreground))",
			},
			secondary: {
				DEFAULT: "hsl(var(--secondary))",
				foreground: "hsl(var(--secondary-foreground))",
			},
			destructive: {
				DEFAULT: "hsl(var(--destructive))",
				foreground: "hsl(var(--destructive-foreground))",
			},
			muted: {
				DEFAULT: "hsl(var(--muted))",
				foreground: "hsl(var(--muted-foreground))",
			},
			accent: {
				DEFAULT: "hsl(var(--accent))",
				foreground: "hsl(var(--accent-foreground))",
			},
			darkText: {
				DEFAULT: "var(--dark-text)",
				secondary: "var(--dark-text)",
			},
			secondaryText: {
				DEFAULT: "var(--secondary-text-color)",
				secondary: "var(--secondary-text-color)",
			},
			lightText: {
				DEFAULT: "var(--light-text-color)",
				secondary: "var(--light-text-color)",
			},
			popover: {
				DEFAULT: "hsl(var(--popover))",
				foreground: "hsl(var(--popover-foreground))",
			},
			card: {
				DEFAULT: "hsl(var(--card))",
				foreground: "hsl(var(--card-foreground))",
			},
		},
		borderRadius: {
			lg: "var(--radius)",
			md: "calc(var(--radius) - 2px)",
			sm: "calc(var(--radius) - 4px)",
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
		},
		animation: {
			"accordion-down": "accordion-down 0.2s ease-out",
			"accordion-up": "accordion-up 0.2s ease-out",
		},
	},
};
export const plugins = [
	tailwindCSSAnimate,
	nextui({
		prefix: "nextui", // prefix for themes variables
		addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
		defaultTheme: "light", // default theme from the themes object
		defaultExtendTheme: "light", // default theme to extend on custom themes
		layout: {}, // common layout tokens (applied to all themes)
		themes: {
			light: {
				layout: {}, // light theme layout tokens
				colors: {}, // light theme colors
			},
			dark: {
				layout: {}, // dark theme layout tokens
				colors: {}, // dark theme colors
			},
			// ... custom themes
		},
	}),
	fluid,
];

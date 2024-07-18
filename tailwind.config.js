/** @type {import('tailwindcss').Config} */

const daisy = require("daisyui");
const tailwindTypography = require("@tailwindcss/typography");
const plugin = require("tailwindcss/plugin");

// const themes = require('daisyui/src/colors/themes')

const childrenSupport = ({ addVariant }) => {
	addVariant("child", "& > *");
	addVariant("child-hover", "& > *:hover");
};

const extendedTailwind = plugin(function ({ addComponents }) {
	addComponents({
		".axis-center": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
	});
});

module.exports = {
	darkMode: ["class", '[data-theme="dark"]'],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,md,mdx}",
		"./layouts/**/*.{js,ts,jsx,tsx,md,mdx}",
	],
	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						"blockquote p:first-of-type::before": {
							content: "none",
						},
						"blockquote p:first-of-type::after": {
							content: "none",
						},
						"code::before": { content: "none" },
						"code::after": { content: "none" },
						// code: {
						// 	fontWeight: theme("fontWeight.normal"),
						// 	backgroundColor: theme("colors.violet.100"),
						// 	paddingBlock: theme("spacing")[1],
						// 	paddingInline: theme("spacing")[1.5],
						// 	borderRadius: theme("borderRadius.DEFAULT"),
						// },
					},
				},
			}),
			keyframes: {
				"fade-in": {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
			animation: {
				"fade-in": "fade-in 0.5s ease-in-out",
			},
		},
		screen: {
			sm: 425,
			md: 768,
			lg: 1024,
			xl: 1280,
			"2xl": 1440,
		},
		fontFamily: {
			satoshi: "Satoshi sans-serif",
		},
	},

	daisyui: {
		styled: true,
		themes: [
			{
				light: {
					...require("daisyui/src/colors/themes")[
						"[data-theme=light]"
					],
					fontFamily: "Roboto",
				},
			},
			{
				dark: {
					...require("daisyui/src/colors/themes")[
						"[data-theme=night]"
					],
				},
			},
		],

		base: true,
		utils: true,
		logs: true,
		rtl: false,

		prefix: "",
	},

	plugins: [tailwindTypography, extendedTailwind, daisy, childrenSupport],
};

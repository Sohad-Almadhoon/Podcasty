import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: '#6864CF',
			},
			backgroundImage: {
				'primary-img': "url('/images/test.png')",

			},
			fontFamily: {
				montserrat: ['Montserrat', 'sans-serif'],
				dancingScript: ['Dancing Script', 'cursive'],
			},
		}
	}






} satisfies Config;

module.exports = {
	content: [
		"./resources/views/**/*.blade.php",
		"./resources/js/**/*.js",
		"./resources/js/**/*.jsx",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
		require("@tailwindcss/typography"),
		require("@tailwindcss/aspect-ratio"),
		require("@tailwindcss/line-clamp"),
	],
}


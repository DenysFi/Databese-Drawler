const { rule } = require("postcss")

module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"plugin:import/recommended",
	],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh", "import"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
	},
	rules: {
		"import/no-restricted-paths": [
			"error",
			{
				"check-file/filename-naming-convention": [
					"error",
					{
						"**/*.{ts,tsx}": "KEBAB_CASE",
					},
					{
						ignoreMiddleExtensions: true,
					},
				],
			},
			{
				plugins: ["check-file"],
				files: ["src/**/!(__tests__)/*"],
				rules: {
					"check-file/folder-naming-convention": [
						"error",
						{
							"**/*": "KEBAB_CASE",
						},
					],
				},
			},
		],
	},
}

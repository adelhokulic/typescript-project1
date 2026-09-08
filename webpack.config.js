import path from "path";
import { fileURLToPath } from "url";
import Dotenv from "dotenv-webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
	entry: "./src/script.ts",

	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},

	resolve: {
		extensions: [".ts", ".js"],
	},

	plugins: [
		new Dotenv(),
	],

	output: {
		filename: "script.js",
		path: path.resolve(__dirname, "dist"),
	},

	mode: "development",
};
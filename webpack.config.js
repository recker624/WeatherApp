const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	entry: "./src/WeatherApp.js",
	mode: "development",
	output: {
		filename: "[name].bundle.js",
		path: path.resolve(__dirname, "dist"),
		clean: true
	},
	devServer: {
		static: "./dist"
	},
	devtool: "inline-source-map",
	plugins: [
		new HtmlWebpackPlugin({
			title: "weatherApp"
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					"style-loader",
					"css-loader"
				]
			}
		]
	}
};

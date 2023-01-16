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
		static: path.resolve(__dirname, "dist"),
		port: 8080,
		hot: true
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
				test: /\.(scss)$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader"
					},
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: () => [
									require("autoprefixer")
								]
							}
						}
					},
					{
						loader: "sass-loader"
					}
				]
			}
		]
	}
};

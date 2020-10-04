const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
	entry: path.join(__dirname, "src", "index.js"),
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js"
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env", "@babel/preset-react"],
						plugins: ['@babel/plugin-proposal-class-properties'],
					}
				}
			},
			{
				test: /\.css$/i,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|svg|gif|jpeg)$/,
				use: ['file-loader']
			}
		]
	},

	plugins: [
		new HTMLWebpackPlugin({
			template: path.join(__dirname, "public/index.html"),
			filename: "index.html"
		})
	],
	devServer: {
		historyApiFallback: true
	}
}
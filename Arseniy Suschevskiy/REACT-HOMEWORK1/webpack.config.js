const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, "dist"),
		filename: "bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							modules: {
								localIdentName: "[name]__[local]___[hash:base64:5]"
							},
						}
					}
				]
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./dist/index.html"
		})
	]
};

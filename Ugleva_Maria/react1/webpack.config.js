const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const loader = require('sass-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	entry: path.join(__dirname, 'src', 'index.js'),
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		inline: true,
		port: 4000,
		contentBase: './src/index',
		historyApiFallback: true,
		hot: true,
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			components: path.join(__dirname, 'src', 'components'),
			reducers: path.join(__dirname, 'src', 'reducers'),
      actions: path.join(__dirname, 'src', 'actions'),
			middlewares: path.join(__dirname, 'src', 'middlewares'),
		},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.s?css$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'src', 'index.html'),
			filename: 'index.html',
		}),
		// new MiniCssExtractPlugin({
		//   filename: 'main.css',
		// })
	],
};

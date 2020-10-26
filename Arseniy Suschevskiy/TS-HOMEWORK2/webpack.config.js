const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'main.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },

    module: {
        rules: [
          { test: /\.tsx?$/, loader: "ts-loader" },
          {
            test: /\.s?css$/i,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
          },
        ]
      },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
          filename: 'main.css',
        }),
      ],

    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
    },
}
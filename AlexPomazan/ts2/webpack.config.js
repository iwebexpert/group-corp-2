const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'main.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },

    module: {
        rules: [
          //1
          // { test: /\.tsx?$/, loader: "ts-loader" },

          //2
          {
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-typescript', '@babel/preset-env', '@babel/preset-react'],
                plugins: ['@babel/plugin-proposal-class-properties'],
              }
            }
          },
          {
            test: /\.s?css$/i,
            use: [
              'style-loader',
              MiniCssExtractPlugin.loader,
              'css-loader',
              'sass-loader',
            ],
          },
          {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
              {
                loader: 'file-loader',
              },
            ],
          },
        ]
      },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src','index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
          filename: 'style.css',
        }),
      ],

    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
    },
}
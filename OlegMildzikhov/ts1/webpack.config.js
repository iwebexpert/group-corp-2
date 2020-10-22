const path = require('path');
const { fileURLToPath } = require('url');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'chess', 'index.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },

    module: {
        rules: [
          // {
          //   test: /\.tsx?$/,
          //   use: [{
          //     loader: 'ts-loader',
          //   }],

          // },
          {
            test: /\.(j|t)sx?$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-typescript','@babel/preset-env', '@babel/preset-react'],
                  plugins: ['@babel/plugin-proposal-class-properties'],
              }
            }
          },
            {
                test: /\.css$/i,
                use: ['style-loader', MiniCssExtractPlugin.loader,'css-loader'],}
        ]
      },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'chess' , 'index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
    ],

    devServer: {
        historyApiFallback: true,
    },
};
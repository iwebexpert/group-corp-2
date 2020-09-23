const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ["@babel/polyfill", path.join(__dirname, 'src', 'index.js')],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    module: {
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            resolve: { 
              extensions: [".jsx", ".js", ".json"] 
            },
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
              }
            }
          },
          {
            test: /\.s?css$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]
          }
        ]
      },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        })
      ],
}
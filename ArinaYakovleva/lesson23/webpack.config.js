const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        components: path.join(__dirname, 'src', 'components'),
        pages: path.join(__dirname, 'src', 'Pages'),
      },
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
                plugins: ['@babel/plugin-proposal-class-properties'],
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
        
        ],
        
    },
    plugins: [
      new HtmlWebpackPlugin({
          template: path.join(__dirname, 'src', 'index.html'),
          filename: 'index.html',
      }),
  ],

  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
}
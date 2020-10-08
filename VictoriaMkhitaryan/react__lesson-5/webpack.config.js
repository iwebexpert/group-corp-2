const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.join(__dirname, "dists"),
    publicPath: "/" ,
    filename: "index-bundle.js"
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
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
        test: [/\.css$/],
        use: ["style-loader", "css-loader"]
      },{
        test: /.(ttf|otf|eot|svg|png|woff(2)?)(\?[a-z0-9]+)?$/,
        use: {
            loader: "file-loader",
            options: {
                name: "fonts/[name].[ext]"
            }
        }
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      filename: 'index.html',
    })
  ]
};
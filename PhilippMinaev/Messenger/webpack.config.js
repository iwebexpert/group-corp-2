const path = require("path");
const webpack = require("webpack");

module.exports = {
  watch: true,
  entry: {
    app: "./index.jsx",
  },
  context: path.join(__dirname, "static_src"),
  output: {
    path: path.join(__dirname, "static", "build"),
    filename: "app.js",
  },
  resolve: {
    modules: [`${__dirname}/static_src`, "node_modules"],
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, "static_src"),
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/env", "@babel/react"],
          plugins: [
            [
              "@babel/plugin-proposal-class-properties",
              {
                loose: true,
              },
            ],
          ],
        },
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader",
      },
    ],
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  devtool: "cheap-inline-module-source-map",
};

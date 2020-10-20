const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.join(__dirname, "src", "app.ts"),
    output: {
        path: path.join(__dirname, "dist"),
        filename: "app.bundle.js",
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),

    ],

    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                            name: "[name].[ext]",
                        },
                    },
                ],
            },
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
            }
        ],
    },
    devtool: "eval-source-map",
    devServer: {
        historyApiFallback: true,
    }
};

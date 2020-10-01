const HtmlWebpackPlugin= require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin= require('mini-css-extract-plugin');
const path = require ('path');

module.exports={
    mode: "development",
    entry: {
        main:['@babel/polyfill','./src/index.js'],
    },
    output: {
        filename: "[name].[hash].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename:  "[name].[hash].bundle.css",
            chunkFilename: '[id].css',
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html'
        }),
    ],
    module: {
        rules: [
            {
               test:/\.(png|gif|svg|jpg)$/,
               use:['file-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets:[
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ],
                        plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js','.jsx','.json','.png', '.jpg', '.css', '.sass', '.scss']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                }
            }
        }
    },
    devServer: {
        port:4200,
        historyApiFallback: {
            rewrites: [
                { from: /^\/(\.)*/, to: '/' },
                { from: /^\/(\.)*\/(\.)*/, to: '/' },
            ]
        }
    },
    devtool: "source-map",
};

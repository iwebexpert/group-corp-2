const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
    // Входная точка
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias:{
            components: path.join(__dirname, 'src', 'components'), 
            pages: path.join(__dirname, 'src', 'pages'),
            actions: path.join(__dirname, 'src', 'actions'),
            containers: path.join(__dirname, 'src', 'containers'),
            reducers: path.join(__dirname, 'src', 'reducers'),
            middlewares: path.join(__dirname, 'src', 'middlewares'),
            hooks: path.join(__dirname, 'src', 'hooks'),
        },
        
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        plugins: [["transform-class-properties", { "spec": true }]]
                    },
                    
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
                        loader: "file-loader",
                    },
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new MiniCssExtractPlugin({
            // Название файла в dist
            filename: 'main.css',
        }),
        
    ],
    devServer: {
        historyApiFallback: true,
    },

}
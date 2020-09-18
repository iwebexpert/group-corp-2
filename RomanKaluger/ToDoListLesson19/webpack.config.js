const path = require ('path')

module.exports={
    mode: "development",
    entry: {
        main:['@babel/polyfill','./srcJs/toDoListScript.js'],
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
               test:/\.(png|gif|svg|jpg)$/,
               use:['file-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: "babel-loader",
                    options: {
                        presets:[
                            "@babel/preset-env",
                        ],
                       // plugins: ['@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
        ]
    },
    resolve: {
        extensions: ['.js','.json','.png']
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
    devtool: "source-map",
}

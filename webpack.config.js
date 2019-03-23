const HtmlWebpackPLugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/main.js',
    output:{
        path: __dirname + '/dist/',
        filename: '[name].js'
    },

    devServer:{
        port: 5555,
    },

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: (MiniCssExtractPlugin.loader || 'style-loader') },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            { 
                test: /\.pug$/,
                use: [
                    { 
                        loader: 'pug-loader',
                        options: {
                            pretty: true
                        }
                    },
                ],
            },
        ]
    },

    plugins: [
        new HtmlWebpackPLugin({
            template: './src/pug/master.pug',
            output: __dirname + '/dist/',
        }),
        new MiniCssExtractPlugin({
            filename: 'app.css',
        })
    ]
}
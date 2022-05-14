const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundled.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules|vue\/src/,
                loader: 'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.vue$$/,
                loader: 'vue-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]
                }
            },
            {
                test: /\.css$$/,
                loader: 'css$-loader',
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
        template: './src/index.html'
    })]
}
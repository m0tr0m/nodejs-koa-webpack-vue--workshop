const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: "development",
    entry: './src/main.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundled.js'
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                loader: 'css$-loader',
            },
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".vue"],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
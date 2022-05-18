const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: './src/main.ts',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundled.js'
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:2400",
                changeOrigin: true,
                secure: false,
                pathRewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
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
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".vue", ".css"],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
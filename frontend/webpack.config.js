const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    mode: "development",
    entry: {
        app: './src/main.ts'
    },
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundled.js'
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        port: 8082,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.vue$/,
                // include: path.resolve(__dirname, "src"),
                use: 'vue-loader',
            },
            {
                test: /\.css$/,
                loader: 'css$-loader',
            },
        ]
    },
    resolve: {
        extensions: [".ts", '.tsx', ".vue", ".json"],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
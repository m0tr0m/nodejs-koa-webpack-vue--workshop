const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {VueLoaderPlugin} = require('vue-loader')

module.exports = {
    mode: "development",
    devtool: 'source-map', // Beim build Prozess durch webpack werden hiermit auch source maps erstellt, welche das Debuggen im Browser erleichtern
    entry: './src/main.ts', // Der Einstiegspunkt zum Build-Zeitpunkt
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundled.js'
    },
    devServer: { // Einstellungen für den lokal gestarteten Web-Server
        static: path.join(__dirname, 'dist'),
        port: 3001,

        /* Hier wird ein Proxy definiert, welcher alle Requests mit dem Kontext-Pfad '/api' an das
        target weiterleitet. Der Teil '/api' wird dabei entfernt. So umgeht man bei der Entwicklung die
        Same-Origin-Policy (SOP) von Web-Browsern
        -> https://de.wikipedia.org/wiki/Cross-Origin_Resource_Sharing#:~:text=Cross%2DOrigin%20Resource%20Sharing%20 */
        proxy: {
            "/api": {
                target: "http://localhost:2400",
                changeOrigin: true,
                secure: false,
                pathRewrite: (path) => path.replace(/^\/api/, ""),
            },
        },
    },
    resolve: { // Hier wird definiert, welche Datei-Typen webpack bem Build-Prozess berücksichtigen soll
        extensions: [".js", ".ts", ".vue", ".css"],
    },
    module: { // Hier wird definiert, wie webpack beim Build-Prozess die jeweiligen Datei-Typen laden soll
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
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
    entry: "./src/bootstrap.js",
    mode: "development",
    devServer: {
        port: 3036,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },

    plugins: [
        new ModuleFederationPlugin({
            name: "carousel",
            filename: "remoteEntry.js",
            exposes: {
                "./Carousel": "./src/MovieCarousel",
            },
            shared: {
                react: { singleton: true, requiredVersion: false, eager: true },
                "react-dom": { singleton: true, requiredVersion: false, eager: true },
            },
        }),
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
    ],
    resolve: { extensions: [".js", ".jsx"] },
};

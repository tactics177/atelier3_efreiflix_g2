const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
const webpack = require("webpack");
const dotenv = require('dotenv');

// Charger les variables d'environnement de production
const env = dotenv.config({ path: './.env.production' }).parsed || {};

// Convertir les variables d'environnement en objets pour webpack.DefinePlugin
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
    clean: true
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["@babel/preset-react"],
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys),
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        catalogue_G1: `catalogue_G1@${env.CATALOGUE_URL || 'http://localhost:3003'}/remoteEntry.js`,
        recommendations: `recommendations@${env.RECOMMENDATIONS_URL || 'http://localhost:3055'}/remoteEntry.js`,
        watchlist: `watchlist@${env.WATCHLIST_URL || 'http://localhost:3031'}/watchlist_chunk.js`,
        notation: `notation@${env.NOTATION_URL || 'http://localhost:3032'}/Notation.js`,
        preview: `preview@${env.PREVIEW_URL || 'http://localhost:3033'}/productPreview.js`,
        comments: `comments@${env.COMMENTS_URL || 'http://localhost:3025'}/Comments.js`,
        userprofile: `userProfile@${env.USERPROFILE_URL || 'http://localhost:3034'}/userProfile.js`,
        favoris: `favoris@${env.FAVORIS_URL || 'http://localhost:3010'}/remoteEntry.js`
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: false,
          eager: true
        },
        "react-dom": {
          singleton: true,
          requiredVersion: false,
          eager: true
        }
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
}; 
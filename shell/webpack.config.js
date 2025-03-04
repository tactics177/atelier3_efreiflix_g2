const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3000,
    hot: true,
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
    new ModuleFederationPlugin({
      name: "shell",
      remotes: {
        // We're removing the example MFEs (header and skeleton)
        // header: 'header@http://localhost:3001/remoteEntry.js',
        // skeleton: 'skeleton@http://localhost:3002/remoteEntry.js',
        catalogue_G1: `catalogue_G1@${process.env.CATALOGUE_URL || 'http://localhost:3003'}/remoteEntry.js`,
        recommendations: `recommendations@${process.env.RECOMMENDATIONS_URL || 'http://localhost:3055'}/remoteEntry.js`,
        watchlist: `watchlist@${process.env.WATCHLIST_URL || 'http://localhost:3031'}/watchlist_chunk.js`,
        notation: `notation@${process.env.NOTATION_URL || 'http://localhost:3032'}/Notation.js`,
        preview: `preview@${process.env.PREVIEW_URL || 'http://localhost:3033'}/productPreview.js`,
        comments: `comments@${process.env.COMMENTS_URL || 'http://localhost:3025'}/Comments.js`,
        userprofile: `userProfile@${process.env.USERPROFILE_URL || 'http://localhost:3034'}/userProfile.js`,
        favoris: `favoris@${process.env.FAVORIS_URL || 'http://localhost:3010'}/remoteEntry.js`
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
    // Génération du HTML avec le point d'entrée
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
}; 
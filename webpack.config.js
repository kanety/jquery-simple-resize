const webpack = require("webpack");

module.exports = {
  mode: "production",

  entry: {
    "jquery-simple-resize": "./src/jquery-simple-resize.js"
  },

  output: {
    path: __dirname + "/dist",
    filename: "[name].js",
    publicPath: "/dist"
  },

  externals: {
    jquery: "jQuery"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          /src/,
          /test/,
          /node_modules\/@kanety\/js-store/
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }, {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      }
    ]
  },

  watchOptions: {
    poll: 1000
  },

  devServer: {
    host: "0.0.0.0",
    port: 3000,
    disableHostCheck: true
  }
};

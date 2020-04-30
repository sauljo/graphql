const path = require('path');

module.exports = {
  entry: './frontend/index.js',
  mode: "development",
  output: {
    filename: 'bundleClient.js',
    path: path.resolve(__dirname, './frontend/build'),
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, './frontend/public'),
    compress: true,
    port: 3001,
    stats: 'errors-only'
  }
};
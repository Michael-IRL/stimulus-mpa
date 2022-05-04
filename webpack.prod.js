const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');

module.exports = {
  devtool: 'source-map',

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    index: './src/js/index.js',
    about: './src/js/about.js',
    contact: './src/js/contact.js',
  },

  // how to write the compiled files to disk
  // https://webpack.js.org/concepts/output/
  output: {
    filename: '[name].[hash:20].js',
    path: buildPath,
  },

  // https://webpack.js.org/concepts/loaders/
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new CleanWebpackPlugin(),
    new CssMinimizerPlugin(),
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      exclude: /.map$/,
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/index.html',
      inject: 'body',
      chunks: ['index'],
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/about.html',
      inject: 'body',
      chunks: ['about'],
      filename: 'about.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/contact.html',
      inject: 'body',
      chunks: ['contact'],
      filename: 'contact.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css',
    }),
  ],

  // https://webpack.js.org/configuration/optimization/
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};

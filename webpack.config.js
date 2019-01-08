const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglify-js-plugin');
const PATHS = require('./path');
const Visualizer = require('webpack-visualizer-plugin');

const common = {
  mode: process.env.NODE_ENV,
  output: {
    path: `${PATHS.public}/bundle/`,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',

  },
  watchOptions: {
    poll: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules'],
      },
      {
        test: /\.(png)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 100000,
          },
        }],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  plugins: [
    new UglifyJsPlugin({
      compress: true, // default 'true', you can pass 'false' to disable this plugin
      debug: true, // default 'false', it will display some information in console
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  performance: { hints: false },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendors',
        },
      },
    },
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}',
  },
};

let config;

switch (process.env.npm_lifecycle_event) {
  case 'production_build':
  case 'start':
    config = merge(common, {
      devtool: 'source-map',
      entry: PATHS.src,
    });
    break;
  default:
    config = merge(common, {
      devtool: 'eval-source-map',
      entry: PATHS.src,
    });
}

module.exports = config;

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = function () {
  const webpackConfig = {
    name: 'movie-pwa',
    entry: {
      app: ['./src/appBootstrapper.js'],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, '../public'),
      publicPath: '/'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'flow', 'react'],
              plugins: [
                'transform-decorators-legacy',
                'transform-class-properties'
              ]
            }
          }
        },
        {
          test: /\.woff(\?.*)?$/,
          loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.woff2(\?.*)?$/,
          loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
        },
        {
          test: /\.ttf(\?.*)?$/,
          loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
        },
        {
          test: /\.eot(\?.*)?$/, loader: 'file-loader?prefix=fonts/&name=fonts/[name].[ext]'
        },
        {
          test: /\.svg(\?.*)?$/,
          loader: 'url-loader?prefix=fonts/&name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
        },
        {
          test: /\.(jpg|jpeg|gif|png)$/,
          loader: 'file-loader'
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        hash: true,
        filename: 'index.html',
        inject: 'body'
      })
    ]
  };
  
  return webpackConfig;
};
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import pkg from '../package.json';

export default options => ({
  entry: options.entry,

  output: Object.assign({
    path: path.resolve('./', 'dist'),
    filename: `${pkg.name}-${pkg.version}-[name].js`,
    publicPath: '/',
  }, options.output),

  devServer: options.devServer,

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: ['node_modules'],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve('./', 'src/index.html'),
      inject: 'body',
      hash: false,
      minify: {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        decodeEntities: true,
        processConditionalComments: true,
        removeAttributeQuotes: true,
        removeComments: true,
      },
    }),
  ].concat(options.plugins),

  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'eslint-loader',
        options: {
          failOnWarning: process.env.NODE_ENV !== 'development',
          failOnError: process.env.NODE_ENV !== 'development',
        },
      },
    }, {
      test: /\.(js|jsx)?$/,
      exclude: /node_modules/,
      use: 'babel-loader',
    }],
  },
});

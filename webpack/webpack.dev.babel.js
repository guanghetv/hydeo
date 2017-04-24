import path from 'path';
import webpack from 'webpack';
import HappyPack from 'happypack';

import webpackBaseConfig from './webpack.base';

export default webpackBaseConfig({
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client',
    'webpack/hot/only-dev-server',
    path.resolve('./', 'src/main.jsx'),
  ],

  devServer: {
    host: '0.0.0.0',
    port: 4101,
    inline: true,
    stats: 'errors-only',
    historyApiFallback: true,
    contentBase: path.resolve('./', 'dist'),
    hot: true,
  },

  devtool: 'inline-source-map',

  module: {
    rules: {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['happypack/loader'],
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HappyPack({
      cache: true,
      loaders: ['babel-loader'],
      threads: 5,
    }),
  ],
});

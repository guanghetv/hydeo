import path from 'path';
import webpack from 'webpack';
import TransferWebpackPlugin from 'transfer-webpack-plugin';

export default {
  devServer: {
    host: '0.0.0.0',
    port: 4040,
    inline: true,
    devtool: 'eval',
    contentBase: path.join(__dirname, '/src'),
    hot: true,
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    './examples/index.js',
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      hydeo: path.join(__dirname, '/src'),
    },
  },
  module: {
    preLoaders: [{
      test: /\.js|jsx$/,
      loader: 'eslint-loader',
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.js|jsx$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=8192',
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass'],
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new TransferWebpackPlugin([{
      from: 'examples',
    }]),
  ],
};

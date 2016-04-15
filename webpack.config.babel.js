import path from 'path';
import webpack from 'webpack';

export default {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.js',
  ],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      loaders: ['babel'],
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

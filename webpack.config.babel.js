import path from 'path';
import webpack from 'webpack';

export default {
  devServer: {
    port: 4040,
    contentBase: 'src',
  },
  entry: [
    'webpack/hot/dev-server',
    // 'webpack-dev-server/client?http://localhost:8080',
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
    }, {
      test: /\.png$/,
      loader: 'url-loader?limit=8192',
    }],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

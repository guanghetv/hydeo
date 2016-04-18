import path from 'path';
import webpack from 'webpack';

export default {
  entry: path.resolve(`${__dirname}/src/main.js`),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
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
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }],
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: true,
    },
  })],
};

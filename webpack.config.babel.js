import path from 'path';

export default {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
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
};

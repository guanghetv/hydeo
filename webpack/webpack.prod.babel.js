import path from 'path';
import webpack from 'webpack';

import webpackBaseConfig from './webpack.base';

export default webpackBaseConfig({
  entry: [
    'babel-polyfill',
    path.resolve('./', 'src/main.jsx'),
  ],
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
  ],
});

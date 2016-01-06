var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'src');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

module.exports = {
  entry: APP_PATH + '/scripts/main.js',
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app',
    }),
  ],
};

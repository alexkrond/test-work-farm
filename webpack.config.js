const path = require('path');
const HTMLplugin = require('html-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: './src/index.js',
  output: {
    filename: 'bindle.js',
    path: path.resolve(__dirname, 'public', 'build'),
  },
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'public'),
  },
  plugins: [
      new HTMLplugin({
        template: './src/index.html',
        filename: '../index.html'
      })
  ]
};

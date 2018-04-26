const path = require('path');
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  target: 'web',
  mode: 'none',
  output: {
    filename: 'mowgli-core.js',
    path: path.resolve(__dirname, 'javascripts'),
/*    library: 'T', */
    libraryTarget: 'umd'
  },
  plugins: [
/*    new UglifyJSPlugin({
      uglifyOptions: {
        ecma: 8
      }
    })
*/
  ]
};


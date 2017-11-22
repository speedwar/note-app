/**
 * webpack.dev.config.js
 */

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');
const openBrowserPluginConfig = new openBrowserPlugin({
  url: 'http://localhost:8000',
  delay: 2000
});
const definePluginConfig = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify('development')
});

/* No needed for now
const webpackMiddleware = require("webpack-dev-middleware");
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  title: 'Note application',
  filename: 'index.html'
});
*/

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'source-map',

  // Application entry point
  entry: './src/index.tsx',

  // We build for node
  target: 'node',

  // We are outputting a real node app!
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  // Output files in the build/ folder
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
    //publicPath: '/public/'
  },

  // Webpack Watcher options
  watchOptions: {
    aggregateTimeout: 2000,
    ignored: /node_modules/,
    ignored: /assets/,
    ignored: /routes/,
    ignored: /public/
  },

  plugins: [
    //HtmlWebpackPluginConfig
    openBrowserPluginConfig,
    definePluginConfig
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })
    */
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: path.resolve('./src'),
        loaders: [
          'babel-loader',
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  },

  resolve: {
    modules: [path.resolve('./node_modules')],
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  }
};

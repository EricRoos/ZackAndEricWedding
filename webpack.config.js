var path = require('path');
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle-[hash].js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),
    new HtmlWebpackPlugin({
      template: './index.html'  
    }),
    new CopyWebpackPlugin([
      './img/**/*',
      './*.json'
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|svg|eot|woff2|ttf|woff)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=images/[name].[ext]',
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};

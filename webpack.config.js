const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
});

const config = {
  entry: __dirname + '/app/index.js',
  output:{
    filename: 'app_bundle.js',
    path: path.resolve( __dirname, 'dist')
  },
  plugins: [ HTMLWebpackPluginConfig ],
  module:{
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: '/node_modules/'},
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.css$/, use: 'style-loader!css-loader'},
      {test: /\.(jpe?g|png|gif|svg)$/i,
       use: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
         {
           loader: 'image-webpack-loader',
           query: {
             progressive: true,
             optipng:{
               optimizationLevel: 7,
             },
             gifsicle:{
              interlaced: false,
            },
            pngquant: {
              quality: '65-90',
              speed: 4
            }
          }
         }
       ]
     }
    ]
  }
};

module.exports = config;

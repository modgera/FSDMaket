const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const wpPages = require('./config/wp-pages');
const path = require('path');

const ifdefOpts = {
  includeCodeForTests: false,
  "ifdef-verbose": true       // add this for verbose output
};

module.exports = env  => {
  return {
    entry: './src/index.js',
    mode: 'development',
    output: {
      path: __dirname + "/build",
      filename: 'bundle.js'
    },

    plugins: [

      new HtmlWebpackPlugin({
          filename: 'index.html',
          template: './src/views/pages/index.pug',
          inject: true
      }),

      ...wpPages.pages(env),

      new MiniCssExtractPlugin({
        filename: 'public/styles/[name].bundle.css',
        chunkFilename: '[id].css',
      })
      /*,

      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.$': 'jquery',
        'window.jQuery': 'jquery'
      })*/
    ],

    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
            ,
            { loader: "ifdef-loader", options: ifdefOpts }
          ]
          },

          {
            test: /\.pug$/,
            loader: "pug-loader",
            options: {
              pretty: true
            }
          },

          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              'file-loader?name=./public/img/[name].[ext]'
            ]
          },

          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
              {
                  loader: 'file-loader',
                  options: {
                      name: '[path][name].[ext]',
                      context: path.resolve(__dirname, "src/assets/fonts"),
                      outputPath: 'public/fonts',
                      publicPath: '../fonts',
                      useRelativePaths: true
                  }
              }
          ]
          },

          {
            test: /\.css$/,
            use: [
              env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  sourceMap: true
                },
              },
            ],
          },

          {
            test: /\.scss$/,
            use: [
              env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
              { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } }, // translates CSS into CommonJS
              {
                loader: 'resolve-url-loader',
                options: {
                  sourceMap: true
                }
              },
              'sass-loader', // compiles Sass to CSS
            ],
          },
        ]
    }
  };
}
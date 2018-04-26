var path = require('path')
var webpack = require('webpack')

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { TsConfigPathsPlugin } = require('awesome-typescript-loader');

module.exports = {
  entry: {
    main: path.resolve(__dirname,  'src/public/main.ts'),
  },
  output: {
    path: path.resolve(__dirname, 'dist/public'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      // }, {
      //   test: /\.tsx$/,
      //   loader: 'babel-loader!ts-loader',
      //   options: {
      //     appendTsxSuffixTo: [/TSX\.vue$/],
      //     compilerOptions: {
      //       declaration: false,
      //     }
      //   }
      // }, {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     'file-loader'
      //   ],
      // },
      // {
      //   test: /\.(otf|eot|svg|ttf|woff|woff2|svg)(\?.+)?$/,
      //   loader: 'url-loader'
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/public'], {
      root: path.resolve(__dirname, '..'),
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: `./src/public/index.html`,
    })
  ],
  resolve: {
    mainFields: ['browser', 'main', 'module'],
    extensions: [ '.tsx', '.ts', '.js', '.mjs' ],
    plugins: [
      new TsConfigPathsPlugin({
        tsconfig: path.resolve(__dirname, 'src/public/tsconfig.public.json')
      })
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  devServer: {
    port: 4040,
    proxy: {
      '/graphql': 'http://localhost:4000'
    },
    contentBase: path.join(__dirname, 'src/public'),
    // compress: true,
    // historyApiFallback: true,
    // hot: true,
    // inline: true,
    https: false,
    // noInfo: true,
  },
}

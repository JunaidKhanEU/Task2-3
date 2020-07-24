const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: '[name].[contentHash].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin(), new TerserPlugin()
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '/css/[name].[contentHash].css'
    }),
    new CleanWebpackPlugin() // clean the dist directory when new files generated
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, // 3) extract css in dist
          'css-loader', // 2) turn css into js
          'sass-loader'// 1) turn sass to css
        ]
      }
    ]
  }
}
)

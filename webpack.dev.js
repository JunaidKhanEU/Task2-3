const path = require('path')
const common = require('./webpack.common')
const merge = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', // 3) inject styles into dom
          'css-loader', // 2) turn css into js
          'sass-loader'// 1) turn sass to css
        ]
      }
    ]
  }

})

var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: { main: './src/index.js', vendor: './src/vendor.js' }, // entry and outout only work with js
  plugins: [new HtmlWebpackPlugin({
    template: './src/template.html', // get the template and generate index html with hash js
    minify: {
      collapseWhitespace: true,
      removeComments: true
    }

  })],
  module: {
    rules: [
      {
        test: /\.(html)$/, // look all the assets inside the html
        use: ['html-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'file-loader', // those html assets like images it will split that to dist directory from src directory
          options: { name: '[name].[hash].[ext]', outputPath: 'images' }
        }

      }
    ]
  }

}

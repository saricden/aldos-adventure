const webpack = require('webpack');

module.exports = {
  
  mode: 'development',
  
  entry: {
    game: './src/js/game.js'
  },

  output: {
    path: __dirname + '/build',
    filename: 'game.bundle.js'
  },

  devServer: {
    contentBase: __dirname + '/build'
  },

  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js/
      },
      {
        test: [/\.vert$/, /\.frag$/],
        use: 'raw-loader'
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'CANVAS_RENDERER': JSON.stringify(true),
      'WEBGL_RENDERER': JSON.stringify(true)
    })
  ]

};

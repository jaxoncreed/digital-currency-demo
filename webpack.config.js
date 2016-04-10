module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  entry: [
    './dashboard/index.js'
  ],
  output: {
    path: __dirname + '/dashboard-dist',
    filename: 'bundle.js'
  }
};
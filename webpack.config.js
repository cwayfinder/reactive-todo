module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', './main.js'],
  // entry: ['./main.js'],
  output: {
    path: './dist',
    filename: '[name].js',
  },
  watch: true,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-object-rest-spread']
        },
      },
    ],
  },

};

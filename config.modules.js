const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'env', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        use: [{
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, './node_modules/mini.css/src/'),
              path.resolve(__dirname, './src/assets')]
          }
        }]
      },
      {
        test: /\.(eot|ttf|woff|woff2|jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 200000
            }
          },
          {
            loader: 'img-loader',
            query: {
              mozjpeg: {
                progressive: true,
                quality: 70
              },
              gifsicle: {
                interlaced: false
              },
              optipng: true,
              pngquant: {
                floyd: 0.5,
                speed: 2
              }
            }
          }]
      }]
  }
};

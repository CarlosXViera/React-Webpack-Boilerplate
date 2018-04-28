const path = require('path');
const _Plugins = require('./config.plugins.js');
const _Modules = require('./config.modules.js');

const vendors = ['react', 'react-router-dom', 'react-transition-group'];

const optimizations = {
  minimize: true,
  splitChunks: {
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all'
      }
    }
  }
};

const devServerOptions = {
  contentBase: path.join(__dirname, 'public'),
  port: 9000,
  historyApiFallback: true,
  host: '0.0.0.0',
  disableHostCheck: true,
  hot: true
};

module.exports = {
  entry: {
    app: './src/app.jsx',
    vendor: vendors
  },
  output: {
    path: path.join(__dirname, 'public'),
    filename: '[name].[hash].js',
    publicPath: '/'
  },
  mode: 'production',
  resolve: {
    modules: [path.resolve(__dirname, './vendors'), path.resolve(__dirname, './src'), 'node_modules', path.resolve(__dirname, './src/components'), path.resolve(__dirname, './src/api'), path.resolve(__dirname, './src/vendors')],
    alias: {
      applicationStyles: path.resolve(__dirname, './src/styles/main.scss')
    },
    extensions: ['.js', '.jsx']
  },
  optimization: optimizations,
  module: _Modules.module,
  plugins: _Plugins.plugins,
  devServer: devServerOptions,
  devtool: 'cheap-module-source-map'
};

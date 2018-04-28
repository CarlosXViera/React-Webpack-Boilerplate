const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const vendors = ['react', 'react-router-dom', "react-transition-group"];

module.exports = {
	entry: {
		app: './src/app.jsx',
		vendor: vendors,
	},
	output: {
		path: path.join(__dirname, 'public'),
		filename: '[name].[hash].js',
		publicPath: '/'
	},
	mode: 'production',
	resolve: {
		modules: [path.resolve(__dirname, "./vendors"), path.resolve(__dirname, "./src"), "node_modules", path.resolve(__dirname, "./src/components"), path.resolve(__dirname, "./src/api"), path.resolve(__dirname, "./src/vendors")],
		alias: {
			applicationStyles: path.resolve(__dirname, "./src/styles/main.scss")
		},
		extensions: ['.js', '.jsx']
	},
	optimization: {
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
	},
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
								interlaced: false,
							},
							optipng: true,
							pngquant: {
								floyd: 0.5,
								speed: 2
							}
						}
		 }]
	 }]
	},
	plugins: [
		new CleanWebpackPlugin(['public'], {
			root: path.resolve(__dirname),
			verbose: true,
			dry: false,
			exclude: ['fonts', 'favicon.png', 'assets', '.keep']
		}),
		new HtmlWebpackPlugin({
			template: 'src/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
		}),
    new webpack.HotModuleReplacementPlugin(),
    // Use NoErrorsPlugin for webpack 1.x
    new webpack.NoEmitOnErrorsPlugin()
	],
	devServer: {
		contentBase: path.join(__dirname, "public"),
		port: 9000,
		historyApiFallback: true,
		host: "0.0.0.0",
		disableHostCheck: true,
		hot: true
	},
	// devtool: 'cheap-module-source-map'
};
const express = require("express");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackMiddleware = require('webpack-dev-middleware');
const historyApiFallback = require('connect-history-api-fallback');
const webpackHotMiddleware = require('webpack-hot-middleware');

const port = process.env.PORT || 4001;

const ip = require('lodash')
	.chain(require('os').networkInterfaces())
	.values()
	.flatten()
	.find({
		family: 'IPv4',
		internal: false
	})
	.value()
	.address;

const app = express();

// const compiler = webpack(webpackConfig);

app.set('port', port);

app.use(historyApiFallback({
	verbose: false
}));

// app.use(webpackMiddleware(compiler, {
// 	contentBase: path.join(__dirname, "public"),
// 	publicPath: webpackConfig.output.publicPath,
// 	noInfo: true,
// 	hot: true,
// 	quiet: false,
// 	noInfo: false,
// 	lazy: false,
// 	stats: {
// 		colors: true
// 	}
// }));

// app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname + '/public', 'index.html'));
});

app.listen(port, () => console.log(`Listening on: https://${ip}:${port}`));
const path = require('path');
const webpack = require('webpack');
const bundleName = 'bundle';

const prodMode = (process.env.NODE_ENV === 'production');
const plugins = [
	// new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
];

if (prodMode) {
  const announcement = 'BUNDLING FOR PRODUCTION :::: EXPECT DELAYS';
	const divider = new Array(Math.floor(process.stdout.columns / 3)).fill('-=~').join('');
  const spacer = new Array(Math.floor((process.stdout.columns - announcement.length) / 2)).fill(' ').join('');
	console.log(divider);
	console.log(spacer + announcement);
	console.log(divider);

	const minifier = new webpack.optimize.UglifyJsPlugin({
		sourceMap: true,
		output: { comments: false }
	});
	plugins.push(minifier);
}

module.exports = {
	entry: __dirname + '/app.js',
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: `${bundleName}.js`,
		publicPath: '/dist/'
	},
	devServer: {
    port: 1235,
    historyApiFallback: {
      index: 'index.html'
    }
  },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'babel-loader' }
				]
			},
			{
				test: /\.scss$/,
				exclude: /bower_components/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' },
					{ loader: 'sass-loader' }
				]
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader' }
				]
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{ loader: 'file-loader' }
				]
			},
			{
			  test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
			  test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
			},
			{
			  test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
			  loader: 'file-loader'
			},
			{
			  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
			}
		]
	},
	resolve: {
		alias: {
			['font-awesome']: path.resolve(__dirname, 'node_modules/font-awesome/css/font-awesome.css')
		},
		modules: [
			path.resolve(__dirname, 'src'),
			path.resolve(__dirname, 'node_modules'),
			path.resolve(__dirname, 'bower_components'),
			path.resolve(__dirname, 'style')
		],
		descriptionFiles: ['package.json', 'bower.json'],
		extensions: ['.js', '.jsx', '.scss', '.css', '.json']
	},
	plugins
};

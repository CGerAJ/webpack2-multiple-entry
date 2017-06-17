const path = require('path');
const webpack = require('webpack');
const ROOT = process.cwd();  // 根目录
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const postcssConfigPath = './config/postcss.config.js';
const glob = require('glob');

let entryHtml = getEntryHtml('./src/view/**/*.html'),
	entryJs = getEntry('./src/js/**/*.js'),
	configPlugins = [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common'
		}),
		new ExtractTextPlugin({
			filename: 'css/[name].css?[contenthash:8]',
			allChunks: true
		}),
	];

// html
entryHtml.forEach(function (v) {
	configPlugins.push(new HtmlWebpackPlugin(v));
});

// 配置
const config = {
	entry: entryJs,
	// @see https://github.com/webpack-contrib/extract-text-webpack-plugin/blob/master/example/webpack.config.js
	output: {
		filename: 'js/[name].js?[chunkhash:8]',
		chunkFilename: 'js/[name].js?[chunkhash:8]',
		path: path.resolve(ROOT, 'dist'),
		publicPath: '/'
	},   
	module: {
		rules: [
			{
				test: /\.(less|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						}, 
						{
							loader: 'less-loader'
						}, 
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: postcssConfigPath
								}
							}
						}
					]
				})
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env']
					}
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100,
							publicPath: '',
							name: '/img/[name].[ext]?[hash:8]'
						}
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100,
							publicPath: '',
							name: '/font/[name].[ext]?[hash:8]'
						}
					}
				]
			},
			// @see https://github.com/wzsxyz/html-withimg-loader
			{
				test: /\.(htm|html)$/i,
				loader: 'html-withimg-loader?min=false'
			}
		]
	},
	resolve: {
		alias: {
			views:  path.resolve(ROOT, './src/view')	
		}
	},
	plugins: configPlugins,
	// @see http://webpack.github.io/docs/webpack-dev-server.html
	// @see http://www.css88.com/doc/webpack2/configuration/dev-server/
	devServer: {
		contentBase: [
			path.join(ROOT, 'dist/')
		],
		hot: false,
		host: '0.0.0.0',
		port: 8080
	}
};

/**
 * 根据目录获取入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
function getEntry (globPath) {
	let entries = {};
	glob.sync(globPath).forEach(function (entry) {
		let basename = path.basename(entry, path.extname(entry)),
			pathname = path.dirname(entry);
		// js/lib/*.js 不作为入口
		if (!entry.match(/\/js\/lib\//)) {
			entries[pathname.split('/').splice(3).join('/') + '/' + basename] = pathname + '/' + basename;
		}
	});
	return entries;
}

/**
 * 根据目录获取 Html 入口
 * @param  {[type]} globPath [description]
 * @return {[type]}          [description]
 */
function getEntryHtml (globPath) {
	let entries = [];
	glob.sync(globPath).forEach(function (entry) {
		let basename = path.basename(entry, path.extname(entry)),
			pathname = path.dirname(entry);

		entries.push({
			filename: entry.split('/').splice(2).join('/'),
			template: entry,
			chunks: ['common', pathname.split('/').splice(3).join('/') + '/' + basename]
		});

	});
	return entries;
}

module.exports = config;
var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
	devtool: false,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'babyfsWechat.min.js',
		publicPath: '',
		library: 'babyfs-wechat',
		libraryTarget: 'umd'
	},
	externals: [{
		'babel-polyfill': {
			commonjs: 'babel-polyfill',
			commonjs2: 'babel-polyfill',
			amd: 'babel-polyfill'
    },
    'babyfs-wechat-jssdk': {
      root: 'wx',
			commonjs: 'babyfs-wechat-jssdk',
			commonjs2: 'babyfs-wechat-jssdk',
			amd: 'babyfs-wechat-jssdk'
    }
  },
  nodeExternals({
    whitelist: ['babel-polyfill', 'babyfs-wechat-jssdk'],
    importType: function(moduleName) {
      return 'umd ' + moduleName;
    }
  })],
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: false
		}),
		new ExtractTextPlugin('babyfsWechat.min.css'),
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		})
	]
});

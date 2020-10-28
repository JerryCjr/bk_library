var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = merge(baseConfig, {
	devtool: false,
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'babyfs-component-loading.min.js',
		publicPath: '',
		library: 'babyfs-component-loading',
		libraryTarget: 'umd'
	},
	externals: [{
		'babel-polyfill': {
			commonjs: 'babel-polyfill',
			commonjs2: 'babel-polyfill',
			amd: 'babel-polyfill'
		},
    'vue': {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
	},
  nodeExternals({
    whitelist: ['babel-polyfill', 'vue'],
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
		new ExtractTextPlugin('babyfs-component-loading.min.css'),
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		})
	]
});

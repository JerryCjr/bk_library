var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var path = require('path');

module.exports = merge(baseConfig, {
	devtool: false,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'babyfsGameWheel.min.js',
		publicPath: '',
		library: 'babyfs-game-wheel',
		libraryTarget: 'umd'
	},
	externals: {
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
    },
    'expose-loader?PIXI!phaser-ce/build/custom/pixi.js': {
      root: 'PIXI',
      commonjs: 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js',
      commonjs2: 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js',
      amd: 'expose-loader?PIXI!phaser-ce/build/custom/pixi.js'
    },
    'expose-loader?p2!phaser-ce/build/custom/p2.js': {
      root: 'p2',
      commonjs: 'expose-loader?p2!phaser-ce/build/custom/p2.js',
      commonjs2: 'expose-loader?p2!phaser-ce/build/custom/p2.js',
      amd: 'expose-loader?p2!phaser-ce/build/custom/p2.js'
    },
    'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js': {
      root: 'Phaser',
      commonjs: 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js',
      commonjs2: 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js',
      amd: 'expose-loader?Phaser!phaser-ce/build/custom/phaser-split.js'
    }
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			sourceMap: false
		}),
		new ExtractTextPlugin('babyfsGameWheel.min.css'),
		new OptimizeCSSPlugin({
			cssProcessorOptions: {
				safe: true
			}
		})
	]
});

var baseConfig = require('./webpack.base.config');
var merge = require('webpack-merge');

var testConfig = merge(baseConfig, {
	devtool: 'inline-source-map',
	externals: {
		'babel-polyfill': {
			commonjs: 'babel-polyfill',
			commonjs2: 'babel-polyfill',
			amd: 'babel-polyfill'
    }
	},
});

delete testConfig.entry;

module.exports = testConfig;

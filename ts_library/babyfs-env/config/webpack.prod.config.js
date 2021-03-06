const merge = require('webpack-merge');
const base = require('./webpack.base.config.js');
const { outputPath } = require('./index.js');

module.exports = merge(base, {
  devtool: false,
  devServer: {
    contentBase: outputPath(),
    compress: true,
    open: false,
    port: '3000',
    host: 'localhost',
    hot: true,
    inline: true,
  },
  externals: [/^@babyfs/],
});

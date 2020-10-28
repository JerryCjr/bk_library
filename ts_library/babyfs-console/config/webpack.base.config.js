var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { entryPath, outputPath } = require('./index.js');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}
function __path_src() {
  return path.resolve(__dirname, '../src');
}
function __path_test() {
  return path.resolve(__dirname, '../test/unit');
}
function __module_include() {
  return [__path_src(), __path_test()];
}
function __module_css_include() {
  var arr = __module_include();
  return arr;
}
function __cssLoaders() {
  if (process.env.NODE_ENV === 'production') {
    return ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: process.env.NODE_ENV === 'production' ? false : true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: process.env.NODE_ENV === 'production' ? false : true,
          },
        },
      ],
    });
  } else {
    return [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
      },
      {
        loader: 'postcss-loader',
      },
    ];
  }
}

module.exports = {
  entry: entryPath(),
  output: {
    filename: 'index.js',
    path: outputPath(),
    library: 'babyfs-console', // library name
    libraryTarget: 'umd', // cmd amd var
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true },
          },
          { loader: 'ts-loader' },
        ],
      },
      {
        resource: {
          test: /\.css$/,
          include: __module_css_include(),
        },
        use: __cssLoaders(),
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    },
  },
  plugins: [new CleanWebpackPlugin()],
};

var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    "index-index":"./static_app/pages/index/index.js",
    "test-index":"./static_app/pages/test/index.js"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/',
    filename: 'js/[hash:8].[name].js'
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, 'node_modules')],
    alias: {
      // 'src': path.resolve(__dirname, 'static_app'),
      // 'assets': path.resolve(__dirname, 'static_app/assets'),
      // 'components': path.resolve(__dirname, 'static_app/components')
    }
  },
  module: {
    loaders: [
      {test: /\.vue$/, loader: 'vue'},
      {test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      {test: /\.json$/, loader: 'json'},
      {test: /\.html$/, loader: 'vue-html'},
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins:[
    //通过一些计算方式减少chunk的大小的插件
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('css/[name].css',{
        allChunks: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'static_app/pages/index/index.html',
      chunks:["index-index"],
      inject:true,
      //压缩HTML文件
      minify:{
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:true //删除空白符与换行符
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'test/index.html',
      template: 'static_app/pages/test/index.html',
      chunks:["test-index"],
      inject:true,
      //压缩HTML文件
      minify:{
        removeComments:true,    //移除HTML中的注释
        collapseWhitespace:true //删除空白符与换行符
      }
    })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vuejs.github.io/vue-loader/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ])
}

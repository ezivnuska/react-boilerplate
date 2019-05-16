const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  node: { fs: 'empty' },
  target: 'node',
  stats: {
    chunks: true,
    chunkModules: true,
    colors: true,
    children: false,
  },
  entry: './server.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'babel-loader',
            options: {
              compact: false
            }
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/,
        use: 'null-loader',
      }
    ]
  },
  externals: [webpackNodeExternals()],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src', 'assets')],
    alias: {
      api: path.resolve(__dirname, './api'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      hoc: path.resolve(__dirname, './src/hoc'),
      layouts: path.resolve(__dirname, './src/layouts'),
      queries: path.resolve(__dirname, './src/queries'),
      helpers: path.resolve(__dirname, './src/helpers'),
      models: path.resolve(__dirname, './src/models'),
      pages: path.resolve(__dirname, './src/pages')
    }
  }
}

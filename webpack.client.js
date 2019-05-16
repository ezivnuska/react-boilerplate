const path = require('path')
const webConfig = require('./config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: ['./src/client.js', './src/assets/scss/main.scss'],
  output: {
    filename: 'client_bundle.js',
    path: path.resolve(__dirname, 'build/public'),
    publicPath: '/build/public'
  },
  stats: {
    chunks: true,
    chunkModules: true,
    colors: true,
    children: false,
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
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].css',
      chunkFilename: 'assets/css/[id].css',
    }),
    new CopyWebpackPlugin([
      { from: 'src/assets/graphics', to: 'assets/graphics' },
      { from: 'src/assets/email_templates', to: 'assets/email_templates' },
      { from: 'user-uploads/profile-images', to: 'assets/user-uploads/profile-images' }
    ])
  ],
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src', 'assets')],
    alias: {
      api: path.resolve(__dirname, './api'),
      assets: path.resolve(__dirname, './src/assets'),
      components: path.resolve(__dirname, './src/components'),
      config: path.resolve(__dirname, './config'),
      hoc: path.resolve(__dirname, './src/hoc'),
      layouts: path.resolve(__dirname, './src/layouts'),
      queries: path.resolve(__dirname, './src/queries'),
      helpers: path.resolve(__dirname, './src/helpers'),
      models: path.resolve(__dirname, './src/models'),
      pages: path.resolve(__dirname, './src/pages')
    }
  }
}

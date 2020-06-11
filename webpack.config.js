const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = env => {
  const isProd = (env || {}).NODE_ENV === 'prod';

  return {
    context: __dirname, // to automatically find tsconfig.json
    devtool: isProd ? 'source-map' : 'cheap-module-source-map',
    output: {
      path: path.join(__dirname, 'build'),
      filename: 'bundle.[hash].js',
      publicPath: '/'
    },
    devServer: {
      contentBase: path.join(__dirname, 'build'),
      historyApiFallback: true,
      compress: true,
      port: 4646
    },
    resolve: {
      alias: {
        '@components': path.resolve(path.join(__dirname, 'src/components')),
        '@containers': path.resolve(path.join(__dirname, 'src/containers')),
        '@global-scss': path.resolve(path.join(__dirname, 'src/global-scss')),
        '@core': path.resolve(path.join(__dirname, 'src/core')),
        '@pages': path.resolve(path.join(__dirname, 'src/pages')),
        '@src': path.resolve(path.join(__dirname, 'src')),
        '@redux': path.resolve(path.join(__dirname, 'src/redux')),
        '@utils': path.resolve(path.join(__dirname, 'src/utils')),
        '@root': __dirname
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss']
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: { transpileOnly: true }
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        // Scoped SCSS for components.
        {
          test: /\.scss$/,
          exclude: /node_modules|global-scss/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isProd ? '[hash:base64:10]' : '[name]_[local]-[hash:base64:5]'
                },
                localsConvention: 'camelCase'
              }
            },
            {
              loader: 'postcss-loader',
              options: { plugins: [require('autoprefixer')] }
            },
            'sass-loader'
          ]
        },
        // Global SCSS for global styles (should be in global-scss folder)
        {
          test: /\.scss$/,
          include: /global-scss/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: { plugins: [require('autoprefixer')] }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new MiniCssExtractPlugin({}),
      new HtmlWebPackPlugin({
        template: './src/index.html',
        filename: './index.html'
      })
    ]
  };
};

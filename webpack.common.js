const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: {
          loader: 'handlebars-loader',
          options: {
            runtime: path.resolve(__dirname, './build/HandlebarsRuntime/Handlebars.cjs'),
            precompileOptions: {
              knownHelpersOnly: false,
            },
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      stage: 2,
                      minimumVendorImplementations: 2,
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      stage: 2,
                      minimumVendorImplementations: 2,
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            targets: '> 0.25%, not dead',
            presets: [['@babel/preset-env']],
          },
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  entry: {
    app: './src/index.ts',
    survey: './src/survey/survey.ts',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Art',
      template: path.resolve(__dirname, './src/index.hbs'),
      filename: 'index.html',
      chunks: ['app'],
    }),
    new HtmlWebpackPlugin({
      title: 'CSAT',
      template: path.resolve(__dirname, './src/survey/survey.hbs'),
      filename: 'survey/index.html',
      chunks: ['survey'],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@static': path.resolve(__dirname, 'src/public'),
      '@api': path.resolve(__dirname, 'src/modules/api'),
      '@common_utils': path.resolve(__dirname, 'src/modules/common_utils'),
      '@survey': path.resolve(__dirname, 'src/survey'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};

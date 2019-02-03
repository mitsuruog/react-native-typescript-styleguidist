const webpack = require('webpack');
const path = require('path');

// See: https://github.com/styleguidist/react-docgen-typescript#parseroptions
const parserOptions = {};

module.exports = {
  require: ['@babel/polyfill'],
  ignore: ['**/*.{spec,style}.{ts,tsx}'],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/Wrapper')
  },
  components: 'src/shared/components/**/*.{ts,tsx}',
  webpackConfig: {
    resolve: {
      alias: {
        'react-native': 'react-native-web',
        // 'react-native-vector-icons': 'react-native-web-vector-icons'
      },
      extensions: ['.web.js', '.js', '.ts', '.web.ts', '.tsx', '.web.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(js|tsx?)$/,
          loader: 'babel-loader',
          options: {
            ignore: [/[\/\\]core-js/, /@babel[\/\\]runtime/],
            plugins: [
              '@babel/proposal-class-properties',
              '@babel/proposal-object-rest-spread',
              'react-native-web'
            ],
            presets: [
              '@babel/env',
              '@babel/preset-typescript',
              'module:metro-react-native-babel-preset'
            ],
            babelrc: false,
          },
        },
        {
          test: /\.js$/,
          use: ['source-map-loader'],
          enforce: 'pre'
        },
        {
          test: /\.(jpe?g|png|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                hash: 'sha512',
                digest: 'hex',
                name: '[hash].[ext]',
              },
            },
          ],
        },
        {
          test: /\.ttf$/,
          loader: 'file-loader',
          include: path.resolve(__dirname, 'node_modules/react-native-vector-icons/Fonts'),
        },
      ],
    },
    plugins: [
      // Add __DEV__ flag to browser example.
      new webpack.DefinePlugin({
        __DEV__: process.env,
      }),
    ],
  },
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', [parserOptions]).parse
};

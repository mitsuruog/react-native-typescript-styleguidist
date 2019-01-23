const webpack = require('webpack');

// See: https://github.com/styleguidist/react-docgen-typescript#parseroptions
const parserOptions = {};

module.exports = {
  require: ['@babel/polyfill'],
  ignore: ['**/*.{spec,style}.{ts,tsx}'],
  sections: [
    {
      name: 'UI Components',
      components: 'src/shared/components/**/*.{ts,tsx}',
      exampleMode: 'expand', // 'hide' | 'collapse' | 'expand'
      usageMode: 'expand' // 'hide' | 'collapse' | 'expand'
    }
  ],
  webpackConfig: {
    resolve: {
      alias: {
        'react-native': 'react-native-web'
      },
      extensions: ['.web.js', '.js', '.ts', '.web.ts', '.tsx', '.web.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
          options: {
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

const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    'dwh-k6-perf': './tests/dwh-k6-perf.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    libraryTarget: 'commonjs',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env']],
          },
        },
      },
    ],
  },
  // k6 modules are built-in, so we mark them as external
  externals: /^k6(\/.*)?/,
  stats: {
    colors: true,
  },
};

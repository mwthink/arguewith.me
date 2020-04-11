import { Configuration } from 'webpack';
import * as Path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  mode: 'development',
  entry: Path.resolve(__dirname, 'src/client/browser.tsx'),
  output: {
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.ts','.tsx','.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'ts-loader'}
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'arguewith.me',
      hash: true
    })
  ],
  devServer: {
    contentBase: Path.join(__dirname, 'dist'),
    port: 3030,
  }
};

export default config;
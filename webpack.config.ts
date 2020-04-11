import { Configuration } from 'webpack';
import * as Path from 'path';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration = {
  mode: 'development',
  entry: Path.resolve(__dirname, 'src/client/browser.tsx'),
  output: {
    path: Path.resolve(__dirname, 'dist/client'),
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
      hash: true,
      template: Path.resolve(__dirname, 'src/client/tpl.html')
    })
  ],
  devServer: {
    contentBase: false,
    port: 3030,
  }
};

export default config;
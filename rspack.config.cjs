const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname);

/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: Object.fromEntries(
    fs.readdirSync(path.resolve(rootDir, 'src/components'))
      .filter(dir => fs.statSync(path.resolve(rootDir, 'src/components', dir)).isDirectory())
      .map(dir => [dir, path.resolve(rootDir, 'src/components', dir, 'index.ts')])
  ),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: '[name].js',
    library: {
      type: 'umd',
      name: 'WebComponents',
    },
    globalObject: 'this',
    clean: true,
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'demo'),
        publicPath: '/',
      },
      {
        directory: path.join(__dirname, 'dist'),
        publicPath: '/dist',
      }
    ],
    port: 3000,
    hot: true,
    open: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        type: 'asset/source',
        use: [
          {
            loader: 'sass-loader',
            options: {
              api: 'modern',
              implementation: require.resolve('sass'),
              sassOptions: {
                outputStyle: 'compressed',
                charset: false,
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        type: 'asset/source',
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css', '.scss'],
  },
  mode: 'development',
};

module.exports = config; 
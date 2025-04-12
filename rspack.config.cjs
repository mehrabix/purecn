const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');

const rootDir = path.resolve(__dirname);

// Get component entries
const getEntries = () => {
  const entries = {};
  fs.readdirSync(path.resolve(rootDir, 'src/components'))
    .filter(dir => fs.statSync(path.resolve(rootDir, 'src/components', dir)).isDirectory())
    .forEach(dir => {
      entries[dir] = path.resolve(rootDir, 'src/components', dir, 'index.ts');
      entries[`${dir}.min`] = path.resolve(rootDir, 'src/components', dir, 'index.ts');
    });
  return entries;
};

/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: getEntries(),
  output: {
    path: path.resolve(rootDir, 'dist/components'),
    filename: (pathData) => {
      const name = pathData.chunk.name;
      const isMin = name.endsWith('.min');
      const baseName = isMin ? name.slice(0, -4) : name;
      return `${baseName}/${isMin ? '[name]' : baseName}.js`;
    },
    library: {
      type: 'umd',
      name: 'WebComponents',
    },
    globalObject: 'this',
    clean: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false,
          },
          compress: {
            dead_code: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log'],
            passes: 2,
          },
          mangle: true,
        },
      }),
    ],
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
  mode: 'production',
};

module.exports = config; 
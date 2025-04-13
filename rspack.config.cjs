const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const zlib = require('zlib');

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

// Compression function
const compressFiles = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (!filePath.includes('__tests__')) {
        compressFiles(filePath);
      }
    } else if (file.endsWith('.js')) {
      const content = fs.readFileSync(filePath);
      const gzContent = zlib.gzipSync(content);
      const brContent = zlib.brotliCompressSync(content);
      fs.writeFileSync(`${filePath}.gz`, gzContent);
      fs.writeFileSync(`${filePath}.br`, brContent);
      console.log(`Compressed: ${filePath}`);
    }
  }
};


/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: {
    'theme-provider': path.resolve(rootDir, 'src/components/theme/theme-provider.ts'),
    ...getEntries()
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: (pathData) => {
      const name = pathData.chunk.name;
      if (name === 'theme-provider') {
        return 'theme-provider.min.js';
      }
      const isMin = name.endsWith('.min');
      const baseName = isMin ? name.slice(0, -4) : name;
      return `components/${baseName}/${isMin ? baseName + '.min' : baseName}.js`;
    },
    library: {
      type: 'module'
    },
    globalObject: 'this',
    environment: {
      module: true,
      dynamicImport: true
    },
    clean: true,
  },
  experiments: {
    outputModule: true,
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.min\.js$/,
        extractComments: false,
        terserOptions: {
          parse: {
            ecma: 8
          },
          format: {
            comments: false,
            ecma: 5,
            ascii_only: true
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            dead_code: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log']
          },
          mangle: {
            safari10: true
          }
        },
      }),
    ],
  },
  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'src/pages'),
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
    watchFiles: ['src/pages/**/*'],
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'ESNext',
            },
          },
        },
        exclude: [/node_modules/, /__tests__/, /\.test\.ts$/, /\.spec\.ts$/],
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
  plugins: [
    {
      name: 'compression-plugin',
      apply(compiler) {
        compiler.hooks.afterEmit.tap('CompressionPlugin', () => {
          console.log('Starting compression...');
          try {
            compressFiles(path.resolve(rootDir, 'dist'));
            console.log('Compression completed!');
          } catch (error) {
            console.error('Error during compression:', error);
          }
        });
      },
    },
  ],
};

module.exports = config; 
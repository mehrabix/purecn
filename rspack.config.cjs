const path = require('path');
const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const zlib = require('zlib');

const rootDir = path.resolve(__dirname);
const isProduction = process.env.NODE_ENV === "production";

// Get all components by reading the src/components directory
const getComponentEntries = () => {
  const entries = {};
  // Read all component directories
  const componentDirs = fs.readdirSync(path.resolve(rootDir, 'src/components'))
    .filter(dir => {
      const dirPath = path.resolve(rootDir, 'src/components', dir);
      return fs.statSync(dirPath).isDirectory() && 
             !dir.startsWith('__') &&         // Skip all directories starting with __
             !dir.includes('mock') &&         // Skip any mock directories
             !dir.includes('Mock');
    });
  
  // Add each component as an entry point
  componentDirs.forEach(dir => {
    // Use the index.ts file as the entry point
    const indexPath = path.resolve(rootDir, 'src/components', dir, 'index.ts');
    if (fs.existsSync(indexPath)) {
      entries[`components/${dir}/${dir}`] = indexPath;
      entries[`components/${dir}/${dir}.min`] = indexPath;
    }
    
    // Also check for any standalone component files
    const files = fs.readdirSync(path.resolve(rootDir, 'src/components', dir))
      .filter(file => 
        file.endsWith('.ts') && 
        !file.endsWith('.test.ts') && 
        !file.endsWith('.d.ts') && 
        !file.endsWith('.mock.ts') &&
        !file.endsWith('.spec.ts') &&
        !file.includes('mock') &&
        !file.includes('Mock') &&
        !file.includes('test') &&
        !file.includes('Test') &&
        file !== 'index.ts'
      );
    
    files.forEach(file => {
      const componentName = file.replace('.ts', '');
      const filePath = path.resolve(rootDir, 'src/components', dir, file);
      entries[`components/${dir}/${componentName}`] = filePath;
      entries[`components/${dir}/${componentName}.min`] = filePath;
    });
  });
  
  return entries;
};

// Ensure dist directory exists
const ensureDistDirectories = () => {
  if (!isProduction) return;
  
  const distDir = path.resolve(rootDir, 'dist');
  const componentsDir = path.resolve(distDir, 'components');
  
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }
  
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }
  
  // Create component subdirectories
  const componentDirs = fs.readdirSync(path.resolve(rootDir, 'src/components'))
    .filter(dir => {
      const dirPath = path.resolve(rootDir, 'src/components', dir);
      return fs.statSync(dirPath).isDirectory() && 
             !dir.startsWith('__') &&         // Skip all directories starting with __
             !dir.includes('mock') &&         // Skip any mock directories
             !dir.includes('Mock');
    });
  
  componentDirs.forEach(dir => {
    const componentDir = path.resolve(componentsDir, dir);
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }
  });
};

// Compression function
const compressFiles = (dir) => {
  if (!isProduction) return;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip any directories that might contain mocks or tests
      if (!file.startsWith('__') && 
          !file.includes('mock') && 
          !file.includes('Mock') && 
          !file.includes('test') && 
          !file.includes('Test')) {
        compressFiles(filePath);
      }
    } else if (file.endsWith('.js') && 
               !file.includes('mock') &&
               !file.includes('Mock') &&
               !file.includes('test') &&
               !file.includes('Test')) {
      const content = fs.readFileSync(filePath);
      const gzContent = zlib.gzipSync(content);
      const brContent = zlib.brotliCompressSync(content);
      fs.writeFileSync(`${filePath}.gz`, gzContent);
      fs.writeFileSync(`${filePath}.br`, brContent);
      console.log(`Compressed: ${filePath}`);
    }
  }
};

// Create components index
const createComponentIndex = () => {
  if (!isProduction) return;
  
  const componentsDir = path.resolve(rootDir, 'dist/components');
  if (!fs.existsSync(componentsDir)) return;
  
  // Generate index content
  const componentDirs = fs.readdirSync(componentsDir)
    .filter(dir => 
      fs.statSync(path.join(componentsDir, dir)).isDirectory() &&
      !dir.startsWith('__') &&
      !dir.includes('mock') &&
      !dir.includes('Mock')
    );
  
  const indexContent = componentDirs
    .map(dir => {
      const dirPath = path.join(componentsDir, dir);
      const files = fs.readdirSync(dirPath);
      
      // Find the main component file (not .min.js)
      const mainFile = files.find(file => 
        file.endsWith('.js') && 
        !file.endsWith('.min.js') && 
        !file.endsWith('.d.ts') && 
        !file.includes('.js.') &&
        !file.includes('mock') &&
        !file.includes('Mock') &&
        !file.includes('test') &&
        !file.includes('Test')
      );
      
      if (mainFile) {
        const componentName = mainFile.replace('.js', '');
        return `export * from './${dir}/${componentName}.js';`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n');
  
  fs.writeFileSync(path.join(componentsDir, 'index.js'), indexContent + '\n');
  console.log('Created components index.js file');
  
  // Compress the index file
  const content = fs.readFileSync(path.join(componentsDir, 'index.js'));
  const gzContent = zlib.gzipSync(content);
  const brContent = zlib.brotliCompressSync(content);
  fs.writeFileSync(path.join(componentsDir, 'index.js.gz'), gzContent);
  fs.writeFileSync(path.join(componentsDir, 'index.js.br'), brContent);
  console.log('Compressed index.js file');
};

// Create the CLI directory and files
const buildCliFiles = () => {
  if (!isProduction) return;
  
  const sourcePath = path.resolve(rootDir, 'src/cli');
  const targetPath = path.resolve(rootDir, 'dist/cli');
  
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
    console.log(`Created CLI directory: ${targetPath}`);
  }
  
  // Read all files from the source directory
  if (fs.existsSync(sourcePath)) {
    const files = fs.readdirSync(sourcePath);
    
    // Copy each file to the target directory
    for (const file of files) {
      const sourceFilePath = path.join(sourcePath, file);
      const targetFilePath = path.join(targetPath, file);
      
      // Skip directories and any files related to mocks or tests
      const stats = fs.statSync(sourceFilePath);
      if (stats.isDirectory() || 
          file.includes('mock') || 
          file.includes('Mock') ||
          file.includes('test') ||
          file.includes('Test')) {
        console.log(`Skipping: ${sourceFilePath}`);
        continue;
      }
      
      // Read source file and write to target
      const contents = fs.readFileSync(sourceFilePath, 'utf8');
      fs.writeFileSync(targetFilePath, contents);
      console.log(`Copied: ${sourceFilePath} -> ${targetFilePath}`);
    }
  }
};

// Ensure directories exist before build starts
ensureDistDirectories();

/**
 * @type {import('@rspack/cli').Configuration}
 */
const config = {
  entry: getComponentEntries(),
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: (pathData) => {
      return pathData.chunk.name.endsWith('.min') ? 
        `${pathData.chunk.name.replace('.min', '')}.min.js` : 
        `${pathData.chunk.name}.js`;
    },
    library: isProduction 
      ? { type: 'module' }
      : { type: 'umd', name: 'purecn' },
    publicPath: '/',
    globalObject: 'window',
    environment: {
      module: true,
      dynamicImport: true
    },
    clean: false, // We handle cleaning manually
  },
  experiments: {
    outputModule: isProduction,
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
            drop_console: isProduction,
            drop_debugger: isProduction,
            pure_funcs: isProduction ? ['console.log'] : []
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
        directory: path.join(__dirname, 'dist/components'),
        publicPath: '/components',
      }
    ],
    compress: false, // Disable compression for faster development
    port: 9000,
    hot: true,
    liveReload: true, // Enable live reload for better HMR experience
    watchFiles: {
      paths: ["src/**/*"],
      options: {
        usePolling: false,
        ignored: /node_modules/,
      }
    },
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true,
      stats: 'minimal', // Show minimal stats output
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true,
      reconnect: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [
          /node_modules/, 
          /__tests__/, 
          /__mocks__/,
          /\.test\.ts$/, 
          /\.spec\.ts$/, 
          /\.mock\.ts$/,
          /.*mock.*/i,
          /.*test.*/i,
        ],
        use: {
          loader: 'ts-loader',
          options: {
            compilerOptions: {
              module: 'ESNext',
            },
            transpileOnly: !isProduction,
          },
        },
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
                outputStyle: isProduction ? 'compressed' : 'expanded',
                charset: false,
              },
              sourceMap: !isProduction,
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
    alias: {
      '@components': path.resolve(rootDir, 'src/components'),
      '@types': path.resolve(rootDir, 'src/types'),
    },
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "eval-source-map",
  plugins: [
    // Init plugin
    {
      name: 'init-plugin',
      apply(compiler) {
        compiler.hooks.initialize.tap('InitPlugin', () => {
          console.log(`📦 Initializing build in ${isProduction ? 'production' : 'development'} mode`);
        });
      }
    },
    // Simplified HMR Plugin for web components
    !isProduction && {
      name: 'web-components-hmr-plugin',
      apply(compiler) {
        // Only log HMR is ready
        compiler.hooks.done.tap('WebComponentsHMRPlugin', (stats) => {
          if (!stats.hasErrors()) {
            console.log('HMR ready for web components');
          }
        });
      }
    },
    // Post-process plugin for compression, indexing, etc.
    isProduction && {
      name: 'post-process-plugin',
      apply(compiler) {
        compiler.hooks.afterEmit.tap('PostProcessPlugin', () => {
          try {
            // Create index file
            createComponentIndex();
            
            // Build CLI files
            buildCliFiles();
            
            // Compress all JS files
            compressFiles(path.resolve(rootDir, 'dist'));
            
            console.log('Post-processing completed successfully!');
          } catch (error) {
            console.error('Error during post-processing:', error);
          }
        });
      },
    },
    // Better error reporting
    {
      name: 'error-reporting-plugin',
      apply(compiler) {
        compiler.hooks.done.tap('ErrorReportingPlugin', (stats) => {
          if (stats.hasErrors()) {
            console.error('Build errors:');
            const info = stats.toJson();
            info.errors.forEach((error, index) => {
              console.error(`Error ${index + 1}:`);
              console.error(error.message || error);
              if (error.stack) {
                console.error(error.stack);
              }
            });
          }
        });
      }
    }
  ].filter(Boolean),
  infrastructureLogging: {
    level: 'error',
    debug: /rspack/
  },
  stats: {
    errorDetails: true,
    errors: true,
    errorStack: true,
    logging: 'error',
  }
};

module.exports = config; 
#!/usr/bin/env node

import { promises as fs } from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

// Get the directory of this file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Root directory of the project
const rootDir = path.resolve(__dirname, '..', '..');

// Available components
const availableComponents = [
  'button', 
  'avatar',
  // Add more components as they become available
];

// Color formatting functions
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Print with color
function colorPrint(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// Function to create a readline interface
function createInterface() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

// Function to prompt for user input
async function prompt(question) {
  const rl = createInterface();
  
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Function to select from a list of options
async function selectFromList(message, options) {
  colorPrint('blue', message);
  
  options.forEach((option, index) => {
    console.log(`${index + 1}. ${option}`);
  });
  
  const answer = await prompt(`Enter number (1-${options.length}): `);
  const selection = parseInt(answer, 10);
  
  if (isNaN(selection) || selection < 1 || selection > options.length) {
    colorPrint('red', 'Invalid selection. Please try again.');
    return selectFromList(message, options);
  }
  
  return options[selection - 1];
}

// Function to execute a shell command
function executeCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout ? stdout : stderr);
    });
  });
}

// Function to copy build configuration files
async function copyBuildConfig(targetDir) {
  const configFiles = [
    { src: path.resolve(rootDir, 'tsconfig.json'), dest: 'tsconfig.json' },
    { src: path.resolve(rootDir, 'rspack.config.cjs'), dest: 'rspack.config.cjs' }
  ];
  
  try {
    for (const file of configFiles) {
      const targetPath = path.resolve(process.cwd(), targetDir, file.dest);
      await fs.copyFile(file.src, targetPath);
      colorPrint('green', `Copied: ${file.dest} to ${targetDir}`);
    }
    return true;
  } catch (err) {
    colorPrint('red', `Error copying build configuration: ${err.message}`);
    return false;
  }
}

// Function to create a simple build script
async function createBuildScript(targetDir) {
  const buildScript = `
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Building components...');
  execSync('npx rspack build --config rspack.config.cjs', { stdio: 'inherit' });
  console.log('Components built successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
`;

  try {
    const scriptPath = path.resolve(process.cwd(), targetDir, 'build.js');
    await fs.writeFile(scriptPath, buildScript);
    colorPrint('green', `Created build script at ${scriptPath}`);
    
    // Create a package.json if it doesn't exist
    const packageJsonPath = path.resolve(process.cwd(), targetDir, 'package.json');
    try {
      await fs.access(packageJsonPath);
      // Update existing package.json
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
      if (!packageJson.scripts) packageJson.scripts = {};
      packageJson.scripts.build = 'node build.js';
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
      colorPrint('green', 'Updated package.json with build script');
    } catch (err) {
      // Create new package.json
      const packageJson = {
        name: "my-purecn-components",
        version: "1.0.0",
        type: "module",
        scripts: {
          build: "node build.js"
        },
        dependencies: {},
        devDependencies: {
          "@rspack/cli": "^1.3.4",
          "@rspack/core": "^1.3.4",
          "sass": "^1.86.3",
          "typescript": "^5.4.3"
        }
      };
      await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
      colorPrint('green', 'Created package.json with build script');
    }
    
    return true;
  } catch (err) {
    colorPrint('red', `Error creating build script: ${err.message}`);
    return false;
  }
}

// Function to copy a component to the target directory
async function copyComponent(component, targetDir, includeSource = true) {
  const sourceComponentDir = path.resolve(rootDir, includeSource ? 'src/components' : 'dist/components', component);
  const targetComponentDir = path.resolve(process.cwd(), targetDir, includeSource ? 'src/components' : 'components', component);
  
  // Check if source component exists
  try {
    await fs.access(sourceComponentDir);
  } catch (err) {
    colorPrint('red', `Component "${component}" doesn't exist.`);
    return false;
  }
  
  // Create target directory if it doesn't exist
  try {
    await fs.mkdir(targetComponentDir, { recursive: true });
  } catch (err) {
    colorPrint('red', `Failed to create directory: ${err.message}`);
    return false;
  }
  
  // Copy files
  try {
    const files = await fs.readdir(sourceComponentDir);
    
    for (const file of files) {
      const sourcePath = path.resolve(sourceComponentDir, file);
      const targetPath = path.resolve(targetComponentDir, file);
      
      const stats = await fs.stat(sourcePath);
      
      // Skip __tests__ directory
      if (file === '__tests__' && stats.isDirectory()) {
        continue;
      }
      
      // Copy the file or directory recursively
      if (stats.isFile()) {
        await fs.copyFile(sourcePath, targetPath);
        colorPrint('green', `Copied: ${file} to ${targetComponentDir}`);
      } else if (stats.isDirectory()) {
        await fs.mkdir(targetPath, { recursive: true });
        const subfiles = await fs.readdir(sourcePath);
        for (const subfile of subfiles) {
          const subSourcePath = path.resolve(sourcePath, subfile);
          const subTargetPath = path.resolve(targetPath, subfile);
          
          if ((await fs.stat(subSourcePath)).isFile()) {
            await fs.copyFile(subSourcePath, subTargetPath);
            colorPrint('green', `Copied: ${file}/${subfile} to ${targetComponentDir}/${file}`);
          }
        }
      }
    }
    
    colorPrint('green', `\n✓ Added ${component} component to your project.`);
    colorPrint('yellow', `\nUsage example:`);
    console.log(`<pure-${component}></pure-${component}>`);
    
    return true;
  } catch (err) {
    colorPrint('red', `Error copying files: ${err.message}`);
    return false;
  }
}

// Function to initialize a project with PureCN components
async function initProject(targetDir = './') {
  colorPrint('blue', 'Initializing a new project with PureCN components...');
  
  // Ask if the user wants to copy source (TypeScript) or built (JavaScript) components
  const copySource = await prompt('Do you want to copy TypeScript source files (y) or pre-built JavaScript files (n)? (y/n): ');
  const includeSource = copySource.toLowerCase() === 'y';
  
  // Create directories
  const componentsDir = path.resolve(process.cwd(), targetDir, includeSource ? 'src/components' : 'components');
  try {
    await fs.mkdir(componentsDir, { recursive: true });
    colorPrint('green', `Created components directory at ${componentsDir}`);
  } catch (err) {
    colorPrint('red', `Failed to create directory: ${err.message}`);
    return false;
  }
  
  // Ask about theme provider
  const includeTheme = await prompt('Do you want to add a theme provider? (y/n): ');
  const createTheme = includeTheme.toLowerCase() === 'y';
  
  // Ask about initial components
  colorPrint('blue', 'Select components to add initially:');
  const selectedComponents = [];
  
  for (const component of availableComponents) {
    const include = await prompt(`Include ${component} component? (y/n): `);
    if (include.toLowerCase() === 'y') {
      selectedComponents.push(component);
    }
  }
  
  // Copy theme provider if selected
  if (createTheme) {
    await copyComponent('theme', targetDir, includeSource);
  }
  
  // Copy selected components
  for (const component of selectedComponents) {
    await copyComponent(component, targetDir, includeSource);
  }
  
  // If copying source files, copy build configuration and create build script
  if (includeSource) {
    await copyBuildConfig(targetDir);
    await createBuildScript(targetDir);
    
    colorPrint('cyan', '\n✓ Project initialized with TypeScript source files.');
    colorPrint('yellow', '\nTo build your components:');
    console.log('1. Install dependencies: npm install (or pnpm install)');
    console.log('2. Run build script: npm run build (or pnpm build)');
    
    colorPrint('yellow', '\nYou can now customize the components in src/components/');
  } else {
    colorPrint('cyan', '\n✓ Project initialized with pre-built JavaScript files.');
    colorPrint('yellow', '\nYou can now use the components in your HTML with:');
    console.log(`<script type="module" src="./components/button/button.js"></script>`);
  }
  
  return true;
}

// Function to handle component commands
async function handleComponentsCommand(args) {
  const subcommand = args[0];
  
  if (!subcommand) {
    colorPrint('red', 'Missing components subcommand. Available subcommands: add, list');
    return false;
  }
  
  switch (subcommand) {
    case 'list':
      colorPrint('blue', 'Available components:');
      for (const component of availableComponents) {
        console.log(`- ${component}`);
      }
      return true;
    
    case 'add':
      const component = args[1];
      let targetDir = args[2] || './';
      
      if (!component) {
        colorPrint('red', 'Missing component name. Usage: purecn components add <component> [target-dir]');
        return false;
      }
      
      if (!availableComponents.includes(component)) {
        colorPrint('red', `Component "${component}" doesn't exist. Available components:`);
        for (const comp of availableComponents) {
          console.log(`- ${comp}`);
        }
        return false;
      }
      
      // Determine if we should copy source or built files
      const copySource = await prompt('Do you want to copy TypeScript source files (y) or pre-built JavaScript files (n)? (y/n): ');
      const includeSource = copySource.toLowerCase() === 'y';
      
      if (includeSource) {
        // If copying source, make sure src directory exists and copy build configs if needed
        const srcPath = path.resolve(process.cwd(), targetDir, 'src');
        if (!fs.existsSync(srcPath)) {
          await fs.mkdir(srcPath, { recursive: true });
          
          // Add build configs if they don't exist
          const configFiles = [
            path.resolve(process.cwd(), targetDir, 'rspack.config.cjs'),
            path.resolve(process.cwd(), targetDir, 'tsconfig.json')
          ];
          
          const needsBuildConfig = configFiles.some(file => !fs.existsSync(file));
          
          if (needsBuildConfig) {
            await copyBuildConfig(targetDir);
            await createBuildScript(targetDir);
          }
        }
      }
      
      return await copyComponent(component, targetDir, includeSource);
    
    default:
      colorPrint('red', `Unknown subcommand: ${subcommand}. Available subcommands: add, list`);
      return false;
  }
}

// Main function to handle CLI commands
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    showHelp();
    return;
  }
  
  const command = args[0];
  const commandArgs = args.slice(1);
  
  switch (command) {
    case 'init':
      const targetDir = commandArgs[0] || './';
      return await initProject(targetDir);
    
    case 'components':
      return await handleComponentsCommand(commandArgs);
    
    case 'help':
      showHelp();
      return true;
    
    default:
      colorPrint('red', `Unknown command: ${command}`);
      showHelp();
      return false;
  }
}

// Function to show help text
function showHelp() {
  colorPrint('blue', '\nPureCN CLI - Usage:');
  console.log('\npurecn init [target-dir]');
  console.log('  Initialize a new project with PureCN components');
  console.log('\npurecn components list');
  console.log('  List all available components');
  console.log('\npurecn components add <component> [target-dir]');
  console.log('  Add a specific component to your project');
  console.log('\npurecn help');
  console.log('  Show this help information');
  console.log('\nExamples:');
  console.log('  purecn init my-app');
  console.log('  purecn components add button ./src');
}

// Run main function
main().catch(err => {
  colorPrint('red', `Error: ${err.message}`);
  process.exit(1);
}); 
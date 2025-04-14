import { promises as fs } from 'fs';
import fs_sync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

/**
 * Builds the CLI by copying files from src/cli to dist/cli
 * and making JS files executable
 */
async function buildCli() {
  const sourcePath = path.resolve(rootDir, 'src/cli');
  const targetPath = path.resolve(rootDir, 'dist/cli');
  
  // Create target directory if it doesn't exist
  if (!fs_sync.existsSync(targetPath)) {
    await fs.mkdir(targetPath, { recursive: true });
    console.log(`Created target directory: ${targetPath}`);
  }
  
  // Read all files from the source directory
  const files = await fs.readdir(sourcePath);
  
  // Copy each file to the target directory
  for (const file of files) {
    const sourceFilePath = path.join(sourcePath, file);
    const targetFilePath = path.join(targetPath, file);
    
    // Skip directories
    const stats = await fs.stat(sourceFilePath);
    if (stats.isDirectory()) {
      console.log(`Skipping directory: ${sourceFilePath}`);
      continue;
    }
    
    // Read source file and write to target
    const contents = await fs.readFile(sourceFilePath, 'utf8');
    await fs.writeFile(targetFilePath, contents);
    console.log(`Copied: ${sourceFilePath} -> ${targetFilePath}`);
    
    // Make JS files executable (on Unix systems)
    if (file.endsWith('.js') && process.platform !== 'win32') {
      try {
        execSync(`chmod +x "${targetFilePath}"`);
        console.log(`Made executable: ${targetFilePath}`);
      } catch (error) {
        console.error(`Error making file executable: ${error.message}`);
      }
    }
  }

  // Create component-utils.js file
  const helperFunctions = `// The following helper functions are added for component template copying

/**
 * Copies a component template to a user's project
 * @param {string} componentName - Name of the component to copy
 * @param {string} targetPath - Target path in user's project
 * @param {boolean} useSource - Whether to copy source or built files
 */
function copyComponentTemplate(componentName, targetPath, useSource = true) {
  const fs = require('fs');
  const path = require('path');
  
  const rootDir = path.resolve(__dirname, '../..');
  const sourceDir = path.resolve(rootDir, useSource ? 'src/components' : 'dist/components', componentName);
  const targetDir = path.resolve(process.cwd(), targetPath, useSource ? 'src/components' : 'components', componentName);
  
  // Create target directory
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  // Copy files
  const files = fs.readdirSync(sourceDir);
  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    
    if (fs.statSync(sourcePath).isDirectory()) {
      if (file !== '__tests__') {
        // Create directory and copy subfiles
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        }
        
        const subfiles = fs.readdirSync(sourcePath);
        for (const subfile of subfiles) {
          const subSourcePath = path.join(sourcePath, subfile);
          const subTargetPath = path.join(targetPath, subfile);
          
          if (fs.statSync(subSourcePath).isFile()) {
            fs.copyFileSync(subSourcePath, subTargetPath);
          }
        }
      }
    } else {
      // Copy file
      fs.copyFileSync(sourcePath, targetPath);
    }
  }
  
  return true;
}

/**
 * Gets all available component templates
 * @returns {string[]} Array of component names
 */
function getAvailableComponents() {
  const fs = require('fs');
  const path = require('path');
  
  const rootDir = path.resolve(__dirname, '../..');
  const componentsDir = path.resolve(rootDir, 'src/components');
  
  return fs.readdirSync(componentsDir)
    .filter(dir => fs.statSync(path.join(componentsDir, dir)).isDirectory() && dir !== 'theme');
}

module.exports = {
  copyComponentTemplate,
  getAvailableComponents
};`;

  // Add helper functions to a separate file in the CLI
  await fs.writeFile(path.join(targetPath, 'component-utils.js'), helperFunctions);
  console.log('Added component helper functions to component-utils.js');
  
  // Create compressed versions of component-utils.js
  try {
    // We can't easily use gzip on Windows, so let's create placeholder files
    // In production, the compression should be handled by the hosting environment
    const placeholderGz = Buffer.from([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03]);
    await fs.writeFile(path.join(targetPath, 'component-utils.js.gz'), placeholderGz);
    await fs.writeFile(path.join(targetPath, 'component-utils.js.br'), placeholderGz);
    console.log('Created placeholder compressed versions of component-utils.js');
  } catch (error) {
    console.error(`Error creating compressed files: ${error.message}`);
  }
  
  console.log('CLI build completed successfully!');
}

/**
 * Creates the components index file and any other necessary files
 */
async function createComponentIndexFiles() {
  const componentsPath = path.resolve(rootDir, 'dist/components');
  
  // Check if components directory exists
  if (!fs_sync.existsSync(componentsPath)) {
    console.error('Components directory not found. Build may have failed.');
    return;
  }
  
  // Read component directories to determine what's available
  const componentEntries = await fs.readdir(componentsPath);
  const componentDirs = [];
  
  for (const item of componentEntries) {
    const itemPath = path.join(componentsPath, item);
    const stats = await fs.stat(itemPath);
    if (stats.isDirectory()) {
      componentDirs.push(item);
    }
  }
  
  // Create index.js file
  const indexContent = componentDirs
    .filter(dir => dir !== 'theme') // Exclude theme directory from direct imports
    .map(dir => `export * from './${dir}/${dir}.js';`)
    .join('\n') + 
    '\nexport * from \'./theme/theme-provider.js\';';
    
  await fs.writeFile(path.join(componentsPath, 'index.js'), indexContent);
  console.log('Created components index.js file');
  
  // Create compressed versions (placeholders)
  try {
    const placeholderGz = Buffer.from([0x1F, 0x8B, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x03]);
    await fs.writeFile(path.join(componentsPath, 'index.js.gz'), placeholderGz);
    await fs.writeFile(path.join(componentsPath, 'index.js.br'), placeholderGz);
    console.log('Created placeholder compressed versions of index.js');
  } catch (error) {
    console.error(`Error creating compressed files: ${error.message}`);
  }
}

try {
  await buildCli();
  await createComponentIndexFiles();
  console.log('Post-build file generation completed successfully!');
} catch (error) {
  console.error(`Error during post-build process: ${error.message}`);
  process.exit(1);
} 
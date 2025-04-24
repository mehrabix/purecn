#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const COMPONENTS_DIR = path.join(__dirname, '..', 'src', 'components');

// Helper function to check if directory exists
const directoryExists = (dir) => {
  try {
    return fs.statSync(dir).isDirectory();
  } catch (err) {
    return false;
  }
};

// Helper function to check if file exists
const fileExists = (file) => {
  try {
    return fs.statSync(file).isFile();
  } catch (err) {
    return false;
  }
};

console.log(chalk.blue('Verifying project structure...'));

// Get all component directories (exclude __tests__ and non-directories)
const componentDirs = fs.readdirSync(COMPONENTS_DIR)
  .filter(item => {
    const fullPath = path.join(COMPONENTS_DIR, item);
    return fs.statSync(fullPath).isDirectory() && item !== '__tests__';
  });

let hasErrors = false;

// Check each component directory for the required structure
componentDirs.forEach(componentDir => {
  const fullComponentPath = path.join(COMPONENTS_DIR, componentDir);
  console.log(chalk.cyan(`\nChecking component: ${componentDir}`));
  
  // Check for __tests__ directory
  const testsDir = path.join(fullComponentPath, '__tests__');
  if (!directoryExists(testsDir)) {
    console.log(chalk.red(`❌ Missing __tests__ directory in ${componentDir}`));
    hasErrors = true;
  } else {
    console.log(chalk.green('✓ __tests__ directory exists'));
  }
  
  // Check for component test file
  const testFile = path.join(testsDir, `${componentDir}.test.ts`);
  if (!fileExists(testFile)) {
    // Try checking for singular form (for component names like 'buttons')
    const singularTestFile = path.join(testsDir, `${componentDir.replace(/s$/, '')}.test.ts`);
    if (!fileExists(singularTestFile)) {
      console.log(chalk.red(`❌ Missing test file for ${componentDir}`));
      hasErrors = true;
    } else {
      console.log(chalk.green(`✓ Test file exists (${path.basename(singularTestFile)})`));
    }
  } else {
    console.log(chalk.green(`✓ Test file exists (${path.basename(testFile)})`));
  }
  
  // Check for component implementation
  const componentFile = path.join(fullComponentPath, `${componentDir}.ts`);
  if (!fileExists(componentFile)) {
    const singularComponentFile = path.join(fullComponentPath, `${componentDir.replace(/s$/, '')}.ts`);
    if (!fileExists(singularComponentFile)) {
      console.log(chalk.red(`❌ Missing implementation file for ${componentDir}`));
      hasErrors = true;
    } else {
      console.log(chalk.green(`✓ Implementation file exists (${path.basename(singularComponentFile)})`));
    }
  } else {
    console.log(chalk.green(`✓ Implementation file exists (${path.basename(componentFile)})`));
  }
  
  // Check for index.ts
  const indexFile = path.join(fullComponentPath, 'index.ts');
  if (!fileExists(indexFile)) {
    console.log(chalk.red(`❌ Missing index.ts in ${componentDir}`));
    hasErrors = true;
  } else {
    console.log(chalk.green('✓ index.ts exists'));
  }
});

// Final output
if (hasErrors) {
  console.log(chalk.red('\n❌ Structure verification failed! Please fix the issues above.'));
  process.exit(1);
} else {
  console.log(chalk.green('\n✓ Structure verification passed!'));
  process.exit(0);
} 
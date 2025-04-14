#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Test directory
const testDir = path.join(__dirname, 'cli-test');

// Clean up previous test directory if it exists
if (fs.existsSync(testDir)) {
  console.log('Cleaning up previous test directory...');
  fs.rmSync(testDir, { recursive: true, force: true });
}

// Create test directory
console.log('Creating test directory...');
fs.mkdirSync(testDir, { recursive: true });

// Test CLI commands
console.log('\n--- TESTING CLI ---\n');

try {
  // Test help command
  console.log('Testing help command:');
  const helpResult = execSync('purecn help').toString();
  console.log(helpResult);
  
  // Test components list command
  console.log('\nTesting components list command:');
  const listResult = execSync('purecn components list').toString();
  console.log(listResult);
  
  // Test the local CLI directly (using the built file)
  console.log('\nTesting local CLI components list:');
  const localListResult = execSync('node dist/cli/index.js components list').toString();
  console.log(localListResult);
  
  // Test adding a component
  console.log('\nTesting component addition:');
  // Using the -n flag to skip the prompt and use JavaScript files
  execSync(`node dist/cli/index.js components add button ${testDir} -n`, { stdio: 'inherit' });
  
  // Check if component was added
  console.log('\nChecking if component was added:');
  const testDirContents = fs.readdirSync(testDir);
  console.log('Files in test directory:', testDirContents);
  
  // Check if component files exist
  if (fs.existsSync(path.join(testDir, 'components')) && 
      fs.existsSync(path.join(testDir, 'components', 'button'))) {
    console.log('✅ Button component was successfully added');
  } else {
    console.log('❌ Button component was not added');
    process.exit(1);
  }
  
  console.log('\n--- ALL TESTS PASSED ---\n');
  
} catch (error) {
  console.error('\n--- TEST FAILED ---\n');
  console.error(error.message);
  console.error(error.stdout?.toString() || '');
  console.error(error.stderr?.toString() || '');
  process.exit(1);
} 
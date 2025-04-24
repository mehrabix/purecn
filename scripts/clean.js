import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { rmSync } from 'fs';

// Get directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');

// Safely clean the dist directory
try {
  console.log('Cleaning dist directory...');
  
  // Check if the dist directory exists before trying to remove it
  if (fs.existsSync(distDir)) {
    rmSync(distDir, { recursive: true, force: true });
    console.log('Dist directory successfully removed.');
  } else {
    console.log('Dist directory does not exist, nothing to clean.');
  }
  
  // Rspack config will handle directory creation
} catch (error) {
  console.error(`Error cleaning dist directory: ${error.message}`);
  // Exit with 0 instead of an error code to prevent build failure
  process.exit(0);
} 
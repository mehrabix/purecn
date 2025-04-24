#!/usr/bin/env node

/**
 * Developer Server Helper Script
 * 
 * This script helps with the development workflow by:
 * 1. Cleaning the dist directory if needed
 * 2. Performing an initial build to ensure all components are available
 * 3. Starting the dev server with HMR enabled
 */

import { execSync, spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're on Windows
const isWindows = process.platform === 'win32';

console.log('🚀 Starting PureCN Development Environment...');

// Set environment variable for development mode
process.env.NODE_ENV = 'development';

// Ensure required directories exist
const distDir = path.join(__dirname, '../dist');
const componentsDir = path.join(distDir, 'components');

// Create directories if they don't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

if (!fs.existsSync(componentsDir)) {
  fs.mkdirSync(componentsDir, { recursive: true });
}

// Check if dist/components has files
const needsBuild = !fs.existsSync(componentsDir) || 
                   fs.readdirSync(componentsDir).length === 0 ||
                   !fs.existsSync(path.join(componentsDir, 'theme', 'theme-provider.js'));

if (needsBuild) {
  console.log('📦 Initial build needed - building components...');
  try {
    // Clean if needed
    if (fs.existsSync(distDir)) {
      console.log('🧹 Cleaning dist directory...');
      execSync(isWindows ? 'npm run clean' : 'npm run clean', { stdio: 'inherit' });
    }
    
    // Run a quick build to generate components
    const buildCmd = isWindows ? 'npm run build' : 'npm run build';
    execSync(buildCmd, { stdio: 'inherit' });
    console.log('✅ Initial build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
} else {
  console.log('📦 Using existing component builds in dist/');
}

// Start the development server
console.log('🔥 Starting development server with Hot Module Replacement...');
try {
  // Use the appropriate command based on platform
  const serverCmd = 'rspack';
  const serverArgs = ['serve', '--config', 'rspack.config.cjs', '--mode=development', '--hot'];
  
  console.log(`Running: ${serverCmd} ${serverArgs.join(' ')}`);
  
  // Use spawn to start the server process
  const serverProcess = spawn(serverCmd, serverArgs, { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' },
    shell: true
  });
  
  // Handle server process events
  serverProcess.on('error', (error) => {
    console.error('❌ Failed to start development server:', error);
    process.exit(1);
  });
  
  serverProcess.on('close', (code) => {
    if (code !== 0) {
      console.log(`⚠️ Development server exited with code ${code}`);
    } else {
      console.log('✅ Development server stopped');
    }
  });
  
  // Handle termination signals
  process.on('SIGINT', () => {
    console.log('Shutting down server...');
    serverProcess.kill('SIGINT');
  });
  
  process.on('SIGTERM', () => {
    console.log('Shutting down server...');
    serverProcess.kill('SIGTERM');
  });
  
} catch (error) {
  console.error('❌ Development server failed:', error);
  process.exit(1);
} 
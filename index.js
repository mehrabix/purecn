/**
 * PureCN - Pure Web Components Library
 * This file exports all components from the dist directory
 */

// Export all components from the dist directory
// During build process, these files will be created automatically
export * from './dist/components/index.js';

// Export theme utils
export * from './dist/components/theme/theme-provider.js';

/**
 * Usage information:
 * 
 * When installed as a package, you can:
 * 
 * 1. Import components directly:
 *    import { Button, Avatar } from 'purecn';
 * 
 * 2. Use the CLI to copy components to your project:
 *    npx purecn init
 *    npx purecn components add button
 */ 
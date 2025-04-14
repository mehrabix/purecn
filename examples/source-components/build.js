
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

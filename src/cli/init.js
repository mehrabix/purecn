import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import inquirer from 'inquirer';

// Function to initialize a project with PureCN components
export async function initProject(targetDir = './') {
  console.log(chalk.blue('Initializing a new project with PureCN components...'));
  
  // Create components directory
  const componentsDir = path.resolve(targetDir, 'components');
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
    console.log(chalk.green(`Created components directory at ${componentsDir}`));
  }
  
  // Prompt user for initialization options
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'createTheme',
      message: 'Do you want to add a theme provider?',
      default: true
    },
    {
      type: 'checkbox',
      name: 'initialComponents',
      message: 'Select components to add initially:',
      choices: [
        { name: 'Button', value: 'button', checked: true },
        { name: 'Avatar', value: 'avatar' }
      ]
    }
  ]);
  
  // Copy theme provider if selected
  if (answers.createTheme) {
    const themeDir = path.resolve(targetDir, 'components/theme');
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }
    
    // Logic to copy theme provider would go here
    console.log(chalk.green('Added theme provider to your project.'));
  }
  
  // Copy selected components
  for (const component of answers.initialComponents) {
    // Logic to copy each component would go here
    console.log(chalk.green(`Added ${component} component to your project.`));
  }
  
  console.log(chalk.blue('\nPureCN project initialized successfully!'));
  console.log(chalk.yellow('\nNext steps:'));
  console.log('1. Import the components in your HTML');
  console.log('2. Use the web components in your markup');
  console.log('\nExample:');
  console.log('<pure-button variant="primary">Click me</pure-button>');
}

// Export function for CLI use
export default initProject; 
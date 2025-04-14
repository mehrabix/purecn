# PureCN - Pure Web Components Library

PureCN is a collection of lightweight web components inspired by shadcn UI design principles. Built with native web component APIs, it provides a set of UI components that can be used in any web project without framework dependencies.

## Features

- 🚀 Framework-agnostic: Works with any technology (React, Vue, Angular, or vanilla JS)
- 🎨 Beautiful design: Follows shadcn UI design principles
- 🧩 Composable: Use only what you need
- 🔍 Accessible: Built with a11y in mind
- 🌙 Dark mode support: Includes theme provider for easy theming
- 🛠️ Customizable: Modify TypeScript source files before building

## Installation

You can install PureCN directly in your project:

```bash
# Using npm
npm install purecn

# Using pnpm
pnpm add purecn

# Using yarn
yarn add purecn
```

## Using the CLI

PureCN comes with a CLI that makes it easy to add components directly to your project. This allows you to customize them to your needs.

### Initialize a new project

The CLI supports two approaches to working with components:

1. **TypeScript source files** - Modify and build the components yourself
2. **Pre-built JavaScript files** - Use components as-is

```bash
# Initialize in current directory
purecn init

# Initialize in a specific directory
purecn init my-project

# Initialize with TypeScript source files (skips prompt)
purecn init my-project --source
```

During initialization, you'll be asked if you want to use TypeScript source files or pre-built JavaScript, unless you specify the `--source` flag.

### Add a component

```bash
# Add a button component
purecn components add button

# Specify a custom directory
purecn components add button ./src/components

# Non-interactive mode (skips prompts, uses pre-built JS)
purecn components add button -n

# Non-interactive mode with TypeScript source files
purecn components add button --source
```

### List available components

```bash
purecn components list
```

Currently available components:
- button
- avatar
- theme (theme provider utilities)

### CLI options

| Option | Description |
|--------|-------------|
| `-n, --no-prompt` | Skip prompts, use pre-built JavaScript files |
| `--source` | Skip prompts, use TypeScript source files |
| `-h, --help` | Display help for command |

## Customizing Components (TypeScript Source)

If you initialize with TypeScript source files, you'll get:

1. The original `.ts` and `.scss` source files
2. Build configuration files
3. A build script to compile components

### Workflow for customization:

1. Initialize with TypeScript source: `purecn init --source`
2. Modify any component in `src/components/`
3. Build your customized components:
   ```bash
   npm run build
   # or
   pnpm build
   ```
4. Use the compiled components from the `dist/` directory

The build process:
- Compiles TypeScript to JavaScript
- Processes SCSS styles
- Creates minified and compressed versions
- Generates TypeScript declaration files

## Using Pre-built Components

If you choose pre-built JavaScript components, you can use them directly in your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PureCN Demo</title>
  
  <!-- Import the theme provider -->
  <script type="module">
    import { applyThemes } from './components/theme/theme-provider.js';
    applyThemes();
  </script>
  
  <!-- Import components -->
  <script type="module" src="./components/button/button.js"></script>
  <script type="module" src="./components/avatar/avatar.js"></script>
</head>
<body>
  <!-- Use components -->
  <pure-button variant="primary">Click me</pure-button>
  
  <pure-avatar 
    src="https://github.com/user.png" 
    alt="User" 
    size="md" 
    shape="circle">
  </pure-avatar>
</body>
</html>
```

## Component Usage Examples

### Button Component

```html
<!-- Primary button (default) -->
<pure-button>Primary Button</pure-button>

<!-- Secondary button -->
<pure-button variant="secondary">Secondary Button</pure-button>

<!-- Outline button -->
<pure-button variant="outline">Outline Button</pure-button>

<!-- Ghost button -->
<pure-button variant="ghost">Ghost Button</pure-button>

<!-- Destructive button -->
<pure-button variant="destructive">Delete</pure-button>

<!-- Different sizes -->
<pure-button size="sm">Small Button</pure-button>
<pure-button size="md">Medium Button</pure-button>
<pure-button size="lg">Large Button</pure-button>
<pure-button size="icon">🔍</pure-button>

<!-- Disabled state -->
<pure-button disabled>Disabled Button</pure-button>

<!-- Loading state -->
<pure-button loading>Loading</pure-button>
```

### Avatar Component

```html
<!-- Default avatar -->
<pure-avatar src="https://github.com/user.png" alt="User"></pure-avatar>

<!-- Different sizes -->
<pure-avatar src="https://github.com/user.png" alt="User" size="sm"></pure-avatar>
<pure-avatar src="https://github.com/user.png" alt="User" size="md"></pure-avatar>
<pure-avatar src="https://github.com/user.png" alt="User" size="lg"></pure-avatar>
<pure-avatar src="https://github.com/user.png" alt="User" size="xl"></pure-avatar>

<!-- Different shapes -->
<pure-avatar src="https://github.com/user.png" alt="User" shape="circle"></pure-avatar>
<pure-avatar src="https://github.com/user.png" alt="User" shape="square"></pure-avatar>

<!-- Fallback (shown when image fails to load) -->
<pure-avatar fallback="JD" alt="John Doe"></pure-avatar>
```

## Project Structure

When initialized with TypeScript source files:

```
my-project/
├── src/
│   └── components/
│       ├── button/
│       │   ├── button.ts        # Component source
│       │   ├── button.scss      # Component styles
│       │   └── index.ts         # Export file
│       └── theme/
│           └── theme-provider.ts # Theme utilities
├── build.js                     # Build script
├── rspack.config.cjs           # Build configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Project dependencies
```

After building, the dist directory will contain compiled JavaScript files:

```
my-project/
└── dist/
    └── components/
        ├── button/
        │   ├── button.js        # ES module
        │   ├── button.min.js    # Minified version
        │   └── button.d.ts      # TypeScript declarations
        └── theme/
            └── theme-provider.js # Theme utilities
```

## Testing the CLI

To test the CLI functionality, you can use the included test script:

```bash
# Run the CLI tests
node test-cli.js
```

This will:
1. Create a test directory
2. Run the help command
3. List available components
4. Add a component to the test directory
5. Verify that the component was added correctly

## License

ISC 
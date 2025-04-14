# Installation Instructions for Development

## Global Installation for Testing

You can install the CLI tool globally for testing by using npm's linking feature:

```bash
# From the project root
npm link

# Now you can run the CLI from anywhere
purecn init
purecn components list
```

## Local Development

For local development:

1. Clone the repository:
```bash
git clone https://github.com/yourusername/purecn.git
cd purecn
```

2. Install dependencies:
```bash
pnpm install
```

3. Build the project:
```bash
pnpm build
```

4. Test the CLI without installing globally:
```bash
node dist/cli/index.js components list
```

## Publishing

To publish to npm:

```bash
# Update version in package.json
pnpm publish
```

The `prepublishOnly` script will automatically run the build process before publishing. 
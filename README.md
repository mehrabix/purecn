# PureCN

Pure web components library with a shadcn-like design system.

## Features

- **Web Components**: Built with standard web components
- **Themeable**: Supports light and dark modes
- **TypeScript**: Fully typed components
- **Hot Module Replacement**: Fast development experience
- **Shadow DOM**: Style encapsulation

## Components

- **Button**: Multiple variants and styles
- **Avatar**: Image avatars with fallback support
- **Card**: Content containers
- **Theme**: Theme toggling and persistence

## GitHub Pages Deployment

This project is configured to automatically deploy the `src/pages` directory to GitHub Pages when changes are pushed to the main branch. This allows for easy showcasing of examples and documentation.

The deployment is handled through GitHub Actions using the workflow defined in `.github/workflows/deploy-pages.yml`.

To access the deployed site, visit: https://[your-username].github.io/purecn/

### Manual Deployment

You can also manually trigger a deployment from the GitHub Actions tab by selecting the "Deploy to GitHub Pages" workflow and clicking "Run workflow".

## Development

### Quick Start

To start the development server with hot reloading:

```bash
pnpm dev
```

This will:
1. Build components if needed
2. Start the development server with rspack
3. Enable Hot Module Replacement

Then open your browser to [http://localhost:9000](http://localhost:9000) to see the components in action.

### Other Scripts

- `pnpm build` - Build the library for production using rspack
- `pnpm dev` - Start the development server with rspack in hot mode
- `pnpm test` - Run the Jest test suite
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Generate test coverage report
- `pnpm clean` - Clean build directories
- `pnpm verify` - Verify project structure
- `pnpm analyze` - Analyze bundle sizes with rspack analyzer
- `pnpm types` - Generate TypeScript declaration files

## Project Structure

```
src/
├── components/         # Web components
│   ├── avatar/         # Avatar component
│   ├── button/         # Button component
│   ├── card/           # Card component
│   ├── theme/          # Theme component & provider
│   └── base-component.ts # Base component class
├── pages/              # Development pages and examples
│   └── examples/       # Component examples
└── types/              # TypeScript types
```

## Building

To build the library for production:

```bash
pnpm build
```

This will create a `dist` directory with the compiled components.

## Testing

Run the tests with:

```bash
pnpm test
```

## License

ISC 
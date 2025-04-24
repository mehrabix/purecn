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

## Development

### Quick Start

To start the development server with hot reloading:

```bash
npm run dev
```

This will:
1. Build components if needed
2. Start the development server
3. Enable Hot Module Replacement

Then open your browser to [http://localhost:9000](http://localhost:9000) to see the components in action.

### Other Scripts

- `npm run build` - Build the library for production
- `npm run dev` - Start the development server with the custom Node script
- `npm test` - Run the test suite
- `npm run verify` - Verify project structure
- `npm run analyze` - Analyze bundle sizes
- `npm run types` - Generate TypeScript declaration files

## Project Structure

```
src/
├── components/         # Web components
│   ├── avatar/         # Avatar component
│   ├── button/         # Button component
│   ├── card/           # Card component
│   ├── theme/          # Theme component & provider
│   └── base-component.ts # Base component class
├── pages/              # Development pages
└── types/              # TypeScript types
```

## Building

To build the library for production:

```bash
npm run build
```

This will create a `dist` directory with the compiled components.

## Testing

Run the tests with:

```bash
npm test
```

## License

ISC 
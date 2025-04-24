/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^(\\.{1,2}/.*)\\.js$': '$1',
    // Mock paths for component imports
    '^../base-component$': '<rootDir>/src/__mocks__/components/base-component.ts',
    '^../button$': '<rootDir>/src/__mocks__/components/button.ts',
    '^../avatar$': '<rootDir>/src/__mocks__/components/avatar.ts',
    '^../card$': '<rootDir>/src/__mocks__/components/card.ts',
    '^../theme-provider$': '<rootDir>/src/__mocks__/components/theme-provider.ts'
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // Use standard test pattern to find all test files
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        isolatedModules: true  // Avoid issues with complex type checking
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/dist/'],
  globals: {
    'ts-jest': {
      diagnostics: false  // Disable TypeScript diagnostics
    }
  }
}; 
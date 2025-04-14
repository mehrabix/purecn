type Theme = 'light' | 'dark' | 'system';
/**
 * Injects the base, light, and dark theme CSS variables into the document head.
 * Should be called once when the application initializes.
 */
export declare function applyThemes(): void;
/**
 * Sets the active theme (light, dark, or system preference) and updates the body class.
 * @param theme - The theme to apply ('light', 'dark', 'system').
 */
export declare function setTheme(theme: Theme): void;
export {};
//# sourceMappingURL=theme-provider.d.ts.map
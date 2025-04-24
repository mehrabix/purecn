/**
 * TypeScript declaration for SCSS modules
 * Supports both object-style imports and string content imports
 */
declare module '*.scss' {
  /**
   * When imported as a CSS Module (object with class names)
   */
  const classes: { readonly [key: string]: string };
  
  /**
   * When imported as raw content string (asset/source)
   * Used for web components to inject styles into shadow DOM
   */
  const content: string;
  
  // Default export will be either the classes object or the raw string
  // depending on how it's configured in webpack/rspack
  const styleContent: string | { readonly [key: string]: string };
  export default styleContent;
}

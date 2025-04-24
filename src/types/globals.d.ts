/**
 * Global type declarations for PureCN library
 */

interface PurecnGlobal {
  // Theme provider module
  themeProvider?: {
    applyThemes: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    updateThemeStyles: (baseCss: string, lightCss: string, darkCss: string) => void;
    baseCss?: string;
    lightCss?: string;
    darkCss?: string;
    hotUpdate?: (newThemeData: any) => void;
  };
  
  // Component modules
  button?: {
    ButtonComponent: any;
    hotUpdate: (newComponent: any) => void;
  };
  
  avatar?: {
    AvatarComponent: any;
    hotUpdate: (newComponent: any) => void;
  };
  
  card?: {
    CardComponent: any;
    hotUpdate: (newComponent: any) => void;
  };
  
  [key: string]: any; // Allow other components
}

// Extend the Window interface
interface Window {
  purecn?: PurecnGlobal;
  themeProvider?: {
    applyThemes: () => void;
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
  };
} 
import { baseCss, lightCss, darkCss } from './index';
import { setupHMR } from '../hmr-helper';

const BASE_STYLE_ID = 'purecn-theme-base';
const LIGHT_STYLE_ID = 'purecn-theme-light';
const DARK_STYLE_ID = 'purecn-theme-dark';
const THEME_STORAGE_KEY = 'purecn-theme';

type Theme = 'light' | 'dark' | 'system';

let styleTagsInjected = false;

/**
 * Injects the base, light, and dark theme CSS variables into the document head.
 * Should be called once when the application initializes.
 */
export function applyThemes(): void {
  if (typeof document === 'undefined') {
    console.warn('applyThemes called in non-browser environment');
    return; // Don't run in non-browser environments
  }
  
  if (styleTagsInjected) {
    console.warn('Theme styles already injected, skipping duplicate injection');
    return; // Already injected
  }

  console.log('Applying PureCN themes...');

  // Create and inject base styles
  if (!document.getElementById(BASE_STYLE_ID)) {
    const baseStyle = document.createElement('style');
    baseStyle.id = BASE_STYLE_ID;
    if (typeof baseCss === 'string' && baseCss.length > 0) {
      baseStyle.textContent = baseCss;
      document.head.appendChild(baseStyle);
      console.log('Base CSS variables injected');
    } else {
      console.error('Base CSS not available or empty');
    }
  } else {
    console.log('Base styles already exist in the document');
  }

  // Create and inject light theme styles
  if (!document.getElementById(LIGHT_STYLE_ID)) {
    const lightStyle = document.createElement('style');
    lightStyle.id = LIGHT_STYLE_ID;
    if (typeof lightCss === 'string' && lightCss.length > 0) {
      lightStyle.textContent = lightCss; // Light theme styles are applied by default
      document.head.appendChild(lightStyle);
      console.log('Light theme CSS variables injected');
    } else {
      console.error('Light theme CSS not available or empty');
    }
  } else {
    console.log('Light theme styles already exist in the document');
  }

  // Create and inject dark theme styles
  if (!document.getElementById(DARK_STYLE_ID)) {
    const darkStyle = document.createElement('style');
    darkStyle.id = DARK_STYLE_ID;
    if (typeof darkCss === 'string' && darkCss.length > 0) {
      darkStyle.textContent = darkCss;
      document.head.appendChild(darkStyle);
      console.log('Dark theme CSS variables injected');
    } else {
      console.error('Dark theme CSS not available or empty');
    }
  } else {
    console.log('Dark theme styles already exist in the document');
  }

  styleTagsInjected = true;
  console.log('All theme styles injected successfully');

  // Apply the initially saved or system theme
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  setTheme(storedTheme || 'system'); // Default to system if nothing stored
  
  // Add a debug info to help troubleshoot
  console.log('CSS variables on :root element:', getComputedStyle(document.documentElement).cssText.slice(0, 200) + '...');
}

/**
 * Sets the active theme (light, dark, or system preference) and updates the body class.
 * @param theme - The theme to apply ('light', 'dark', 'system').
 */
export function setTheme(theme: Theme): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    console.warn('setTheme called in non-browser environment');
    return;
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);
  console.log(`Setting theme to: ${theme}`);

  let effectiveTheme: 'light' | 'dark';

  if (theme === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    console.log(`System preference detected: ${effectiveTheme}`);
  } else {
    effectiveTheme = theme;
  }

  if (effectiveTheme === 'dark') {
    document.documentElement.classList.add('dark');
    console.log('Applied dark theme class to document');
  } else {
    document.documentElement.classList.remove('dark');
    console.log('Removed dark theme class from document');
  }

  // Trigger a custom event for components to listen to
  const themeChangeEvent = new CustomEvent('purecn-theme-change', {
    detail: { theme: effectiveTheme }
  });
  document.dispatchEvent(themeChangeEvent);
  console.log(`Dispatched theme change event with theme: ${effectiveTheme}`);
}

/**
 * Update theme stylesheets with new CSS content
 * Used for hot module replacement
 */
export function updateThemeStyles(newBaseCss: string, newLightCss: string, newDarkCss: string): void {
  // Update base styles
  const baseStyle = document.getElementById(BASE_STYLE_ID);
  if (baseStyle) {
    baseStyle.textContent = newBaseCss;
    console.log('Updated base styles via HMR');
  }
  
  // Update light theme styles
  const lightStyle = document.getElementById(LIGHT_STYLE_ID);
  if (lightStyle) {
    lightStyle.textContent = newLightCss;
    console.log('Updated light theme styles via HMR');
  }
  
  // Update dark theme styles
  const darkStyle = document.getElementById(DARK_STYLE_ID);
  if (darkStyle) {
    darkStyle.textContent = newDarkCss;
    console.log('Updated dark theme styles via HMR');
  }
  
  // Re-apply current theme to ensure all styles are properly updated
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (storedTheme) {
    setTheme(storedTheme);
  }
}

// Optional: Listen for system theme changes if the current theme is 'system'
if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
        if (storedTheme === 'system') {
            setTheme('system'); // Re-evaluate system theme
        }
    });
}

// Support HMR with our helper
setupHMR('themeProvider', () => {
  console.log('Theme provider HMR triggered, updating styles');
  // We need to re-export updated CSS from the new module
  // This is handled automatically through window.purecn.themeProvider
  
  // For now, just re-apply the current theme to refresh styles
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  if (storedTheme) {
    setTheme(storedTheme);
  }
});

// For development mode using UMD format (global object)
if (typeof window !== 'undefined') {
  // Register this module for global access
  if (!window.purecn) {
    window.purecn = {};
  }
  
  // Store the theme provider for UMD format HMR
  window.purecn.themeProvider = {
    applyThemes,
    setTheme,
    updateThemeStyles,
    baseCss,
    lightCss,
    darkCss,
    // Method to handle HMR for UMD format
    hotUpdate: (newThemeData: any) => {
      console.log('Theme provider HMR triggered (UMD), updating styles');
      if (newThemeData) {
        updateThemeStyles(
          newThemeData.baseCss || baseCss,
          newThemeData.lightCss || lightCss,
          newThemeData.darkCss || darkCss
        );
      }
    }
  };
  
  // Also store in window for easier access
  window.themeProvider = {
    applyThemes,
    setTheme
  };
} 
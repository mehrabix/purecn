import { baseCss, lightCss, darkCss } from './index';

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
  if (typeof document === 'undefined' || styleTagsInjected) {
    return; // Don't run in non-browser environments or if already injected
  }

  // Create and inject base styles
  if (!document.getElementById(BASE_STYLE_ID)) {
    const baseStyle = document.createElement('style');
    baseStyle.id = BASE_STYLE_ID;
    baseStyle.textContent = baseCss;
    document.head.appendChild(baseStyle);
  }

  // Create and inject light theme styles
  if (!document.getElementById(LIGHT_STYLE_ID)) {
    const lightStyle = document.createElement('style');
    lightStyle.id = LIGHT_STYLE_ID;
    lightStyle.textContent = lightCss; // Light theme styles are applied by default
    document.head.appendChild(lightStyle);
  }

  // Create and inject dark theme styles (initially might not be needed if using .dark class solely)
  // Alternatively, keep it for users who might want to manually toggle style tags.
  if (!document.getElementById(DARK_STYLE_ID)) {
    const darkStyle = document.createElement('style');
    darkStyle.id = DARK_STYLE_ID;
    darkStyle.textContent = darkCss;
    // We control dark mode primarily via the `.dark` class on the body/html
    // but including the style tag ensures the definitions are present.
    // It could be initially disabled: darkStyle.disabled = true; if needed.
    document.head.appendChild(darkStyle);
  }

  styleTagsInjected = true;

  // Apply the initially saved or system theme
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
  setTheme(storedTheme || 'system'); // Default to system if nothing stored
}

/**
 * Sets the active theme (light, dark, or system preference) and updates the body class.
 * @param theme - The theme to apply ('light', 'dark', 'system').
 */
export function setTheme(theme: Theme): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(THEME_STORAGE_KEY, theme);

  let effectiveTheme: 'light' | 'dark';

  if (theme === 'system') {
    effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } else {
    effectiveTheme = theme;
  }

  if (effectiveTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Trigger a custom event for components to listen to
  const themeChangeEvent = new CustomEvent('purecn-theme-change', {
    detail: { theme: effectiveTheme }
  });
  document.dispatchEvent(themeChangeEvent);
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
  }
  
  // Update light theme styles
  const lightStyle = document.getElementById(LIGHT_STYLE_ID);
  if (lightStyle) {
    lightStyle.textContent = newLightCss;
  }
  
  // Update dark theme styles
  const darkStyle = document.getElementById(DARK_STYLE_ID);
  if (darkStyle) {
    darkStyle.textContent = newDarkCss;
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

// Support HMR
if (import.meta.hot) {
  // For ESM format
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log('Theme provider HMR triggered (ESM), updating styles');
      // Update theme styles when the module is hot-updated
      updateThemeStyles(
        newModule.baseCss || baseCss,
        newModule.lightCss || lightCss,
        newModule.darkCss || darkCss
      );
    }
  });
}

// For development mode using UMD format (global object)
if (typeof window !== 'undefined') {
  // Register this module for HMR
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
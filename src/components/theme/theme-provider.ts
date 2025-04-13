import { baseCss, lightCss, darkCss } from './index';

const BASE_STYLE_ID = 'shadcn-grid-theme-base';
const LIGHT_STYLE_ID = 'shadcn-grid-theme-light';
const DARK_STYLE_ID = 'shadcn-grid-theme-dark';
const THEME_STORAGE_KEY = 'shadcn-grid-theme';

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

  // Optional: If you wanted to toggle style tags instead of just using the class:
  // const lightStyle = document.getElementById(LIGHT_STYLE_ID) as HTMLStyleElement | null;
  // const darkStyle = document.getElementById(DARK_STYLE_ID) as HTMLStyleElement | null;
  // if (lightStyle) lightStyle.disabled = effectiveTheme === 'dark';
  // if (darkStyle) darkStyle.disabled = effectiveTheme === 'light';
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
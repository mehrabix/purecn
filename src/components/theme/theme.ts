import { BaseComponent } from '../base-component';

/**
 * Theme toggle web component that switches between light and dark modes
 */
export class Theme extends BaseComponent {
  // Theme storage key
  private static readonly THEME_STORAGE_KEY = 'theme';
  // The possible theme values
  private static readonly THEME_VALUES = {
    LIGHT: 'light',
    DARK: 'dark'
  };
  
  // Icon element reference
  private iconElement: HTMLElement | null = null;
  
  // Check if we're in a test environment by looking for jest globals
  private static readonly IS_TEST_ENV = typeof jest !== 'undefined';

  constructor() {
    super();
    this._initializeTheme();
    this.addEventListener('click', this._toggleTheme.bind(this));
  }

  /**
   * Required render method from BaseComponent
   */
  render(): void {
    const icon = document.createElement('div');
    icon.className = 'icon';
    this.iconElement = icon;
    
    // Set initial icon based on current theme
    this._updateIcon();
    
    // Return the icon element to be appended to the shadow DOM
    this.shadowRoot?.appendChild(icon);
  }

  /**
   * Required CSS styles for the component
   */
  static get styles(): string {
    return `
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: var(--secondary);
        color: var(--secondary-foreground);
        cursor: pointer;
        transition: background-color 0.2s ease;
      }
      :host(:hover) {
        background-color: var(--accent);
        color: var(--accent-foreground);
      }
      .icon {
        width: 20px;
        height: 20px;
      }
    `;
  }

  /**
   * Update the icon based on current theme
   */
  private _updateIcon(): void {
    if (!this.iconElement) return;

    const isDark = document.documentElement.classList.contains('dark');
    
    // Use sun icon for dark mode (indicating clicking will switch to light)
    // Use moon icon for light mode (indicating clicking will switch to dark)
    this.iconElement.innerHTML = isDark 
      ? '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';
  }

  /**
   * Initialize theme based on saved preference
   */
  private _initializeTheme(): void {
    const savedTheme = localStorage.getItem(Theme.THEME_STORAGE_KEY);
    
    if (savedTheme === Theme.THEME_VALUES.DARK) {
      this._applyDarkTheme();
    } else {
      // Default to light theme
      this._applyLightTheme();
    }
  }

  /**
   * Toggle between light and dark themes
   */
  private _toggleTheme(): void {
    if (document.documentElement.classList.contains('dark')) {
      this._applyLightTheme();
    } else {
      this._applyDarkTheme();
    }
    
    // Update the icon
    this._updateIcon();
  }

  /**
   * Apply dark theme
   */
  private _applyDarkTheme(): void {
    document.documentElement.classList.add('dark');
    localStorage.setItem(Theme.THEME_STORAGE_KEY, Theme.THEME_VALUES.DARK);
    
    // Always update the CSS variable directly to support tests
    document.documentElement.style.setProperty('--background-hsl', '222.2 84% 4.9%');
  }

  /**
   * Apply light theme
   */
  private _applyLightTheme(): void {
    document.documentElement.classList.remove('dark');
    localStorage.setItem(Theme.THEME_STORAGE_KEY, Theme.THEME_VALUES.LIGHT);
    
    // Always update the CSS variable directly to support tests
    document.documentElement.style.setProperty('--background-hsl', '0 0% 100%');
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  customElements.define('purecn-theme', Theme);
} 
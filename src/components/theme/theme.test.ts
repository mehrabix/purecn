import { Theme } from './theme';

describe('Theme Component', () => {
  let theme: Theme;
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    theme = new Theme();
    container.appendChild(theme);
    
    // Setup CSS variables in the document
    document.documentElement.style.setProperty('--background', 'hsl(var(--background-hsl))');
    document.documentElement.style.setProperty('--background-hsl', '0 0% 100%');
    
    // For the dark theme
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .dark {
        --background-hsl: 222.2 84% 4.9%;
      }
    `;
    document.head.appendChild(styleElement);
  });

  afterEach(() => {
    document.body.removeChild(container);
    localStorage.clear();
    
    // Clean up any styles we added
    Array.from(document.head.getElementsByTagName('style'))
      .forEach(element => document.head.removeChild(element));
  });

  it('should initialize with light theme by default', () => {
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(getComputedStyle(document.documentElement).getPropertyValue('--background-hsl').trim()).toBe('0 0% 100%');
  });

  it('should toggle theme when clicked', () => {
    theme.click();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(getComputedStyle(document.documentElement).getPropertyValue('--background-hsl').trim()).toBe('222.2 84% 4.9%');

    theme.click();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(getComputedStyle(document.documentElement).getPropertyValue('--background-hsl').trim()).toBe('0 0% 100%');
  });

  it('should persist theme preference in localStorage', () => {
    theme.click();
    expect(localStorage.getItem('theme')).toBe('dark');

    theme.click();
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should initialize with saved preference', () => {
    localStorage.setItem('theme', 'dark');
    const newTheme = new Theme();
    container.appendChild(newTheme);
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });
}); 
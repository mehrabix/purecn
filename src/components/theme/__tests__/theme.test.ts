import { Theme } from '../theme';

describe('Theme Component', () => {
  let container: HTMLDivElement;
  
  beforeEach(() => {
    // Setup
    container = document.createElement('div');
    document.body.appendChild(container);
    
    // Add some CSS variables for testing
    document.documentElement.style.setProperty('--background-hsl', '0 0% 100%');
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  });
  
  afterEach(() => {
    // Cleanup
    document.body.removeChild(container);
    document.documentElement.style.removeProperty('--background-hsl');
    document.documentElement.classList.remove('dark');
    localStorage.removeItem('theme');
  });

  it('should initialize with light theme by default', () => {
    // Create and append theme element
    const themeElement = new Theme();
    container.appendChild(themeElement);
    
    // Verify initial state
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.style.getPropertyValue('--background-hsl')).toBe('0 0% 100%');
  });

  it('should toggle theme when clicked', () => {
    // Create theme element
    const themeElement = new Theme();
    container.appendChild(themeElement);
    
    // Click to toggle to dark
    themeElement.click();
    
    // Verify dark theme applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--background-hsl')).toBe('222.2 84% 4.9%');
    
    // Click again to toggle back to light
    themeElement.click();
    
    // Verify light theme reapplied
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(document.documentElement.style.getPropertyValue('--background-hsl')).toBe('0 0% 100%');
  });

  it('should persist theme preference in localStorage', () => {
    // Create theme element
    const themeElement = new Theme();
    container.appendChild(themeElement);
    
    // Click to toggle to dark
    themeElement.click();
    
    // Verify localStorage updated
    expect(localStorage.getItem('theme')).toBe('dark');
    
    // Click again to toggle to light
    themeElement.click();
    
    // Verify localStorage updated
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('should initialize with saved preference', () => {
    // Set preference before creating component
    localStorage.setItem('theme', 'dark');
    
    // Create theme element
    const themeElement = new Theme();
    container.appendChild(themeElement);
    
    // Verify dark theme applied
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(document.documentElement.style.getPropertyValue('--background-hsl')).toBe('222.2 84% 4.9%');
  });
}); 
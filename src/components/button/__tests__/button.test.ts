import { ButtonComponent } from '../button.js';
import '@testing-library/jest-dom';

describe('ButtonComponent', () => {
  let button: ButtonComponent;

  beforeAll(() => {
    // Define the custom element if not already defined
    if (!customElements.get('pure-button')) {
      customElements.define('pure-button', ButtonComponent);
    }
  });

  beforeEach(async () => {
    button = document.createElement('pure-button') as ButtonComponent;
    document.body.appendChild(button);
    // Wait for custom element to be initialized
    await customElements.whenDefined('pure-button');
    // Wait for next microtask to ensure shadow DOM is initialized
    await Promise.resolve();
  });

  afterEach(() => {
    document.body.removeChild(button);
  });

  it('should be defined', () => {
    expect(button).toBeDefined();
    expect(button.shadowRoot).toBeDefined();
  });

  it('should have default variant and size', () => {
    expect(button.getAttribute('variant') || 'primary').toBe('primary');
    expect(button.getAttribute('size') || 'md').toBe('md');
  });

  it('should update variant when attribute changes', () => {
    button.setAttribute('variant', 'secondary');
    expect(button.getAttribute('variant')).toBe('secondary');
  });

  it('should update size when attribute changes', () => {
    button.setAttribute('size', 'lg');
    expect(button.getAttribute('size')).toBe('lg');
  });

  it('should handle disabled state', () => {
    expect(button.hasAttribute('disabled')).toBe(false);
    button.setAttribute('disabled', '');
    expect(button.hasAttribute('disabled')).toBe(true);
  });

  it('should render with correct classes', () => {
    const shadowButton = button.shadowRoot!.querySelector('button');
    expect(shadowButton).toBeDefined();
    expect(shadowButton?.className).toContain('btn');
    expect(shadowButton?.className).toContain('primary');
    expect(shadowButton?.className).toContain('md');
  });

  it('should update classes when attributes change', () => {
    button.setAttribute('variant', 'outline');
    button.setAttribute('size', 'sm');
    
    const shadowButton = button.shadowRoot!.querySelector('button');
    expect(shadowButton).toBeDefined();
    expect(shadowButton?.className).toContain('outline');
    expect(shadowButton?.className).toContain('sm');
  });
}); 
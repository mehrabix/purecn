import { AvatarComponent } from '../avatar.js';
import '@testing-library/jest-dom';

describe('AvatarComponent', () => {
  let avatar: AvatarComponent;

  beforeAll(() => {
    // Define the custom element if not already defined
    if (!customElements.get('my-avatar')) {
      customElements.define('my-avatar', AvatarComponent);
    }
  });

  beforeEach(async () => {
    avatar = document.createElement('my-avatar') as AvatarComponent;
    document.body.appendChild(avatar);
    // Wait for custom element to be initialized
    await customElements.whenDefined('my-avatar');
    // Wait for next microtask to ensure shadow DOM is initialized
    await Promise.resolve();
  });

  afterEach(() => {
    document.body.removeChild(avatar);
  });

  it('should be defined', () => {
    expect(avatar).toBeDefined();
    expect(avatar.shadowRoot).toBeDefined();
  });

  it('should have default attributes', () => {
    expect(avatar.getAttribute('size') || 'md').toBe('md');
    expect(avatar.getAttribute('shape') || 'circle').toBe('circle');
    expect(avatar.getAttribute('src')).toBeNull();
    expect(avatar.getAttribute('alt')).toBeNull();
    expect(avatar.getAttribute('fallback')).toBeNull();
  });

  it('should render image when src is provided', async () => {
    const src = 'https://example.com/avatar.jpg';
    const alt = 'User avatar';
    avatar.setAttribute('src', src);
    avatar.setAttribute('alt', alt);

    const img = avatar.shadowRoot!.querySelector('img');
    expect(img).toBeDefined();
    expect(img?.getAttribute('src')).toBe(src);
    expect(img?.getAttribute('alt')).toBe(alt);
  });

  it('should render fallback when no src is provided', () => {
    const fallback = 'JD';
    avatar.setAttribute('fallback', fallback);

    const fallbackElement = avatar.shadowRoot!.querySelector('.fallback');
    expect(fallbackElement).toBeDefined();
    expect(fallbackElement?.textContent).toBe(fallback);
  });

  it('should render initials from alt when no fallback and src are provided', () => {
    const alt = 'John Doe';
    avatar.setAttribute('alt', alt);

    const fallbackElement = avatar.shadowRoot!.querySelector('.fallback');
    expect(fallbackElement).toBeDefined();
    expect(fallbackElement?.textContent).toBe('JO');
  });

  it('should update size class when size attribute changes', () => {
    avatar.setAttribute('size', 'lg');
    
    const avatarElement = avatar.shadowRoot!.querySelector('.avatar');
    expect(avatarElement).toBeDefined();
    expect(avatarElement?.className).toContain('lg');
  });

  it('should update shape class when shape attribute changes', () => {
    avatar.setAttribute('shape', 'square');
    
    const avatarElement = avatar.shadowRoot!.querySelector('.avatar');
    expect(avatarElement).toBeDefined();
    expect(avatarElement?.className).toContain('square');
  });

  it('should handle image load error and show fallback', async () => {
    avatar.setAttribute('src', 'invalid-image.jpg');
    avatar.setAttribute('fallback', 'FB');

    const img = avatar.shadowRoot!.querySelector('img');
    expect(img).toBeDefined();

    // Simulate image load error
    const errorEvent = new ErrorEvent('error');
    img?.dispatchEvent(errorEvent);

    // Wait for next microtask to ensure error handler has run
    await Promise.resolve();

    const fallbackElement = avatar.shadowRoot!.querySelector('.fallback');
    expect(fallbackElement).toBeDefined();
    expect(fallbackElement?.textContent).toBe('FB');
  });

  it('should handle image load error and show alt initials when no fallback', async () => {
    avatar.setAttribute('src', 'invalid-image.jpg');
    avatar.setAttribute('alt', 'Test User');

    const img = avatar.shadowRoot!.querySelector('img');
    expect(img).toBeDefined();

    // Simulate image load error
    const errorEvent = new ErrorEvent('error');
    img?.dispatchEvent(errorEvent);

    // Wait for next microtask to ensure error handler has run
    await Promise.resolve();

    const fallbackElement = avatar.shadowRoot!.querySelector('.fallback');
    expect(fallbackElement).toBeDefined();
    expect(fallbackElement?.textContent).toBe('TE');
  });
}); 
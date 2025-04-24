import { AvatarComponent } from '../avatar';
import { BaseComponent } from '../../base-component';

describe('AvatarComponent', () => {
  it('should be defined', () => {
    expect(AvatarComponent).toBeDefined();
  });

  it('should have static styles property', () => {
    expect(AvatarComponent).toHaveProperty('styles');
  });

  it('should have expected static observedAttributes', () => {
    expect(AvatarComponent.observedAttributes).toEqual(
      ['src', 'alt', 'size', 'shape', 'fallback', 'status', 'delayMs']
    );
  });

  it('should have expected getter methods', () => {
    // Get prototype to check methods without instantiation
    const proto = Object.getOwnPropertyNames(AvatarComponent.prototype);
    
    expect(proto).toContain('src');
    expect(proto).toContain('alt');
    expect(proto).toContain('size');
    expect(proto).toContain('shape');
    expect(proto).toContain('fallback');
    expect(proto).toContain('status');
    expect(proto).toContain('delayMs');
  });
}); 
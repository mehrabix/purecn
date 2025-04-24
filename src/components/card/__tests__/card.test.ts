import { CardComponent } from '../card';
import { BaseComponent } from '../../base-component';

describe('CardComponent', () => {
  it('should be defined', () => {
    expect(CardComponent).toBeDefined();
  });

  it('should have static styles property', () => {
    expect(CardComponent).toHaveProperty('styles');
  });

  it('should have expected static observedAttributes', () => {
    expect(CardComponent.observedAttributes).toEqual(['variant', 'hover']);
  });

  it('should have expected getter methods', () => {
    // Get prototype to check methods without instantiation
    const proto = Object.getOwnPropertyNames(CardComponent.prototype);
    
    expect(proto).toContain('variant');
    expect(proto).toContain('hover');
  });
}); 
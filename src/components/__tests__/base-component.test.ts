import { BaseComponent } from '../base-component';

// Test that the class exists and has expected properties/methods
describe('BaseComponent', () => {
  // Basic class structure test
  it('should be defined', () => {
    expect(BaseComponent).toBeDefined();
  });

  it('should have static properties and methods', () => {
    expect(typeof BaseComponent.hotReload).toBe('function');
    expect(BaseComponent).toHaveProperty('styles');
  });

  it('should be an HTML element', () => {
    expect(Object.getPrototypeOf(BaseComponent)).toBe(HTMLElement);
  });

  it('should have methods on its prototype', () => {
    // Just check if the prototype has methods, without accessing them directly
    const protoKeys = Object.getOwnPropertyNames(BaseComponent.prototype);
    expect(protoKeys).toContain('updateContent'); 
    expect(protoKeys).toContain('updateStyles');
    expect(protoKeys).toContain('_initializeShadowDOM');
  });
}); 
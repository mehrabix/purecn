import { ButtonComponent } from '../button';
import { BaseComponent } from '../../base-component';

describe('ButtonComponent', () => {
  it('should be defined', () => {
    expect(ButtonComponent).toBeDefined();
  });

  it('should have the correct static properties', () => {
    expect(ButtonComponent).toHaveProperty('styles');
    expect(ButtonComponent).toHaveProperty('observedAttributes');
  });

  it('should observe the correct attributes', () => {
    const observedAttrs = ButtonComponent.observedAttributes;
    expect(observedAttrs).toContain('variant');
    expect(observedAttrs).toContain('size');
    expect(observedAttrs).toContain('disabled');
    expect(observedAttrs).toContain('loading');
  });
  
  it('should have getter methods on its prototype', () => {
    const protoProps = Object.getOwnPropertyNames(ButtonComponent.prototype);
    expect(protoProps).toContain('variant');
    expect(protoProps).toContain('size');
    expect(protoProps).toContain('disabled');
    expect(protoProps).toContain('loading');
  });
}); 
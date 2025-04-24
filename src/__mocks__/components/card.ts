import { BaseComponent } from './base-component';

type CardVariant = 'default' | 'outline' | 'ghost';

/**
 * Mock Card component for testing
 */
export class CardComponent extends BaseComponent {
  static override styles: string = '';

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['variant', 'hover'];
  }

  get variant(): CardVariant {
    return (this.getAttribute('variant') as CardVariant) || 'default';
  }

  get hover(): boolean {
    return this.hasAttribute('hover');
  }

  protected override render() {
    // Mock implementation for testing
  }
} 
import { BaseComponent } from './base-component';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export class ButtonComponent extends BaseComponent {
  static override styles: string = '';

  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled', 'loading'];
  }

  get variant(): ButtonVariant {
    return (this.getAttribute('variant') as ButtonVariant) || 'primary';
  }

  get size(): ButtonSize {
    return (this.getAttribute('size') as ButtonSize) || 'md';
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled');
  }

  get loading(): boolean {
    return this.hasAttribute('loading');
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  protected override render() {
    // Mock implementation
  }
} 
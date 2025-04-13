import styles from './button.scss';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg';

export class ButtonComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private static styles: string = '';

  static {
    if (typeof styles === 'string') {
      ButtonComponent.styles = styles;
    }
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['variant', 'size', 'disabled'];
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private render() {
    const styleElement = document.createElement('style');
    styleElement.textContent = ButtonComponent.styles;
    
    this.shadow.innerHTML = '';
    this.shadow.appendChild(styleElement);
    
    this.shadow.innerHTML += `
      <button class="btn ${this.variant} ${this.size}" ${this.disabled ? 'disabled' : ''}>
        <slot></slot>
      </button>
    `;
  }
}

// Register the component
if (!customElements.get('my-button')) {
  customElements.define('my-button', ButtonComponent);
} 
import styles from './button.scss';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

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

  private render() {
    const styleElement = document.createElement('style');
    styleElement.textContent = ButtonComponent.styles;
    
    this.shadow.innerHTML = '';
    this.shadow.appendChild(styleElement);
    
    const loadingContent = this.loading ? '<span class="spinner"></span>' : '';
    
    this.shadow.innerHTML += `
      <button 
        class="btn ${this.variant} ${this.size}" 
        ${this.disabled ? 'disabled' : ''}
        ${this.loading ? 'loading' : ''}
        data-slot="button"
      >
        ${loadingContent}
        <slot></slot>
      </button>
    `;
  }
}

// Register the component
if (!customElements.get('pure-button')) {
  customElements.define('pure-button', ButtonComponent);
} 
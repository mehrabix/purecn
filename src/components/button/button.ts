import styles from './button.scss';
import { BaseComponent } from '../base-component';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export class ButtonComponent extends BaseComponent {
  static override styles: string = '';
  
  // Theme change listener
  private themeChangeListener: ((e: Event) => void) | null = null;

  static {
    // Make sure styles is properly assigned
    ButtonComponent.styles = typeof styles === 'string' ? styles : '';
    if (typeof styles === 'string') {
      console.log('Button styles loaded from SCSS:', styles.slice(0, 100) + '...');
    } else {
      console.error('Button styles not loaded correctly:', typeof styles);
    }
  }

  constructor() {
    super();
    // Add data-instance-id for HMR targeting
    this.setAttribute('data-instance-id', this.uniqueSelector.split('"')[1]);
    
    // Setup theme change listener
    this.themeChangeListener = this.handleThemeChange.bind(this);
  }
  
  connectedCallback() {
    // Add event listener for theme changes
    document.addEventListener('purecn-theme-change', this.themeChangeListener as EventListener);
  }
  
  disconnectedCallback() {
    // Remove event listener when component is removed from DOM
    if (this.themeChangeListener) {
      document.removeEventListener('purecn-theme-change', this.themeChangeListener as EventListener);
    }
  }
  
  /**
   * Handle theme changes
   */
  private handleThemeChange(e: Event) {
    console.log('Button: Theme change detected, re-rendering');
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

  protected override render() {
    const stylesPreview = ButtonComponent.styles && ButtonComponent.styles.length > 0 
      ? ButtonComponent.styles.slice(0, 50) + '...' 
      : 'empty styles';
    console.log('Rendering button with styles:', stylesPreview);
    
    // Make sure to use the correct styles from the static property
    if (ButtonComponent.styles) {
      this.updateStyles(ButtonComponent.styles);
    } else {
      console.error('Button styles are empty or not loaded correctly');
    }
    
    const loadingContent = this.loading ? '<span class="spinner"></span>' : '';
    
    // Update content
    this.updateContent(`
      <button 
        class="btn ${this.variant} ${this.size}" 
        ${this.disabled ? 'disabled' : ''}
        ${this.loading ? 'loading' : ''}
        data-slot="button"
      >
        ${loadingContent}
        <slot></slot>
      </button>
    `);
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  // Check if the element is already defined before trying to register it
  if (!customElements.get('pure-button')) {
    customElements.define('pure-button', ButtonComponent);
  }
}

// Support HMR
if (import.meta.hot) {
  // For ESM format
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      console.log('Button HMR triggered (ESM), updating styles');
      ButtonComponent.hotReload(newModule.ButtonComponent.styles);
    }
  });
}

// For development mode using UMD format (global object)
if (typeof window !== 'undefined') {
  // Register this component module for HMR if global window.purecn doesn't exist yet
  if (!window.purecn) {
    window.purecn = {};
  }
  
  // Store the component for HMR in UMD format
  if (!window.purecn.button) {
    window.purecn.button = {
      ButtonComponent,
      // Method to handle HMR for UMD format
      hotUpdate: (newComponent: any) => {
        console.log('Button HMR triggered (UMD), updating styles');
        if (newComponent && newComponent.styles) {
          ButtonComponent.hotReload(newComponent.styles);
        }
      }
    };
  }
} 
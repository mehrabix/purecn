import styles from './card.scss';
import { BaseComponent } from '../base-component';

type CardVariant = 'default' | 'outline' | 'ghost';

/**
 * Card component for content containers
 */
export class CardComponent extends BaseComponent {
  static override styles: string = '';
  
  // Theme change listener
  private themeChangeListener: ((e: Event) => void) | null = null;

  static {
    // Make sure styles is properly assigned
    CardComponent.styles = typeof styles === 'string' ? styles : '';
    if (typeof styles === 'string') {
      console.log('Card styles loaded from SCSS:', styles.slice(0, 100) + '...');
    } else {
      console.error('Card styles not loaded correctly:', typeof styles);
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
    console.log('Card: Theme change detected, re-rendering');
    this.render();
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
    // Make sure to use the correct styles
    if (CardComponent.styles) {
      this.updateStyles(CardComponent.styles);
      console.log('Card styles applied');
    } else {
      console.error('Card styles are empty or not loaded correctly');
    }
    
    // Update content
    this.updateContent(`
      <div class="card ${this.variant} ${this.hover ? 'hover' : ''}" data-slot="card">
        <div class="card-content" data-slot="card-content">
          <slot></slot>
        </div>
      </div>
    `);
  }
}

// Register the custom element if we're in a browser environment
if (typeof window !== 'undefined' && typeof customElements !== 'undefined') {
  // Check if the element is already defined before trying to register it
  if (!customElements.get('pure-card')) {
    customElements.define('pure-card', CardComponent);
  }
}

// Support HMR
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    if (newModule) {
      // Update styles when module is hot-updated
      CardComponent.hotReload(newModule.CardComponent.styles);
    }
  });
} 
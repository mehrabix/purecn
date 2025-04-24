import styles from './card.scss';
import { BaseComponent } from '../base-component';

type CardVariant = 'default' | 'outline' | 'ghost';

/**
 * Card component for content containers
 */
export class CardComponent extends BaseComponent {
  static override styles: string = '';

  static {
    if (typeof styles === 'string') {
      CardComponent.styles = styles;
    }
  }

  constructor() {
    super();
    // Add data-instance-id for HMR targeting
    this.setAttribute('data-instance-id', this.uniqueSelector.split('"')[1]);
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
    // Update styles
    this.updateStyles(CardComponent.styles);
    
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

// Register the component
if (!customElements.get('pure-card')) {
  customElements.define('pure-card', CardComponent);
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
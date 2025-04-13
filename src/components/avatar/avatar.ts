import styles from './avatar.scss';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarShape = 'circle' | 'square';
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

export class AvatarComponent extends HTMLElement {
  private shadow: ShadowRoot;
  private static styles: string = '';

  static {
    if (typeof styles === 'string') {
      AvatarComponent.styles = styles;
    }
  }

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['src', 'alt', 'size', 'shape', 'fallback', 'status', 'delayMs'];
  }

  get src(): string {
    return this.getAttribute('src') || '';
  }

  get alt(): string {
    return this.getAttribute('alt') || '';
  }

  get size(): AvatarSize {
    return (this.getAttribute('size') as AvatarSize) || 'md';
  }

  get shape(): AvatarShape {
    return (this.getAttribute('shape') as AvatarShape) || 'circle';
  }

  get fallback(): string {
    return this.getAttribute('fallback') || '';
  }

  get status(): AvatarStatus {
    return (this.getAttribute('status') as AvatarStatus) || 'none';
  }

  get delayMs(): number {
    return parseInt(this.getAttribute('delayMs') || '0', 10);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private handleError() {
    const fallback = this.fallback || this.alt.slice(0, 2).toUpperCase();
    const avatarEl = this.shadow.querySelector('.avatar');
    if (avatarEl) {
      avatarEl.innerHTML = `<span class="fallback" data-slot="avatar-fallback">${fallback}</span>`;
    }
  }

  private render() {
    const styleElement = document.createElement('style');
    styleElement.textContent = AvatarComponent.styles;
    
    this.shadow.innerHTML = '';
    this.shadow.appendChild(styleElement);
    
    // Add a delay for loading the image if specified
    const delayAttr = this.delayMs > 0 ? `loading="lazy" fetchpriority="low"` : '';
    
    // Image content with data-slot attribute for better styling options
    const avatarContent = this.src
      ? `<img 
           src="${this.src}" 
           alt="${this.alt}"
           data-slot="avatar-image"
           ${delayAttr}
         >`
      : `<span class="fallback" data-slot="avatar-fallback">${this.fallback || this.alt.slice(0, 2).toUpperCase()}</span>`;

    // Status indicator HTML if status is set
    const statusHtml = this.status !== 'none' 
      ? `<span class="status-indicator ${this.status}" data-slot="avatar-status"></span>` 
      : '';

    this.shadow.innerHTML += `
      <div class="avatar ${this.size} ${this.shape}" data-slot="avatar">
        ${avatarContent}
        ${statusHtml}
      </div>
    `;

    // Add error handler if image is present
    if (this.src) {
      const img = this.shadow.querySelector('img');
      if (img) {
        img.addEventListener('error', () => this.handleError());
      }
    }
  }
}

// Register the component
if (!customElements.get('my-avatar')) {
  customElements.define('my-avatar', AvatarComponent);
} 
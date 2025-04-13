import styles from './avatar.scss';

type AvatarSize = 'sm' | 'md' | 'lg';
type AvatarShape = 'circle' | 'square';

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
    return ['src', 'alt', 'size', 'shape', 'fallback'];
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  private handleError() {
    const fallback = this.fallback || this.alt.slice(0, 2).toUpperCase();
    const avatar = this.shadow.querySelector('.avatar');
    if (avatar) {
      avatar.innerHTML = `<span class="fallback">${fallback}</span>`;
    }
  }

  private render() {
    const styleElement = document.createElement('style');
    styleElement.textContent = AvatarComponent.styles;
    
    this.shadow.innerHTML = '';
    this.shadow.appendChild(styleElement);
    
    const avatarContent = this.src
      ? `<img src="${this.src}" alt="${this.alt}">`
      : `<span class="fallback">${this.fallback || this.alt.slice(0, 2).toUpperCase()}</span>`;

    this.shadow.innerHTML += `
      <div class="avatar ${this.size} ${this.shape}">
        ${avatarContent}
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
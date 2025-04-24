import { BaseComponent } from './base-component';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type AvatarShape = 'circle' | 'square';
type AvatarStatus = 'online' | 'offline' | 'busy' | 'away' | 'none';

export class AvatarComponent extends BaseComponent { 
  static override styles: string = '';
  
  // Track if we need to set up error handlers
  private needsErrorHandler = false;

  constructor() {
    super();
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
    // Mock implementation
  }

  protected override render() {
    // Mock implementation for testing
  }
} 
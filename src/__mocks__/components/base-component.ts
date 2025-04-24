/**
 * Mock implementation of BaseComponent for testing
 */
export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  private _uniqueId: string;
  static styles: string = '';

  constructor() {
    super();
    this._uniqueId = Math.random().toString(36).substring(2, 10);
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  /**
   * Initialize shadow DOM with base structure
   */
  protected _initializeShadowDOM(): void {
    // Already initialized in constructor
  }

  /**
   * Each component must implement a render method
   */
  protected abstract render(): void;

  /**
   * Updates the component's HTML content
   */
  protected updateContent(html: string): void {
    // Mock implementation
  }

  /**
   * Updates the component's styles
   */
  protected updateStyles(css: string): void {
    // Mock implementation
  }

  /**
   * Get a unique selector for this component instance
   */
  get uniqueSelector(): string {
    return `${this.tagName.toLowerCase()}[data-component-id="${this._uniqueId}"]`;
  }

  /**
   * Hot reload support for updating component styles
   */
  static hotReload(styles: string): void {
    // Mock implementation for testing
  }
} 
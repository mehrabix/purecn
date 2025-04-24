/**
 * Base component class that all PureCN components extend
 * Includes built-in HMR (Hot Module Replacement) support
 */
export abstract class BaseComponent extends HTMLElement {
  protected shadow: ShadowRoot;
  private static _uniqueId = 0;
  private readonly _instanceId: number;

  // Each component should have its own styles property
  protected static styles: string = '';

  constructor() {
    super();
    this._instanceId = BaseComponent._uniqueId++;
    this.shadow = this.attachShadow({ mode: 'open' });
    
    // Initialize with a placeholder for style content
    this._initializeShadowDOM();
    
    // Render after construction
    this.render();
  }
  
  /**
   * Initialize the shadow DOM with the basic structure
   * @private
   */
  private _initializeShadowDOM(): void {
    const styleEl = document.createElement('style');
    styleEl.id = 'component-styles';
    
    const rootEl = document.createElement('div');
    rootEl.id = 'component-root';
    
    this.shadow.appendChild(styleEl);
    this.shadow.appendChild(rootEl);
  }
  
  /**
   * Abstract render method to be implemented by child classes
   */
  protected abstract render(): void;
  
  /**
   * Update the component's shadow DOM content
   * This is called by the render method and provides a hook for HMR
   * @param content The HTML content to render
   */
  protected updateContent(content: string): void {
    const root = this.shadow.getElementById('component-root');
    if (root) {
      root.innerHTML = content;
    } else {
      console.error('component-root element not found in shadow DOM');
    }
  }
  
  /**
   * Update the component's styles
   * This is called by the render method and provides a hook for HMR
   * @param styles The CSS styles to apply
   */
  protected updateStyles(styles: string): void {
    if (!styles || typeof styles !== 'string') {
      console.warn(`No styles provided for ${this.tagName.toLowerCase()}`);
      return;
    }
    
    const styleEl = this.shadow.getElementById('component-styles');
    if (styleEl) {
      styleEl.textContent = styles;
    } else {
      console.error('component-styles element not found in shadow DOM');
      
      // Fallback: create a new style element if it doesn't exist
      const newStyleEl = document.createElement('style');
      newStyleEl.id = 'component-styles';
      newStyleEl.textContent = styles;
      this.shadow.prepend(newStyleEl);
    }
  }
  
  /**
   * Called when an observed attribute changes
   */
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  /**
   * Get a unique selector for this component instance
   * Useful for targeting in HMR
   */
  get uniqueSelector(): string {
    return `${this.tagName.toLowerCase()}[data-instance-id="${this._instanceId}"]`;
  }
  
  /**
   * HMR helper - called when a component's module is hot-replaced
   * @param newStyles The new styles to apply
   */
  static hotReload(newStyles: string): void {
    if (typeof document === 'undefined') return;
    
    if (!newStyles || typeof newStyles !== 'string') {
      console.warn(`Hot reload called with invalid styles for ${this.name}`);
      return;
    }
    
    console.log(`Hot reloading ${this.name} with new styles`);
    
    // Update static styles property
    this.styles = newStyles;
    
    // Update all existing instances
    const tagName = this.name.replace(/Component$/, '').toLowerCase();
    const customElementName = `pure-${tagName}`;
    
    // Find all instances and update their styles
    document.querySelectorAll(customElementName).forEach(element => {
      const instance = element as BaseComponent;
      if (instance && instance.updateStyles) {
        instance.updateStyles(newStyles);
        // Also re-render to ensure proper styling
        instance.render();
      }
    });
  }
} 
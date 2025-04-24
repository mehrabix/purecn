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
    // Create style element
    const styleEl = document.createElement('style');
    styleEl.id = 'component-styles';
    
    // Create root element
    const rootEl = document.createElement('div');
    rootEl.id = 'component-root';
    
    // Append to shadow DOM
    this.shadow.appendChild(styleEl);
    this.shadow.appendChild(rootEl);
    
    // Log for debugging
    console.log(`Initialized shadow DOM for ${this.tagName.toLowerCase()}`);
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
      console.error(`component-root element not found in shadow DOM for ${this.tagName.toLowerCase()}`);
      
      // Fallback: create a new root element if it doesn't exist
      const newRootEl = document.createElement('div');
      newRootEl.id = 'component-root';
      newRootEl.innerHTML = content;
      this.shadow.appendChild(newRootEl);
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
    
    console.log(`Applying styles to ${this.tagName.toLowerCase()}, style length: ${styles.length} chars`);
    console.log(`Style preview: ${styles.slice(0, 50)}...`);
    
    // Find or create the style element
    let styleEl = this.shadow.getElementById('component-styles') as HTMLStyleElement;
    
    if (!styleEl) {
      console.warn(`component-styles element not found in shadow DOM for ${this.tagName.toLowerCase()}, creating a new one`);
      
      // Create a new style element
      styleEl = document.createElement('style');
      styleEl.id = 'component-styles';
      this.shadow.prepend(styleEl);
    }
    
    // Apply the styles
    try {
      styleEl.textContent = styles;
      console.log(`Styles successfully applied to ${this.tagName.toLowerCase()}`);
      
      // Log computed styles for debugging
      setTimeout(() => {
        const root = this.shadow.getElementById('component-root');
        if (root && root.firstElementChild) {
          const computedStyles = getComputedStyle(root.firstElementChild);
          console.log(`Computed styles for ${this.tagName.toLowerCase()}: color=${computedStyles.color}, background=${computedStyles.background}`);
        }
      }, 0);
    } catch (error) {
      console.error(`Error applying styles to ${this.tagName.toLowerCase()}:`, error);
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
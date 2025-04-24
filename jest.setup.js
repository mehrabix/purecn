require('@testing-library/jest-dom'); 

/**
 * Complete mocking setup for Web Components and Shadow DOM in Jest
 */

// Create a proper node-like structure for our mocks
class MockNode {
  constructor() {
    this.childNodes = [];
    this.parentNode = null;
  }

  appendChild(node) {
    this.childNodes.push(node);
    node.parentNode = this;
    return node;
  }

  removeChild(node) {
    const index = this.childNodes.indexOf(node);
    if (index !== -1) {
      this.childNodes.splice(index, 1);
      node.parentNode = null;
    }
    return node;
  }
}

// Enhanced ShadowRoot mock with proper DOM-like API
class MockShadowRoot extends MockNode {
  constructor(host, mode) {
    super();
    this.host = host;
    this.mode = mode || 'open';
    this._elements = new Map();
    this._innerHTML = '';
  }

  getElementById(id) {
    return this._elements.get(id) || null;
  }

  querySelector(selector) {
    // Simple implementations for common selectors
    if (selector.startsWith('#')) {
      return this.getElementById(selector.substring(1));
    }
    
    if (selector.startsWith('.')) {
      const className = selector.substring(1);
      for (const el of this._elements.values()) {
        if (el.classList && el.classList.contains(className)) {
          return el;
        }
      }
    }
    
    // For tag selectors
    for (const el of this._elements.values()) {
      if (el.tagName && el.tagName.toLowerCase() === selector.toLowerCase()) {
        return el;
      }
    }
    
    return null;
  }
}

// Enhanced Element mock
class MockElement extends MockNode {
  constructor(tagName) {
    super();
    this.tagName = tagName.toUpperCase();
    this.attributes = {};
    this.style = {};
    this.classList = new Set();
    this.id = '';
    this._innerHTML = '';
    this._textContent = '';
    
    // Make this a proper Node for JSDOM
    this.nodeType = 1; // ELEMENT_NODE
  }

  setAttribute(name, value) {
    this.attributes[name] = String(value);
    // Handle special cases like id and class
    if (name === 'id') this.id = value;
    if (name === 'class') this.updateClassList(value);
  }

  getAttribute(name) {
    return this.attributes[name] || null;
  }

  hasAttribute(name) {
    return name in this.attributes;
  }

  removeAttribute(name) {
    delete this.attributes[name];
  }

  updateClassList(classStr) {
    this.classList = new Set(classStr.split(/\s+/).filter(Boolean));
  }

  // Class list methods
  get className() {
    return Array.from(this.classList).join(' ');
  }

  set className(value) {
    this.updateClassList(value);
  }

  // Text content
  get textContent() {
    return this._textContent;
  }

  set textContent(value) {
    this._textContent = String(value);
  }

  // HTML content
  get innerHTML() {
    return this._innerHTML;
  }

  set innerHTML(value) {
    this._innerHTML = String(value);
    // In a real implementation, this would parse HTML and create elements
  }
}

// Create a registry for the customElements API
const elementRegistry = new Map();

// Mock the customElements global
window.customElements = {
  define: (name, constructor) => {
    elementRegistry.set(name, constructor);
  },
  get: (name) => elementRegistry.get(name) || undefined,
  whenDefined: (name) => {
    return Promise.resolve(elementRegistry.get(name));
  }
};

// Create specialized factory for shadow DOM-enabled elements
function createShadowElement(tagName) {
  const element = new MockElement(tagName);
  
  element.attachShadow = ({ mode }) => {
    const shadow = new MockShadowRoot(element, mode);
    element.shadowRoot = shadow;
    return shadow;
  };
  
  return element;
}

// Override document.createElement to support custom elements
const originalCreateElement = document.createElement;
document.createElement = function(tagName, options) {
  if (tagName.includes('-')) {
    const CustomElement = elementRegistry.get(tagName.toLowerCase());
    if (CustomElement) {
      try {
        // Create a proper element that JSDOM can work with
        const element = originalCreateElement.call(document, tagName, options);
        
        // Extend it with the custom element functionality
        Object.setPrototypeOf(element, CustomElement.prototype);
        
        // Call the constructor manually
        try {
          CustomElement.call(element);
        } catch (error) {
          console.warn(`Error in custom element constructor for ${tagName}:`, error);
        }
        
        return element;
      } catch (error) {
        console.warn(`Error creating custom element ${tagName}:`, error);
        // Fallback to our mock if constructor fails
        return createShadowElement(tagName);
      }
    }
    // If the element isn't registered yet, return a mock
    return createShadowElement(tagName);
  }
  // For regular elements, use the original implementation
  return originalCreateElement.call(document, tagName, options);
};

// Provide mocked versions of other globals often used with web components
global.DOMException = window.DOMException || class DOMException extends Error {
  constructor(message, name) {
    super(message);
    this.name = name || 'Error';
    this.message = message || '';
  }
};

global.ErrorEvent = window.ErrorEvent || class ErrorEvent extends Event {
  constructor(type, options = {}) {
    super(type);
    this.message = options.message || '';
    this.filename = options.filename || '';
    this.lineno = options.lineno || 0;
    this.colno = options.colno || 0;
    this.error = options.error || null;
  }
};

// Mock import.meta.hot for testing
global.import = {
  meta: {
    hot: {
      accept: (callback) => {
        // This is a mock implementation that does nothing
      }
    }
  }
};

// Add import.meta to window for components that check window.import
window.import = global.import;

// Reduce noisy console warnings
const originalWarn = console.warn;
console.warn = function(...args) {
  // Filter out web component related warnings
  if (args[0] && typeof args[0] === 'string' && 
      (args[0].includes('No styles provided for') || 
       args[0].includes('MutationObserver') ||
       args[0].includes('custom element'))) {
    return;
  }
  originalWarn.apply(console, args);
}; 
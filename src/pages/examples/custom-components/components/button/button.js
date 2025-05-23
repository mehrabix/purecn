// The require scope
var __webpack_require__ = {};

/************************************************************************/
// webpack/runtime/define_property_getters
(() => {
__webpack_require__.d = (exports, definition) => {
	for(var key in definition) {
        if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
        }
    }
};
})();
// webpack/runtime/has_own_property
(() => {
__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
})();
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  r: () => (/* reexport */ ButtonComponent)
});

;// CONCATENATED MODULE: ./src/components/button/button.scss
const button_namespaceObject = "@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.btn{display:inline-flex;align-items:center;justify-content:center;border-radius:var(--radius);font-weight:500;cursor:default;transition:background-color .15s ease-in-out,border-color .15s ease-in-out,color .15s ease-in-out,opacity .15s ease-in-out,transform .1s ease-out;border:1px solid rgba(0,0,0,0);outline:none;position:relative;user-select:none;white-space:nowrap;vertical-align:middle;line-height:1.2;gap:.5rem}.btn:focus-visible{outline:2px solid var(--ring);outline-offset:2px}.btn.primary{background-color:var(--primary);color:var(--primary-foreground);border-color:var(--primary)}.btn.primary:hover:not(:disabled){background-color:var(--primary);opacity:.9}.btn.primary:active:not(:disabled){opacity:.8}.btn.secondary{background-color:var(--secondary);color:var(--secondary-foreground);border-color:var(--secondary)}.btn.secondary:hover:not(:disabled){background-color:var(--secondary);opacity:.9}.btn.secondary:active:not(:disabled){opacity:.8}.btn.outline{background-color:rgba(0,0,0,0);border:1px solid var(--border);color:var(--foreground)}.btn.outline:hover:not(:disabled){background-color:var(--accent);color:var(--accent-foreground);border-color:rgba(0,0,0,0)}.btn.outline:active:not(:disabled){background-color:var(--accent);color:var(--accent-foreground);border-color:rgba(0,0,0,0);opacity:.9}.btn.destructive{background-color:var(--destructive);color:var(--destructive-foreground);border-color:var(--destructive)}.btn.destructive:hover:not(:disabled){background-color:var(--destructive);opacity:.9}.btn.destructive:active:not(:disabled){opacity:.8}.btn.ghost{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0);color:var(--foreground)}.btn.ghost:hover:not(:disabled){background-color:var(--accent);color:var(--accent-foreground)}.btn.ghost:active:not(:disabled){background-color:var(--accent);opacity:.9}.btn.link{background-color:rgba(0,0,0,0);border-color:rgba(0,0,0,0);color:var(--primary);text-decoration-line:underline;padding:0;height:auto}.btn.link:hover:not(:disabled){color:var(--primary);opacity:.8}.btn.link:active:not(:disabled){opacity:.7}.btn.sm{height:2rem;padding:0 .75rem;font-size:.875rem;gap:.5rem}.btn.md{height:2.5rem;padding:0 1rem;font-size:1rem;gap:.5rem}.btn.lg{height:3rem;padding:0 1.5rem;font-size:1.125rem;gap:.75rem}.btn.icon{height:2.5rem;width:2.5rem;padding:0;font-size:1rem}.btn:disabled{opacity:.5;cursor:not-allowed;pointer-events:none}.btn.loading{cursor:wait;pointer-events:none}.btn.loading .spinner{display:inline-block;width:1em;height:1em;border:2px solid currentColor;border-right-color:rgba(0,0,0,0);border-radius:50%;animation:spin .75s linear infinite;margin-right:.5rem}.btn svg,.btn img{pointer-events:none;flex-shrink:0}";
;// CONCATENATED MODULE: ./src/components/button/button.ts

class ButtonComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }
    static get observedAttributes() {
        return ['variant', 'size', 'disabled', 'loading'];
    }
    get variant() {
        return this.getAttribute('variant') || 'primary';
    }
    get size() {
        return this.getAttribute('size') || 'md';
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    get loading() {
        return this.hasAttribute('loading');
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    render() {
        const styleElement = document.createElement('style');
        styleElement.textContent = ButtonComponent.styles;
        this.shadow.innerHTML = '';
        this.shadow.appendChild(styleElement);
        const loadingContent = this.loading ? '<span class="spinner"></span>' : '';
        this.shadow.innerHTML += `
      <button 
        class="btn ${this.variant} ${this.size}" 
        ${this.disabled ? 'disabled' : ''}
        ${this.loading ? 'loading' : ''}
        data-slot="button"
      >
        ${loadingContent}
        <slot></slot>
      </button>
    `;
    }
}
ButtonComponent.styles = '';
(() => {
    if (typeof button_namespaceObject === 'string') {
        ButtonComponent.styles = button_namespaceObject;
    }
})();
// Register the component
if (!customElements.get('pure-button')) {
    customElements.define('pure-button', ButtonComponent);
}

;// CONCATENATED MODULE: ./src/components/button/index.ts


var __webpack_exports__ButtonComponent = __webpack_exports__.r;
export { __webpack_exports__ButtonComponent as ButtonComponent };

//# sourceMappingURL=button.js.map
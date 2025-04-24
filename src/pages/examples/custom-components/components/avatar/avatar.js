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
  A: () => (/* reexport */ AvatarComponent)
});

;// CONCATENATED MODULE: ./src/components/avatar/avatar.scss
const avatar_namespaceObject = ".avatar{position:relative;display:inline-flex;align-items:center;justify-content:center;overflow:hidden;background-color:var(--muted);color:var(--muted-foreground);font-weight:500;transition:transform .2s,opacity .2s;flex-shrink:0;vertical-align:middle}.avatar img{width:100%;height:100%;object-fit:cover;border-radius:inherit}.avatar .fallback{display:flex;align-items:center;justify-content:center;width:100%;height:100%;text-align:center;line-height:1;text-transform:uppercase}.avatar.sm{width:2rem;height:2rem;font-size:.875rem}.avatar.md{width:2.5rem;height:2.5rem;font-size:1rem}.avatar.lg{width:3rem;height:3rem;font-size:1.125rem}.avatar.xl{width:4rem;height:4rem;font-size:1.25rem}.avatar.\\32 xl{width:5rem;height:5rem;font-size:1.5rem}.avatar.circle{border-radius:50%}.avatar.square{border-radius:var(--radius)}.avatar .status-indicator{position:absolute;bottom:0;right:0;width:.75rem;height:.75rem;border-radius:50%;border:2px solid var(--background)}.avatar .status-indicator.online{background-color:var(--success, #22c55e)}.avatar .status-indicator.offline{background-color:var(--muted, #a1a1aa)}.avatar .status-indicator.busy{background-color:var(--destructive, #ef4444)}.avatar .status-indicator.away{background-color:var(--warning, #f59e0b)}.avatar.lg .status-indicator,.avatar.xl .status-indicator,.avatar.\\32 xl .status-indicator{width:1rem;height:1rem}.avatar:focus-visible{outline:2px solid var(--ring);outline-offset:2px}";
;// CONCATENATED MODULE: ./src/components/avatar/avatar.ts

class AvatarComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }
    static get observedAttributes() {
        return ['src', 'alt', 'size', 'shape', 'fallback', 'status', 'delayMs'];
    }
    get src() {
        return this.getAttribute('src') || '';
    }
    get alt() {
        return this.getAttribute('alt') || '';
    }
    get size() {
        return this.getAttribute('size') || 'md';
    }
    get shape() {
        return this.getAttribute('shape') || 'circle';
    }
    get fallback() {
        return this.getAttribute('fallback') || '';
    }
    get status() {
        return this.getAttribute('status') || 'none';
    }
    get delayMs() {
        return parseInt(this.getAttribute('delayMs') || '0', 10);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.render();
        }
    }
    handleError() {
        const fallback = this.fallback || this.alt.slice(0, 2).toUpperCase();
        const avatarEl = this.shadow.querySelector('.avatar');
        if (avatarEl) {
            avatarEl.innerHTML = `<span class="fallback" data-slot="avatar-fallback">${fallback}</span>`;
        }
    }
    render() {
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
AvatarComponent.styles = '';
(() => {
    if (typeof avatar_namespaceObject === 'string') {
        AvatarComponent.styles = avatar_namespaceObject;
    }
})();
// Register the component
if (!customElements.get('pure-avatar')) {
    customElements.define('pure-avatar', AvatarComponent);
}

;// CONCATENATED MODULE: ./src/components/avatar/index.ts


var __webpack_exports__AvatarComponent = __webpack_exports__.A;
export { __webpack_exports__AvatarComponent as AvatarComponent };

//# sourceMappingURL=avatar.js.map
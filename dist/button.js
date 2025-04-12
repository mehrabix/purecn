(function webpackUniversalModuleDefinition(root, factory) {

      if(typeof exports === 'object' && typeof module === 'object') {
          module.exports = factory();
      }else if(typeof define === 'function' && define.amd) {
          
          define([], factory);

          } else if(typeof exports === 'object'){

          
      exports["WebComponents"] = factory();

      } else {

          
      root["WebComponents"] = factory();
      }

      })(this, () => {
          return (() => { // webpackBootstrap
"use strict";
var __webpack_modules__ = ({
"./src/components/button/button.ts": 
/*!*****************************************!*\
  !*** ./src/components/button/button.ts ***!
  \*****************************************/
(function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ButtonComponent: () => (ButtonComponent)
});
/* ESM import */var _button_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button.scss */ "./src/components/button/button.scss");

class ButtonComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.render();
    }
    static get observedAttributes() {
        return ['variant', 'size', 'disabled'];
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
        const button = document.createElement('button');
        button.className = `btn ${this.variant} ${this.size}`;
        button.disabled = this.disabled;
        button.innerHTML = '<slot></slot>';
        this.shadow.appendChild(button);
    }
}
ButtonComponent.styles = '';
(() => {
    if (typeof _button_scss__WEBPACK_IMPORTED_MODULE_0__ === 'string') {
        ButtonComponent.styles = _button_scss__WEBPACK_IMPORTED_MODULE_0__;
    }
})();
// Register the component
if (!customElements.get('my-button')) {
    customElements.define('my-button', ButtonComponent);
}


}),
"./src/components/button/button.scss": 
/*!*******************************************!*\
  !*** ./src/components/button/button.scss ***!
  \*******************************************/
(function (module) {
module.exports = "@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n.btn {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 0.375rem;\n  font-weight: 500;\n  cursor: pointer;\n  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);\n  border: none;\n  outline: none;\n  position: relative;\n  user-select: none;\n  white-space: nowrap;\n  vertical-align: middle;\n  line-height: 1.2;\n}\n.btn:focus-visible {\n  outline: 2px solid #2563eb;\n  outline-offset: 2px;\n}\n.btn.primary {\n  background-color: #2563eb;\n  color: white;\n}\n.btn.primary:hover:not(:disabled) {\n  background-color: #1d4ed8;\n  transform: translateY(-1px);\n}\n.btn.primary:active:not(:disabled) {\n  background-color: #1e40af;\n  transform: translateY(0);\n}\n.btn.secondary {\n  background-color: #f3f4f6;\n  color: #111827;\n}\n.btn.secondary:hover:not(:disabled) {\n  background-color: #e5e7eb;\n  transform: translateY(-1px);\n}\n.btn.secondary:active:not(:disabled) {\n  background-color: #d1d5db;\n  transform: translateY(0);\n}\n.btn.outline {\n  background-color: transparent;\n  border: 1px solid #e5e7eb;\n  color: #111827;\n}\n.btn.outline:hover:not(:disabled) {\n  background-color: #f9fafb;\n  border-color: #d1d5db;\n  transform: translateY(-1px);\n}\n.btn.outline:active:not(:disabled) {\n  background-color: #f3f4f6;\n  transform: translateY(0);\n}\n.btn.sm {\n  height: 2rem;\n  padding: 0 0.75rem;\n  font-size: 0.875rem;\n  gap: 0.5rem;\n}\n.btn.md {\n  height: 2.5rem;\n  padding: 0 1rem;\n  font-size: 1rem;\n  gap: 0.5rem;\n}\n.btn.lg {\n  height: 3rem;\n  padding: 0 1.5rem;\n  font-size: 1.125rem;\n  gap: 0.75rem;\n}\n.btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n  pointer-events: none;\n}\n.btn.loading {\n  cursor: wait;\n  pointer-events: none;\n}\n.btn.loading .spinner {\n  display: inline-block;\n  width: 1em;\n  height: 1em;\n  border: 2px solid currentColor;\n  border-right-color: transparent;\n  border-radius: 50%;\n  animation: spin 0.75s linear infinite;\n}";

}),

});
/************************************************************************/
// The module cache
var __webpack_module_cache__ = {};

// The require function
function __webpack_require__(moduleId) {

// Check if module is in cache
var cachedModule = __webpack_module_cache__[moduleId];
if (cachedModule !== undefined) {
return cachedModule.exports;
}
// Create a new module (and put it into the cache)
var module = (__webpack_module_cache__[moduleId] = {
exports: {}
});
// Execute the module function
__webpack_modules__[moduleId](module, module.exports, __webpack_require__);

// Return the exports of the module
return module.exports;

}

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
// webpack/runtime/make_namespace_object
(() => {
// define __esModule on exports
__webpack_require__.r = (exports) => {
	if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
	}
	Object.defineProperty(exports, '__esModule', { value: true });
};
})();
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {

/*!****************************************!*\
  !*** ./src/components/button/index.ts ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  ButtonComponent: () => (/* reexport safe */ _button__WEBPACK_IMPORTED_MODULE_0__.ButtonComponent)
});
/* ESM import */var _button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./button */ "./src/components/button/button.ts");


})();

return __webpack_exports__;
})()

});
//# sourceMappingURL=button.js.map
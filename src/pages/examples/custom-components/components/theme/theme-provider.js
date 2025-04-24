var __webpack_modules__ = ({
741: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  PQ: () => (/* reexport */ dark_namespaceObject),
  qD: () => (/* reexport */ light_namespaceObject),
  VX: () => (/* reexport */ base_namespaceObject)
});

;// CONCATENATED MODULE: ./src/components/theme/base.css
const base_namespaceObject = "/* src/components/theme/base.css */\r\n:root {\r\n  --background: hsl(var(--background-hsl));\r\n  --foreground: hsl(var(--foreground-hsl));\r\n\r\n  --card: hsl(var(--card-hsl));\r\n  --card-foreground: hsl(var(--card-foreground-hsl));\r\n\r\n  --popover: hsl(var(--popover-hsl));\r\n  --popover-foreground: hsl(var(--popover-foreground-hsl));\r\n\r\n  --primary: hsl(var(--primary-hsl));\r\n  --primary-foreground: hsl(var(--primary-foreground-hsl));\r\n\r\n  --secondary: hsl(var(--secondary-hsl));\r\n  --secondary-foreground: hsl(var(--secondary-foreground-hsl));\r\n\r\n  --muted: hsl(var(--muted-hsl));\r\n  --muted-foreground: hsl(var(--muted-foreground-hsl));\r\n\r\n  --accent: hsl(var(--accent-hsl));\r\n  --accent-foreground: hsl(var(--accent-foreground-hsl));\r\n\r\n  --destructive: hsl(var(--destructive-hsl));\r\n  --destructive-foreground: hsl(var(--destructive-foreground-hsl));\r\n\r\n  --border: hsl(var(--border-hsl));\r\n  --input: hsl(var(--input-hsl));\r\n  --ring: hsl(var(--ring-hsl));\r\n\r\n  --radius: 0.5rem;\r\n}\r\n\r\n/* Default HSL values (will be overridden by themes) */\r\n:root {\r\n  --background-hsl: 0 0% 100%;\r\n  --foreground-hsl: 222.2 84% 4.9%;\r\n\r\n  --card-hsl: 0 0% 100%;\r\n  --card-foreground-hsl: 222.2 84% 4.9%;\r\n\r\n  --popover-hsl: 0 0% 100%;\r\n  --popover-foreground-hsl: 222.2 84% 4.9%;\r\n\r\n  --primary-hsl: 222.2 47.4% 11.2%;\r\n  --primary-foreground-hsl: 210 40% 98%;\r\n\r\n  --secondary-hsl: 210 40% 96.1%;\r\n  --secondary-foreground-hsl: 222.2 47.4% 11.2%;\r\n\r\n  --muted-hsl: 210 40% 96.1%;\r\n  --muted-foreground-hsl: 215.4 16.3% 46.9%;\r\n\r\n  --accent-hsl: 210 40% 96.1%;\r\n  --accent-foreground-hsl: 222.2 47.4% 11.2%;\r\n\r\n  --destructive-hsl: 0 84.2% 60.2%;\r\n  --destructive-foreground-hsl: 210 40% 98%;\r\n\r\n  --border-hsl: 214.3 31.8% 91.4%;\r\n  --input-hsl: 214.3 31.8% 91.4%;\r\n  --ring-hsl: 222.2 84% 4.9%;\r\n} ";
;// CONCATENATED MODULE: ./src/components/theme/light.css
const light_namespaceObject = "/* src/components/theme/light.css */\r\n:root {\r\n  --background-hsl: 0 0% 100%;\r\n  --foreground-hsl: 222.2 84% 4.9%;\r\n  --card-hsl: 0 0% 100%;\r\n  --card-foreground-hsl: 222.2 84% 4.9%;\r\n  --popover-hsl: 0 0% 100%;\r\n  --popover-foreground-hsl: 222.2 84% 4.9%;\r\n  --primary-hsl: 222.2 47.4% 11.2%;\r\n  --primary-foreground-hsl: 210 40% 98%;\r\n  --secondary-hsl: 210 40% 96.1%;\r\n  --secondary-foreground-hsl: 222.2 47.4% 11.2%;\r\n  --muted-hsl: 210 40% 96.1%;\r\n  --muted-foreground-hsl: 215.4 16.3% 46.9%;\r\n  --accent-hsl: 210 40% 96.1%;\r\n  --accent-foreground-hsl: 222.2 47.4% 11.2%;\r\n  --destructive-hsl: 0 84.2% 60.2%;\r\n  --destructive-foreground-hsl: 210 40% 98%;\r\n  --border-hsl: 214.3 31.8% 91.4%;\r\n  --input-hsl: 214.3 31.8% 91.4%;\r\n  --ring-hsl: 222.2 84% 4.9%;\r\n  --radius: 0.5rem; /* Example radius */\r\n} ";
;// CONCATENATED MODULE: ./src/components/theme/dark.css
const dark_namespaceObject = "/* src/components/theme/dark.css */\r\n.dark { /* Apply dark theme when .dark class is present, e.g., on <body> */\r\n  --background-hsl: 222.2 84% 4.9%;\r\n  --foreground-hsl: 210 40% 98%;\r\n  --card-hsl: 222.2 84% 4.9%;\r\n  --card-foreground-hsl: 210 40% 98%;\r\n  --popover-hsl: 222.2 84% 4.9%;\r\n  --popover-foreground-hsl: 210 40% 98%;\r\n  --primary-hsl: 210 40% 98%;\r\n  --primary-foreground-hsl: 222.2 47.4% 11.2%;\r\n  --secondary-hsl: 217.2 32.6% 17.5%;\r\n  --secondary-foreground-hsl: 210 40% 98%;\r\n  --muted-hsl: 217.2 32.6% 17.5%;\r\n  --muted-foreground-hsl: 215 20.2% 65.1%;\r\n  --accent-hsl: 217.2 32.6% 17.5%;\r\n  --accent-foreground-hsl: 210 40% 98%;\r\n  --destructive-hsl: 0 62.8% 30.6%;\r\n  --destructive-foreground-hsl: 210 40% 98%;\r\n  --border-hsl: 217.2 32.6% 17.5%;\r\n  --input-hsl: 217.2 32.6% 17.5%;\r\n  --ring-hsl: 212.7 26.8% 83.9%;\r\n  /* --radius can remain the same or be customized */\r\n} ";
;// CONCATENATED MODULE: ./src/components/theme/index.ts






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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
__webpack_require__.d(__webpack_exports__, {
  D: () => (setTheme),
  P: () => (applyThemes)
});
/* ESM import */var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(741);

const BASE_STYLE_ID = 'purecn-theme-base';
const LIGHT_STYLE_ID = 'purecn-theme-light';
const DARK_STYLE_ID = 'purecn-theme-dark';
const THEME_STORAGE_KEY = 'purecn-theme';
let styleTagsInjected = false;
/**
 * Injects the base, light, and dark theme CSS variables into the document head.
 * Should be called once when the application initializes.
 */
function applyThemes() {
    if (typeof document === 'undefined' || styleTagsInjected) {
        return; // Don't run in non-browser environments or if already injected
    }
    // Create and inject base styles
    if (!document.getElementById(BASE_STYLE_ID)) {
        const baseStyle = document.createElement('style');
        baseStyle.id = BASE_STYLE_ID;
        baseStyle.textContent = _index__WEBPACK_IMPORTED_MODULE_0__/* .baseCss */.VX;
        document.head.appendChild(baseStyle);
    }
    // Create and inject light theme styles
    if (!document.getElementById(LIGHT_STYLE_ID)) {
        const lightStyle = document.createElement('style');
        lightStyle.id = LIGHT_STYLE_ID;
        lightStyle.textContent = _index__WEBPACK_IMPORTED_MODULE_0__/* .lightCss */.qD; // Light theme styles are applied by default
        document.head.appendChild(lightStyle);
    }
    // Create and inject dark theme styles (initially might not be needed if using .dark class solely)
    // Alternatively, keep it for users who might want to manually toggle style tags.
    if (!document.getElementById(DARK_STYLE_ID)) {
        const darkStyle = document.createElement('style');
        darkStyle.id = DARK_STYLE_ID;
        darkStyle.textContent = _index__WEBPACK_IMPORTED_MODULE_0__/* .darkCss */.PQ;
        // We control dark mode primarily via the `.dark` class on the body/html
        // but including the style tag ensures the definitions are present.
        // It could be initially disabled: darkStyle.disabled = true; if needed.
        document.head.appendChild(darkStyle);
    }
    styleTagsInjected = true;
    // Apply the initially saved or system theme
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    setTheme(storedTheme || 'system'); // Default to system if nothing stored
}
/**
 * Sets the active theme (light, dark, or system preference) and updates the body class.
 * @param theme - The theme to apply ('light', 'dark', 'system').
 */
function setTheme(theme) {
    if (typeof document === 'undefined' || typeof window === 'undefined') {
        return;
    }
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    let effectiveTheme;
    if (theme === 'system') {
        effectiveTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    else {
        effectiveTheme = theme;
    }
    if (effectiveTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    else {
        document.documentElement.classList.remove('dark');
    }
    // Optional: If you wanted to toggle style tags instead of just using the class:
    // const lightStyle = document.getElementById(LIGHT_STYLE_ID) as HTMLStyleElement | null;
    // const darkStyle = document.getElementById(DARK_STYLE_ID) as HTMLStyleElement | null;
    // if (lightStyle) lightStyle.disabled = effectiveTheme === 'dark';
    // if (darkStyle) darkStyle.disabled = effectiveTheme === 'light';
}
// Optional: Listen for system theme changes if the current theme is 'system'
if (typeof window !== 'undefined') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme === 'system') {
            setTheme('system'); // Re-evaluate system theme
        }
    });
}

})();

var __webpack_exports__applyThemes = __webpack_exports__.P;
var __webpack_exports__setTheme = __webpack_exports__.D;
export { __webpack_exports__applyThemes as applyThemes, __webpack_exports__setTheme as setTheme };

//# sourceMappingURL=theme-provider.js.map
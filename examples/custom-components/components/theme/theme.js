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





var __webpack_exports__baseCss = __webpack_exports__.VX;
var __webpack_exports__darkCss = __webpack_exports__.PQ;
var __webpack_exports__lightCss = __webpack_exports__.qD;
export { __webpack_exports__baseCss as baseCss, __webpack_exports__darkCss as darkCss, __webpack_exports__lightCss as lightCss };

//# sourceMappingURL=theme.js.map
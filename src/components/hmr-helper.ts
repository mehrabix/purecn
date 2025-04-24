/**
 * Helper functions for Hot Module Replacement (HMR)
 * This file provides utility functions to set up HMR for Web Components
 */

/**
 * Set up HMR for a component in development mode
 */
export function setupHMR(componentName: string, updateCallback?: () => void): void {
  const isDevelopment = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  if (!isDevelopment) {
    return;
  }

  // For ESM format
  if (import.meta.hot) {
    import.meta.hot.accept(() => {
      console.log(`HMR: ${componentName} updated (ESM)`);
      if (updateCallback) updateCallback();
    });
  }

  // For UMD format (webpack/rspack)
  if (typeof window !== 'undefined') {
    // @ts-ignore - Access window.purecn
    if (!window.purecn) window.purecn = {};

    // @ts-ignore - Store the component
    window.purecn[componentName] = {
      hmrUpdate: updateCallback
    };

    // @ts-ignore - webpack HMR types
    if (typeof module !== 'undefined' && module.hot) {
      // @ts-ignore - webpack HMR types
      module.hot.accept();
    }
  }
}

/**
 * Setup global HMR handler for Webpack
 */
export function setupGlobalHMR(): void {
  if (typeof window !== 'undefined') {
    // @ts-ignore - Define the global handler
    window.webpackHotUpdatepurecn = function(chunkId: string, moreModules: any) {
      console.log(`HMR update for: ${chunkId}`);
      // @ts-ignore - Call webpack's update
      if (window.webpackHotUpdate) window.webpackHotUpdate(chunkId, moreModules);
    };
  }
}

// Auto-initialize
setupGlobalHMR(); 
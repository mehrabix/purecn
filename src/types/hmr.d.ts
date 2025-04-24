/**
 * TypeScript declaration for Hot Module Replacement (HMR) API
 * This allows using import.meta.hot in components without TypeScript errors
 */

interface ImportMeta {
  /**
   * Hot Module Replacement API
   * Used for development mode to update components without full page reload
   */
  hot?: {
    /**
     * Accept updates for the current module
     * @param callback Function that will be called when the module is updated
     */
    accept: (callback?: (newModule?: any) => void) => void;
    
    /**
     * Accept updates for dependencies of the current module
     * @param dependencies Array of dependency modules to accept updates for
     * @param callback Function that will be called when dependencies are updated
     */
    accept: (dependencies: string[], callback: (updates: Record<string, any>) => void) => void;
    
    /**
     * Dispose callback to clean up resources before module is replaced
     * @param callback Function that will be called before the module is replaced
     */
    dispose: (callback: (data: any) => void) => void;
    
    /**
     * Decline to accept updates for the current module
     * Forces a full page reload when this module is updated
     */
    decline: () => void;
    
    /**
     * Module data object that can be used to pass data from the old module version to the new one
     */
    data?: any;
  };
} 
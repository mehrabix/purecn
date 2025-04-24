/**
 * TypeScript declarations for Rspack HMR API
 */

interface ImportMeta {
  /**
   * Hot Module Replacement API
   */
  hot?: {
    /**
     * Accept updates for the current module or its dependencies
     * @param dependencies - Array of dependencies to check for updates
     * @param callback - Callback function to handle updates
     */
    accept(
      dependencies?: string[],
      callback?: (updatedDependencies: any) => void
    ): void;

    /**
     * Accept updates for the current module or specified dependencies
     * @param callback - Callback function to handle updates
     */
    accept(callback?: (updatedModule: any) => void): void;

    /**
     * Decline updates for the current module
     */
    decline(): void;

    /**
     * Perform a full page reload if dependency is updated
     * @param dependencies - Dependencies to watch
     */
    invalidate(dependencies?: string[]): void;

    /**
     * Dispose handlers for the current module
     * @param callback - Callback function to run when module is replaced
     */
    dispose(callback: (data: any) => void): void;

    /**
     * Add a handler which will be called when the current module is about to be replaced
     * @param callback - Callback function to run when module is about to be replaced
     */
    prune(callback: (data: any) => void): void;

    /**
     * Add a custom handler that will be called when HMR update is applied
     * @param callback - Callback to run when update is applied
     */
    addStatusHandler(callback: (status: string) => void): void;

    /**
     * Remove a custom handler for HMR updates
     * @param callback - Handler to remove
     */
    removeStatusHandler(callback: (status: string) => void): void;

    /**
     * Check if HMR is enabled
     */
    status(): string;

    /**
     * Add a handler that will be called when the status changes
     * @param callback - Callback to run when status changes
     */
    addStatusHandler(callback: (status: string) => void): void;
  };
} 
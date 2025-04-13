// src/types/css.d.ts
declare module '*.css' {
  const content: string;
  export default content;
}

// Add this if you also plan to use SCSS with the same import mechanism
declare module '*.scss' {
  const content: string;
  export default content;
} 
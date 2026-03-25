/// <reference types="next" />
/// <reference types="next/image-types/global" />

// CSS side-effect imports (globals.css, etc.)
declare module '*.css' {
  const content: Record<string, string>
  export default content
}

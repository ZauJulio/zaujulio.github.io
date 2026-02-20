/// <reference types="vite/client" />
// Monorepo-wide ImportMeta augmentation for Vite+Bun.
interface ImportMetaEnv {
  readonly BASE_URL: string;
  readonly VITE_UMAMI_WEBSITE_ID?: string;
  readonly VITE_UMAMI_URL?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
  // For Bun compatibility
  readonly dir: string;
}

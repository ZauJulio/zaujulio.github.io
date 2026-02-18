/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_UMAMI_WEBSITE_ID?: string;
  readonly VITE_UMAMI_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

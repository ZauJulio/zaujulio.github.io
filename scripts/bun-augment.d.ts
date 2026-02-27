// Extends ImportMeta for Bun for custom dir/env properties
interface ImportMetaEnv {
  readonly VITE_UMAMI_WEBSITE_ID?: string;
  readonly VITE_UMAMI_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  readonly dir: string;
}

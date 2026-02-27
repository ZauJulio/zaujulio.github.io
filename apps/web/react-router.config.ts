import type { Config } from '@react-router/dev/config';

export default {
  // Config options...
  appDirectory: 'src/app',
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: false,
  // Router basename must match Vite base for GitHub Pages
  basename: '/',
} satisfies Config;

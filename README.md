# 🚀 Zau Julio | Portfolio

[![GitHub Pages](https://img.shields.io/github/deployments/zaujulio/zaujulio.github.io/github-pages?label=github-pages&logo=github)](https://zaujulio.github.io)
[![Build](https://img.shields.io/github/workflow/status/zaujulio/zaujulio.github.io/Deploy%20to%20GitHub%20Pages?style=flat&logo=github-actions)](https://github.com/zaujulio/zaujulio.github.io/actions)
[![License: MIT](https://img.shields.io/github/license/zaujulio/zaujulio.github.io?color=green)](./LICENSE)
[![Bun](https://img.shields.io/badge/Bun-1.3.5-blue?logo=Bun)](https://bun.sh)
[![Vite](https://img.shields.io/badge/Vite-5-purple?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React%20Router-v7-61DAFB?logo=react)](https://reactrouter.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-ready-2496ED?logo=docker)](https://hub.docker.com)

---

✨ **Personal, modular, and blazing-fast portfolio.**
Built as an ultra-modern Turborepo monorepo with React Router v7, Vite 5, Tailwind CSS 4, shadcn/ui, and strict TypeScript. Deploys anywhere (GH Pages, Docker, Nginx) with SEO, analytics, and strong typed content. 

**Live:** [zaujulio.github.io](https://zaujulio.github.io)

---

## 🏗️ Monorepo Structure

This project uses [Turborepo](https://turbo.build/) and [Bun](https://bun.sh/) to manage everything:

```
.
├── apps/
│   └── web/              # 🎨 Main portfolio SPA (React Router, Vite, SEO, SSG)
│       ├── content/      # 📦 Structured JSON or markdown content
│       │   ├── projects/ #   - Typed projects (JSON, .d.ts)
│       │   ├── skills/   #   - Skill clusters, levels
│       │   ├── profile/  #   - Bio, socials, experience
│       │   ├── education/#   - Education history
│       │   ├── articles/ #   - Tech articles (markdown)
│       │   ├── recipes/  #   - Cooking posts (markdown)
│       │   ├── hobbies/  #   - Hobbies data (JSON)
│       │   └── languages/#   - Language fluency
│       └── src/
│           ├── pages/    #   - Route-level React pages
│           ├── app/      #   - App shell, layout, meta, SEO, analytics
│           └── ...
│
├── packages/
│   ├── configs/          # 🛠️ Shared tsconfig, Tailwind, Biome configs
│   ├── ui/               # 🎛️ Custom UI library (shadcn/ui components)
│   └── shared/           # 📦 Shared utilities (markdown, components)
│
├── Dockerfile            # 🐳 Nginx-static multi-stage build, tiny production image
├── nginx.conf            # 🔒 Security, cache, SPA fallback, robots, gzip
├── .github/workflows/    # 🤖 CI/CD for deploy/tests (GitHub Pages/Actions)
...
```

**Key points:**
- All content/sections (projects, articles, profile, education, skills, hobbies, etc) live as JSON or markdown in `/apps/web/content/`, strictly typed by TypeScript (`.d.ts`)
- Separate, reusable UI/packages for shared logic/components
- One `apps/web/` subapp: everything SSG-ready
- Build output: `/apps/web/build/client` → deploys cleanly to any static host

---

## 🛠️ Tech Stack

| Layer         | Technology                       |
|---------------|----------------------------------|
| Framework     | [React Router v7](https://reactrouter.com/)     |
| Build         | [Vite 5](https://vitejs.dev/)                  |
| Styling       | [Tailwind CSS v4](https://tailwindcss.com/)    |
| Components    | [shadcn/ui](https://ui.shadcn.com/)            |
| Monorepo      | [Turborepo](https://turbo.build/)              |
| Package Mgmt  | [Bun](https://bun.sh/) 1.3.5                   |
| Linting       | [Biome](https://biomejs.dev/)                  |
| Language      | TypeScript 5                                   |
| Static Host   | GitHub Pages / Docker + Nginx                  |
| Analytics     | [Umami](https://umami.is/) (optional)          |

---

## 🚀 Getting Started

### Prerequisites
- 🥖 [Bun](https://bun.sh/) >= 1.3.5
- 🟦 [Node.js](https://nodejs.org/) >= 18

### Install & Run
```bash
bun install        # Install all dependencies
bun run dev        # Start dev server (http://localhost:5173)
```

### Build for Production
```bash
bun run build      # Outputs to apps/web/build/client/
```

### Preview Production Build
```bash
cd apps/web && bun run preview
```

### Docker (Self-Hosted/Nginx)
```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio   # Site at http://localhost:8080
```
Or using Compose (edits available):
```bash
docker compose up --build
```

---
## 📦 Content & Customization

- Edit all structured data (projects, skills, hobbies, education, profile, languages) in `apps/web/content/` as JSON (type-safe).
- Markdown blog and recipe posts: `apps/web/content/articles/`, `apps/web/content/recipes/`
- Update theme/colors in `apps/web/src/app/root.css` & Tailwind config.
- SEO, sitemap, robots.txt: edit in `apps/web/public/` and component meta tags.

---

## 🌍 Internationalization (i18n)

The site supports English (default) and Portuguese (pt-BR).

### Language Switcher
- A language switcher is available in the navigation bar
- Language preference is saved to localStorage and persists across sessions

### Adding New Translations
Translation files are located in `apps/web/src/i18n/locales/`:
- `en.json` - English (default)
- `pt-BR.json` - Portuguese (Brazil)

To add a new translation key:
1. Add the key to both `en.json` and `pt-BR.json`
2. Use the translation in any component:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  return <h1>{t('myKey')}</h1>;
}
```

Translation keys follow a nested structure (e.g., `nav.about`, `photography.title`).

---

## 🔎 SEO & Analytics
- Fully static HTML for core pages, ready for Google
- Meta, Open Graph, Twitter Card, JSON-LD, canonical, sitemap.xml, robots.txt
- [Umami](https://umami.is/) analytics built-in (enable via `.env`)

---

## 📦 Packages

| Package             | Name           | Purpose                                                            |
|---------------------|----------------|--------------------------------------------------------------------|
| packages/configs    | @repo/configs  | Shared tsconfig, Biome, Tailwind configs                           |
| packages/ui         | @repo/ui       | Custom UI library (shadcn/ui-powered, extends, themeables)         |
| packages/shared     | @repo/shared   | Markdown parser, MarkdownRenderer component, generic utilities     |

---

## 📜 Scripts
| Command           | Description                 |
|-------------------|----------------------------|
| bun run dev       | Start dev mode (all apps)  |
| bun run build     | Build all apps             |
| bun run check     | Lint + format (Biome)      |

---

## 📢 Deployment

### ☁️ GitHub Pages
- Push to `main` triggers auto-build via Actions (see `.github/workflows/deploy.yml`)
- SPA fallback (`index.html` copied to `404.html` automatically)
- Enable Pages in repo settings → **Settings > Pages > Source: GitHub Actions**

### 🐳 Docker/Nginx
- Multi-stage Dockerfile → static `nginx:alpine` image with gzip, cache, SEO headers

---

## 📄 License

MIT

---

> ⭐ **Like what you see? [Star this repo!](https://github.com/zaujulio/zaujulio.github.io) or fork your own!**

---

_Made with ❤️ by [Zau Julio](https://github.com/zaujulio) — open source, type-safe, portable._

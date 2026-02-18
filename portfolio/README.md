# Zau Julio | Portfolio

Personal portfolio website built as a Turborepo monorepo with React Router v7, Vite 5, Tailwind CSS v4, and shadcn/ui.

**Live:** [zaujulio.github.io](https://zaujulio.github.io)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React Router v7](https://reactrouter.com/) (SPA mode) |
| Build | [Vite 5](https://vitejs.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [shadcn/ui](https://ui.shadcn.com/) |
| Monorepo | [Turborepo](https://turbo.build/) |
| Package Manager | [Bun](https://bun.sh/) 1.3.5 |
| Linting | [Biome](https://biomejs.dev/) |
| Language | TypeScript 5 |
| Deployment | GitHub Pages / Docker + Nginx |
| Analytics | [Umami](https://umami.is/) (optional, self-hosted) |

## Project Structure

```
portfolio/
├── apps/
│   └── web/                        # Main portfolio SPA
│       ├── content/                # Markdown content
│       │   ├── recipes/            # Cooking recipes (.md)
│       │   └── articles/           # Technical articles (.md)
│       ├── public/                 # Static assets
│       │   ├── sitemap.xml
│       │   └── robots.txt
│       └── src/
│           ├── app/                # React Router app shell
│           │   ├── root.tsx        # Layout, SEO meta, JSON-LD, Umami
│           │   ├── root.css        # Brand colors, Tailwind theme
│           │   └── routes.ts       # Route definitions
│           └── pages/
│               ├── Home/           # Landing page (hero, about, projects, hobbies, hire me)
│               ├── Cooking/        # Recipe listing + detail pages
│               ├── Photography/    # Photo gallery
│               ├── Music/          # Music hobby page
│               └── Articles/       # Technical articles listing + detail
│
├── packages/
│   ├── configs/                    # Shared TypeScript, Biome, Tailwind configs
│   ├── ui/                         # shadcn/ui components (Avatar, NavigationMenu)
│   └── shared/                     # Shared utilities
│       ├── lib/markdown.ts         # Frontmatter parser, content loaders
│       └── components/             # MarkdownRenderer
│
├── Dockerfile                      # Multi-stage: Bun build -> Nginx serve
├── docker-compose.yml
├── nginx.conf                      # SPA routing, gzip, caching, security headers
└── .github/workflows/deploy.yml    # GitHub Pages CI/CD
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) >= 1.3.5
- [Node.js](https://nodejs.org/) >= 18 (for npx compatibility)

### Install & Run

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# The site will be available at http://localhost:5173
```

### Build

```bash
# Production build (outputs to apps/web/build/client/)
bun run build
```

### Preview Production Build

```bash
cd apps/web && bun run preview
```

## Docker

```bash
# Build and run with Docker Compose
docker compose up --build

# Site available at http://localhost:3000
```

Or manually:

```bash
docker build -t portfolio .
docker run -p 3000:80 portfolio
```

## Deployment

### GitHub Pages (Automatic)

Push to `main` triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. Installs deps with Bun
2. Builds with `react-router build`
3. Copies `index.html` to `404.html` for SPA routing
4. Deploys to GitHub Pages

Enable GitHub Pages in repo settings: **Settings > Pages > Source: GitHub Actions**.

### Docker / Self-Hosted

The Dockerfile produces a lightweight Nginx image (~30MB) that serves the static SPA with:
- Gzip compression
- Aggressive caching for hashed assets (1 year, immutable)
- SPA fallback routing
- Security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy)

## Content

### Adding Recipes

Create a markdown file in `apps/web/content/recipes/`:

```md
---
title: "Recipe Name"
description: "Short description"
date: "2025-01-15"
cuisine: "Brazilian"
mealType: "savory"
courseType: "Dinner"
prepTime: "20 min"
cookTime: "45 min"
servings: "4"
difficulty: "medium"
cover: "/recipes/my-recipe.jpg"
tags: ["comfort food", "traditional"]
---

Your recipe content in markdown...
```

### Adding Articles

Create a markdown file in `apps/web/content/articles/`:

```md
---
title: "Article Title"
description: "Short description"
date: "2025-01-15"
author: "Zau Julio"
tags: ["typescript", "react"]
---

Your article content in markdown...
```

## Analytics (Optional)

This project supports [Umami](https://umami.is/) for privacy-focused analytics (<1KB script, no cookies, GDPR compliant).

To enable, set environment variables:

```bash
VITE_UMAMI_WEBSITE_ID=your-website-id
VITE_UMAMI_URL=https://your-umami-instance.example.com/script.js
```

See `apps/web/.env.example` for reference.

## SEO

The site includes comprehensive SEO optimization:

- **Meta tags**: title, description, author, robots, theme-color
- **Open Graph**: type, URL, title, description, site name, locale
- **Twitter Cards**: summary_large_image with title, description, creator
- **JSON-LD**: Person structured data (schema.org)
- **Canonical URL**: `<link rel="canonical">`
- **Sitemap**: `public/sitemap.xml`
- **Robots**: `public/robots.txt`

## Monorepo Packages

| Package | Name | Purpose |
|---|---|---|
| `packages/configs` | `@repo/configs` | Shared tsconfig, Biome, Tailwind configs |
| `packages/ui` | `@repo/ui` | shadcn/ui components (Avatar, NavigationMenu) |
| `packages/shared` | `@repo/shared` | Markdown parser, MarkdownRenderer component |

## Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start all apps in development mode |
| `bun run build` | Build all apps for production |
| `bun run check` | Run Biome linting and formatting |

## License

MIT

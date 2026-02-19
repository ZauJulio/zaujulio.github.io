#!/usr/bin/env bun
/**
 * Sitemap Generator Script
 * Automatically generates sitemap.xml based on:
 * - Static routes from app/routes.ts
 * - Dynamic content from markdown files in content/ directory
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

const SITE_URL = 'https://zaujulio.github.io';
const CONTENT_DIR = join(import.meta.dir, '..', 'apps', 'web', 'content');
const PUBLIC_DIR = join(import.meta.dir, '..', 'apps', 'web', 'public');

// Route configurations
const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/cooking', priority: '0.8', changefreq: 'weekly' },
  { path: '/articles', priority: '0.8', changefreq: 'weekly' },
  { path: '/photography', priority: '0.7', changefreq: 'monthly' },
  { path: '/music', priority: '0.7', changefreq: 'monthly' },
];

// Content type configurations
const CONTENT_TYPES: Record<string, { basePath: string; priority: string; changefreq: string }> = {
  recipes: { basePath: '/cooking', priority: '0.6', changefreq: 'monthly' },
  articles: { basePath: '/articles', priority: '0.7', changefreq: 'monthly' },
};

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

function getMarkdownFiles(dir: string): string[] {
  const files: string[] = [];

  try {
    const items = readdirSync(dir);

    for (const item of items) {
      const fullPath = join(dir, item);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        files.push(...getMarkdownFiles(fullPath));
      } else if (extname(item) === '.md') {
        files.push(fullPath);
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return files;
}

function extractFrontmatter(content: string): Record<string, string> | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const frontmatter: Record<string, string> = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      const value = line
        .slice(colonIndex + 1)
        .trim()
        .replace(/^["']|["']$/g, '');
      frontmatter[key] = value;
    }
  }

  return frontmatter;
}

function getFileLastModified(filePath: string): string {
  try {
    const stats = statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

function generateSlug(filePath: string): string {
  const fileName = basename(filePath, '.md');
  return fileName;
}

function generateSitemap(): string {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Add static routes
  for (const route of STATIC_ROUTES) {
    urls.push({
      loc: `${SITE_URL}${route.path}`,
      lastmod: today,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // Add dynamic content from markdown files
  for (const [contentType, config] of Object.entries(CONTENT_TYPES)) {
    const contentDir = join(CONTENT_DIR, contentType);
    const files = getMarkdownFiles(contentDir);

    for (const file of files) {
      const content = readFileSync(file, 'utf-8');
      const frontmatter = extractFrontmatter(content);

      const slug = generateSlug(file);
      const lastmod = frontmatter?.date || getFileLastModified(file);

      urls.push({
        loc: `${SITE_URL}${config.basePath}/${slug}`,
        lastmod,
        changefreq: config.changefreq,
        priority: config.priority,
      });
    }
  }

  // Generate XML
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`,
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

function main() {
  console.log('🗺️  Generating sitemap...\n');

  const sitemap = generateSitemap();
  const outputPath = join(PUBLIC_DIR, 'sitemap.xml');

  writeFileSync(outputPath, sitemap);

  console.log('✅ Sitemap generated successfully!');
  console.log(`📄 Output: ${outputPath}\n`);

  // Count URLs
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  console.log(`📊 Total URLs: ${urlCount}`);

  // Show breakdown
  console.log('\n📋 URLs included:');
  const lines = sitemap.split('\n');
  for (const line of lines) {
    if (line.includes('<loc>')) {
      const url = line.replace(/.*<loc>(.*)<\/loc>.*/, '$1');
      console.log(`  • ${url.replace(SITE_URL, '')}`);
    }
  }
}

main();

#!/usr/bin/env bun
/**
 * Sitemap Generator Script
 * Generates sitemap.xml from static routes and dynamic markdown content.
 * Improved with structured logging and clearer output.
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';

// ==== Structured Logger ====
const logger = {
  info: (msg: string) => console.log(`\x1b[36m[INFO ][${timestamp()}]\x1b[0m  ${msg}`),
  success: (msg: string) => console.log(`\x1b[32m[SUCCESS][${timestamp()}]\x1b[0m  ${msg}`),
  warn: (msg: string) => console.warn(`\x1b[33m[WARN ][${timestamp()}]\x1b[0m  ${msg}`),
  error: (msg: string) => console.error(`\x1b[31m[ERROR ][${timestamp()}]\x1b[0m  ${msg}`),
};
function timestamp(): string {
  return new Date().toISOString().split('T').join(' ').slice(0, 19);
}

// ==== Config ====
const SITE_URL = 'https://zaujulio.github.io';
const CONTENT_DIR = join(import.meta.dir, '..', 'apps', 'web', 'src', 'content');
const PUBLIC_DIR = join(import.meta.dir, '..', 'apps', 'web', 'public');

const STATIC_ROUTES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/cooking', priority: '0.8', changefreq: 'weekly' },
  { path: '/articles', priority: '0.8', changefreq: 'weekly' },
  { path: '/photography', priority: '0.7', changefreq: 'monthly' },
  { path: '/music', priority: '0.7', changefreq: 'monthly' },
];

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

/** Recursively collect all markdown file paths in a directory */
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
    logger.error(`Error reading directory ${dir}: ${(error as any).message || error}`);
  }
  return files;
}

/** Extracts YAML frontmatter as key-value pairs from file content. */
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
        .replace(/^['"]|['"]$/g, '');
      frontmatter[key] = value;
    }
  }
  return frontmatter;
}

/** Returns ISO date string for last modified time of a file */
function getFileLastModified(filePath: string): string {
  try {
    const stats = statSync(filePath);
    return stats.mtime.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/** Generates URL-friendly slug from filepath */
function generateSlug(filePath: string): string {
  const fileName = basename(filePath, '.md');
  return fileName;
}

/**
 * Generates the sitemap XML as a string
 */
function generateSitemap(): { xml: string; urls: SitemapUrl[] } {
  const urls: SitemapUrl[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Static routes
  for (const route of STATIC_ROUTES) {
    urls.push({
      loc: `${SITE_URL}${route.path}`,
      lastmod: today,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  // Dynamic markdown content
  for (const [contentType, config] of Object.entries(CONTENT_TYPES)) {
    const contentDir = join(CONTENT_DIR, contentType);
    const files = getMarkdownFiles(contentDir);
    logger.info(`Found ${files.length} markdown files in ${contentType}/`);
    for (const file of files) {
      try {
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
      } catch (err) {
        logger.warn(`Skipping file due to error: ${file}\n  → ${(err as any).message || err}`);
      }
    }
  }

  // XML output
  const urlEntries = urls
    .map(
      (url) =>
        `  <url>\n    <loc>${url.loc}</loc>\n    <lastmod>${url.lastmod}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${url.priority}</priority>\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;
  return { xml, urls };
}

function main() {
  logger.info('🗺️  Generating sitemap...');

  let sitemap: string;
  let urls: SitemapUrl[];
  try {
    const result = generateSitemap();
    sitemap = result.xml;
    urls = result.urls;
  } catch (e) {
    logger.error(`[sitemap] Failed: ${(e as any).message || e}`);
    process.exit(1);
  }
  const outputPath = join(PUBLIC_DIR, 'sitemap.xml');
  try {
    writeFileSync(outputPath, sitemap);
    logger.success('Sitemap generated successfully!');
    logger.info(`Output: ${outputPath}`);
  } catch (e) {
    logger.error(`Failed to write file: ${outputPath}\n  → ${(e as any).message || e}`);
    process.exit(1);
  }

  logger.info(`Total URLs: ${urls.length}`);
  logger.info('URL breakdown:');
  urls.forEach((url) => {
    logger.info(`  - ${url.loc.replace(SITE_URL, '')}`);
  });
}

main();

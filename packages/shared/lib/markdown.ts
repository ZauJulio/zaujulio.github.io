// ─── Types ───────────────────────────────────────────────────

export interface ContentMeta {
  title: string;
  description: string;
  date: string;
  slug: string;
  cover?: string;
  tags?: string[];
  draft?: boolean;
}

export interface ArticleMeta extends ContentMeta {
  author?: string;
  canonical?: string; // dev.to / medium / linkedin URL
  readingTime?: string;
}

export interface RecipeMeta extends ContentMeta {
  cuisine?: string;
  mealType?: 'sweet' | 'savory';
  courseType?: string;
  prepTime?: string;
  cookTime?: string;
  servings?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface ContentItem<T extends ContentMeta = ContentMeta> {
  meta: T;
  content: string;
}

// ─── Lightweight Frontmatter Parser ──────────────────────────
// Replaces gray-matter to avoid Node.js Buffer dependency in the browser.

function parseFrontmatter(raw: string): {
  data: Record<string, unknown>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2];
  const data: Record<string, unknown> = {};

  for (const line of yamlBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;

    const key = trimmed.slice(0, colonIdx).trim();
    let value: unknown = trimmed.slice(colonIdx + 1).trim();

    // Remove surrounding quotes
    if (typeof value === 'string') {
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = (value as string).slice(1, -1);
      }
    }

    // Parse YAML arrays: ["tag1", "tag2"]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value);
      } catch {
        // Try parsing as YAML-style array with quotes
        value = (value as string)
          .slice(1, -1)
          .split(',')
          .map((s) => s.trim().replace(/^["']|["']$/g, ''))
          .filter(Boolean);
      }
    }

    // Parse booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    // Parse empty string
    if (value === '') value = '';

    data[key] = value;
  }

  return { data, content };
}

// ─── Loaders ─────────────────────────────────────────────────

/**
 * Load all markdown files from a Vite glob import.
 * Usage:
 *   const files = import.meta.glob('/content/articles/*.md', { query: '?raw', import: 'default', eager: true });
 *   const articles = loadMarkdownFiles<ArticleMeta>(files);
 */
export function loadMarkdownFiles<T extends ContentMeta>(globResult: Record<string, unknown>): ContentItem<T>[] {
  const items: ContentItem<T>[] = [];

  for (const [filepath, raw] of Object.entries(globResult)) {
    if (typeof raw !== 'string') continue;

    const { data, content } = parseFrontmatter(raw);

    // Derive slug from filename: /content/articles/my-post.md -> my-post
    const slug = (data.slug as string) || filepath.split('/').pop()?.replace(/\.md$/, '') || '';

    const meta: T = {
      title: (data.title as string) || 'Untitled',
      description: (data.description as string) || '',
      date: (data.date as string) || '',
      slug,
      cover: data.cover as string | undefined,
      tags: (data.tags as string[]) || [],
      draft: (data.draft as boolean) || false,
      ...data,
    } as T;

    // Skip drafts in production
    if (meta.draft && import.meta.env.PROD) continue;

    items.push({ meta, content });
  }

  // Sort by date descending (newest first)
  items.sort((a, b) => {
    const dateA = new Date(a.meta.date).getTime() || 0;
    const dateB = new Date(b.meta.date).getTime() || 0;
    return dateB - dateA;
  });

  return items;
}

/**
 * Find a single content item by slug.
 */
export function findBySlugJson<T extends { slug: string }>(items: T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug);
}

export function findBySlug<T extends ContentMeta>(items: ContentItem<T>[], slug: string): ContentItem<T> | undefined {
  return items.find((item) => item.meta.slug === slug);
}

/**
 * Estimate reading time from markdown content.
 */
export function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

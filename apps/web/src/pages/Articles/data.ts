import articlesJson from '@content/articles/articles.json';

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  author: string;
  readingTime: string;
  canonical: string;
  cover: string;
  content?: string;
}

export const articles: Article[] = articlesJson.articles;
export const allTags = Array.from(new Set(articles.flatMap((a) => a.tags || []).filter(Boolean)));

// Auto-generated types for articles.json
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
  content: string;
}

export interface ArticlesJson {
  articles: Article[];
}

declare const value: ArticlesJson;
export default value;

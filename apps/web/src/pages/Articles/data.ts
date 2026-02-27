import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import articlesJson from '@content/articles/articles.json';
import articlesPtBRJson from '@content/articles/articles.pt-BR.json';

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

const enArticles = articlesJson.articles as Article[];
const ptBRArticles = articlesPtBRJson.articles as Article[];

export function useArticles() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return useMemo(() => {
    return lang === 'pt-BR' ? ptBRArticles : enArticles;
  }, [lang]);
}

export function useAllTags() {
  const articles = useArticles();
  return useMemo(() => {
    return Array.from(new Set(articles.flatMap((a) => a.tags || []).filter(Boolean)));
  }, [articles]);
}

export const articles = enArticles;
export const allTags = Array.from(new Set(articles.flatMap((a) => a.tags || []).filter(Boolean)));

import { CalendarIcon, ClockIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import type { Article } from '../data';

export function ArticleCard({ article }: { article: Article }) {
  const { i18n } = useTranslation();
  const locale = i18n.language === 'pt-BR' ? 'pt-BR' : 'en-US';
  const readTime = article.readingTime;

  return (
    <Link
      to={`${import.meta.env.BASE_URL}articles/${article.slug}`}
      className='block rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden group hover:border-brand-500/50 transition-all duration-300 no-underline'
    >
      {article.cover && (
        <div className='aspect-video overflow-hidden'>
          <img
            src={`${import.meta.env.BASE_URL}${article.cover.replace(/^\/+/, '')}`}
            alt={article.title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      )}
      <div className='p-6'>
        <div className='flex items-center gap-3 mb-3 text-xs text-gray-500'>
          {article.date && (
            <span className='inline-flex items-center gap-1'>
              <CalendarIcon className='size-3' />
              {new Date(article.date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          <span className='inline-flex items-center gap-1'>
            <ClockIcon className='size-3' />
            {readTime}
          </span>
        </div>

        <h3 className='text-xl font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors'>
          {article.title}
        </h3>

        <p className='text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3'>{article.description}</p>

        {article.tags && article.tags.length > 0 && (
          <div className='flex flex-wrap gap-1.5'>
            {article.tags.map((tag) => (
              <Link
                key={tag}
                to={`${import.meta.env.BASE_URL}articles?tag=${encodeURIComponent(tag)}`}
                className='text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 transition-colors'
              >
                {tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

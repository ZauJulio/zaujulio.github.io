import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, ExternalLinkIcon, NewspaperIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { MarkdownRenderer } from '@repo/shared/components/MarkdownRenderer';
import { findBySlugJson } from '@repo/shared/lib/markdown';

import { Breadcrumbs } from '@components/Breadcrumbs';

import { articles } from './data';

export default function ArticlePage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? findBySlugJson(articles, slug) : undefined;

  if (!article) {
    return (
      <div className='min-h-screen bg-black text-white font-sans flex items-center justify-center'>
        <div className='text-center'>
          <NewspaperIcon className='size-12 text-gray-600 mx-auto mb-4' />
          <h1 className='text-2xl font-bold mb-2'>Article not found</h1>
          <p className='text-gray-400 mb-6'>The article you're looking for doesn't exist.</p>
          <Link
            to={`${import.meta.env.BASE_URL}articles`}
            className='inline-flex items-center gap-2 text-brand-300 hover:text-brand-500 transition-colors no-underline'
          >
            <ArrowLeftIcon className='size-4' />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const readTime = article.readingTime;

  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      {/* Header */}
      <header className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-4xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link
            to={`${import.meta.env.BASE_URL}articles`}
            className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm'
          >
            <ArrowLeftIcon className='size-4' />
            Back to Articles
          </Link>

          <div className='flex items-center gap-2'>
            <NewspaperIcon className='size-5 text-brand-400' />
            <span className='font-semibold text-white'>Article</span>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className='max-w-4xl mx-auto px-6'>
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Articles', href: '/articles' }, { label: article.title }]}
        />
      </div>

      {/* Cover Image */}
      {article.cover && (
        <div className='w-full max-h-[400px] overflow-hidden'>
          <img
            src={`${import.meta.env.BASE_URL}${article.cover.replace(/^\/+/, '')}`}
            alt={article.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}

      {/* Article Content */}
      <article className='max-w-4xl mx-auto px-6 py-12'>
        {/* Meta Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>{article.title}</h1>

          <p className='text-lg text-gray-400 leading-relaxed mb-6'>{article.description}</p>

          <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-800'>
            {article.author && (
              <span className='text-gray-400'>
                by <strong className='text-white'>{article.author}</strong>
              </span>
            )}
            {article.date && (
              <span className='inline-flex items-center gap-1.5'>
                <CalendarIcon className='size-4' />
                {new Date(article.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            )}
            <span className='inline-flex items-center gap-1.5'>
              <ClockIcon className='size-4' />
              {readTime}
            </span>
            {article.canonical && (
              <a
                href={article.canonical}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 text-brand-300 hover:text-brand-500 transition-colors no-underline'
              >
                <ExternalLinkIcon className='size-4' />
                Originally published
              </a>
            )}
          </div>
        </div>

        {/* Markdown Body */}
        <MarkdownRenderer content={article.content || article.description} />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className='mt-12 pt-6 border-t border-gray-800'>
            <div className='flex flex-wrap gap-2'>
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`${import.meta.env.BASE_URL}articles?tag=${encodeURIComponent(tag)}`}
                  className='text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20 hover:bg-brand-500/20 transition-colors no-underline'
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

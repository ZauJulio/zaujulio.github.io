import { ArrowLeftIcon, NewspaperIcon, CalendarIcon, ClockIcon, ExternalLinkIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';
import { MarkdownRenderer } from '@repo/shared/components/MarkdownRenderer';
import { loadMarkdownFiles, findBySlug, estimateReadingTime, type ArticleMeta } from '@repo/shared/lib/markdown';

// Load all articles at build time
const articleFiles = import.meta.glob('/content/articles/*.md', { query: '?raw', import: 'default', eager: true });
const allArticles = loadMarkdownFiles<ArticleMeta>(articleFiles);

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? findBySlug(allArticles, slug) : undefined;

  if (!article) {
    return (
      <div className='min-h-screen bg-black text-white font-sans flex items-center justify-center'>
        <div className='text-center'>
          <NewspaperIcon className='size-12 text-gray-600 mx-auto mb-4' />
          <h1 className='text-2xl font-bold mb-2'>Article not found</h1>
          <p className='text-gray-400 mb-6'>The article you're looking for doesn't exist.</p>
          <Link
            to='/articles'
            className='inline-flex items-center gap-2 text-brand-300 hover:text-brand-500 transition-colors no-underline'
          >
            <ArrowLeftIcon className='size-4' />
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  const { meta, content } = article;
  const readTime = meta.readingTime || estimateReadingTime(content);

  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      {/* Header */}
      <header className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-4xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link
            to='/articles'
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

      {/* Cover Image */}
      {meta.cover && (
        <div className='w-full max-h-[400px] overflow-hidden'>
          <img
            src={meta.cover}
            alt={meta.title}
            className='w-full h-full object-cover'
          />
        </div>
      )}

      {/* Article Content */}
      <article className='max-w-4xl mx-auto px-6 py-12'>
        {/* Meta Header */}
        <div className='mb-8'>
          <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>{meta.title}</h1>

          <p className='text-lg text-gray-400 leading-relaxed mb-6'>{meta.description}</p>

          <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-800'>
            {meta.author && (
              <span className='text-gray-400'>
                by <strong className='text-white'>{meta.author}</strong>
              </span>
            )}
            {meta.date && (
              <span className='inline-flex items-center gap-1.5'>
                <CalendarIcon className='size-4' />
                {new Date(meta.date).toLocaleDateString('en-US', {
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
            {meta.canonical && (
              <a
                href={meta.canonical}
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
        <MarkdownRenderer content={content} />

        {/* Tags */}
        {meta.tags && meta.tags.length > 0 && (
          <div className='mt-12 pt-6 border-t border-gray-800'>
            <div className='flex flex-wrap gap-2'>
              {meta.tags.map((tag) => (
                <span
                  key={tag}
                  className='text-xs px-3 py-1 rounded-full bg-brand-500/10 text-brand-400 border border-brand-500/20'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

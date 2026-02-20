import {
  ArrowLeftIcon,
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  HomeIcon,
  NewspaperIcon,
  SearchIcon,
  TagIcon,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import type { Article } from './data';

import { allTags, articles } from './data';

export const meta = () => [{ title: 'Zaú Júlio - Articles' }];

// Breadcrumb component
function Breadcrumbs({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav aria-label='Breadcrumb' className='py-4'>
      <ol className='flex items-center gap-2 text-sm'>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className='flex items-center gap-2'>
            {index > 0 && <ChevronRightIcon className='size-4 text-gray-600' />}
            {item.href ? (
              <Link
                to={item.href}
                className='text-gray-400 hover:text-brand-300 transition-colors flex items-center gap-1'
              >
                {index === 0 && <HomeIcon className='size-4' />}
                {item.label}
              </Link>
            ) : (
              <span className='text-brand-300 font-medium'>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ArticleCard({ article }: { article: Article }) {
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
              {new Date(article.date).toLocaleDateString('en-US', {
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

export default function ArticlesPage() {
  const [searchParams] = useSearchParams();
  const activeTag = searchParams.get('tag');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (activeTag) {
      result = result.filter((a) => a.tags?.includes(activeTag));
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();

      result = result.filter((a) => {
        const searchableText = [a.title, a.description, ...(a.tags || [])].filter(Boolean).join(' ').toLowerCase();

        return searchableText.includes(query);
      });
    }
    return result;
  }, [activeTag, searchQuery]);

  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      {/* Header */}
      <header className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm'
          >
            <ArrowLeftIcon className='size-4' />
            Back to Portfolio
          </Link>

          <div className='flex items-center gap-2'>
            <NewspaperIcon className='size-5 text-brand-400' />
            <span className='font-semibold text-white'>Articles</span>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className='max-w-7xl mx-auto px-6'>
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Articles' }]} />
      </div>

      {/* Hero */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex p-4 rounded-2xl bg-gradient-to-br from-brand-500/10 to-brand-500/5 mb-6'>
            <NewspaperIcon className='size-10 text-brand-400' />
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Articles</h1>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>
            Writing about software engineering, machine learning, and the tools I use every day. Deep dives, tutorials,
            and lessons learned from building real-world applications.
          </p>
        </div>
      </section>

      {/* Search & Tag Filters */}
      <section className='px-6 pb-8'>
        <div className='max-w-7xl mx-auto flex flex-col items-center gap-4'>
          {/* Search */}
          <div className='relative w-full max-w-md'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500' />
            <input
              type='text'
              placeholder='Search articles...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500/50 transition-colors'
            />
          </div>

          {/* Tag Filters */}
          {allTags.length > 0 && (
            <div className='flex flex-wrap justify-center gap-2'>
              <Link
                to={`${import.meta.env.BASE_URL}articles`}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border no-underline ${
                  activeTag === null
                    ? 'bg-brand-500 text-black border-brand-500 font-medium'
                    : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
                }`}
              >
                All
              </Link>

              {allTags.map((tag) => (
                <Link
                  key={tag}
                  to={`${import.meta.env.BASE_URL}articles?tag=${encodeURIComponent(tag)}`}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border no-underline ${
                    tag === activeTag
                      ? 'bg-brand-500 text-black border-brand-500 font-medium'
                      : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
                  }`}
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Articles Grid */}
      <section className='pb-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          {filteredArticles.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {filteredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
                <TagIcon className='size-8 text-gray-600' />
              </div>

              <p className='text-gray-500 text-lg mb-2'>
                {activeTag ? `No articles tagged "${activeTag}"` : 'No articles yet'}
              </p>

              <p className='text-gray-600 text-sm max-w-md mx-auto'>
                Add <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>.md</code> files to{' '}
                <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>content/articles/</code> to
                see them here.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

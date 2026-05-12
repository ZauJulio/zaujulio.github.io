import { ArrowLeftIcon, NewspaperIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useSearchParams } from 'react-router';

import { ArticleCard } from './components/ArticleCard';
import { Breadcrumbs } from './components/Breadcrumbs';
import { EmptyArticlesState } from './components/EmptyArticlesState';
import { useAllTags, useArticles } from './data';

export const meta = () => [{ title: 'Zaú Júlio - Articles' }];

export default function ArticlesPage() {
  const { t } = useTranslation();
  const articles = useArticles();
  const allTags = useAllTags();
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
  }, [articles, activeTag, searchQuery]);

  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      {/* Header */}
      <header className='sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center flex-start'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm'
          >
            <ArrowLeftIcon className='size-4' />
            {t('common.backToPortfolio')}
          </Link>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className='max-w-7xl mx-auto px-6'>
        <Breadcrumbs items={[{ label: t('common.home'), href: '/' }, { label: t('articles.title') }]} />
      </div>

      {/* Hero */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex p-4 rounded-2xl bg-linear-to-br from-brand-500/10 to-brand-500/5 mb-6'>
            <NewspaperIcon className='size-10 text-brand-400' />
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>{t('articles.title')}</h1>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>{t('articles.description')}</p>
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
              placeholder={t('articles.title') + '...'}
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
                    ? 'bg-brand-500 text-white border-brand-500 font-medium'
                    : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
                }`}
              >
                {t('cooking.all')}
              </Link>

              {allTags.map((tag) => (
                <Link
                  key={tag}
                  to={`${import.meta.env.BASE_URL}articles?tag=${encodeURIComponent(tag)}`}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200 border no-underline ${
                    tag === activeTag
                      ? 'bg-brand-500 text-white border-brand-500 font-medium'
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
            <EmptyArticlesState activeTag={activeTag} />
          )}
        </div>
      </section>
    </div>
  );
}

import { ExternalLinkIcon } from 'lucide-react';

import articlesJson from 'content/articles/articles.json';

interface Article {
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

const articles: Article[] = (articlesJson.articles as Article[])
  .slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

function ArticleCard({ article }: { article: Article }) {
  return (
    <a
      href={`${import.meta.env.BASE_URL}articles/${article.slug}`}
      className='group block rounded-xl border border-gray-800 bg-gray-900/50 p-6 transition-all duration-300 hover:border-brand-500/50 hover:bg-gray-800/50 hover:shadow-lg hover:shadow-brand-500/5 w-4/5 mx-auto md:w-4/5'
    >
      {article.cover && (
        <div className='w-full max-h-[160px] overflow-hidden mb-3'>
          <img
            src={`${import.meta.env.BASE_URL}${article.cover.replace(/^\/+/, '')}`}
            alt={article.title}
            className='w-full h-40 object-cover rounded-t-xl'
          />
        </div>
      )}
      <div className='flex items-start justify-between mb-3'>
        <h3 className='text-lg font-semibold text-white group-hover:text-brand-300 transition-colors'>
          {article.title}
        </h3>
        <ExternalLinkIcon className='size-4 text-gray-500 group-hover:text-brand-400 transition-colors flex-shrink-0 mt-1' />
      </div>
      <p className='text-sm text-gray-400 mb-4 leading-relaxed line-clamp-3'>{article.description}</p>
      <div className='flex items-center gap-4 text-xs text-gray-500'>
        <span>{article.author}</span>
        <span>{article.readingTime}</span>
        <span>{article.date}</span>
      </div>
      <div className='flex flex-wrap gap-1.5 mt-2'>
        {article.tags.map((tag) => (
          <span key={tag} className='text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700'>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export function ArticlesSection() {
  return (
    <section id='articles' className='container mx-auto mt-24 mb-16 px-4 md:px-0'>
      <h2 className='text-3xl md:text-4xl font-bold mb-2 text-center'>Latest Articles</h2>
      <p className='text-gray-400 text-lg mb-8 text-center'>
        Random musings, digital curios and stuff I just felt like writing
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        {articles.slice(0, 4).map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

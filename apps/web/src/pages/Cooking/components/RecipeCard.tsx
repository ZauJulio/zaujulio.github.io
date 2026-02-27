import { ClockIcon, UsersIcon } from 'lucide-react';
import { Link } from 'react-router';

import type { ContentItem, RecipeMeta } from '@repo/shared/lib/markdown';

export function RecipeCard({ recipe }: { recipe: ContentItem<RecipeMeta> }) {
  const { meta } = recipe;

  return (
    <Link
to={`${import.meta.env.BASE_URL}cooking/${meta.slug}`}
       className='rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden group hover:border-brand-500/50 transition-all duration-300 no-underline block'
    >
      {meta.cover && (
        <div className='aspect-video overflow-hidden'>
          <img
            src={meta.cover}
            alt={meta.title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      )}
      <div className='p-5'>
        <div className='flex items-center gap-2 mb-2 flex-wrap'>
          {meta.cuisine && (
            <Link
              to={`${import.meta.env.BASE_URL}cooking?cuisine=${encodeURIComponent(meta.cuisine)}`}
              onClick={(e) => e.stopPropagation()}
              className='text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors no-underline'
            >
              {meta.cuisine}
            </Link>
          )}
          {meta.mealType && (
            <Link
              to={`${import.meta.env.BASE_URL}cooking?mealType=${encodeURIComponent(meta.mealType)}`}
              onClick={(e) => e.stopPropagation()}
              className='text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors no-underline'
            >
              {meta.mealType}
            </Link>
          )}
          {meta.courseType && (
            <Link
              to={`${import.meta.env.BASE_URL}cooking?courseType=${encodeURIComponent(meta.courseType)}`}
              onClick={(e) => e.stopPropagation()}
              className='text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors no-underline'
            >
              {meta.courseType}
            </Link>
          )}
          {meta.difficulty && (
            <span className='text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20'>
              {meta.difficulty}
            </span>
          )}
        </div>

        <h3 className='text-lg font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors'>
          {meta.title}
        </h3>

        <p className='text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2'>{meta.description}</p>

        <div className='flex items-center gap-4 text-xs text-gray-500'>
          {meta.prepTime && (
            <span className='inline-flex items-center gap-1'>
              <ClockIcon className='size-3' />
              {meta.prepTime}
            </span>
          )}
          {meta.servings && (
            <span className='inline-flex items-center gap-1'>
              <UsersIcon className='size-3' />
              {meta.servings} servings
            </span>
          )}
        </div>

        {meta.tags && meta.tags.length > 0 && (
          <div className='flex flex-wrap gap-1.5 mt-3'>
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className='text-xs px-2 py-0.5 rounded-full bg-gray-800 text-gray-500 border border-gray-700'
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

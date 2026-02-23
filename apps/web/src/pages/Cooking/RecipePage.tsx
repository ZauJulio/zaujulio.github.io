import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, CalendarIcon, ClockIcon, CookingPotIcon, UsersIcon } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { MarkdownRenderer } from '@repo/shared/components/MarkdownRenderer';
import { findBySlug, loadMarkdownFiles, type RecipeMeta } from '@repo/shared/lib/markdown';

import { Breadcrumbs } from '@components/Breadcrumbs';

// Load all recipes at build time
const recipeFiles = import.meta.glob('../../content/recipes/*.md', { query: '?raw', import: 'default', eager: true });
const allRecipes = loadMarkdownFiles<RecipeMeta>(recipeFiles);

export default function RecipePage() {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? findBySlug(allRecipes, slug) : undefined;

  if (!recipe) {
    return (
      <div className='min-h-screen bg-black text-white font-sans flex items-center justify-center'>
        <div className='text-center'>
          <CookingPotIcon className='size-12 text-gray-600 mx-auto mb-4' />
          <h1 className='text-2xl font-bold mb-2'>Recipe not found</h1>
          <p className='text-gray-400 mb-6'>The recipe you're looking for doesn't exist.</p>
          <Link
            to='/cooking'
            className='inline-flex items-center gap-2 text-brand-300 hover:text-brand-500 transition-colors no-underline'
          >
            <ArrowLeftIcon className='size-4' />
            Back to Cooking
          </Link>
        </div>
      </div>
    );
  }

  const { meta, content } = recipe;

  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      {/* Header */}
      <header className='sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-4xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link
            to='/cooking'
            className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm'
          >
            <ArrowLeftIcon className='size-4' />
            Back to Cooking
          </Link>

          <div className='flex items-center gap-2'>
            <CookingPotIcon className='size-5 text-red-400' />
            <span className='font-semibold text-white'>Recipe</span>
          </div>
        </div>
      </header>

      {/* Breadcrumbs */}
      <div className='max-w-4xl mx-auto px-6'>
        <Breadcrumbs
          items={[{ label: 'Home', href: '/' }, { label: 'Cooking', href: '/cooking' }, { label: meta.title }]}
        />
      </div>

      {/* Cover Image */}
      {meta.cover && (
        <div className='w-full max-h-[400px] overflow-hidden'>
          <img src={meta.cover} alt={meta.title} className='w-full h-full object-cover' />
        </div>
      )}

      {/* Article Content */}
      <article className='max-w-4xl mx-auto px-6 py-12'>
        {/* Meta Header */}
        <div className='mb-8'>
          <div className='flex items-center gap-2 mb-4 flex-wrap'>
            {meta.cuisine && (
              <Link
                to={`${import.meta.env.BASE_URL}cooking?cuisine=${encodeURIComponent(meta.cuisine)}`}
                className='text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors no-underline'
              >
                {meta.cuisine}
              </Link>
            )}
            {meta.mealType && (
              <Link
                to={`${import.meta.env.BASE_URL}cooking?mealType=${encodeURIComponent(meta.mealType)}`}
                className='text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 hover:bg-purple-500/20 transition-colors no-underline'
              >
                {meta.mealType}
              </Link>
            )}
            {meta.courseType && (
              <Link
                to={`${import.meta.env.BASE_URL}cooking?courseType=${encodeURIComponent(meta.courseType)}`}
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

          <h1 className='text-3xl md:text-4xl font-bold text-white mb-4'>{meta.title}</h1>

          <p className='text-lg text-gray-400 leading-relaxed mb-6'>{meta.description}</p>

          {/* Recipe info bar */}
          <div className='flex flex-wrap items-center gap-6 text-sm text-gray-500 pb-6 border-b border-gray-800'>
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
            {meta.prepTime && (
              <span className='inline-flex items-center gap-1.5'>
                <ClockIcon className='size-4' />
                Prep: {meta.prepTime}
              </span>
            )}
            {meta.cookTime && (
              <span className='inline-flex items-center gap-1.5'>
                <ClockIcon className='size-4' />
                Cook: {meta.cookTime}
              </span>
            )}
            {meta.servings && (
              <span className='inline-flex items-center gap-1.5'>
                <UsersIcon className='size-4' />
                {meta.servings} servings
              </span>
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
                <Link
                  key={tag}
                  to={`${import.meta.env.BASE_URL}cooking`}
                  className='text-xs px-3 py-1 rounded-full bg-gray-900 text-gray-400 border border-gray-800 hover:bg-gray-800 transition-colors no-underline'
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

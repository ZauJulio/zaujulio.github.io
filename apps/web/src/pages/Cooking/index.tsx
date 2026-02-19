import { ArrowLeftIcon, ChefHatIcon, ClockIcon, CookingPotIcon, SearchIcon, UsersIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

import { type ContentItem, loadMarkdownFiles, type RecipeMeta } from '@repo/shared/lib/markdown';

export const meta = () => [{ title: 'Zaú Júlio - Cooking' }];

// Load all recipes from content/recipes/*.md at build time
const recipeFiles = import.meta.glob('/content/recipes/*.md', { query: '?raw', import: 'default', eager: true });
const allRecipes = loadMarkdownFiles<RecipeMeta>(recipeFiles);

// Extract unique filter values
const cuisines = ['All', ...Array.from(new Set(allRecipes.map((r) => r.meta.cuisine).filter(Boolean) as string[]))];
const mealTypes = ['All', ...Array.from(new Set(allRecipes.map((r) => r.meta.mealType).filter(Boolean) as string[]))];
const courseTypes = [
  'All',
  ...Array.from(new Set(allRecipes.map((r) => r.meta.courseType).filter(Boolean) as string[])),
];

// ─── Filter Pill Row ─────────────────────────────────────────

function FilterRow({
  label,
  options,
  active,
  onSelect,
}: {
  label: string;
  options: string[];
  active: string;
  onSelect: (v: string) => void;
}) {
  if (options.length <= 1) return null;

  return (
    <div className='flex flex-wrap items-center gap-2'>
      <span className='text-xs text-gray-500 uppercase tracking-wider font-medium w-16 shrink-0'>{label}</span>
      {options.map((opt) => (
        <button
          key={opt}
          type='button'
          onClick={() => onSelect(opt)}
          className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border cursor-pointer ${
            opt === active
              ? 'bg-brand-500 text-black border-brand-500 font-medium'
              : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Recipe Card ─────────────────────────────────────────────

function RecipeCard({ recipe }: { recipe: ContentItem<RecipeMeta> }) {
  const { meta } = recipe;

  return (
    <Link
      to={`/cooking/${meta.slug}`}
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
            <span className='text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20'>
              {meta.cuisine}
            </span>
          )}
          {meta.mealType && (
            <span className='text-xs px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20'>
              {meta.mealType}
            </span>
          )}
          {meta.courseType && (
            <span className='text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20'>
              {meta.courseType}
            </span>
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

// ─── Cooking Page ────────────────────────────────────────────

export default function CookingPage() {
  const [activeCuisine, setActiveCuisine] = useState('All');
  const [activeMealType, setActiveMealType] = useState('All');
  const [activeCourseType, setActiveCourseType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((r) => {
      if (activeCuisine !== 'All' && r.meta.cuisine !== activeCuisine) return false;
      if (activeMealType !== 'All' && r.meta.mealType !== activeMealType) return false;
      if (activeCourseType !== 'All' && r.meta.courseType !== activeCourseType) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [r.meta.title, r.meta.description, r.meta.cuisine, ...(r.meta.tags || [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!searchableText.includes(query)) return false;
      }
      return true;
    });
  }, [activeCuisine, activeMealType, activeCourseType, searchQuery]);

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
            <CookingPotIcon className='size-5 text-red-400' />
            <span className='font-semibold text-white'>Cooking</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex p-4 rounded-2xl bg-gradient-to-br from-red-500/10 to-rose-500/5 mb-6'>
            <CookingPotIcon className='size-10 text-red-400' />
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Cooking</h1>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>
            Experimenting with flavors, techniques, and cuisines from around the world. From Brazilian comfort food to
            international dishes — turning ingredients into experiences.
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className='px-6 pb-8'>
        <div className='max-w-7xl mx-auto flex flex-col gap-4'>
          {/* Search */}
          <div className='relative max-w-md'>
            <SearchIcon className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500' />
            <input
              type='text'
              placeholder='Search recipes...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500/50 transition-colors'
            />
          </div>
          {/* Filters */}
          <FilterRow label='Cuisine' options={cuisines} active={activeCuisine} onSelect={setActiveCuisine} />
          <FilterRow label='Type' options={mealTypes} active={activeMealType} onSelect={setActiveMealType} />
          <FilterRow label='Course' options={courseTypes} active={activeCourseType} onSelect={setActiveCourseType} />
        </div>
      </section>

      {/* Recipes Grid */}
      <section className='pb-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          {filteredRecipes.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.meta.slug} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
                <ChefHatIcon className='size-8 text-gray-600' />
              </div>
              <p className='text-gray-500 text-lg mb-2'>No recipes match your filters</p>
              <p className='text-gray-600 text-sm max-w-md mx-auto'>
                Try adjusting the filters above, or add more
                <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs mx-1'>.md</code>
                files to{' '}
                <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>content/recipes/</code>.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

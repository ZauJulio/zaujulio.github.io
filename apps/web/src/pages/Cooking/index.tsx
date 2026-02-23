import { useTranslation } from 'react-i18next';
import { ArrowLeftIcon, ChefHatIcon, CookingPotIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';

import { RecipeCard } from './components/RecipeCard';
import { courseTypes, cuisines, mealTypes, recipes } from './data';

export const meta = () => [{ title: 'Zaú Júlio - Cooking' }];

// ─── Cooking Page ────────────────────────────────────────────

export default function CookingPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const activeCuisine = searchParams.get('cuisine') || 'All';
  const activeMealType = searchParams.get('mealType') || 'All';
  const activeCourseType = searchParams.get('courseType') || 'All';
  const [searchQuery, setSearchQuery] = useState('');

  const getFilterLink = (paramName: string, opt: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (opt === 'All') {
      params.delete(paramName);
    } else {
      params.set(paramName, opt);
    }
    return `${import.meta.env.BASE_URL}cooking?${params.toString()}`;
  };

  const filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
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
to={`${import.meta.env.BASE_URL}`}
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
          {cuisines.length > 1 && (
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-xs text-gray-500 uppercase tracking-wider font-medium w-16 shrink-0'>Cuisine</span>
              {cuisines.map((opt) => (
                <Link
                  key={opt}
                  to={getFilterLink('cuisine', opt)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border no-underline ${
                    opt === activeCuisine
                      ? 'bg-brand-500 text-black border-brand-500 font-medium'
                      : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
                  }`}
                >
                  {opt}
                </Link>
              ))}
            </div>
          )}
          {mealTypes.length > 1 && (
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-xs text-gray-500 uppercase tracking-wider font-medium w-16 shrink-0'>Type</span>
              {mealTypes.map((opt) => (
                <Link
                  key={opt}
                  to={getFilterLink('mealType', opt)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border no-underline ${
                    opt === activeMealType
                      ? 'bg-brand-500 text-black border-brand-500 font-medium'
                      : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
                  }`}
                >
                  {opt}
                </Link>
              ))}
            </div>
          )}
          {courseTypes.length > 1 && (
            <div className='flex flex-wrap items-center gap-2'>
              <span className='text-xs text-gray-500 uppercase tracking-wider font-medium w-16 shrink-0'>Course</span>
              {courseTypes.map((opt) => (
                <Link
                  key={opt}
                  to={getFilterLink('courseType', opt)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-all duration-200 border no-underline ${
                    opt === activeCourseType
                      ? 'bg-brand-500 text-black border-brand-500 font-medium'
                      : 'bg-gray-900/50 text-gray-400 border-gray-800 hover:border-brand-500/50 hover:text-white'
                  }`}
                >
                  {opt}
                </Link>
              ))}
            </div>
          )}
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

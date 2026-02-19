import { ArrowLeftIcon, CameraIcon, ImageIcon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

export const meta = () => [{ title: 'Zaú Júlio - Photography' }];

interface Photo {
  id: string;
  src: string;
  alt: string;
  location?: string;
  date?: string;
  timeOfDay?: 'Dawn' | 'Morning' | 'Afternoon' | 'Golden Hour' | 'Night';
  occasion?: string;
  tags?: string[];
}

// Placeholder data — replace with your actual photos
const photos: Photo[] = [
  // {
  //   id: '1',
  //   src: '/photos/photo-1.jpg',
  //   alt: 'Landscape at sunset',
  //   location: 'Pipa, RN',
  //   date: '2024',
  //   timeOfDay: 'Golden Hour',
  //   occasion: 'Travel',
  //   tags: ['Landscape', 'Beach'],
  // },
];

// Extract unique filter values
const timesOfDay = ['All', ...Array.from(new Set(photos.map((p) => p.timeOfDay).filter(Boolean) as string[]))];
const occasions = ['All', ...Array.from(new Set(photos.map((p) => p.occasion).filter(Boolean) as string[]))];
const allTags = Array.from(new Set(photos.flatMap((p) => p.tags ?? [])));
const tags = allTags.length > 0 ? ['All', ...allTags] : [];

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

export default function PhotographyPage() {
  const [activeTime, setActiveTime] = useState('All');
  const [activeOccasion, setActiveOccasion] = useState('All');
  const [activeTag, setActiveTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPhotos = useMemo(() => {
    return photos.filter((p) => {
      if (activeTime !== 'All' && p.timeOfDay !== activeTime) return false;
      if (activeOccasion !== 'All' && p.occasion !== activeOccasion) return false;
      if (activeTag !== 'All' && !(p.tags ?? []).includes(activeTag)) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchableText = [p.alt, p.location, p.occasion, ...(p.tags || [])]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!searchableText.includes(query)) return false;
      }
      return true;
    });
  }, [activeTime, activeOccasion, activeTag, searchQuery]);

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
            <CameraIcon className='size-5 text-amber-400' />
            <span className='font-semibold text-white'>Photography</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 mb-6'>
            <CameraIcon className='size-10 text-amber-400' />
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Photography</h1>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>
            Capturing moments, landscapes, and everyday beauty through the lens. A visual journal of the places I've
            been and the things that caught my eye.
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
              placeholder='Search photos...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500/50 transition-colors'
            />
          </div>
          {/* Filters */}
          {(timesOfDay.length > 1 || occasions.length > 1 || tags.length > 1) && (
            <>
              <FilterRow label='Time' options={timesOfDay} active={activeTime} onSelect={setActiveTime} />
              <FilterRow label='Type' options={occasions} active={activeOccasion} onSelect={setActiveOccasion} />
              <FilterRow label='Tags' options={tags} active={activeTag} onSelect={setActiveTag} />
            </>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section className='pb-20 px-6'>
        <div className='max-w-7xl mx-auto'>
          {filteredPhotos.length > 0 ? (
            <div className='columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4'>
              {filteredPhotos.map((photo) => (
                <div
                  key={photo.id}
                  className='break-inside-avoid rounded-xl overflow-hidden border border-gray-800 group relative'
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className='w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105'
                  />
                  <div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    {photo.location && <p className='text-white text-sm font-medium'>{photo.location}</p>}
                    <div className='flex items-center gap-2 mt-1'>
                      {photo.date && <span className='text-gray-300 text-xs'>{photo.date}</span>}
                      {photo.timeOfDay && (
                        <span className='text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-300'>
                          {photo.timeOfDay}
                        </span>
                      )}
                      {photo.occasion && (
                        <span className='text-xs px-1.5 py-0.5 rounded bg-white/10 text-gray-300'>
                          {photo.occasion}
                        </span>
                      )}
                    </div>
                    {photo.tags && photo.tags.length > 0 && (
                      <div className='flex flex-wrap gap-1 mt-2'>
                        {photo.tags.map((tag) => (
                          <span key={tag} className='text-xs px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-300'>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className='text-center py-20'>
              <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
                <ImageIcon className='size-8 text-gray-600' />
              </div>
              <p className='text-gray-500 text-lg mb-2'>Gallery coming soon</p>
              <p className='text-gray-600 text-sm max-w-md mx-auto'>
                Add your photos to the{' '}
                <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>photos</code> array in this
                component, and place images in the{' '}
                <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>public/photos/</code>{' '}
                directory.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

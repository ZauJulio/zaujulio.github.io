import { ArrowLeftIcon, Disc3Icon, Music2Icon, SearchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router';

export const meta = () => [{ title: 'Zaú Júlio - Music' }];

import { FavoriteTrack } from './components/FavoriteTrack';
import { FilterRow } from './components/FilterRow';
import { PlaylistCard } from './components/PlaylistCard';
import { favorites, genres, playlists } from './data';

// ─── Page ────────────────────────────────────────────────────

export default function MusicPage() {
  const [activeGenre, setActiveGenre] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const hasContent = playlists.length > 0 || favorites.length > 0;

  const filteredPlaylists = useMemo(() => {
    let result = playlists;
    if (activeGenre !== 'All') {
      result = result.filter((p) => p.genre === activeGenre);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((p) => {
        const searchableText = [p.title, p.description, p.genre].filter(Boolean).join(' ').toLowerCase();
        return searchableText.includes(query);
      });
    }
    return result;
  }, [activeGenre, searchQuery]);

  const filteredFavorites = useMemo(() => {
    let result = favorites;
    if (activeGenre !== 'All') {
      result = result.filter((f) => f.genre === activeGenre);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((f) => {
        const searchableText = [f.title, f.artist, f.album, f.genre].filter(Boolean).join(' ').toLowerCase();
        return searchableText.includes(query);
      });
    }
    return result;
  }, [activeGenre, searchQuery]);

  return (
    <div className='min-h-screen bg-black text-white font-sans'>
      {/* Header */}
      <header className='sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gray-800/50'>
        <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
          <Link
            to='/'
            className='inline-flex items-center gap-2 text-gray-400 hover:text-brand-300 transition-colors no-underline text-sm'
          >
            <ArrowLeftIcon className='size-4' />
            Back to Portfolio
          </Link>

          <div className='flex items-center gap-2'>
            <Music2Icon className='size-5 text-violet-400' />
            <span className='font-semibold text-white'>Music</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className='py-20 px-6'>
        <div className='max-w-4xl mx-auto text-center'>
          <div className='inline-flex p-4 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-500/5 mb-6'>
            <Music2Icon className='size-10 text-violet-400' />
          </div>

          <h1 className='text-4xl md:text-5xl font-bold mb-4'>Music</h1>
          <p className='text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed'>
            What I listen to while coding, relaxing, and exploring. Curated playlists and favorite tracks across genres
            — from ambient and electronic to rock and Brazilian MPB.
          </p>

          {/* Platform badges */}
          <div className='flex items-center justify-center gap-4 mt-6'>
            <span className='inline-flex items-center gap-1.5 text-sm text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20'>
              {'\u{1F3B5}'} Spotify
            </span>
            <span className='inline-flex items-center gap-1.5 text-sm text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20'>
              {'\u25B6\uFE0F'} YouTube Music
            </span>
          </div>
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
              placeholder='Search music...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full bg-gray-900/50 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-brand-500/50 transition-colors'
            />
          </div>
          {/* Filters */}
          {genres.length > 1 && (
            <FilterRow label='Genre' options={genres} active={activeGenre} onSelect={setActiveGenre} />
          )}
        </div>
      </section>

      {hasContent ? (
        <>
          {/* Playlists */}
          {filteredPlaylists.length > 0 && (
            <section className='pb-16 px-6'>
              <div className='max-w-7xl mx-auto'>
                <h2 className='text-2xl font-bold mb-8'>Playlists</h2>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                  {filteredPlaylists.map((playlist) => (
                    <PlaylistCard key={playlist.id} playlist={playlist} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Favorites */}
          {filteredFavorites.length > 0 && (
            <section className='pb-20 px-6'>
              <div className='max-w-4xl mx-auto'>
                <h2 className='text-2xl font-bold mb-8'>Favorites</h2>
                <div className='space-y-3'>
                  {filteredFavorites.map((track) => (
                    <FavoriteTrack key={track.id} track={track} />
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* No results for current filter */}
          {filteredPlaylists.length === 0 && filteredFavorites.length === 0 && (
            <section className='pb-20 px-6'>
              <div className='text-center py-12'>
                <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
                  <Disc3Icon className='size-8 text-gray-600' />
                </div>
                <p className='text-gray-500 text-lg mb-2'>No music matches this genre</p>
                <p className='text-gray-600 text-sm'>Try selecting a different genre filter above.</p>
              </div>
            </section>
          )}
        </>
      ) : (
        <section className='pb-20 px-6'>
          <div className='text-center py-12'>
            <div className='inline-flex p-4 rounded-2xl bg-gray-900/50 mb-4'>
              <Disc3Icon className='size-8 text-gray-600' />
            </div>
            <p className='text-gray-500 text-lg mb-2'>Playlists coming soon</p>
            {/* <p className='text-gray-600 text-sm max-w-lg mx-auto mb-6'>
              Add your playlists and favorite tracks to the{' '}
              <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>playlists</code> and{' '}
              <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>favorites</code> arrays in this
              component. Each item supports both Spotify and YouTube Music links.
            </p> */}
          </div>
        </section>
      )}
    </div>
  );
}

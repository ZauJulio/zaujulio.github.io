import { useState, useMemo } from 'react';
import { ArrowLeftIcon, Music2Icon, ExternalLinkIcon, PlayCircleIcon, Disc3Icon, SearchIcon } from 'lucide-react';
import { Link } from 'react-router';

export const meta = () => [{ title: 'Zaú Júlio - Music' }];

/** Supported music platforms */
type Platform = 'spotify' | 'youtube-music';

interface MusicLink {
  platform: Platform;
  url: string;
}

interface MusicItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  cover?: string;
  genre?: string;
  links: MusicLink[];
}

interface Playlist {
  id: string;
  title: string;
  description: string;
  cover?: string;
  genre?: string;
  trackCount?: number;
  links: MusicLink[];
}

// ─── Configurable Data ───────────────────────────────────────

const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Late Night Coding',
    description: 'Ambient and electronic tracks for deep focus sessions. Lo-fi beats, post-rock, and atmospheric soundscapes.',
    genre: 'Ambient',
    trackCount: 48,
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/playlist/37i9dQZF1DX5trt9i14X7j' },
      { platform: 'youtube-music', url: 'https://music.youtube.com/playlist?list=RDCLAK5uy_kgNMdXz9U6F0x5qXbT0jOmFb9F-qJz6Xk' },
    ],
  },
  {
    id: '2',
    title: 'Brazilian Classics',
    description: 'MPB, Bossa Nova, and Tropicalia essentials. Caetano, Gil, Tom Jobim, Elis Regina, and more.',
    genre: 'MPB',
    trackCount: 65,
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/playlist/37i9dQZF1DWTwzVdyRpXm1' },
      { platform: 'youtube-music', url: 'https://music.youtube.com/playlist?list=RDCLAK5uy_nMFasKMiG0y7GCh1j9AqD9ddvaqm6RMi8' },
    ],
  },
  {
    id: '3',
    title: 'Progressive & Post-Rock',
    description: 'From Pink Floyd to Explosions in the Sky. Long builds, complex arrangements, and cinematic textures.',
    genre: 'Progressive Rock',
    trackCount: 37,
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/playlist/37i9dQZF1DX6VdMW310YC7' },
    ],
  },
  {
    id: '4',
    title: 'Synthwave Drive',
    description: 'Retro-futuristic synths for when you need energy. Outrun, darksynth, and cyberpunk vibes.',
    genre: 'Synthpop',
    trackCount: 52,
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/playlist/37i9dQZF1DXdLEN7aqioXM' },
      { platform: 'youtube-music', url: 'https://music.youtube.com/playlist?list=RDCLAK5uy_n_wfGBh7X4w8h3pMYXjwkXrMrKb_n6qqkA' },
    ],
  },
];

const favorites: MusicItem[] = [
  {
    id: '1',
    title: 'Breathe (In the Air)',
    artist: 'Pink Floyd',
    album: 'The Dark Side of the Moon',
    genre: 'Progressive Rock',
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/2ctvdKmETyOzPb2GiJJT53' },
      { platform: 'youtube-music', url: 'https://music.youtube.com/watch?v=mrojrDCI02k' },
    ],
  },
  {
    id: '2',
    title: 'Construcao',
    artist: 'Chico Buarque',
    album: 'Construcao',
    genre: 'MPB',
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/5weVRbJJLJOEMKOhOSYJJg' },
      { platform: 'youtube-music', url: 'https://music.youtube.com/watch?v=nmMmMYOe--g' },
    ],
  },
  {
    id: '3',
    title: 'The Less I Know the Better',
    artist: 'Tame Impala',
    album: 'Currents',
    genre: 'Psychedelic',
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/6K4t31amVTZDgR3sKmwUJJ' },
      { platform: 'youtube-music', url: 'https://music.youtube.com/watch?v=2SUwOgmvzK4' },
    ],
  },
  {
    id: '4',
    title: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    genre: 'Synthpop',
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/6GyFP1nfCDB8lbD2bG0Hkz' },
    ],
  },
  {
    id: '5',
    title: 'Aquarela',
    artist: 'Toquinho',
    album: 'Aquarela',
    genre: 'MPB',
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/6tMCnmmNRSig8aBDp2TiAo' },
      { platform: 'youtube-music', url: 'https://music.youtube.com/watch?v=qVk6qN0HNYI' },
    ],
  },
  {
    id: '6',
    title: 'Your Hand in Mine',
    artist: 'Explosions in the Sky',
    album: 'The Earth Is Not a Cold Dead Place',
    genre: 'Post-Rock',
    links: [
      { platform: 'spotify', url: 'https://open.spotify.com/track/360ksfaBMz8jvhxMJ8GJfq' },
    ],
  },
];

// ─── Extract unique genres from both playlists and favorites ──
const allGenres = Array.from(
  new Set([
    ...playlists.map((p) => p.genre).filter(Boolean),
    ...favorites.map((f) => f.genre).filter(Boolean),
  ] as string[]),
);
const genres = allGenres.length > 0 ? ['All', ...allGenres] : [];

// ─── Filter Row ──────────────────────────────────────────────

function FilterRow({ label, options, active, onSelect }: {
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

// ─── Platform UI Helpers ─────────────────────────────────────

const platformConfig: Record<Platform, { label: string; color: string; hoverColor: string; icon: string }> = {
  spotify: {
    label: 'Spotify',
    color: 'text-green-400',
    hoverColor: 'hover:text-green-300',
    icon: '\u{1F3B5}',
  },
  'youtube-music': {
    label: 'YouTube Music',
    color: 'text-red-400',
    hoverColor: 'hover:text-red-300',
    icon: '\u25B6\uFE0F',
  },
};

function PlatformLinks({ links }: { links: MusicLink[] }) {
  return (
    <div className='flex items-center gap-3'>
      {links.map((link) => {
        const config = platformConfig[link.platform];
        return (
          <a
            key={link.platform}
            href={link.url}
            target='_blank'
            rel='noopener noreferrer'
            className={`inline-flex items-center gap-1.5 text-sm ${config.color} ${config.hoverColor} transition-colors no-underline`}
          >
            <span>{config.icon}</span>
            {config.label}
            <ExternalLinkIcon className='size-3' />
          </a>
        );
      })}
    </div>
  );
}

// ─── Components ──────────────────────────────────────────────

function PlaylistCard({ playlist }: { playlist: Playlist }) {
  return (
    <div className='rounded-xl border border-gray-800 bg-gray-900/50 overflow-hidden group hover:border-brand-500/50 transition-all duration-300'>
      {playlist.cover ? (
        <div className='aspect-square overflow-hidden'>
          <img
            src={playlist.cover}
            alt={playlist.title}
            className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
          />
        </div>
      ) : (
        <div className='aspect-square bg-gradient-to-br from-violet-500/10 to-purple-500/5 flex items-center justify-center'>
          <PlayCircleIcon className='size-16 text-violet-400/50' />
        </div>
      )}
      <div className='p-5'>
        <div className='flex items-center gap-2 mb-2'>
          <h3 className='text-lg font-semibold text-white group-hover:text-brand-300 transition-colors'>
            {playlist.title}
          </h3>
          {playlist.genre && (
            <span className='text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20'>
              {playlist.genre}
            </span>
          )}
        </div>
        {playlist.trackCount && (
          <p className='text-xs text-gray-500 mb-2'>{playlist.trackCount} tracks</p>
        )}
        <p className='text-sm text-gray-400 leading-relaxed mb-3'>
          {playlist.description}
        </p>
        <PlatformLinks links={playlist.links} />
      </div>
    </div>
  );
}

function FavoriteTrack({ track }: { track: MusicItem }) {
  return (
    <div className='flex items-center gap-4 p-4 rounded-xl border border-gray-800 bg-gray-900/50 hover:border-brand-500/50 transition-all duration-300 group'>
      {track.cover ? (
        <img
          src={track.cover}
          alt={track.title}
          className='size-14 rounded-lg object-cover flex-shrink-0'
        />
      ) : (
        <div className='size-14 rounded-lg bg-gradient-to-br from-violet-500/10 to-purple-500/5 flex items-center justify-center flex-shrink-0'>
          <Disc3Icon className='size-6 text-violet-400/50' />
        </div>
      )}

      <div className='flex-1 min-w-0'>
        <h4 className='text-sm font-semibold text-white truncate group-hover:text-brand-300 transition-colors'>
          {track.title}
        </h4>
        <p className='text-xs text-gray-400 truncate'>{track.artist}</p>
        {track.album && (
          <p className='text-xs text-gray-500 truncate'>{track.album}</p>
        )}
      </div>

      {track.genre && (
        <span className='hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20 flex-shrink-0'>
          {track.genre}
        </span>
      )}

      <div className='flex-shrink-0'>
        <PlatformLinks links={track.links} />
      </div>
    </div>
  );
}

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
            What I listen to while coding, relaxing, and exploring. Curated playlists and
            favorite tracks across genres — from ambient and electronic to rock and Brazilian MPB.
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
            <p className='text-gray-600 text-sm max-w-lg mx-auto mb-6'>
              Add your playlists and favorite tracks to the{' '}
              <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>playlists</code> and{' '}
              <code className='text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded text-xs'>favorites</code> arrays
              in this component. Each item supports both Spotify and YouTube Music links.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}

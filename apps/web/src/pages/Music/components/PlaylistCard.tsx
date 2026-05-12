import { PlayCircleIcon } from 'lucide-react';

import type { Playlist } from '../types';
import { PlatformLinks } from './PlatformLinks';

export function PlaylistCard({ playlist }: { playlist: Playlist }) {
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
        <div className='aspect-square bg-linear-to-br from-violet-500/10 to-purple-500/5 flex items-center justify-center'>
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
        {playlist.trackCount && <p className='text-xs text-gray-500 mb-2'>{playlist.trackCount} tracks</p>}
        <p className='text-sm text-gray-400 leading-relaxed mb-3'>{playlist.description}</p>
        <PlatformLinks links={playlist.links} />
      </div>
    </div>
  );
}

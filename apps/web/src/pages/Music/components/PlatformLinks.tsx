import { ExternalLinkIcon } from 'lucide-react';

import type { MusicLink, Platform } from '../types';

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

export function PlatformLinks({ links }: { links: MusicLink[] }) {
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

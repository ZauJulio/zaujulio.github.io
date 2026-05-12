export type Platform = 'spotify' | 'youtube-music';

export interface MusicLink {
  platform: Platform;
  url: string;
}

export interface MusicItem {
  id: string;
  title: string;
  artist: string;
  album?: string;
  cover?: string;
  genre?: string;
  links: MusicLink[];
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  cover?: string;
  genre?: string;
  trackCount?: number;
  links: MusicLink[];
}

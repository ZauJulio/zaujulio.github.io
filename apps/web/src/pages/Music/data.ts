import type { MusicItem, Playlist } from './types';

export const playlists: Playlist[] = [];
export const favorites: MusicItem[] = [];

const allGenres = Array.from(
  new Set([
    ...playlists.map((p) => p.genre).filter(Boolean),
    ...favorites.map((f) => f.genre).filter(Boolean),
  ] as string[]),
);

export const genres = allGenres.length > 0 ? ['All', ...allGenres] : [];

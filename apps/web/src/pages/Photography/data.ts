import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { Album } from 'content/photography/photography.json.d.ts';
import photographyJson from 'content/photography/photography.json';
import photographyPtBRJson from 'content/photography/photography.pt-BR.json';

const enAlbums = photographyJson.albums;
const ptBRAbums = photographyPtBRJson.albums as Album[];

export function useAlbums(): Album[] {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return useMemo(() => {
    return lang === 'pt-BR' ? ptBRAbums : enAlbums;
  }, [lang]);
}

export function usePhotos() {
  const albums = useAlbums();
  return useMemo(() => albums.flatMap((album) => album.photos), [albums]);
}

export function useAllTags() {
  const photos = usePhotos();
  return useMemo(() => {
    const allTags = Array.from(new Set(photos.flatMap((p) => p.tags ?? [])));
    return allTags.length > 0 ? ['All', ...allTags] : [];
  }, [photos]);
}

export const albums = enAlbums;
export const photos = albums.flatMap((album) => album.photos);
export const allTags = Array.from(new Set(photos.flatMap((p) => p.tags ?? [])));
export const tags = allTags.length > 0 ? ['All', ...allTags] : [];

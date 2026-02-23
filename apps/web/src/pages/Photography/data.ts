import type { Album, Photo } from 'content/photography/photography.json.d.ts';
import photographyJson from 'content/photography/photography.json';

export const albums: Album[] = photographyJson.albums;

export const photos: Photo[] = albums.flatMap((album) => album.photos);

export const allTags = Array.from(new Set(photos.flatMap((p) => p.tags ?? [])));
export const tags = allTags.length > 0 ? ['All', ...allTags] : [];

import type { Photo } from 'content/photography/photography.json.d.ts';
import photographyJson from 'content/photography/photography.json';

export const photos: Photo[] = photographyJson.photos;

// Extract unique filter values
export const timesOfDay = ['All', ...Array.from(new Set(photos.map((p) => p.timeOfDay).filter(Boolean) as string[]))];
export const occasions = ['All', ...Array.from(new Set(photos.map((p) => p.occasion).filter(Boolean) as string[]))];
export const allTags = Array.from(new Set(photos.flatMap((p) => p.tags ?? [])));
export const tags = allTags.length > 0 ? ['All', ...allTags] : [];

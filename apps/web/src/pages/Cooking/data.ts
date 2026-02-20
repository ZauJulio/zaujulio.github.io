import { loadMarkdownFiles, type RecipeMeta } from '@repo/shared/lib/markdown';

// Load all recipes from content/recipes/*.md at build time
const recipeFiles = import.meta.glob('../../content/recipes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export const recipes = loadMarkdownFiles<RecipeMeta>(recipeFiles);

// Extract unique filter values
export const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.meta.cuisine).filter(Boolean) as string[]))];
export const mealTypes = [
  'All',
  ...Array.from(new Set(recipes.map((r) => r.meta.mealType).filter(Boolean) as string[])),
];
export const courseTypes = [
  'All',
  ...Array.from(new Set(recipes.map((r) => r.meta.courseType).filter(Boolean) as string[])),
];

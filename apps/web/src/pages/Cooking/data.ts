import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { loadMarkdownFiles, type RecipeMeta } from '@repo/shared/lib/markdown';

const enRecipeFiles = import.meta.glob('../../content/recipes/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const ptBRRecipeFiles = import.meta.glob('../../content/recipes/*.pt-BR.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const enRecipes = loadMarkdownFiles<RecipeMeta>(enRecipeFiles);
const ptBRRecipes = loadMarkdownFiles<RecipeMeta>(ptBRRecipeFiles);

export function useRecipes() {
  const { i18n } = useTranslation();
  const lang = i18n.language || 'en';

  return useMemo(() => {
    return lang === 'pt-BR' ? ptBRRecipes : enRecipes;
  }, [lang]);
}

export function useRecipeFilters() {
  const recipes = useRecipes();

  return useMemo(() => {
    const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.meta.cuisine).filter(Boolean) as string[]))];
    const mealTypes = ['All', ...Array.from(new Set(recipes.map((r) => r.meta.mealType).filter(Boolean) as string[]))];
    const courseTypes = ['All', ...Array.from(new Set(recipes.map((r) => r.meta.courseType).filter(Boolean) as string[]))];
    return { cuisines, mealTypes, courseTypes };
  }, [recipes]);
}

export const recipes = enRecipes;
export const cuisines = ['All', ...Array.from(new Set(recipes.map((r) => r.meta.cuisine).filter(Boolean) as string[]))];
export const mealTypes = ['All', ...Array.from(new Set(recipes.map((r) => r.meta.mealType).filter(Boolean) as string[]))];
export const courseTypes = ['All', ...Array.from(new Set(recipes.map((r) => r.meta.courseType).filter(Boolean) as string[]))];

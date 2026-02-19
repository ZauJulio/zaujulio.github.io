import { index, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  index('../pages/Home/index.tsx'),
  route('photography', '../pages/Photography/index.tsx'),
  route('cooking', '../pages/Cooking/index.tsx'),
  route('cooking/:slug', '../pages/Cooking/RecipePage.tsx'),
  route('articles', '../pages/Articles/index.tsx'),
  route('articles/:slug', '../pages/Articles/ArticlePage.tsx'),
  route('music', '../pages/Music/index.tsx'),
  route('*', '../pages/NotFound.tsx'),
] satisfies RouteConfig;

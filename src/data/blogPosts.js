// Registro de posts para o browser: junta os metadados (BLOG_POSTS_META,
// puros) com o corpo JSX de cada post em src/blog/posts/<slug>.jsx.
// Só funciona em contexto Vite (import.meta.glob) — scripts Node usam
// BLOG_POSTS_META diretamente (ver publicRoutes.js).
import { BLOG_POSTS_META } from './blogPostsMeta';

const bodyModules = import.meta.glob('../blog/posts/*.jsx', { eager: true });

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.jsx$/, '');
}

const bodyBySlug = Object.fromEntries(
  Object.entries(bodyModules).map(([path, mod]) => [slugFromPath(path), mod.default])
);

export const BLOG_POSTS = BLOG_POSTS_META
  .map((meta) => ({ meta, Body: bodyBySlug[meta.slug] }))
  .filter((post) => {
    if (!post.Body) {
      console.warn(`[blog] BLOG_POSTS_META tem "${post.meta.slug}" mas não existe src/blog/posts/${post.meta.slug}.jsx`);
      return false;
    }
    return true;
  })
  .sort((a, b) => (a.meta.publishedAt < b.meta.publishedAt ? 1 : -1));

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.meta.slug === slug) || null;
}

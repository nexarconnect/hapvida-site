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
  .map((meta, index) => ({ meta, Body: bodyBySlug[meta.slug], index }))
  .filter((post) => {
    if (!post.Body) {
      console.warn(`[blog] BLOG_POSTS_META tem "${post.meta.slug}" mas não existe src/blog/posts/${post.meta.slug}.jsx`);
      return false;
    }
    return true;
  })
  // publishedAt só tem granularidade de dia, então múltiplos posts do mesmo
  // dia empatam nele. O desempate por índice descendente garante que, entre
  // posts da mesma data, o que foi adicionado por último a BLOG_POSTS_META
  // (o mais recente de fato) apareça primeiro — sem isso, sort() é estável e
  // mantém a ordem de inserção, que é o oposto do que "mais recente primeiro"
  // deveria mostrar.
  .sort((a, b) => {
    if (a.meta.publishedAt !== b.meta.publishedAt) {
      return a.meta.publishedAt < b.meta.publishedAt ? 1 : -1;
    }
    return b.index - a.index;
  })
  .map(({ meta, Body }) => ({ meta, Body }));

export function getPostBySlug(slug) {
  return BLOG_POSTS.find((post) => post.meta.slug === slug) || null;
}

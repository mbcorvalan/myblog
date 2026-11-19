# Ideas en tiempos de TikTok

Blog personal para escrituras, ideas de proyectos y volcados. Next.js 15 (App Router), React 19, TypeScript y Supabase (Postgres).

## Arrancar

```bash
npm install
npm run dev        # http://localhost:3000
```

Los posts y la música viven en Supabase; el repo no guarda contenido.

## Conectar Supabase

1. Creá un proyecto en https://supabase.com.
2. En **SQL Editor**, corré las migraciones de `supabase/migrations/` en orden.
3. Copiá `.env.example` a `.env.local` y completá la URL y la anon key (Project Settings → API).
4. Para escribir: **Table Editor → posts → Insert row**. Imágenes y audio: **Storage → media**. El contenido es Markdown. Marcá `published = true` para que aparezca.

La anon key solo puede leer posts publicados (Row Level Security).

## Personalizar

Todo lo editable está en `src/config/site.ts`:

- **Hero**: `hero.heading`, `hero.body`, `hero.image` (poné la imagen en `public/images/`).
- **Reproductor**: solo el título de la sección (`nowPlaying.label`). La canción se carga en Supabase, tabla `tracks`.
- **Redes**: `socials`.

## Estructura

```
src/
  app/                 rutas (home, /posts/[slug], 404)
  components/          Header, Hero, PostList, MusicPlayer, Footer (CSS Modules)
  config/site.ts       textos y configuración editable
  lib/posts.ts         acceso a posts
  lib/tracks.ts        canción actual (Supabase)
  lib/supabase/        cliente de servidor y URLs de Storage
  types/post.ts        modelo de dominio
supabase/              migraciones SQL
```

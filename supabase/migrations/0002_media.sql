-- ─────────────────────────────────────────────────────────────
-- 1. Storage: un bucket público "media" para imágenes y audio.
--    Organizalo en carpetas: posts/, music/, covers/ …
--    Subís archivos desde el dashboard (Storage → media → Upload).
-- ─────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- ─────────────────────────────────────────────────────────────
-- 2. Portada opcional para cada post.
--    Guardá la ruta dentro del bucket (ej. "posts/primer-volcado.jpg")
--    o una URL completa (https://…).
-- ─────────────────────────────────────────────────────────────
alter table public.posts
  add column cover_image text,
  add column cover_alt   text;

-- ─────────────────────────────────────────────────────────────
-- 3. Canciones del reproductor "Música que estoy escuchando en loop".
--    La que tenga is_current = true es la que se muestra.
--    Las anteriores quedan como historial.
-- ─────────────────────────────────────────────────────────────
create table public.tracks (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  artist      text not null,
  audio_path  text not null,   -- ruta en el bucket (ej. "music/helecho.mp3") o URL completa
  cover_path  text,            -- portada circular; null = degradado
  is_current  boolean not null default false,
  created_at  timestamptz not null default now()
);

-- Solo puede haber una canción actual a la vez.
create unique index tracks_one_current_idx on public.tracks (is_current) where is_current;

-- Al marcar una canción como actual, desmarca automáticamente la anterior.
create or replace function public.tracks_single_current()
returns trigger language plpgsql as $$
begin
  if new.is_current then
    update public.tracks set is_current = false
    where is_current and id <> new.id;
  end if;
  return new;
end $$;

create trigger tracks_single_current
before insert or update of is_current on public.tracks
for each row when (new.is_current)
execute function public.tracks_single_current();

alter table public.tracks enable row level security;

create policy "Public can read tracks"
  on public.tracks for select
  using (true);

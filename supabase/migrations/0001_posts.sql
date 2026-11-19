-- Tipos de contenido del blog
create type post_kind as enum ('escritura', 'idea', 'proyecto');

create table public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title         text not null,
  excerpt       text,
  content       text not null default '',        -- Markdown
  kind          post_kind not null default 'escritura',
  tags          text[] not null default '{}',
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index posts_published_idx on public.posts (published, published_at desc);
create index posts_kind_idx on public.posts (kind);

-- updated_at automático
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

-- Seguridad: el público solo lee lo publicado.
-- Escribís desde el dashboard de Supabase (service role ignora RLS).
alter table public.posts enable row level security;

create policy "Public can read published posts"
  on public.posts for select
  using (published = true);

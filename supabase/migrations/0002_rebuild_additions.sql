-- Portal Rádio Cultura FM 104.7 — Reconstrução do front-end estilo G1
-- Rodar no Supabase: SQL Editor > New query > colar tudo > Run
-- (soma ao schema.sql existente, não substitui nada)

-- 1. Métricas de leitura para o widget "Mais Lidas" real
alter table public.articles
  add column if not exists views_count integer not null default 0;

-- 2. Marcação de matéria urgente/destaque para a faixa "AO VIVO" / ticker
alter table public.articles
  add column if not exists is_breaking boolean not null default false;

create index if not exists articles_views_count_idx
  on public.articles (views_count desc);

-- 3. Inscritos da newsletter
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- qualquer visitante pode se inscrever (insert), mas não pode ler a lista
create policy "newsletter_insert_public"
  on public.newsletter_subscribers for insert
  to anon, authenticated
  with check (true);

-- só admin/editor podem ver a lista de inscritos
create policy "newsletter_select_editor_admin"
  on public.newsletter_subscribers for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

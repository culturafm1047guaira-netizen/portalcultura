-- Portal Rádio Cultura FM 104.7 — Schema do painel administrativo
-- Rodar no Supabase: SQL Editor > New query > colar tudo > Run

-- 1. Perfis de usuário (vinculados ao auth.users do Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'redator' check (role in ('admin', 'editor', 'redator')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- qualquer usuário logado pode ler todos os perfis (precisa pra mostrar autor nas matérias)
create policy "profiles_select_authenticated"
  on public.profiles for select
  to authenticated
  using (true);

-- só admin pode alterar role de outros perfis
create policy "profiles_update_admin"
  on public.profiles for update
  to authenticated
  using (
    exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
  );

-- cria o perfil automaticamente quando um novo usuário é convidado/criado no Supabase Auth
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    'redator'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2. Matérias próprias
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  summary text,
  content text not null default '',
  cover_image_url text,
  category text not null default 'geral',
  author_id uuid not null references public.profiles(id),
  status text not null default 'draft' check (status in ('draft', 'scheduled', 'published')),
  published_at timestamptz,
  scheduled_for timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_published_idx
  on public.articles (status, published_at desc);

alter table public.articles enable row level security;

-- público (site) só enxerga matérias publicadas
create policy "articles_select_public"
  on public.articles for select
  to anon, authenticated
  using (status = 'published');

-- autor enxerga as próprias matérias em qualquer status
create policy "articles_select_own"
  on public.articles for select
  to authenticated
  using (author_id = auth.uid());

-- admin/editor enxergam todas, qualquer status
create policy "articles_select_editor_admin"
  on public.articles for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- qualquer usuário logado (redator+) pode criar matéria em seu próprio nome
create policy "articles_insert_own"
  on public.articles for insert
  to authenticated
  with check (author_id = auth.uid());

-- autor edita a própria matéria; admin/editor editam qualquer uma
create policy "articles_update_own_or_editor"
  on public.articles for update
  to authenticated
  using (
    author_id = auth.uid()
    or exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- só admin/editor podem excluir
create policy "articles_delete_editor_admin"
  on public.articles for delete
  to authenticated
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('admin', 'editor')
    )
  );

-- mantém updated_at em dia
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();

-- 3. Storage: bucket público para imagens das matérias (capa + imagens do corpo)
insert into storage.buckets (id, name, public)
values ('article-images', 'article-images', true)
on conflict (id) do nothing;

create policy "article_images_public_read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'article-images');

create policy "article_images_authenticated_insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'article-images');

create policy "article_images_authenticated_update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'article-images');

create policy "article_images_authenticated_delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'article-images');

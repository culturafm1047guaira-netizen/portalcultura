-- Portal Rádio Cultura FM 104.7 — contagem de views atômica
-- Rodar no Supabase: SQL Editor > New query > colar tudo > Run
-- (soma ao schema.sql existente, não substitui nada)
--
-- Motivo: o incremento de views_count era feito em dois passos no app
-- (select, depois update com +1), o que perde contagem sob acesso
-- concorrente — duas requisições simultâneas podem ler o mesmo valor
-- antes de qualquer uma delas gravar. Um UPDATE direto no Postgres é
-- atômico por natureza, então a função abaixo resolve isso.

create or replace function public.increment_article_views(article_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.articles
  set views_count = views_count + 1
  where id = article_id;
$$;

-- Só o service role (usado pela rota /api/articles/[slug]/view) deve chamar
-- essa função; revoga de anon/authenticated por segurança.
revoke execute on function public.increment_article_views(uuid) from anon, authenticated;

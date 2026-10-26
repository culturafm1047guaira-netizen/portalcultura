"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { CATEGORIES } from "@/lib/categories";

export type ArticleStatus = "draft" | "scheduled" | "published";

/** Troca o erro cru do Postgres por uma mensagem que faz sentido pro editor. */
function friendlyDbError(err: { code?: string; message: string }): string {
  if (err.code === "23505") {
    return "Já existe uma matéria com esse slug. Escolha outro.";
  }
  return err.message;
}

export interface ArticleFormInitialData {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  cover_image_url: string | null;
  category: string;
  is_breaking: boolean | null;
  status: ArticleStatus;
  published_at: string | null;
  scheduled_for: string | null;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Converte um timestamptz ISO em valor aceito por <input type="datetime-local">. */
function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const offsetMs = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - offsetMs).toISOString().slice(0, 16);
}

export default function ArticleForm({ initialData }: { initialData?: ArticleFormInitialData }) {
  const router = useRouter();
  const isEdit = Boolean(initialData);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(initialData?.title ?? "");
  const [slug, setSlug] = useState(initialData?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [summary, setSummary] = useState(initialData?.summary ?? "");
  const [category, setCategory] = useState(initialData?.category ?? CATEGORIES[0].newsCategory);
  const [content, setContent] = useState(initialData?.content ?? "");
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url ?? "");
  const [isBreaking, setIsBreaking] = useState(initialData?.is_breaking ?? false);
  const [status, setStatus] = useState<ArticleStatus>(initialData?.status ?? "draft");
  const [scheduledFor, setScheduledFor] = useState(toDatetimeLocal(initialData?.scheduled_for ?? null));

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() ?? "jpg";
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("article-images")
        .upload(path, file, { cacheControl: "3600", upsert: false });

      if (uploadError) {
        setError(`Falha ao enviar imagem: ${uploadError.message}`);
        return;
      }

      const { data } = supabase.storage.from("article-images").getPublicUrl(path);
      setCoverImageUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao enviar imagem.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !slug.trim()) {
      setError("Título e slug são obrigatórios.");
      return;
    }

    if (status === "scheduled" && !scheduledFor) {
      setError("Informe a data/hora de agendamento.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Sessão expirada. Faça login novamente.");
        setSaving(false);
        return;
      }

      // Checa slug duplicado antes de salvar (só quando é novo ou o slug mudou),
      // pra dar um erro claro em vez do erro cru de unique constraint do Postgres.
      if (!isEdit || slug.trim() !== initialData?.slug) {
        const { data: existing } = await supabase
          .from("articles")
          .select("id")
          .eq("slug", slug.trim())
          .maybeSingle();

        if (existing) {
          setError(`Já existe uma matéria com o slug "${slug.trim()}". Escolha outro.`);
          setSaving(false);
          return;
        }
      }

      let publishedAt = initialData?.published_at ?? null;
      let scheduledForIso: string | null = null;

      if (status === "published") {
        publishedAt = publishedAt ?? new Date().toISOString();
      } else if (status === "scheduled") {
        scheduledForIso = new Date(scheduledFor).toISOString();
        publishedAt = null;
      } else {
        publishedAt = null;
      }

      const payload = {
        title: title.trim(),
        slug: slug.trim(),
        summary: summary.trim() || null,
        content,
        cover_image_url: coverImageUrl || null,
        category,
        is_breaking: isBreaking,
        status,
        published_at: publishedAt,
        scheduled_for: scheduledForIso,
      };

      if (isEdit && initialData) {
        const { error: updateError } = await supabase
          .from("articles")
          .update(payload)
          .eq("id", initialData.id);

        if (updateError) {
          setError(`Falha ao salvar: ${friendlyDbError(updateError)}`);
          setSaving(false);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from("articles")
          .insert({ ...payload, author_id: user.id });

        if (insertError) {
          setError(`Falha ao criar matéria: ${friendlyDbError(insertError)}`);
          setSaving(false);
          return;
        }
      }

      router.push("/admin/materias");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado ao salvar.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-2xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-md px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-text mb-1">
          Título
        </label>
        <input
          id="title"
          type="text"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-semibold text-text mb-1">
          Slug (URL)
        </label>
        <input
          id="slug"
          type="text"
          required
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value));
            setSlugTouched(true);
          }}
          className="w-full border border-border rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="text-xs text-text-muted mt-1">
          URL final: /noticia/{slug || "..."}
        </p>
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-semibold text-text mb-1">
          Resumo
        </label>
        <textarea
          id="summary"
          rows={2}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-semibold text-text mb-1">
          Categoria
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat.key} value={cat.newsCategory}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-semibold text-text mb-1">
          Conteúdo
        </label>
        <textarea
          id="content"
          rows={16}
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Separe parágrafos com uma linha em branco."
          className="w-full border border-border rounded-md px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text mb-1">Imagem de capa</label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm text-text-muted"
        />
        {uploading && <p className="text-xs text-text-muted mt-1">Enviando imagem...</p>}
        {coverImageUrl && (
          <div className="relative w-full max-w-xs aspect-video mt-3 rounded-md overflow-hidden border border-border">
            <Image src={coverImageUrl} alt="Pré-visualização da capa" fill className="object-cover" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_breaking"
          type="checkbox"
          checked={isBreaking}
          onChange={(e) => setIsBreaking(e.target.checked)}
          className="h-4 w-4"
        />
        <label htmlFor="is_breaking" className="text-sm font-semibold text-text">
          Marcar como urgente
        </label>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-text mb-1">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ArticleStatus)}
          className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="draft">Rascunho</option>
          <option value="scheduled">Agendada</option>
          <option value="published">Publicada</option>
        </select>
      </div>

      {status === "scheduled" && (
        <div>
          <label htmlFor="scheduled_for" className="block text-sm font-semibold text-text mb-1">
            Data/hora de publicação
          </label>
          <input
            id="scheduled_for"
            type="datetime-local"
            required
            value={scheduledFor}
            onChange={(e) => setScheduledFor(e.target.value)}
            className="w-full max-w-xs border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      <div className="flex items-center gap-3 mt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-primary hover:bg-primary-dark text-white font-semibold rounded-md px-5 py-2.5 text-sm transition-colors disabled:opacity-60"
        >
          {saving ? "Salvando..." : isEdit ? "Salvar alterações" : "Criar matéria"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/materias")}
          className="text-text-muted hover:text-text text-sm font-semibold"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

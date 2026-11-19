import "server-only";
import { cache } from "react";
import { getSupabase } from "@/lib/supabase/server";
import type { Post, PostKind, PostSummary } from "@/types/post";

const SUMMARY_COLUMNS = "id, slug, title, excerpt, kind, tags, published_at";

export async function getPosts(kind?: PostKind): Promise<PostSummary[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  let query = supabase
    .from("posts")
    .select(SUMMARY_COLUMNS)
    .eq("published", true)
    .order("published_at", { ascending: false });
  if (kind) query = query.eq("kind", kind);

  const { data, error } = await query;
  if (error) throw new Error(`No se pudieron cargar los posts: ${error.message}`);
  return data as PostSummary[];
}

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("posts")
    .select(`${SUMMARY_COLUMNS}, content, cover_image, cover_alt`)
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) throw new Error(`No se pudo cargar el post: ${error.message}`);
  return data as Post | null;
});

export async function getAllSlugs(): Promise<string[]> {
  return (await getPosts()).map((p) => p.slug);
}

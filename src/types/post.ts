export const POST_KINDS = ["escritura", "idea", "proyecto"] as const;
export type PostKind = (typeof POST_KINDS)[number];

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  kind: PostKind;
  tags: string[];
  published_at: string | null;
  /** Ruta en el bucket "media" (ej. "posts/foto.jpg") o URL completa. */
  cover_image?: string | null;
  cover_alt?: string | null;
}

export type PostSummary = Omit<Post, "content" | "cover_image" | "cover_alt">;

export const KIND_LABEL: Record<PostKind, string> = {
  escritura: "Escritura",
  idea: "Idea",
  proyecto: "Proyecto",
};

export function isPostKind(value: unknown): value is PostKind {
  return typeof value === "string" && (POST_KINDS as readonly string[]).includes(value);
}

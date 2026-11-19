const BUCKET = "media";

/**
 * Convierte una ruta del bucket "media" (ej. "music/helecho.mp3") en su URL pública.
 * Si ya es una URL completa o una ruta local ("/images/…"), la devuelve tal cual.
 */
export function mediaUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//.test(path) || path.startsWith("/")) return path;
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  const clean = path.split("/").map(encodeURIComponent).join("/");
  return `${base}/storage/v1/object/public/${BUCKET}/${clean}`;
}

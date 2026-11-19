import "server-only";
import { getSupabase } from "@/lib/supabase/server";
import { mediaUrl } from "@/lib/supabase/storage";
import type { Track } from "@/components/MusicPlayer/MusicPlayer";

/** Canción marcada como actual en Supabase (is_current = true), o null si no hay. */
export async function getCurrentTrack(): Promise<Track | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("tracks")
    .select("title, artist, audio_path, cover_path")
    .eq("is_current", true)
    .maybeSingle();
  if (error) {
    console.error(`No se pudo cargar la canción actual: ${error.message}`);
    return null;
  }
  const audioSrc = mediaUrl(data?.audio_path);
  if (!data || !audioSrc) return null;

  return { title: data.title, artist: data.artist, audioSrc, cover: mediaUrl(data.cover_path) };
}

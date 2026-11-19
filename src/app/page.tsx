import { Hero } from "@/components/Hero/Hero";
import { PostList } from "@/components/PostList/PostList";
import { MusicPlayer } from "@/components/MusicPlayer/MusicPlayer";
import { siteConfig } from "@/config/site";
import { getPosts } from "@/lib/posts";
import { getCurrentTrack } from "@/lib/tracks";
import { isPostKind } from "@/types/post";

export const revalidate = 60;

interface Props {
  searchParams: Promise<{ tipo?: string }>;
}

export default async function HomePage({ searchParams }: Props) {
  const { tipo } = await searchParams;
  const kind = isPostKind(tipo) ? tipo : undefined;
  const [posts, track] = await Promise.all([getPosts(kind), getCurrentTrack()]);

  return (
    <>
      <Hero />
      <PostList posts={posts} activeKind={kind} />
      {track && <MusicPlayer label={siteConfig.nowPlaying.label} track={track} />}
    </>
  );
}

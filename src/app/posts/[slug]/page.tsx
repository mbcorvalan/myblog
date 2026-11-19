import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { mediaUrl } from "@/lib/supabase/storage";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { KIND_LABEL } from "@/types/post";
import styles from "./post.module.css";

export const revalidate = 60;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getAllSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt ?? undefined };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const cover = mediaUrl(post.cover_image);

  return (
    <article className={`container ${styles.article}`}>
      <Link href="/#escritos" className={styles.back}>Volver</Link>
      <header className={styles.header}>
        <p className={styles.meta}>
          <span className={styles.kind}>{KIND_LABEL[post.kind]}</span>
          <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
        </p>
        <h1 className={styles.title}>{post.title}</h1>
        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}
      </header>
      {cover && (
        <div className={styles.cover}>
          <Image src={cover} alt={post.cover_alt ?? ""} fill sizes="(max-width: 760px) 100vw, 720px" priority className={styles.coverImg} />
        </div>
      )}
      <div className={styles.prose}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

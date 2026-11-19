import Link from "next/link";
import { formatDate } from "@/lib/format";
import { KIND_LABEL, POST_KINDS, type PostKind, type PostSummary } from "@/types/post";
import styles from "./PostList.module.css";

interface Props {
  posts: PostSummary[];
  activeKind?: PostKind;
}

export function PostList({ posts, activeKind }: Props) {
  const filters = [
    { label: "Todo", href: "/#escritos", active: !activeKind },
    ...POST_KINDS.map((k) => ({ label: KIND_LABEL[k], href: `/?tipo=${k}#escritos`, active: activeKind === k })),
  ];

  return (
    <section id="escritos" className={`container ${styles.section}`} aria-labelledby="escritos-heading">
      <div className={styles.head}>
        <h2 id="escritos-heading" className={styles.heading}>Mis ideas</h2>
        <nav className={styles.filters} aria-label="Filtrar por tipo">
          {filters.map((f) => (
            <Link key={f.label} href={f.href} scroll={false} className={styles.chip} aria-current={f.active ? "page" : undefined}>
              {f.label}
            </Link>
          ))}
        </nav>
      </div>

      {posts.length === 0 ? (
        <p className={styles.empty}>Todavía no hay nada acá. Pronto.</p>
      ) : (
        <ul className={styles.list}>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.slug}`} className={styles.item}>
                <span className={styles.meta}>
                  <span className={styles.kind}>{KIND_LABEL[post.kind]}</span>
                  <time dateTime={post.published_at ?? undefined}>{formatDate(post.published_at)}</time>
                </span>
                <span className={styles.body}>
                  <span className={styles.title}>{post.title}</span>
                  {post.excerpt && <span className={styles.excerpt}>{post.excerpt}</span>}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

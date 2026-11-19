import Image from "next/image";
import { siteConfig } from "@/config/site";
import styles from "./Hero.module.css";

/** Convierte *texto* en <em>texto</em>. */
function withItalics(text: string) {
  return text.split(/\*([^*]+)\*/g).map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part));
}

export function Hero() {
  const { title, hero } = siteConfig;
  return (
    <>
      <section className={`container ${styles.masthead}`}>
        <h1 className={styles.title}>{title}</h1>
      </section>

      <section className={`container ${styles.hero}`}>
        <div className={styles.text}>
          <p className={styles.body}>{hero.heading} {withItalics(hero.body)}</p>
        </div>
        <div className={styles.media}>
          {hero.image ? (
            <Image src={hero.image} alt={hero.imageAlt} fill sizes="(max-width: 860px) 100vw, 50vw" priority className={styles.img} />
          ) : (
            <div className={styles.placeholder}>Imagen próximamente</div>
          )}
        </div>
      </section>
    </>
  );
}

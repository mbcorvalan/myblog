/**
 * Configuración editable del sitio: textos e imagen del hero.
 * Los posts y la música se cargan desde Supabase.
 */
export const siteConfig = {
  title: "Ideas en tiempos de TikTok",
  // Descripción del sitio en Google y al compartir (no se muestra en la página)
  subtitle: "Una bitácora personal que escapa del scrolleo y habita Internet de otra manera.",
  // Dirección pública del sitio. En Vercel se toma sola (ej. https://mi-blog.vercel.app);
  // si algún día comprás un dominio, cargalo en la variable NEXT_PUBLIC_SITE_URL.
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000"),

  hero: {
    // Las palabras entre *asteriscos* se muestran en itálica
    body: "Una bitácora personal que escapa del *scrolleo* y habita Internet de otra manera. Acá no hay likes ni algoritmos. Solo ideas de alguien a quien le gusta detenerse a escuchar sus pensamientos.",
    // Imagen en /public/images (null = placeholder)
    image: "/images/me_and_mycat.png" as string | null,
    imageAlt: "Yo con mi gato",
  },

  // La canción se carga desde Supabase (tabla "tracks", la que tenga is_current = true)
  nowPlaying: {
    label: "Música que estoy escuchando en loop",
  },

  socials: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/mbcorvalan/", short: "in" }],
} as const;

/**
 * Configuración editable del sitio: textos e imagen del hero.
 * Los posts y la música se cargan desde Supabase.
 */
export const siteConfig = {
  title: "Ideas en tiempos de TikTok",
  subtitle: "Escrituras, ideas de proyectos y todo lo que no entra en quince segundos.",
  url: "https://example.com",

  hero: {
    heading: "Un blog sobre mis ideas.",
    // Las palabras entre *asteriscos* se muestran en itálica
    body: "Una bitácora personal que intenta escapar del vasto universo del *scrolleo*. Acá no hay likes ni algoritmos. Solo ideas de alguien a quien le gusta detenerse a escuchar sus propios pensamientos.",
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

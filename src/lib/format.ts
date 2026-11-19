const formatter = new Intl.DateTimeFormat("es-AR", { day: "numeric", month: "short", year: "numeric" });

export function formatDate(iso: string | null): string {
  return iso ? formatter.format(new Date(iso)) : "";
}

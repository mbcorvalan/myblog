import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container" style={{ textAlign: "center", paddingBlock: "120px" }}>
      <h1 style={{ fontFamily: "var(--serif)", fontWeight: 400, fontSize: 48, margin: 0 }}>Esta idea no existe (todavía).</h1>
      <p style={{ color: "var(--muted)" }}>
        <Link href="/">Volver al inicio</Link>
      </p>
    </section>
  );
}

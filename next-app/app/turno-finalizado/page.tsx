import Link from "next/link";

//1.- Cerrar el recorrido regresando a la pantalla de inicio cuando se presiona el botón principal.
export default function TurnoFinalizadoPage() {
  return (
    <main className="wrap page-turno-finalizado">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <span className="brand-badge__label" aria-hidden="true">
              RT
            </span>
            <span className="sr-only">Logo de Red TOSUR</span>
          </div>
        </div>
      </div>
      <div className="brand">RED TOSUR</div>
      <div className="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M9.5 16.5 5.8 12.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
        </svg>
      </div>
      <div className="h1">Turno finalizado</div>
      <p className="lead">Gracias por su compromiso y responsabilidad. Buen descanso.</p>
      <Link className="btn" href="/">
        Cerrar sesión
      </Link>

      <div className="footer" aria-hidden="true">
        <svg className="van" viewBox="0 0 620 180" fill="none">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stopColor="#f4d26a" />
              <stop offset="1" stopColor="#c89617" />
            </linearGradient>
          </defs>
          <rect x="20" y="130" width="200" height="14" rx="7" fill="url(#g)" opacity=".6" />
          <ellipse cx="420" cy="152" rx="210" ry="10" fill="#eddcab" />
          <rect x="300" y="90" width="270" height="60" rx="12" fill="url(#g)" />
          <rect x="300" y="100" width="220" height="28" rx="6" fill="#1f2937" opacity=".8" />
          <circle cx="360" cy="150" r="16" fill="#1f2937" />
          <circle cx="360" cy="150" r="9" fill="#f1c84a" />
          <circle cx="520" cy="150" r="16" fill="#1f2937" />
          <circle cx="520" cy="150" r="9" fill="#f1c84a" />
        </svg>
      </div>
    </main>
  );
}

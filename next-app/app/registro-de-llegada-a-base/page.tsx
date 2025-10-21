import Link from "next/link";

//1.- Mostrar la tarjeta de registro manteniendo los accesos a mapa y formulario manual.
export default function RegistroDeLlegadaABasePage() {
  return (
    <main className="wrap page-registro-base" role="main">
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

      <h1>RED TOSUR</h1>

      <p className="title">
        Registro de llegada
        <br />a base
      </p>
      <p className="lead">Escanee el código QR asignado por la central para confirmar su ingreso y disponibilidad.</p>

      <svg className="qr" viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
        <rect x="6" y="6" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="40" y="6" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="6" y="40" width="18" height="18" rx="2" fill="none" stroke="currentColor" strokeWidth="4" />
        <rect x="26" y="30" width="12" height="4" rx="1" />
        <rect x="30" y="38" width="16" height="4" rx="1" />
        <rect x="30" y="46" width="8" height="4" rx="1" />
        <rect x="40" y="46" width="4" height="12" rx="1" />
        <rect x="48" y="46" width="10" height="4" rx="1" />
      </svg>

      <Link className="btn" href="/registro-de-llegada-a-base-mapa">
        Escanear código QR
      </Link>
      <Link className="link" href="/registro-de-llegada-manual">
        Registrar manualmente
      </Link>

      <div className="place">Minatitlán</div>

      <svg className="locator" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 22c3.5-4.8 7-8.8 7-12.2A7 7 0 1 0 5 9.8C5 13.2 8.5 17.2 12 22Zm0-10.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
      </svg>
    </main>
  );
}

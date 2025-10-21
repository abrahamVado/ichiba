import Link from "next/link";

//1.- Recrear la pantalla de autenticación permitiendo avanzar al siguiente paso.
export default function LoginOscuroPage() {
  return (
    <main className="wrap page-login-oscuro">
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

      <div className="label">Introduce tu número de móvil</div>
      <div className="input-wrap">
        <div className="flag">
          <span role="img" aria-label="Bandera de México">
            🇲🇽
          </span>
        </div>
        <input className="input" type="tel" value="+52 222 123 4567" readOnly aria-label="Teléfono" />
        <div className="icon" aria-hidden="true">
          👤➔
        </div>
      </div>

      {/* //2.- Utilizar enlaces para simular el flujo sin lógica de formularios reales. */}
      <Link className="btn primary" href="/terminos-y-condiciones">
        Continuar
      </Link>

      <div className="sep">•</div>

      <div className="alt">
        <Link className="btn" href="/terminos-y-condiciones">
          G&nbsp;&nbsp;Continuar con Google
        </Link>
        <Link className="btn" href="/terminos-y-condiciones">
          &nbsp;&nbsp;Continuar con Apple
        </Link>
        <Link className="btn" href="/terminos-y-condiciones">
          ✉️&nbsp;&nbsp;Continuar con el email
        </Link>
      </div>

      <p className="notice">Al continuar, aceptas recibir llamadas o mensajes para verificación.</p>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Reproducir la estructura original de la pantalla de acceso oscuro.
export default function LoginOscuroPage() {
  useBodyClass("page-login-oscuro");
  const router = useRouter();

  //2.- Encaminar todas las acciones de autenticación hacia el siguiente paso del flujo.
  const goToTerms = () => {
    router.push("/terminos-y-condiciones");
  };

  return (
    <main className="wrap">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="label">Introduce tu número de móvil</div>
      <div className="input-wrap">
        <div className="flag">
          <span role="img" aria-label="Bandera de México">
            🇲🇽
          </span>
        </div>
        <input className="input" type="tel" defaultValue="+52 222 123 4567" aria-label="Teléfono" />
        <div className="icon" aria-hidden="true">
          👤➔
        </div>
      </div>

      <button className="btn primary" type="button" onClick={goToTerms}>
        Continuar
      </button>

      <div className="sep">•</div>

      <div className="alt">
        <button className="btn" type="button" onClick={goToTerms}>
          G&nbsp;&nbsp;Continuar con Google
        </button>
        <button className="btn" type="button" onClick={goToTerms}>
          &nbsp;&nbsp;Continuar con Apple
        </button>
        <button className="btn" type="button" onClick={goToTerms}>
          ✉️&nbsp;&nbsp;Continuar con el email
        </button>
      </div>

      <p className="notice">Al continuar, aceptas recibir llamadas o mensajes para verificación.</p>
    </main>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Restaurar la pantalla de registro con QR incluyendo sus acciones originales.
export default function RegistroBasePage() {
  useBodyClass("page-registro-base");
  const router = useRouter();

  //2.- Simular el escaneo del código QR navegando a la vista con mapa.
  const goToMap = () => {
    router.push("/registro-de-llegada-a-base-mapa");
  };

  //3.- Redirigir al formulario manual cuando el usuario prefiera esa opción.
  const goToManual = () => {
    router.push("/registro-de-llegada-manual");
  };

  return (
    <main className="wrap" role="main">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
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

      <button className="btn" type="button" onClick={goToMap}>
        Escanear código QR
      </button>
      <button className="link" type="button" onClick={goToManual}>
        Registrar manualmente
      </button>

      <div className="place">Minatitlán</div>

      <svg className="locator" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 22c3.5-4.8 7-8.8 7-12.2A7 7 0 1 0 5 9.8C5 13.2 8.5 17.2 12 22Zm0-10.2a2.8 2.8 0 1 1 0-5.6 2.8 2.8 0 0 1 0 5.6Z" />
      </svg>
    </main>
  );
}

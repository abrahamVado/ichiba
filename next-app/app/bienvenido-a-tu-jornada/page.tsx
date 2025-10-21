"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Recrear el formulario de inicio de jornada preservando estilos y contenido.
export default function BienvenidoPage() {
  useBodyClass("page-bienvenido");
  const router = useRouter();

  //2.- Anclar el envío del formulario hacia la verificación vehicular.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/verificacion-del-vehiculo");
  };

  //3.- Igualar el botón de escaneo QR con el mismo destino del formulario.
  const handleScan = () => {
    router.push("/verificacion-del-vehiculo");
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

      <p className="title">
        Bienvenido a tu jornada
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="text" placeholder="Usuario o ID de empleado" aria-label="Usuario o ID de empleado" />
        <input
          className="input"
          type="password"
          inputMode="numeric"
          placeholder="PIN de acceso"
          aria-label="PIN de acceso"
        />
        <button className="btn primary" type="submit">
          Iniciar turno
        </button>
        <button className="btn ghost" type="button" onClick={handleScan}>
          Escanear código QR de base
        </button>
      </form>

      <p className="fine">Versión conductores — Control Operativo</p>

      <svg className="skyline" viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <path d="M10 62c36-16 144-16 180 0" />
        <rect x="40" y="28" width="18" height="22" fill="none" />
        <rect x="66" y="18" width="20" height="32" fill="none" />
        <rect x="92" y="8" width="22" height="42" fill="none" />
        <rect x="120" y="22" width="18" height="28" fill="none" />
        <rect x="144" y="30" width="16" height="20" fill="none" />
      </svg>
    </main>
  );
}

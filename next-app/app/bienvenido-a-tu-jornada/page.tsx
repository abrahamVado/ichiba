"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";

//1.- Permitir que el formulario simulado conduzca a la verificación vehicular.
export default function BienvenidoATuJornadaPage() {
  const router = useRouter();

  //2.- Interceptar el envío del formulario evitando validaciones reales.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/verificacion-del-vehiculo");
  };

  //3.- Reutilizar el mismo destino para el botón de escaneo QR dentro del demo.
  const handleScan = () => {
    router.push("/verificacion-del-vehiculo");
  };

  return (
    <main className="wrap page-bienvenido" role="main">
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
        Bienvenido a tu jornada
        <br />
        Red TOSUR
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="text" placeholder="Usuario o ID de empleado" aria-label="Usuario o ID de empleado" />
        <input className="input" type="password" inputMode="numeric" placeholder="PIN de acceso" aria-label="PIN de acceso" />
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

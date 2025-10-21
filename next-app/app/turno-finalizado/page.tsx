"use client";

import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Recrear la pantalla de despedida con su llamada final a la acción.
export default function TurnoFinalizadoPage() {
  useBodyClass("page-turno-finalizado");
  const router = useRouter();

  //2.- Regresar al inicio del flujo cuando se cierra la sesión.
  const handleLogout = () => {
    router.push("/");
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
      <div className="badge" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M9.5 16.5 5.8 12.8l1.4-1.4 2.3 2.3 6.3-6.3 1.4 1.4-7.7 7.7Z" />
        </svg>
      </div>
      <div className="h1">Turno finalizado</div>
      <p className="lead">Gracias por su compromiso y responsabilidad. Buen descanso.</p>
      <button className="btn" type="button" onClick={handleLogout}>
        Cerrar sesión
      </button>

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

"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Reutilizar la pantalla de login del pasajero con navegación equivalente.
export default function PasajeroLoginPage() {
  useBodyClass("page-pasajero-login");
  const router = useRouter();

  //2.- Continuar hacia la solicitud independientemente de la acción tomada.
  const goToRequest = () => {
    router.push("/reserva-de-taxi-pasajero/solicitud");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    goToRequest();
  };

  return (
    <main className="card" role="main">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
          </div>
        </div>
      </div>
      <div className="brand">
        <h1>Pasajero</h1>
      </div>
      <p className="lead">Ingresa para solicitar un taxi y seguir tu viaje en tiempo real.</p>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" />
        <input className="input" type="password" placeholder="Contraseña" aria-label="Contraseña" />
        <div className="actions">
          <button className="btn primary" type="submit">
            Continuar
          </button>
          <button className="btn ghost" type="button" onClick={goToRequest}>
            Crear cuenta
          </button>
        </div>
      </form>
      <div className="secure">
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a5 5 0 0 0-5 5v2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5Zm-3 7V7a3 3 0 0 1 6 0v2Z" />
        </svg>
        <span>Tu información se mantiene privada y segura.</span>
      </div>
    </main>
  );
}

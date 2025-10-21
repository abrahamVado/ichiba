"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

//1.- Administrar el acceso de pasajeras antes de pasar al formulario de solicitud.
export default function PasajeroLoginPage() {
  const router = useRouter();

  //2.- Interceptar el formulario para evitar lógica de autenticación real.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/reserva-de-taxi-pasajero/solicitud");
  };

  return (
    <main className="card page-pasajero-login" role="main">
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
      <div className="brand">
        <h1>Red TOSUR Pasajero</h1>
      </div>
      <p className="lead">Ingresa para solicitar un taxi y seguir tu viaje en tiempo real.</p>
      <form className="form" onSubmit={handleSubmit}>
        <input className="input" type="email" placeholder="Correo electrónico" aria-label="Correo electrónico" />
        <input className="input" type="password" placeholder="Contraseña" aria-label="Contraseña" />
        <div className="actions">
          <button className="btn primary" type="submit">
            Continuar
          </button>
          <Link className="btn ghost" href="/reserva-de-taxi-pasajero/solicitud">
            Crear cuenta
          </Link>
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

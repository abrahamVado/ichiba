"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Reimplementar el formulario manual respetando campos y comportamiento.
export default function RegistroManualPage() {
  useBodyClass("page-bienvenido");
  const router = useRouter();

  //2.- Volver a la pantalla de QR cuando se elige guardar sin continuar.
  const handleSave = () => {
    router.push("/registro-de-llegada-a-base");
  };

  //3.- Dirigir el envío del formulario hacia la vista del mapa.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/registro-de-llegada-a-base-mapa");
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
        Registro manual
        <br />de llegada a base
      </p>

      <form className="form" noValidate onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="base">
          Base
        </label>
        <input id="base" className="input" type="text" name="base" placeholder="Base" required aria-required="true" />

        <label className="sr-only" htmlFor="arrival-time">
          Hora de llegada
        </label>
        <input
          id="arrival-time"
          className="input"
          type="time"
          name="arrival-time"
          placeholder="Hora de llegada"
          required
          aria-required="true"
        />

        <label className="sr-only" htmlFor="comments">
          Comentarios
        </label>
        <textarea id="comments" className="input textarea" name="comments" rows={3} placeholder="Comentarios opcionales" />

        <div className="actions">
          <button className="btn ghost" type="button" onClick={handleSave}>
            Guardar
          </button>
          <button className="btn primary" type="submit">
            Continuar
          </button>
        </div>
      </form>

      <p className="fine">Captura manual disponible en caso de falla del escáner.</p>

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

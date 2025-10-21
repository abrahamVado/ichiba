"use client";

import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Conservar el formulario de rechazo con su navegación original.
export default function RechazoPage() {
  useBodyClass("page-rechazo");
  const router = useRouter();

  //2.- Regresar al mapa si el conductor decide cancelar el rechazo.
  const handleBack = () => {
    router.push("/registro-de-llegada-a-base-mapa");
  };

  //3.- Continuar el flujo hacia el regreso a base tras confirmar el rechazo.
  const handleConfirm = () => {
    router.push("/regreso-a-base-asignada");
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

      <section className="card" aria-labelledby="rechazo-title">
        <header className="head">
          <div className="icon" aria-hidden="true">
            ⚠️
          </div>
          <div>
            <h1 id="rechazo-title" className="title">
              Confirmar rechazo del viaje
            </h1>
            <p className="lead">Seleccione el motivo y agregue un comentario breve para notificar a la central.</p>
          </div>
        </header>

        <fieldset className="reasons" aria-labelledby="rechazo-title">
          <legend className="sr-only">Motivos de rechazo</legend>
          <label className="reason">
            <input type="checkbox" />
            <span>Fuera de cobertura</span>
          </label>
          <label className="reason">
            <input type="checkbox" />
            <span>Pasajero no localizado</span>
          </label>
          <label className="reason">
            <input type="checkbox" />
            <span>Condiciones inseguras</span>
          </label>
          <label className="reason">
            <input type="checkbox" />
            <span>Otro motivo</span>
          </label>
        </fieldset>

        <div className="field">
          <label htmlFor="note">Justificación breve</label>
          <textarea id="note" placeholder="Describa lo sucedido…"></textarea>
        </div>

        <div className="actions">
          <button className="btn ghost" type="button" onClick={handleBack}>
            Volver al mapa
          </button>
          <button className="btn primary" type="button" onClick={handleConfirm}>
            Confirmar rechazo
          </button>
        </div>
      </section>
    </main>
  );
}

"use client";

import { FormEvent, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../../lib/useBodyClass";

//1.- Construir el formulario de solicitud replicando la interacción original.
export default function SolicitudPage() {
  useBodyClass("page-pasajero-solicitud");
  const router = useRouter();
  const timeRef = useRef<HTMLInputElement | null>(null);

  //2.- Prellenar el campo de horario con una sugerencia si está vacío.
  useEffect(() => {
    const input = timeRef.current;
    if (input && !input.value) {
      const now = new Date();
      now.setMinutes(now.getMinutes() + 10);
      input.value = now.toISOString().slice(0, 16);
    }
  }, []);

  //3.- Enviar la solicitud hacia la pantalla de asignación del conductor.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/reserva-de-taxi-pasajero/asignado");
  };

  //4.- Permitir cambiar de cuenta regresando al paso anterior.
  const handleChangeAccount = () => {
    router.push("/reserva-de-taxi-pasajero");
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

      <header>
        <div>
          <h1 className="title">Reserva tu taxi</h1>
          <p className="subtitle">Ingresa origen, destino y horario de recogida.</p>
        </div>
        <div className="steps" aria-hidden="true">
          <span data-active="1"></span>
          <span></span>
          <span></span>
        </div>
      </header>

      <form className="request" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="pickup">Lugar de recogida</label>
          <input className="input" id="pickup" type="text" placeholder="Ej. Av. Reforma 120, Puebla" required />
        </div>
        <div>
          <label htmlFor="destination">Destino</label>
          <input className="input" id="destination" type="text" placeholder="Ej. Aeropuerto Internacional" required />
        </div>
        <div className="row">
          <div>
            <label htmlFor="time">Hora de recogida</label>
            <input className="input" id="time" type="datetime-local" required ref={timeRef} />
          </div>
          <div>
            <label htmlFor="riders">Pasajeros</label>
            <select id="riders" required>
              <option value="1">1 pasajero</option>
              <option value="2">2 pasajeros</option>
              <option value="3">3 pasajeros</option>
              <option value="4">4 pasajeros</option>
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="notes">Notas para el conductor</label>
          <textarea id="notes" placeholder="Añade referencias para el punto de encuentro"></textarea>
        </div>
        <div className="row">
          <button className="back-link" type="button" onClick={handleChangeAccount}>
            ← Cambiar cuenta
          </button>
          <button className="btn" type="submit">
            Confirmar solicitud
          </button>
        </div>
      </form>
    </main>
  );
}

"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

//1.- Capturar los datos básicos de la reserva antes de avanzar al estado asignado.
export default function SolicitudPasajeraPage() {
  const router = useRouter();
  const [scheduled, setScheduled] = useState("");

  //2.- Establecer una hora sugerida diez minutos adelante cuando la vista carga.
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 10);
    setScheduled(now.toISOString().slice(0, 16));
  }, []);

  //3.- Simular el envío de la solicitud y continuar al detalle del conductor asignado.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/reserva-de-taxi-pasajero/asignado");
  };

  return (
    <main className="wrap page-pasajero-solicitud" role="main">
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
            <input className="input" id="time" type="datetime-local" required value={scheduled} onChange={(event) => setScheduled(event.target.value)} />
          </div>
          <div>
            <label htmlFor="riders">Pasajeros</label>
            <select id="riders" defaultValue="1" required>
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
          <Link className="back-link" href="/reserva-de-taxi-pasajero">
            ← Cambiar cuenta
          </Link>
          <button className="btn" type="submit">
            Confirmar solicitud
          </button>
        </div>
      </form>
    </main>
  );
}

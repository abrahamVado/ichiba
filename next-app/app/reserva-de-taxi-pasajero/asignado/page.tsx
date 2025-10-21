"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

//1.- Mostrar la tarjeta de conductor asignado calculando una hora estimada de llegada.
export default function AsignadoPasajeraPage() {
  const [eta, setEta] = useState("a las 00:00 hrs");

  //2.- Actualizar la hora aproximada ocho minutos después del tiempo actual.
  useEffect(() => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 8);
    const formatter = new Intl.DateTimeFormat("es-MX", {
      hour: "2-digit",
      minute: "2-digit"
    });
    setEta(`a las ${formatter.format(now)} hrs`);
  }, []);

  //3.- Simular el envío de un mensaje directo mediante una alerta temporal.
  const handleMessage = () => {
    window.alert("Tu mensaje fue enviado a Laura. Te responderá en un momento.");
  };

  return (
    <main className="wrap page-pasajero-asignado" role="main">
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
        <div className="badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Reloj">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm.75 5a.75.75 0 0 0-1.5 0v4.25c0 .2.08.39.22.53l2.75 2.75a.75.75 0 0 0 1.06-1.06L12.75 10.7Z" />
          </svg>
        </div>
        <div>
          <h1 className="title">Conductor asignado</h1>
          <div className="time">
            Recogida programada <span>{eta}</span>
          </div>
        </div>
      </header>

      <section className="card">
        <div className="driver">
          <div className="avatar" aria-hidden="true"></div>
          <div>
            <div className="name">Laura Martínez</div>
            <div className="rating" aria-label="Calificación del conductor">
              <span>⭐️⭐️⭐️⭐️⭐️</span>
              <span>4.9</span>
              <span>(1,240 viajes)</span>
            </div>
            <p className="note">Número de contacto: +52 222 678 9012</p>
          </div>
        </div>
        <div className="vehicle">
          <div className="vehicle-photo" role="presentation" aria-hidden="true" />
          <div className="info">
            <strong>Toyota Prius Azul — 2023</strong>
            <span>Placas: TOS-4821</span>
            <span>Verificación vigente y aire acondicionado disponible.</span>
          </div>
        </div>
        <p className="note">
          Laura llegará al punto indicado y esperará 5 minutos. Ten tu equipaje listo y confirma tu identidad al abordar.
        </p>
        <div className="actions">
          <Link className="btn primary" href="/reserva-de-taxi-pasajero/calificacion">
            Ya estoy a bordo
          </Link>
          <button className="btn ghost" type="button" onClick={handleMessage}>
            Enviar mensaje
          </button>
        </div>
      </section>
    </main>
  );
}

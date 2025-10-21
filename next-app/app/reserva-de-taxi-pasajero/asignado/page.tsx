"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../../lib/useBodyClass";

//1.- Representar la asignación del conductor con información dinámica.
export default function AsignadoPage() {
  useBodyClass("page-pasajero-asignado");
  const router = useRouter();
  const timeRef = useRef<HTMLSpanElement | null>(null);

  //2.- Calcular una hora estimada de recogida al cargar la pantalla.
  useEffect(() => {
    const span = timeRef.current;
    if (span) {
      const eta = new Date();
      eta.setMinutes(eta.getMinutes() + 8);
      const formatter = new Intl.DateTimeFormat("es-MX", {
        hour: "2-digit",
        minute: "2-digit"
      });
      span.textContent = `a las ${formatter.format(eta)} hrs`;
    }
  }, []);

  //3.- Avanzar al seguimiento del viaje una vez que la pasajera abordó.
  const handleOnboard = () => {
    router.push("/reserva-de-taxi-pasajero/seguimiento");
  };

  //4.- Simular el envío de mensajes al conductor dentro del demo.
  const handleMessage = () => {
    window.alert("Tu mensaje fue enviado a Laura. Te responderá en un momento.");
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
        <div className="badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Reloj">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm.75 5a.75.75 0 0 0-1.5 0v4.25c0 .2.08.39.22.53l2.75 2.75a.75.75 0 0 0 1.06-1.06L12.75 10.7Z" />
          </svg>
        </div>
        <div>
          <h1 className="title">Conductor asignado</h1>
          <div className="time">
            Recogida programada <span ref={timeRef}></span>
          </div>
          <p className="steps" role="status">
            Paso 2 de 4 · Seguiremos tu viaje en tiempo real.
          </p>
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
          <img
            className="vehicle-photo"
            src="/assets/images/vehicles/5.jpeg"
            alt="Vehículo Toyota Prius Azul 2023 de Red TOSUR"
            loading="lazy"
          />
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
          <button className="btn primary" type="button" onClick={handleOnboard}>
            Ver seguimiento del viaje
          </button>
          <button className="btn ghost" type="button" onClick={handleMessage}>
            Enviar mensaje
          </button>
        </div>
      </section>
    </main>
  );
}

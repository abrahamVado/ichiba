"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../../lib/useBodyClass";

//1.- Mostrar el avance del viaje con un mapa de referencia y una línea de tiempo de checkpoints.
export default function SeguimientoPage() {
  useBodyClass("page-pasajero-seguimiento");
  const router = useRouter();

  //2.- Definir los puntos del recorrido que se mostrarán como progreso visual para la pasajera.
  const checkpoints = useMemo(
    () => [
      {
        id: "pickup",
        title: "En camino a recogerte",
        description: "Laura salió hace 2 minutos y se encuentra a 1.5 km.",
        status: "done"
      },
      {
        id: "approaching",
        title: "Llegando al punto de encuentro",
        description: "Tiempo estimado de llegada: 4 minutos.",
        status: "current"
      },
      {
        id: "trip",
        title: "Traslado en curso",
        description: "El trayecto al destino tomará 18 minutos adicionales.",
        status: "pending"
      },
      {
        id: "arrival",
        title: "Llegada al destino",
        description: "Confirma cuando hayas llegado para finalizar.",
        status: "pending"
      }
    ],
    []
  );

  //3.- Enviar a la pantalla de calificación al confirmar que la pasajera llegó a su destino.
  const handleArrived = () => {
    router.push("/reserva-de-taxi-pasajero/calificacion?from=seguimiento");
  };

  //4.- Proveer accesos rápidos de contacto con el conductor y soporte del servicio.
  const handleContactDriver = () => {
    window.alert("Llamando a Laura Martínez…");
  };

  const handleContactSupport = () => {
    window.alert("Nuestro equipo de soporte se pondrá en contacto contigo en breve.");
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
          <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Seguimiento">
            <path d="M12 2a7 7 0 0 0-7 7c0 4.23 4.9 10.18 6.56 12.06a.56.56 0 0 0 .88 0C14.1 19.18 19 13.23 19 9a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 2.5-2.5A2.5 2.5 0 0 1 12 11.5Z" />
          </svg>
        </div>
        <div>
          <h1 className="title">Seguimiento en tiempo real</h1>
          <p className="time" role="status">
            Paso 3 de 4 · Llegada estimada en 18 minutos.
          </p>
        </div>
      </header>

      <section className="card tracking">
        <div className="map" role="img" aria-label="Mapa con el recorrido del viaje">
          <img
            src="https://images.unsplash.com/photo-1502904550040-7534597429ae?q=80&w=1200&auto=format&fit=crop"
            alt="Ruta estimada del conductor sobre mapa de la ciudad"
            loading="lazy"
          />
        </div>
        <div className="timeline" aria-live="polite">
          <ol>
            {checkpoints.map((checkpoint) => (
              <li key={checkpoint.id} data-status={checkpoint.status}>
                <div className="status" aria-hidden="true"></div>
                <div>
                  <strong>{checkpoint.title}</strong>
                  <p>{checkpoint.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="actions">
          <button className="btn primary" type="button" onClick={handleArrived}>
            Llegué al destino
          </button>
          <div className="contact-actions">
            <button className="btn ghost" type="button" onClick={handleContactDriver}>
              Contactar a la conductora
            </button>
            <button className="btn ghost" type="button" onClick={handleContactSupport}>
              Contactar soporte
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

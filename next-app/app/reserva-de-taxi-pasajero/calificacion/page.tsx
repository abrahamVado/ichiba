"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useBodyClass } from "../../../lib/useBodyClass";

//1.- Permitir calificar el viaje replicando la experiencia interactiva original.
export default function CalificacionPage() {
  useBodyClass("page-pasajero-calificacion");
  const router = useRouter();
  const searchParams = useSearchParams();
  const commentRef = useRef<HTMLTextAreaElement | null>(null);
  const [rating, setRating] = useState(0);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  //2.- Detectar si la pantalla proviene del seguimiento para ajustar la navegación automática.
  const fromTracking = searchParams.get("from") === "seguimiento";

  //3.- Después de mostrar la confirmación, regresar al inicio del flujo únicamente si corresponde.
  useEffect(() => {
    if (!confirmation) {
      return;
    }
    if (!fromTracking) {
      return;
    }
    const timeout = window.setTimeout(() => {
      router.push("/reserva-de-taxi-pasajero");
    }, 2200);
    return () => window.clearTimeout(timeout);
  }, [confirmation, fromTracking, router]);

  //4.- Registrar la calificación seleccionada para reflejarla visualmente.
  const handleSelectRating = (value: number) => {
    setRating(value);
  };

  //5.- Validar y confirmar la evaluación enviada por la pasajera.
  const handleSubmit = () => {
    if (rating === 0) {
      window.alert("Selecciona una calificación para continuar.");
      return;
    }
    const comment = commentRef.current?.value?.trim();
    const baseMessage = `¡Gracias! Registramos ${rating} estrellas`;
    setConfirmation(comment ? `${baseMessage} y tu comentario.` : `${baseMessage}.`);
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
          <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Estrella">
            <path d="m12 2.3 2.3 5 5.4.5a1 1 0 0 1 .56 1.75l-4 3.6 1.2 5.3a1 1 0 0 1-1.45 1.1L12 17.8l-4.01 2.75a1 1 0 0 1-1.45-1.1l1.2-5.3-4-3.6A1 1 0 0 1 4.3 7.8l5.4-.5Z" />
          </svg>
        </div>
        <h1 className="title">Evalúa tu experiencia</h1>
      </header>

      <section className="card">
        <div className="driver">
          <img
            src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=256&auto=format&fit=crop"
            alt="Conductor Laura Martínez"
          />
          <div className="driver-info">
            <strong>Laura Martínez</strong>
            <span>Toyota Prius Azul · Placas TOS-4821</span>
          </div>
        </div>
        <div>
          <p>
            Tu viaje ha finalizado. ¿Cómo calificarías el servicio recibido?
          </p>
          <div className="stars" role="radiogroup" aria-label="Calificación del viaje">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className="star"
                type="button"
                data-active={value <= rating ? "1" : "0"}
                aria-label={`${value} estrellas`}
                onClick={() => handleSelectRating(value)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comparte un comentario opcional</label>
          <textarea id="comment" placeholder="Cuéntanos cómo fue el viaje" ref={commentRef}></textarea>
        </div>
        <button className="btn" type="button" onClick={handleSubmit}>
          Enviar evaluación
        </button>
        <div className="confirmation" role="status" style={{ display: confirmation ? "block" : "none" }}>
          {confirmation || ""}
        </div>
      </section>
    </main>
  );
}

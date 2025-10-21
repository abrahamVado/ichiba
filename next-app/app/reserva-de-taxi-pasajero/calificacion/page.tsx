"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//1.- Recopilar la calificación final del viaje y agradecer la retroalimentación.
export default function CalificacionPasajeraPage() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [confirmation, setConfirmation] = useState<string | null>(null);

  //2.- Registrar la selección de estrellas resaltando la opción activa.
  const handleSelect = (value: number) => {
    setRating(value);
  };

  //3.- Validar y cerrar el flujo mostrando un mensaje antes de regresar al inicio.
  const handleSubmit = () => {
    if (rating === 0) {
      window.alert("Selecciona una calificación para continuar.");
      return;
    }
    const message = `¡Gracias! Registramos ${rating} estrellas${comment ? " y tu comentario." : "."}`;
    setConfirmation(message);
    setTimeout(() => {
      router.push("/reserva-de-taxi-pasajero");
    }, 2200);
  };

  return (
    <main className="wrap page-pasajero-calificacion" role="main">
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
          <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Estrella">
            <path d="m12 2.3 2.3 5 5.4.5a1 1 0 0 1 .56 1.75l-4 3.6 1.2 5.3a1 1 0 0 1-1.45 1.1L12 17.8l-4.01 2.75a1 1 0 0 1-1.45-1.1l1.2-5.3-4-3.6A1 1 0 0 1 4.3 7.8l5.4-.5Z" />
          </svg>
        </div>
        <h1 className="title">Evalúa tu experiencia</h1>
      </header>

      <section className="card">
        <div className="driver">
          <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=256&auto=format&fit=crop" alt="Conductor Laura Martínez" />
          <div className="driver-info">
            <strong>Laura Martínez</strong>
            <span>Toyota Prius Azul · Placas TOS-4821</span>
          </div>
        </div>
        <div>
          <p>¿Cómo calificarías el servicio recibido?</p>
          <div className="stars" role="radiogroup" aria-label="Calificación del viaje">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className="star"
                type="button"
                data-active={value <= rating ? "1" : "0"}
                aria-label={`${value} ${value === 1 ? "estrella" : "estrellas"}`}
                onClick={() => handleSelect(value)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment">Comparte un comentario opcional</label>
          <textarea
            id="comment"
            placeholder="Cuéntanos cómo fue el viaje"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          ></textarea>
        </div>
        <button className="btn" type="button" onClick={handleSubmit}>
          Enviar evaluación
        </button>
        {confirmation ? (
          <div className="confirmation" role="status">
            {confirmation}
          </div>
        ) : (
          <div className="confirmation" role="status" style={{ display: "none" }}>
            ¡Gracias! Tu opinión nos ayuda a mejorar el servicio.
          </div>
        )}
      </section>
    </main>
  );
}

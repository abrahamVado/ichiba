"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

//1.- Controlar la aceptación de términos para condicionar la navegación.
export default function TerminosYCondicionesPage() {
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  //2.- Intercambiar el estado de la casilla simulando el prototipo original.
  const toggleAcceptance = () => {
    setAccepted((value) => !value);
  };

  //3.- Validar la aceptación antes de avanzar al resumen de bienvenida.
  const handleNext = () => {
    if (!accepted) {
      window.alert("Por favor acepta los términos para continuar.");
      return;
    }
    router.push("/bienvenido-a-tu-jornada");
  };

  return (
    <main className="wrap page-terminos">
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

      <div className="h1">Consulta el aviso de privacidad y acepta los términos de RED TOSUR</div>
      <p className="p">
        Al seleccionar &quot;Acepto&quot;, afirmo que he revisado y acepto los Términos de uso y el Aviso de privacidad. Tengo al menos 18 años.
      </p>

      <div className="hr" aria-hidden="true"></div>

      <div className="controls">
        <div className="chk">
          <span>Aceptar</span>
        </div>
        <button
          type="button"
          className="box"
          data-on={accepted ? "1" : "0"}
          role="checkbox"
          aria-checked={accepted}
          aria-label="Aceptar"
          onClick={toggleAcceptance}
        >
          {accepted ? "✓" : null}
        </button>
      </div>

      <div className="nav">
        <button className="back" type="button" aria-label="Atrás" onClick={() => router.push("/login-oscuro")}> 
          ←
        </button>
        <button className="next" type="button" aria-label="Siguiente" onClick={handleNext}>
          Siguiente →
        </button>
      </div>
    </main>
  );
}

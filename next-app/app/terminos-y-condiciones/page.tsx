"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Replicar la vista de términos respetando las interacciones originales.
export default function TerminosPage() {
  useBodyClass("page-terminos");
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  //2.- Alternar el estado visual y accesible de la casilla de aceptación.
  const toggleAcceptance = () => {
    setAccepted((value) => !value);
  };

  //3.- Navegar al paso anterior respetando el flujo original.
  const goBack = () => {
    router.push("/login-oscuro");
  };

  //4.- Validar la aceptación antes de continuar al mensaje de bienvenida.
  const goNext = () => {
    if (!accepted) {
      window.alert("Por favor acepta los términos para continuar.");
      return;
    }
    router.push("/bienvenido-a-tu-jornada");
  };

  return (
    <main className="wrap">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="h1">Consulta el aviso de privacidad y acepta los términos de RED TOSUR</div>
      <p className="p">
        Al seleccionar &quot;Acepto&quot;, afirmo que he revisado y acepto los Términos de uso y el Aviso de privacidad. Tengo al menos 18
        años.
      </p>

      <div className="hr"></div>

      <div className="controls">
        <div className="chk">
          <span>Aceptar</span>
        </div>
        <div
          className="box"
          data-on={accepted ? "1" : "0"}
          onClick={toggleAcceptance}
          role="checkbox"
          aria-checked={accepted ? "true" : "false"}
          aria-label="Aceptar"
        ></div>
      </div>

      <div className="nav">
        <button className="back" type="button" aria-label="Atrás" onClick={goBack}>
          ←
        </button>
        <button className="next" type="button" aria-label="Siguiente" onClick={goNext}>
          Siguiente →
        </button>
      </div>
    </main>
  );
}

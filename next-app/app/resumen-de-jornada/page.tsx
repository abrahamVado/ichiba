"use client";

import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Recuperar la pantalla de resumen conservando datos y navegación.
export default function ResumenPage() {
  useBodyClass("page-resumen");
  const router = useRouter();

  //2.- Avanzar al mensaje final cuando se cierra el turno.
  const handleCloseShift = () => {
    router.push("/turno-finalizado");
  };

  //3.- Permitir revisar el historial de jornadas desde el mismo flujo.
  const handleHistory = () => {
    router.push("/historial-de-jornadas");
  };

  return (
    <main className="wrap" role="main">
      <header aria-label="Marca" className="brand-header">
        <div className="brand-anchor" aria-hidden="true">
          <div className="pin brand-pin">
            <div className="badge brand-badge">
              <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="brand" aria-hidden="true">
          <h1>
            <span style={{ color: "#111" }}>RED</span>
            <span style={{ color: "#111" }}>TOSUR</span>
          </h1>
        </div>
      </header>

      <h2 className="title">Resumen de jornada.</h2>
      <p className="lead">Gracias por su servicio. A continuación se muestra el resumen de su turno.</p>

      <section className="card" aria-labelledby="resumen">
        <div className="row">
          <div className="label">Viajes completados</div>
          <div className="value">7</div>
        </div>

        <div className="row">
          <div className="label">Horas de servicio</div>
          <div className="value hrs">8&nbsp;h&nbsp;15&nbsp;min</div>
        </div>

        <div className="row">
          <div className="label">Kilómetros recorridos</div>
          <div className="value km">94&nbsp;km</div>
        </div>

        <div className="row">
          <div className="label">Pagos en línea</div>
          <div className="value">$&nbsp;420,00&nbsp;MXN</div>
        </div>

        <div className="row">
          <div>
            <div className="label">Efectivo entregado</div>
            <small>en base</small>
          </div>
          <div className="value">$&nbsp;380,00&nbsp;MXN</div>
        </div>

        <div className="row">
          <div className="label">
            Reportes pendientes
            <br />
            <small>0</small>
          </div>
          <div className="donut" aria-label="Gráfico de estado" role="img"></div>
        </div>
      </section>

      <div className="actions">
        <button className="btn primary" type="button" onClick={handleCloseShift}>
          Cerrar turno y salir
        </button>
        <button className="btn ghost" type="button" onClick={handleHistory}>
          Ver historial completo
        </button>
      </div>

      <p className="fine">Demo UI sin datos reales.</p>
    </main>
  );
}

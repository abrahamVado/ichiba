"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Recrear el historial con controles de filtro funcionales como en el HTML original.
export default function HistorialPage() {
  useBodyClass("page-historial");
  const router = useRouter();
  const startRef = useRef<HTMLInputElement | null>(null);
  const endRef = useRef<HTMLInputElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  //2.- Simular la aplicación de filtros avisando que se trata de un demo.
  const handleApply = () => {
    window.alert("Filtros aplicados al historial (demo).");
  };

  //3.- Limpiar los campos para permitir nuevos criterios de búsqueda.
  const handleClear = () => {
    [startRef.current, endRef.current, searchRef.current].forEach((input) => {
      if (input) {
        input.value = "";
      }
    });
  };

  //4.- Volver al resumen de jornada para continuar con el flujo principal.
  const handleBack = () => {
    router.push("/resumen-de-jornada");
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
            <span>RED</span>
            <span>TOSUR</span>
          </h1>
        </div>
      </header>

      <h2 className="title">Historial de jornadas.</h2>
      <p className="lead">Revise jornadas anteriores, filtre por periodo y consulte los totales clave.</p>

      <section className="card filters" aria-labelledby="filtros">
        <div className="row">
          <label className="label" htmlFor="fecha-inicio">
            Fecha de inicio
          </label>
          <input id="fecha-inicio" type="date" className="value" ref={startRef} />
        </div>
        <div className="row">
          <label className="label" htmlFor="fecha-fin">
            Fecha de fin
          </label>
          <input id="fecha-fin" type="date" className="value" ref={endRef} />
        </div>
        <div className="row">
          <label className="label" htmlFor="buscar">
            Buscar por base o nota
          </label>
          <input id="buscar" type="search" placeholder="Ej. Base Central" className="value" ref={searchRef} />
        </div>
        <div className="row actions">
          <button className="btn primary" type="button" onClick={handleApply}>
            Aplicar filtros
          </button>
          <button className="btn ghost" type="button" onClick={handleClear}>
            Limpiar
          </button>
        </div>
      </section>

      <section className="card resumen" aria-labelledby="totales">
        <h3 id="totales">Totales del periodo</h3>
        <div className="row">
          <div className="label">Viajes</div>
          <div className="value">28</div>
        </div>
        <div className="row">
          <div className="label">Horas activas</div>
          <div className="value hrs">32&nbsp;h&nbsp;10&nbsp;min</div>
        </div>
        <div className="row">
          <div className="label">Ingresos</div>
          <div className="value">$&nbsp;1,720.00&nbsp;MXN</div>
        </div>
        <div className="row">
          <div className="label">Reportes pendientes</div>
          <div className="value">1</div>
        </div>
      </section>

      <section className="listado" aria-label="Listado de jornadas pasadas">
        <article className="card jornada" aria-labelledby="jornada-1">
          <header className="row">
            <div>
              <h3 id="jornada-1">Jornada 14 de agosto</h3>
              <small>Base: Central | 6 viajes | 08:00 – 16:00</small>
            </div>
            <div className="value">$&nbsp;320.00&nbsp;MXN</div>
          </header>
          <p>Turno sin incidencias. Se entregó efectivo en tiempo y forma.</p>
        </article>

        <article className="card jornada" aria-labelledby="jornada-2">
          <header className="row">
            <div>
              <h3 id="jornada-2">Jornada 13 de agosto</h3>
              <small>Base: Sur | 7 viajes | 09:00 – 17:15</small>
            </div>
            <div className="value">$&nbsp;410.00&nbsp;MXN</div>
          </header>
          <p>Se registró un reporte por pasajero que olvidó pertenencias. Atención concluida.</p>
        </article>

        <article className="card jornada" aria-labelledby="jornada-3">
          <header className="row">
            <div>
              <h3 id="jornada-3">Jornada 12 de agosto</h3>
              <small>Base: Norte | 5 viajes | 07:30 – 14:45</small>
            </div>
            <div className="value">$&nbsp;280.00&nbsp;MXN</div>
          </header>
          <p>Turno parcial para cubrir horario matutino. Sin reportes adicionales.</p>
        </article>
      </section>

      <div className="actions">
        <button className="btn ghost" type="button" onClick={handleBack}>
          Volver al resumen
        </button>
      </div>

      <p className="fine">Demo UI sin datos reales.</p>
    </main>
  );
}

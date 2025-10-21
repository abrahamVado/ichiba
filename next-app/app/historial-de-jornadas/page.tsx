"use client";

import Link from "next/link";
import { useState } from "react";

//1.- Gestionar filtros ficticios para simular interactividad en el historial.
export default function HistorialDeJornadasPage() {
  const [filters, setFilters] = useState({ inicio: "", fin: "", busqueda: "" });

  //2.- Actualizar el estado local cuando cambian los campos de filtrado.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFilters((current) => ({
      ...current,
      [id === "fecha-inicio" ? "inicio" : id === "fecha-fin" ? "fin" : "busqueda"]: value
    }));
  };

  //3.- Simular la aplicación de filtros mostrando un mensaje.
  const handleApply = () => {
    window.alert("Filtros aplicados al historial (demo).");
  };

  //4.- Reiniciar los campos y permitir volver al resumen del turno.
  const handleClear = () => {
    setFilters({ inicio: "", fin: "", busqueda: "" });
  };

  return (
    <main className="wrap page-historial" role="main">
      <header aria-label="Marca" className="brand-header">
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
          <input id="fecha-inicio" type="date" className="value" value={filters.inicio} onChange={handleChange} />
        </div>
        <div className="row">
          <label className="label" htmlFor="fecha-fin">
            Fecha de fin
          </label>
          <input id="fecha-fin" type="date" className="value" value={filters.fin} onChange={handleChange} />
        </div>
        <div className="row">
          <label className="label" htmlFor="buscar">
            Buscar por base o nota
          </label>
          <input
            id="buscar"
            type="search"
            placeholder="Ej. Base Central"
            className="value"
            value={filters.busqueda}
            onChange={handleChange}
          />
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
        {[ 
          {
            id: "jornada-1",
            title: "Jornada 14 de agosto",
            summary: "Base: Central | 6 viajes | 08:00 – 16:00",
            amount: "$\u00a0320.00\u00a0MXN",
            detail: "Turno sin incidencias. Se entregó efectivo en tiempo y forma."
          },
          {
            id: "jornada-2",
            title: "Jornada 13 de agosto",
            summary: "Base: Sur | 7 viajes | 09:00 – 17:15",
            amount: "$\u00a0410.00\u00a0MXN",
            detail: "Se registró un reporte por pasajero que olvidó pertenencias. Atención concluida."
          },
          {
            id: "jornada-3",
            title: "Jornada 12 de agosto",
            summary: "Base: Norte | 5 viajes | 07:30 – 14:45",
            amount: "$\u00a0280.00\u00a0MXN",
            detail: "Turno parcial para cubrir horario matutino. Sin reportes adicionales."
          }
        ].map((item) => (
          <article className="card jornada" aria-labelledby={item.id} key={item.id}>
            <header className="row">
              <div>
                <h3 id={item.id}>{item.title}</h3>
                <small>{item.summary}</small>
              </div>
              <div className="value" dangerouslySetInnerHTML={{ __html: item.amount }} />
            </header>
            <p>{item.detail}</p>
          </article>
        ))}
      </section>

      <div className="actions">
        <Link className="btn ghost" href="/resumen-de-jornada">
          Volver al resumen
        </Link>
      </div>

      <p className="fine">Demo UI sin datos reales.</p>
    </main>
  );
}

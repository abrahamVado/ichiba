"use client";

import { AdminWorkspace } from "../../../components/AdminWorkspace";

//1.- Representar el tablero de monitoreo con el layout compartido del área administrativa.
export default function AdministradorMonitoreoPage() {
  return (
    <AdminWorkspace
      title="Monitoreo en vivo"
      subtitle="Visualización consolidada de viajes y alertas geolocalizadas."
      bodyClass="page-admin-workspace"
    >
      <section className="admin-monitor" aria-label="Mapa de actividad">
        <div className="admin-monitor__map" role="img" aria-label="Mapa esquemático de la ciudad">
          <svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect width="320" height="220" fill="#0f172a" rx="18" />
            <path d="M24 24h272v172H24z" fill="#111827" stroke="#1f2937" strokeWidth="2" />
            <path d="M48 60l48 32 44-24 60 40 72-52" stroke="#facc15" strokeWidth="3" fill="none" />
            <g fill="#38bdf8">
              <circle cx="96" cy="92" r="6" />
              <circle cx="192" cy="120" r="6" />
              <circle cx="252" cy="96" r="6" />
            </g>
            <g fill="#ef4444">
              <circle cx="148" cy="108" r="6" />
            </g>
          </svg>
        </div>
        <aside className="admin-monitor__legend" aria-label="Alertas destacadas">
          <h2 className="admin-monitor__title">Alertas activas</h2>
          <ul className="admin-monitor__list">
            <li>
              <span className="admin-monitor__badge admin-monitor__badge--critical">Unidad 48</span>
              <p className="admin-monitor__text">Botón de asistencia presionado en Av. Reforma.</p>
            </li>
            <li>
              <span className="admin-monitor__badge">Ruta 23</span>
              <p className="admin-monitor__text">Desvío detectado: 4 cuadras fuera del polígono autorizado.</p>
            </li>
            <li>
              <span className="admin-monitor__badge admin-monitor__badge--info">Zona Sur</span>
              <p className="admin-monitor__text">Conectividad inestable: 6 unidades con ping alto.</p>
            </li>
          </ul>
        </aside>
      </section>

      {/* //2.- Complementar con la tabla de seguimiento minuto a minuto de los viajes críticos. */}
      <section className="admin-table" aria-label="Viajes destacados">
        <header className="admin-table__header">
          <p>Viaje</p>
          <p>Conductora</p>
          <p>ETA</p>
          <p>Estado</p>
        </header>
        <div className="admin-table__row">
          <p>#8421</p>
          <p>Rosa Gutiérrez</p>
          <p>3 min</p>
          <p className="admin-status admin-status--ok">En curso</p>
        </div>
        <div className="admin-table__row">
          <p>#8424</p>
          <p>Ana Pineda</p>
          <p>7 min</p>
          <p className="admin-status admin-status--delay">Retraso</p>
        </div>
        <div className="admin-table__row">
          <p>#8427</p>
          <p>Carla Soto</p>
          <p>--</p>
          <p className="admin-status admin-status--alert">Soporte</p>
        </div>
      </section>
    </AdminWorkspace>
  );
}

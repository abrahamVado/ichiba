"use client";

import { AdminWorkspace } from "../../../components/AdminWorkspace";

//1.- Mostrar el resumen ejecutivo validado con negocio para el arranque del día.
export default function AdministradorPanelPage() {
  return (
    <AdminWorkspace title="Panel general" subtitle="Estado al minuto de la operación metropolitana.">
      <section className="admin-grid" aria-label="Indicadores principales">
        <article className="admin-card">
          <h2 className="admin-card__title">Viajes activos</h2>
          <p className="admin-card__value">128</p>
          <p className="admin-card__meta">+12% vs. ayer</p>
        </article>
        <article className="admin-card">
          <h2 className="admin-card__title">Conductoras disponibles</h2>
          <p className="admin-card__value">312</p>
          <p className="admin-card__meta">Cobertura plena en 9 de 11 zonas</p>
        </article>
        <article className="admin-card">
          <h2 className="admin-card__title">Incidentes abiertos</h2>
          <p className="admin-card__value">5</p>
          <p className="admin-card__meta">3 en seguimiento prioritario</p>
        </article>
      </section>

      {/* //2.- Complementar con las prioridades tácticas aprobadas para el turno actual. */}
      <section className="admin-split" aria-label="Resumen de prioridades">
        <div className="admin-panel__block">
          <h3 className="admin-panel__title">Alertas de servicio</h3>
          <ul className="admin-panel__list">
            <li>
              <span className="admin-panel__tag admin-panel__tag--warning">Alta</span>
              <p className="admin-panel__desc">Demora en zona Centro Histórico (16 min promedio).</p>
            </li>
            <li>
              <span className="admin-panel__tag">Media</span>
              <p className="admin-panel__desc">Actualización pendiente de licencias para 8 unidades.</p>
            </li>
            <li>
              <span className="admin-panel__tag admin-panel__tag--info">Info</span>
              <p className="admin-panel__desc">Campaña de retención programada para mañana.</p>
            </li>
          </ul>
        </div>
        <div className="admin-panel__block">
          <h3 className="admin-panel__title">Tareas coordinadas</h3>
          <ol className="admin-panel__steps">
            <li>Confirmar rotación nocturna con operaciones.</li>
            <li>Revisar reporte económico enviado a las 08:15 h.</li>
            <li>Actualizar checklist de seguridad compartido con product.</li>
          </ol>
        </div>
      </section>
    </AdminWorkspace>
  );
}

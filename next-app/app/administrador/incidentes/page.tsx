"use client";

import { AdminWorkspace } from "../../../components/AdminWorkspace";

//1.- Consolidar el flujo de soporte siguiendo los lineamientos acordados con producto.
export default function AdministradorIncidentesPage() {
  return (
    <AdminWorkspace
      title="Incidentes y soporte"
      subtitle="Seguimiento integral de casos críticos hasta su resolución."
      bodyClass="page-admin-workspace"
    >
      <section className="admin-incidents" aria-label="Listado de incidentes">
        <article className="admin-incident">
          <header className="admin-incident__header">
            <span className="admin-incident__badge admin-incident__badge--critical">Prioridad alta</span>
            <p className="admin-incident__meta">#INC-204 · Actualizado hace 3 min</p>
          </header>
          <h2 className="admin-incident__title">Alerta de seguridad pasajera</h2>
          <p className="admin-incident__desc">
            Coordinación con la célula de respuesta rápida para confirmar llegada segura al punto de destino.
          </p>
          <footer className="admin-incident__footer">
            <button type="button" className="admin-incident__action">
              Escalar a supervisión
            </button>
            <button type="button" className="admin-incident__ghost">
              Ver bitácora
            </button>
          </footer>
        </article>

        <article className="admin-incident">
          <header className="admin-incident__header">
            <span className="admin-incident__badge admin-incident__badge--medium">Prioridad media</span>
            <p className="admin-incident__meta">#INC-189 · Actualizado hace 12 min</p>
          </header>
          <h2 className="admin-incident__title">Falla mecánica unidad MX-305</h2>
          <p className="admin-incident__desc">
            Operaciones solicita traslado a taller aliado y comunicación a pasajera para reagendar.
          </p>
          <footer className="admin-incident__footer">
            <button type="button" className="admin-incident__action">
              Notificar a pasajera
            </button>
            <button type="button" className="admin-incident__ghost">
              Ver checklist
            </button>
          </footer>
        </article>
      </section>

      {/* //2.- Registrar acuerdos recientes para mantener alineadas a las áreas involucradas. */}
      <section className="admin-panel__block" aria-label="Últimos acuerdos">
        <h2 className="admin-panel__title">Acuerdos recientes</h2>
        <ul className="admin-panel__list">
          <li>
            <span className="admin-panel__tag">Soporte</span>
            <p className="admin-panel__desc">Activar guion de contención actualizado el 14 de agosto.</p>
          </li>
          <li>
            <span className="admin-panel__tag admin-panel__tag--info">Producto</span>
            <p className="admin-panel__desc">Documentar hallazgos en el tablero compartido de insights.</p>
          </li>
        </ul>
      </section>
    </AdminWorkspace>
  );
}

"use client";

import { AdminWorkspace } from "../../../components/AdminWorkspace";

//1.- Documentar la vista de inventario de unidades manteniendo el estilo compartido.
export default function AdministradorFlotaPage() {
  return (
    <AdminWorkspace
      title="Gestión de flota"
      subtitle="Disponibilidad y mantenimientos acordados con operaciones."
      bodyClass="page-admin-workspace"
    >
      <section className="admin-table" aria-label="Unidades activas">
        <header className="admin-table__header">
          <p>Unidad</p>
          <p>Zona</p>
          <p>Estado</p>
          <p>Siguiente servicio</p>
        </header>
        <div className="admin-table__row">
          <p>MX-102</p>
          <p>Norte</p>
          <p className="admin-status admin-status--ok">Disponible</p>
          <p>12 ago</p>
        </div>
        <div className="admin-table__row">
          <p>MX-214</p>
          <p>Centro</p>
          <p className="admin-status admin-status--delay">En servicio</p>
          <p>18 ago</p>
        </div>
        <div className="admin-table__row">
          <p>MX-305</p>
          <p>Sur</p>
          <p className="admin-status admin-status--alert">Taller</p>
          <p>Revisión en curso</p>
        </div>
        <div className="admin-table__row">
          <p>MX-411</p>
          <p>Oriente</p>
          <p className="admin-status admin-status--ok">Disponible</p>
          <p>30 ago</p>
        </div>
      </section>

      {/* //2.- Agregar notas operativas alineadas con la planificación semanal. */}
      <section className="admin-panel__block" aria-label="Notas operativas">
        <h2 className="admin-panel__title">Notas de mantenimiento</h2>
        <ul className="admin-panel__list">
          <li>
            <span className="admin-panel__tag admin-panel__tag--info">Recordatorio</span>
            <p className="admin-panel__desc">Verificar nivel de baterías híbridas lote MX-300.</p>
          </li>
          <li>
            <span className="admin-panel__tag admin-panel__tag--warning">Prioritario</span>
            <p className="admin-panel__desc">Reasignar unidad MX-214 a ruta hospitalaria 24 h.</p>
          </li>
        </ul>
      </section>
    </AdminWorkspace>
  );
}

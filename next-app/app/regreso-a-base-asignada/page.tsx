import Link from "next/link";

//1.- Simular el banner de regreso apoyado en un fondo de mapa estilizado.
export default function RegresoABaseAsignadaPage() {
  return (
    <div className="page-regreso-base" style={{ position: "relative", minHeight: "100vh" }}>
      <div className="map-placeholder" aria-hidden="true"></div>
      <div className="map-grid" aria-hidden="true"></div>

      <div className="top">
        <div className="brand-anchor brand-overlay" aria-hidden="true">
          <div className="pin brand-pin">
            <div className="badge brand-badge">
                          <span className="brand-badge__label" aria-hidden="true">
              RT
            </span>
            <span className="sr-only">Logo de Red TOSUR</span>
            </div>
          </div>
        </div>
        <Link className="banner" href="/resumen-de-jornada">
          <div className="title">Regreso a base asignada</div>
          <div className="sub">
            Siga la ruta indicada para regresar a su base de operaciones. No podrá recibir nuevos viajes hasta confirmar su llegada.
          </div>
        </Link>
      </div>

      <Link id="pill" className="pill" href="/resumen-de-jornada">
        8&nbsp;min
      </Link>
    </div>
  );
}

import Link from "next/link";

//1.- Simular el viaje en curso permitiendo avanzar hacia el regreso a base.
export default function TrayectoConTarjetaDePasajeraPage() {
  return (
    <div className="page-trayecto" style={{ position: "relative", minHeight: "100vh" }}>
      <div className="map-placeholder" aria-hidden="true"></div>
      <div className="map-grid" aria-hidden="true"></div>

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

      <div className="bottom">
        <Link className="card" href="/regreso-a-base-asignada">
          <div className="avatar" aria-hidden="true"></div>
          <div>
            <div className="name">Laura Hernández</div>
            <div className="sub">En línea · 10 min restante</div>
            <div className="sub">Plaza Cristál, Minatitlán</div>
          </div>
          <div className="tag">10</div>
        </Link>
      </div>
    </div>
  );
}

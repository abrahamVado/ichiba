import Link from "next/link";

//1.- Ofrecer la hoja de aceptación de viaje con un mapa genérico de fondo.
export default function RegistroDeLlegadaABaseMapaPage() {
  return (
    <div className="page-registro-mapa" style={{ position: "relative", minHeight: "100vh" }}>
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

      <div className="overlay">
        <div className="sheet">
          <div className="h1">Registro de llegada a base</div>

          <div className="row">
            <span className="dot"></span>
            <div>Col. Petrolera, Minatitlán</div>
            <div></div>
          </div>
          <div className="row">
            <span className="dot"></span>
            <div>Plaza Cristal Minatitlán</div>
            <div></div>
          </div>

          <div className="row">
            <span role="img" aria-label="Tipo de pago">
              💳
            </span>
            <div>Efectivo</div>
            <div style={{ fontWeight: 800 }}>12 min</div>
          </div>
          <div className="row">
            <span role="img" aria-label="Tiempo estimado">
              ⏱
            </span>
            <div>Tiempo estimado</div>
            <div style={{ fontWeight: 800 }}>Ejecutivo</div>
          </div>

          <Link className="btn primary" href="/trayecto-con-tarjeta-de-pasajera">
            Aceptar viaje
          </Link>
          <Link className="btn ghost" href="/rechazo-de-viaje">
            Rechazar
          </Link>
        </div>
      </div>
    </div>
  );
}

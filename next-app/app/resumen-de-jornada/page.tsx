import Link from "next/link";

//1.- Presentar los indicadores principales del turno con navegación a pasos posteriores.
export default function ResumenDeJornadaPage() {
  return (
    <main className="wrap page-resumen" role="main">
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
            <span style={{ color: "#111" }}>RED</span>
            <span style={{ color: "#111" }}>TOSUR</span>
          </h1>
        </div>
      </header>

      <h2 className="title">Resumen de jornada.</h2>
      <p className="lead">Gracias por su servicio. A continuación se muestra el resumen de su turno.</p>

      <section className="card" aria-labelledby="resumen">
        {[ 
          { label: "Viajes completados", value: "7" },
          { label: "Horas de servicio", value: "8\u00a0h\u00a015\u00a0min", className: "hrs" },
          { label: "Kilómetros recorridos", value: "94\u00a0km", className: "km" },
          { label: "Pagos en línea", value: "$\u00a0420,00\u00a0MXN" }
        ].map((item) => (
          <div className="row" key={item.label}>
            <div className="label">{item.label}</div>
            <div className={`value ${item.className ?? ""}`.trim()}>{item.value}</div>
          </div>
        ))}

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
        <Link className="btn primary" href="/turno-finalizado">
          Cerrar turno y salir
        </Link>
        <Link className="btn ghost" href="/historial-de-jornadas">
          Ver historial completo
        </Link>
      </div>

      <p className="fine">Demo UI sin datos reales.</p>
    </main>
  );
}

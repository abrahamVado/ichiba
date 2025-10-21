import Link from "next/link";

//1.- Reproducir la confirmación de rechazo con accesos al mapa y al cierre del turno.
export default function RechazoDeViajePage() {
  return (
    <main className="wrap page-rechazo" role="main">
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

      <section className="card" aria-labelledby="rechazo-title">
        <header className="head">
          <div className="icon" aria-hidden="true">
            ⚠️
          </div>
          <div>
            <h1 id="rechazo-title" className="title">
              Confirmar rechazo del viaje
            </h1>
            <p className="lead">Seleccione el motivo y agregue un comentario breve para notificar a la central.</p>
          </div>
        </header>

        <fieldset className="reasons" aria-labelledby="rechazo-title">
          <legend className="sr-only">Motivos de rechazo</legend>
          {["Fuera de cobertura", "Pasajero no localizado", "Condiciones inseguras", "Otro motivo"].map((reason) => (
            <label className="reason" key={reason}>
              <input type="checkbox" />
              <span>{reason}</span>
            </label>
          ))}
        </fieldset>

        <div className="field">
          <label htmlFor="note">Justificación breve</label>
          <textarea id="note" placeholder="Describa lo sucedido…"></textarea>
        </div>

        <div className="actions">
          <Link className="btn ghost" href="/registro-de-llegada-a-base-mapa">
            Volver al mapa
          </Link>
          <Link className="btn primary" href="/regreso-a-base-asignada">
            Confirmar rechazo
          </Link>
        </div>
      </section>
    </main>
  );
}

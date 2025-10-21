import Link from "next/link";

//1.- Presentar la lista de verificación manteniendo la estética original.
export default function VerificacionDelVehiculoPage() {
  return (
    <main className="wrap page-verificacion" role="main">
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
        <div className="brand">
          <span>RED</span>
          <span>TOSUR</span>
        </div>
      </header>

      <h2 className="title">Verificación del vehículo</h2>
      <p className="lead">
        Complete la revisión antes de finalizar su turno. Cualquier anomalía será reportada al área de mantenimiento.
      </p>

      <div className="car" aria-hidden="true">
        <svg viewBox="0 0 560 180">
          <defs>
            <linearGradient id="gold" x1="0" x2="1">
              <stop offset="0" stopColor="#ffefb2" />
              <stop offset="1" stopColor="#d4a016" />
            </linearGradient>
          </defs>
          <ellipse cx="280" cy="150" rx="210" ry="10" fill="#e5e7eb" />
          <path
            d="M65 115c10-35 60-50 120-58 30-20 55-30 95-30 35 0 71 8 96 21 23 12 41 30 56 52l25 3c14 2 26 11 26 23 0 12-11 22-24 22H96c-21 0-35-14-31-33z"
            fill="#fff"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
          <path d="M186 47h92c18 0 47 7 63 15 18 9 45 28 61 49H175c-6-22-1-45 11-64z" fill="#0f172a" opacity=".86" />
          <circle cx="170" cy="138" r="26" fill="#1f2937" />
          <circle cx="170" cy="138" r="16" fill="url(#gold)" />
          <circle cx="410" cy="138" r="26" fill="#1f2937" />
          <circle cx="410" cy="138" r="16" fill="url(#gold)" />
          <path d="M110 120h45v10h-45zM430 120h45v10h-45z" fill="#1f2937" opacity=".2" />
          <path d="M105 82h92M335 82h80" stroke="url(#gold)" strokeWidth="3" opacity=".8" />
        </svg>
      </div>

      <section className="list" aria-labelledby="chk">
        {[
          { icon: "🚗", label: "Exterior limpio" },
          { icon: "🧼", label: "Interior sin objetos olvidados" },
          { icon: "🔧", label: "Llantas en buen estado" },
          { icon: "⛽", label: "Combustible suficiente" },
          { icon: "💡", label: "Luces y cámaras funcionando" },
          { icon: "🧾", label: "Entrega de efectivo (si aplica)", custom: true }
        ].map((item) => (
          <div className="item" key={item.label}>
            <div className="icon" aria-hidden="true">
              {item.icon}
            </div>
            <div className="label">{item.label}</div>
            <div className="actions">
              <div className="chip ok">✓</div>
              <div className="chip warn">!</div>
              {item.custom ? (
                <>
                  <div className="chip" style={{ borderColor: "#e0c27a", color: "#d4a016" }}>
                    ✓
                  </div>
                  <div className="chip" style={{ borderColor: "#e0c27a", color: "#d4a016", background: "#fff" }}></div>
                </>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      <div className="field">
        <label>Observaciones (opcional)</label>
        <div className="note">
          <textarea placeholder="Escriba sus observaciones…"></textarea>
          <div className="cam" aria-label="Agregar foto">
            📷
          </div>
        </div>
      </div>

      <Link className="btn" href="/registro-de-llegada-a-base">
        Finalizar revisión y cerrar turno
      </Link>
    </main>
  );
}

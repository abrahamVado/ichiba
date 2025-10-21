import Link from "next/link";
import { ScreenMenu } from "../components/ScreenMenu";
import { driverScreens, passengerScreens } from "../lib/screens";

//1.- Renderizar la pantalla principal con accesos directos a los flujos clave.
export default function HomePage() {
  return (
    <main className="wrap page-bienvenido">
      {/* //2.- Conservar la composición original del hero de bienvenida. */}
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
      <p className="title">Demo de jornada</p>
      <p className="lead">Explora el flujo completo del turno desde este punto de partida.</p>

      {/* //3.- Reemplazar los botones nativos por navegación con Link de Next.js. */}
      <div className="demo-actions">
        <Link className="btn primary" href="/login-oscuro">
          Comenzar demo
        </Link>
        <Link className="btn secondary" href="/reserva-de-taxi-pasajero">
          Experiencia de pasajero
        </Link>
      </div>

      <p className="fine">Versiones conceptuales. Datos simulados para demostración.</p>

      <svg
        className="skyline"
        viewBox="0 0 200 80"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        aria-hidden="true"
      >
        <path d="M10 62c36-16 144-16 180 0" />
        <rect x="40" y="28" width="18" height="22" fill="none" />
        <rect x="66" y="18" width="20" height="32" fill="none" />
        <rect x="92" y="8" width="22" height="42" fill="none" />
        <rect x="120" y="22" width="18" height="28" fill="none" />
        <rect x="144" y="30" width="16" height="20" fill="none" />
      </svg>

      {/* //4.- Ofrecer listados completos para saltar a cualquier pantalla del demo. */}
      <ScreenMenu
        title="Flujo del conductor"
        description="Pantallas ordenadas desde el acceso hasta el cierre del turno."
        screens={driverScreens}
      />
      <ScreenMenu
        title="Flujo de la pasajera"
        description="Secuencia disponible para explorar la experiencia de reserva."
        screens={passengerScreens}
      />
    </main>
  );
}

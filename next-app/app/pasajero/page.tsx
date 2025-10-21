"use client";

import Link from "next/link";
import { ScreenMenu } from "../../components/ScreenMenu";
import { passengerScreens } from "../../lib/screens";
import { useBodyClass } from "../../lib/useBodyClass";

const DEFAULT_PASSENGER_ENTRY_SLUG = "reserva-de-taxi-pasajero";
const DEFAULT_PASSENGER_ENTRY_PATH = "/reserva-de-taxi-pasajero";

//1.- Identificar la ruta inicial para que el botón principal conduzca al comienzo del flujo.
function resolvePassengerEntryPath() {
  return (
    passengerScreens.find((screen) => screen.slug === DEFAULT_PASSENGER_ENTRY_SLUG)?.path ??
    passengerScreens[0]?.path ??
    DEFAULT_PASSENGER_ENTRY_PATH
  );
}

//2.- Presentar el menú dedicado a pasajeras con contexto, CTA y retorno al selector principal.
export default function PassengerMenuPage() {
  useBodyClass("page-passenger-menu");

  const entryPath = resolvePassengerEntryPath();

  return (
    <main className="persona-layout persona-layout--passenger" aria-labelledby="passenger-menu-title">
      {/* //3.- Ofrecer una ruta de regreso clara hacia la selección de perfiles. */}
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb__list">
          <li className="breadcrumb__item">
            <Link href="/" className="breadcrumb__link">
              Inicio
            </Link>
          </li>
          <li className="breadcrumb__item" aria-current="page">
            Experiencia de pasajeras
          </li>
        </ol>
      </nav>

      {/* //4.- Dar la bienvenida con contexto y acciones para iniciar el recorrido. */}
      <header className="persona-header">
        <span className="persona-kicker">Flujo de pasajeras</span>
        <h1 id="passenger-menu-title" className="persona-title">
          Explora la experiencia completa antes de tu viaje
        </h1>
        <p className="persona-description">
          Conoce cada paso de la reserva, seguimiento y evaluación del servicio para comprender el
          impacto de la plataforma desde la perspectiva de quien solicita el traslado.
        </p>
        <div className="persona-actions">
          <Link href={entryPath} className="btn primary">
            Comenzar recorrido
          </Link>
          <Link href="/" className="btn ghost">
            Volver a seleccionar persona
          </Link>
        </div>
      </header>

      {/* //5.- Reutilizar el menú estandarizado para enlazar todas las pantallas del flujo. */}
      <ScreenMenu
        title="Pantallas del recorrido de pasajeras"
        description="Accede a cada pantalla para revisar copys, componentes y transiciones específicas del flujo."
        screens={passengerScreens}
      />
    </main>
  );
}

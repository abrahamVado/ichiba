"use client";

import Link from "next/link";
import { ScreenMenu } from "../../components/ScreenMenu";
import { passengerScreens } from "../../lib/screens";
import { useBodyClass } from "../../lib/useBodyClass";

const DEFAULT_ENTRY_PATH = "/reserva-de-taxi-pasajero";
const PERSONA_SELECTOR_PATH = "/";
const PASSENGER_ENTRY_SLUG = "reserva-de-taxi-pasajero";

//1.- Preparar la vista dedicada para pasajeras asegurando consistencia visual y de navegación.
export default function PassengerMenuPage() {
  //2.- Aplicar la clase de ambientación del catálogo de pasajeras.
  useBodyClass("page-passenger-menu");

  //3.- Determinar la ruta de arranque del flujo para el botón principal.
  const entryPath =
    passengerScreens.find((screen) => screen.slug === PASSENGER_ENTRY_SLUG)?.path ??
    DEFAULT_ENTRY_PATH;

  return (
    <main className="passenger-menu" aria-labelledby="passenger-menu-title">
      {/* //4.- Habilitar un atajo visible para regresar al selector de personas. */}
      <nav className="passenger-menu__breadcrumbs" aria-label="Volver a la selección de experiencias">
        <Link href={PERSONA_SELECTOR_PATH} className="breadcrumbs__link">
          ← Volver a seleccionar experiencia
        </Link>
      </nav>

      {/* //5.- Introducir el recorrido con un encabezado contextual y acciones destacadas. */}
      <header className="passenger-menu__header">
        <h1 id="passenger-menu-title">Explora la experiencia de pasajeras</h1>
        <p>
          Sigue cada etapa de la reserva, desde el inicio de sesión hasta la evaluación del servicio, para
          comprender cómo se guía a las personas usuarias en todo momento.
        </p>
        <div className="passenger-menu__actions" role="group" aria-label="Acciones principales del flujo">
          <Link href={entryPath} className="btn primary">
            Comenzar una solicitud
          </Link>
          <Link href="#pasajero-menu-list" className="btn ghost">
            Revisar las pantallas
          </Link>
        </div>
      </header>

      {/* //6.- Reutilizar el menú centralizado para listar todas las pantallas documentadas para pasajeras. */}
      <div id="pasajero-menu-list">
        <ScreenMenu
          title="Etapas del flujo de pasajeras"
          description="Accede directamente a la pantalla que necesitas revisar o compartir."
          screens={passengerScreens}
        />
      </div>
    </main>
  );
}

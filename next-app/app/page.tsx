"use client";

import Link from "next/link";
import { ScreenMenu } from "../components/ScreenMenu";
import { adminScreens, driverScreens, passengerScreens } from "../lib/screens";
import { useBodyClass } from "../lib/useBodyClass";

const DRIVER_SLUG = "login-oscuro";
const PASSENGER_SLUG = "reserva-de-taxi-pasajero";
const PASSENGER_MENU_PATH = "/pasajero";

//1.- Renderizar la portada con los accesos principales sin redireccionar automáticamente.
export default function HomePage() {
  //2.- Sincronizar la clase del cuerpo para aplicar la ambientación del landing.
  useBodyClass("page-home");

  //3.- Recuperar las rutas iniciales de cada flujo para alimentar los botones de llamada a la acción.
  const driverEntry =
    driverScreens.find((screen) => screen.slug === DRIVER_SLUG)?.path ??
    driverScreens[0]?.path ??
    "/login-oscuro";
  const passengerEntry =
    passengerScreens.find((screen) => screen.slug === PASSENGER_SLUG)?.path ??
    passengerScreens[0]?.path ??
    "/reserva-de-taxi-pasajero";
  const adminEntry = adminScreens[0]?.path ?? "";
  const adminMenuDescription =
    adminScreens.length > 0
      ? "Explora las herramientas operativas del centro de control."
      : "Listado en preparación mientras se documentan las pantallas administrativas.";

  return (
    <main className="home-layout" aria-labelledby="home-title">
      {/* //4.- Presentar un hero con la marca, mensaje principal y accesos directos a cada flujo. */}
      <section className="home-hero" aria-labelledby="home-title">
        <div className="brand-anchor" aria-hidden="true">
          <div className="pin brand-pin">
            <div className="badge brand-badge">
              <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
            </div>
          </div>
        </div>

        <h1 id="home-title" className="home-title">
          Demo de jornada Red TOSUR
        </h1>
        <p className="home-lead">
          Selecciona el flujo que deseas explorar para seguir el recorrido completo sin perderte ninguna
          pantalla clave.
        </p>

        <div className="home-cta-group" role="group" aria-label="Puntos de entrada a los flujos disponibles">
          <Link href={driverEntry} className="home-cta home-cta--primary">
            Inicio de conductores
          </Link>
          <Link href={PASSENGER_MENU_PATH} className="home-cta home-cta--secondary">
            Experiencia de pasajeras
          </Link>
          {adminEntry ? (
            <Link href={adminEntry} className="home-cta home-cta--ghost">
              Panel administrativo
            </Link>
          ) : (
            <span className="home-cta home-cta--ghost home-cta--disabled" aria-live="polite">
              Panel administrativo (muy pronto)
            </span>
          )}
        </div>

        <p className="home-fine">Versiones conceptuales. Datos simulados únicamente para demostración.</p>

        <svg className="home-skyline" viewBox="0 0 200 80" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="M10 62c36-16 144-16 180 0" />
          <rect x="40" y="28" width="18" height="22" fill="none" />
          <rect x="66" y="18" width="20" height="32" fill="none" />
          <rect x="92" y="8" width="22" height="42" fill="none" />
          <rect x="120" y="22" width="18" height="28" fill="none" />
          <rect x="144" y="30" width="16" height="20" fill="none" />
        </svg>
      </section>

      {/* //5.- Reunir los catálogos segmentados para que cada rol descubra sus pantallas rápidamente. */}
      <section className="home-directory" aria-labelledby="home-directory-title">
        <h2 id="home-directory-title" className="sr-only">
          Explora los flujos disponibles
        </h2>

        <div className="home-menu-grid">
          <ScreenMenu
            title="Flujo de conductores"
            description="Recorrido completo desde el ingreso hasta el cierre de jornada."
            screens={driverScreens}
          />
          <div className="home-menu-card home-menu-card--passenger">
            <ScreenMenu
              title="Flujo de pasajeras"
              description="Pasos para solicitar un viaje, recibir confirmación y evaluar el servicio."
              screens={passengerScreens}
            />
            <div className="home-menu-card__actions" role="group" aria-label="Accesos rápidos para pasajeras">
              <Link href={PASSENGER_MENU_PATH} className="home-menu-card__link">
                Abrir menú dedicado de pasajeras
              </Link>
              <Link href={passengerEntry} className="home-menu-card__link home-menu-card__link--primary">
                Iniciar directamente la experiencia →
              </Link>
            </div>
          </div>
          <ScreenMenu title="Flujo administrativo" description={adminMenuDescription} screens={adminScreens} />
        </div>
      </section>
    </main>
  );
}

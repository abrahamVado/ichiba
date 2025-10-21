"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useBodyClass } from "../../../lib/useBodyClass";

//1.- Mostrar el avance del viaje con un mapa de referencia y una línea de tiempo de checkpoints.
export default function SeguimientoPage() {
  useBodyClass("page-pasajero-seguimiento");
  const router = useRouter();

  //2.- Definir los puntos del recorrido que se mostrarán como progreso visual para la pasajera.
  const checkpoints = useMemo(
    () => [
      {
        id: "pickup",
        title: "En camino a recogerte",
        description: "Laura salió hace 2 minutos y se encuentra a 1.5 km.",
        status: "done"
      },
      {
        id: "approaching",
        title: "Llegando al punto de encuentro",
        description: "Tiempo estimado de llegada: 4 minutos.",
        status: "current"
      },
      {
        id: "trip",
        title: "Traslado en curso",
        description: "El trayecto al destino tomará 18 minutos adicionales.",
        status: "pending"
      },
      {
        id: "arrival",
        title: "Llegada al destino",
        description: "Confirma cuando hayas llegado para finalizar.",
        status: "pending"
      }
    ],
    []
  );

  //3.- Enviar a la pantalla de calificación al confirmar que la pasajera llegó a su destino.
  const handleArrived = () => {
    router.push("/reserva-de-taxi-pasajero/calificacion?from=seguimiento");
  };

  //4.- Proveer accesos rápidos de contacto con el conductor y soporte del servicio.
  const handleContactDriver = () => {
    window.alert("Llamando a Laura Martínez…");
  };

  const handleContactSupport = () => {
    window.alert("Nuestro equipo de soporte se pondrá en contacto contigo en breve.");
  };

  //5.- Mantener la referencia del contenedor del mapa para renderizar Google Maps dentro de la tarjeta de seguimiento.
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  //6.- Administrar el estado de carga y errores del script de Google Maps.
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isMapReady, setIsMapReady] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  //7.- Recuperar la clave de Google Maps que la aplicación expone en el entorno público.
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const missingApiKeyMessage = "Configura la variable NEXT_PUBLIC_GOOGLE_MAPS_API_KEY para ver el mapa en vivo.";

  //8.- Advertir si la clave no está configurada para que la pasajera entienda por qué no se muestra el mapa.
  useEffect(() => {
    if (!apiKey) {
      setMapError(missingApiKeyMessage);
      setIsMapReady(false);
    } else if (mapError === missingApiKeyMessage) {
      setMapError(null);
    }
  }, [apiKey, mapError, missingApiKeyMessage]);

  //9.- Inicializar el mapa interactivo cuando la librería de Google Maps esté disponible.
  useEffect(() => {
    if (!isScriptLoaded || !apiKey || mapError || !mapContainerRef.current) {
      return;
    }

    const googleMaps = (window as typeof window & { google?: any }).google;

    if (!googleMaps?.maps) {
      setMapError("No fue posible cargar Google Maps. Intenta nuevamente en unos instantes.");
      setIsMapReady(false);
      return;
    }

    const container = mapContainerRef.current as HTMLDivElement & { __mapInstance?: any };

    if (container.__mapInstance) {
      setIsMapReady(true);
      return;
    }

    try {
      const center = { lat: -12.046374, lng: -77.042793 };
      const map = new googleMaps.maps.Map(mapContainerRef.current, {
        center,
        zoom: 15,
        disableDefaultUI: true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#1b2434" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#f8fafc" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#1b2434" }] },
          { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#3a4660" }] },
          { featureType: "poi", elementType: "geometry", stylers: [{ color: "#2c3446" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#37425a" }] },
          { featureType: "road", elementType: "geometry.stroke", stylers: [{ color: "#212a3b" }] },
          { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
          { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2c3446" }] },
          { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] }
        ]
      });

      new googleMaps.maps.Marker({
        position: center,
        map,
        title: "Punto de encuentro",
        icon: {
          path: googleMaps.maps.SymbolPath.CIRCLE,
          scale: 10,
          fillColor: "#d4a016",
          fillOpacity: 1,
          strokeColor: "#f1c86a",
          strokeWeight: 3
        }
      });

      container.__mapInstance = map;
      setIsMapReady(true);
    } catch (error) {
      setMapError("No fue posible cargar Google Maps. Intenta nuevamente en unos instantes.");
      setIsMapReady(false);
    }
  }, [apiKey, isScriptLoaded, mapError]);

  return (
    <main className="wrap" role="main">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
          </div>
        </div>
      </div>

      <header>
        <div className="badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-label="Seguimiento">
            <path d="M12 2a7 7 0 0 0-7 7c0 4.23 4.9 10.18 6.56 12.06a.56.56 0 0 0 .88 0C14.1 19.18 19 13.23 19 9a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 2.5-2.5A2.5 2.5 0 0 1 12 11.5Z" />
          </svg>
        </div>
        <div>
          <h1 className="title">Seguimiento en tiempo real</h1>
          <p className="time" role="status">
            Paso 3 de 4 · Llegada estimada en 18 minutos.
          </p>
        </div>
      </header>

      <section className="card tracking">
        <div className="map" role="region" aria-label="Mapa con el recorrido del viaje">
          {apiKey ? (
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
              strategy="afterInteractive"
              onLoad={() => {
                setIsScriptLoaded(true);
                setMapError(null);
              }}
              onError={() => {
                setMapError("No fue posible cargar Google Maps. Intenta nuevamente en unos instantes.");
                setIsMapReady(false);
              }}
            />
          ) : null}
          <div ref={mapContainerRef} className="map-canvas" aria-hidden="true" />
          {!isMapReady || mapError ? (
            <div className="map-message" role="status">
              {mapError ?? "Cargando el mapa en tiempo real…"}
            </div>
          ) : null}
        </div>
        <div className="timeline" aria-live="polite">
          <ol>
            {checkpoints.map((checkpoint) => (
              <li
                key={checkpoint.id}
                data-status={checkpoint.status}
                aria-current={checkpoint.status === "current" ? "step" : undefined}
              >
                <div className="status" aria-hidden="true"></div>
                <div>
                  <strong>{checkpoint.title}</strong>
                  <p>{checkpoint.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="actions">
          <button className="btn primary" type="button" onClick={handleArrived}>
            Llegué al destino
          </button>
          <div className="contact-actions">
            <button className="btn ghost" type="button" onClick={handleContactDriver}>
              Contactar a la conductora
            </button>
            <button className="btn ghost" type="button" onClick={handleContactSupport}>
              Contactar soporte
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Reconstruir la hoja inferior con mapa respetando su navegación original.
export default function RegistroMapaPage() {
  useBodyClass("page-registro-mapa");
  const router = useRouter();

  //2.- Preparar el callback global requerido por la API de Google Maps.
  useEffect(() => {
    const anyWindow = window as typeof window & { initRegistroMapa?: () => void; google?: any };
    anyWindow.initRegistroMapa = () => {
      const g = anyWindow.google;
      if (!g || !g.maps) {
        return;
      }

      const center = { lat: 18.0007, lng: -94.5566 };
      const map = new g.maps.Map(document.getElementById("map") as HTMLElement, {
        center,
        zoom: 13,
        disableDefaultUI: true,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] },
          { featureType: "water", stylers: [{ color: "#d7e3f4" }] }
        ]
      });

      const path = [
        { lat: 17.997, lng: -94.556 },
        { lat: 18.004, lng: -94.553 },
        { lat: 18.01, lng: -94.548 }
      ];

      new g.maps.Polyline({ path, strokeColor: "#d4a016", strokeWeight: 6, map });
      new g.maps.Marker({
        position: path[0],
        map,
        icon: {
          path: g.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#111",
          fillOpacity: 1,
          strokeColor: "#ffc",
          strokeWeight: 2
        }
      });

      map.fitBounds(new g.maps.LatLngBounds(path[0], path[path.length - 1]));
    };

    return () => {
      delete anyWindow.initRegistroMapa;
    };
  }, []);

  //3.- Continuar el flujo con el trayecto activo o con el rechazo de viaje.
  const handleAccept = () => {
    router.push("/trayecto-con-tarjeta-de-pasajera");
  };

  const handleReject = () => {
    router.push("/rechazo-de-viaje");
  };

  return (
    <>
      <div id="map"></div>

      <div className="brand-anchor brand-overlay" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
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
            <span>💳</span>
            <div>Efectivo</div>
            <div style={{ fontWeight: 800 }}>12 min</div>
          </div>
          <div className="row">
            <span>⏱</span>
            <div>Tiempo estimado</div>
            <div style={{ fontWeight: 800 }}>Ejecutivo</div>
          </div>

          <button className="btn primary" type="button" onClick={handleAccept}>
            Aceptar viaje
          </button>
          <button className="btn ghost" type="button" onClick={handleReject}>
            Rechazar
          </button>
        </div>
      </div>

      <Script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&v=weekly&callback=initRegistroMapa"
        strategy="afterInteractive"
      />
    </>
  );
}

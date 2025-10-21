"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Restaurar la pantalla de regreso a base con su mapa interactivo.
export default function RegresoBasePage() {
  useBodyClass("page-regreso-base");
  const router = useRouter();

  //2.- Configurar el callback que posiciona la píldora informativa sobre el mapa.
  useEffect(() => {
    const anyWindow = window as typeof window & { initRegresoMap?: () => void; google?: any };
    anyWindow.initRegresoMap = () => {
      const g = anyWindow.google;
      if (!g || !g.maps) {
        return;
      }

      const start = { lat: 18.001, lng: -94.574 };
      const end = { lat: 18.017, lng: -94.537 };
      const map = new g.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 18.008, lng: -94.556 },
        zoom: 13,
        disableDefaultUI: true,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#0f1115" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#1c2026" }] },
          { featureType: "water", stylers: [{ color: "#0c1117" }] },
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] }
        ]
      });

      const path = [
        start,
        { lat: 18.006, lng: -94.564 },
        { lat: 18.012, lng: -94.551 },
        end
      ];

      new g.maps.Polyline({ path, strokeColor: "#d4a016", strokeOpacity: 1, strokeWeight: 6, map });

      const pillPos = path[2];
      const placePill = () => {
        const pill = document.getElementById("pill");
        if (!pill) {
          return;
        }
        const bounds = map.getBounds();
        const projection = map.getProjection();
        if (!bounds || !projection) {
          return;
        }
        const nw = projection.fromLatLngToPoint(bounds.getNorthEast());
        const se = projection.fromLatLngToPoint(bounds.getSouthWest());
        const worldPoint = projection.fromLatLngToPoint(new g.maps.LatLng(pillPos));
        const x = ((worldPoint.x - se.x) / (nw.x - se.x)) * window.innerWidth;
        const y = ((worldPoint.y - nw.y) / (se.y - nw.y)) * window.innerHeight;
        pill.style.left = `${x}px`;
        pill.style.top = `${y}px`;
      };

      g.maps.event.addListenerOnce(map, "idle", placePill);
      map.addListener("bounds_changed", placePill);
    };

    return () => {
      delete anyWindow.initRegresoMap;
    };
  }, []);

  //3.- Permitir avanzar al resumen tanto desde el banner como desde la píldora.
  const handleContinue = () => {
    router.push("/resumen-de-jornada");
  };

  return (
    <>
      <div id="map"></div>
      <div className="top">
        <div className="brand-anchor brand-overlay" aria-hidden="true">
          <div className="pin brand-pin">
            <div className="badge brand-badge">
              <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="banner" onClick={handleContinue} role="button" tabIndex={0}>
          <div className="title">Regreso a base asignada</div>
          <div className="sub">
            Siga la ruta indicada para regresar a su base de operaciones. No podrá recibir nuevos viajes hasta confirmar su llegada.
          </div>
        </div>
      </div>
      <div id="pill" className="pill" onClick={handleContinue} role="button" tabIndex={0}>
        8&nbsp;min
      </div>

      <Script
        src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&v=weekly&callback=initRegresoMap"
        strategy="afterInteractive"
      />
    </>
  );
}

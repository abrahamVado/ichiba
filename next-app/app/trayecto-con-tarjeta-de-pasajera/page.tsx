"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Recrear la tarjeta del trayecto en curso con el mapa interactivo.
export default function TrayectoPage() {
  useBodyClass("page-trayecto");
  const router = useRouter();

  //2.- Configurar la inicialización del mapa siguiendo el prototipo original.
  useEffect(() => {
    const anyWindow = window as typeof window & { initTrayectoMap?: () => void; google?: any };
    anyWindow.initTrayectoMap = () => {
      const g = anyWindow.google;
      if (!g || !g.maps) {
        return;
      }

      const a = { lat: 18, lng: -94.571 };
      const b = { lat: 18.015, lng: -94.54 };
      const map = new g.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 18.007, lng: -94.555 },
        zoom: 13,
        disableDefaultUI: true,
        styles: [
          { featureType: "poi", stylers: [{ visibility: "off" }] },
          { featureType: "transit", stylers: [{ visibility: "off" }] },
          { featureType: "road", elementType: "geometry", stylers: [{ color: "#e5e7eb" }] },
          { featureType: "water", stylers: [{ color: "#d7e3f4" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#6b7280" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#ffffff" }] }
        ]
      });

      const path = [
        a,
        { lat: 18.004, lng: -94.566 },
        { lat: 18.009, lng: -94.557 },
        { lat: 18.012, lng: -94.548 },
        b
      ];

      new g.maps.Polyline({ path, strokeColor: "#d4a016", strokeWeight: 6, map });
      new g.maps.Marker({
        position: a,
        map,
        icon: {
          path: g.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          scale: 6,
          fillColor: "#d4a016",
          fillOpacity: 1,
          strokeColor: "#a0720f",
          strokeWeight: 2
        }
      });

      map.fitBounds(new g.maps.LatLngBounds(a, b));
    };

    return () => {
      delete anyWindow.initTrayectoMap;
    };
  }, []);

  //3.- Dirigir cualquier interacción hacia el paso de regreso a base.
  const handleProceed = () => {
    router.push("/regreso-a-base-asignada");
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

      <div className="bottom" onClick={handleProceed} role="button" tabIndex={0}>
        <div className="card">
          <div className="avatar"></div>
          <div>
            <div className="name">Laura Hernández</div>
            <div className="sub">En línea · 10 min restante</div>
            <div className="sub">Plaza Cristál, Minatitlán</div>
          </div>
          <div className="tag">10</div>
        </div>
      </div>

      <Script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA02QzKx-mrcMt9uuqP-49x6k3IhkyD0GU&v=weekly&callback=initTrayectoMap"
        strategy="afterInteractive"
      />
    </>
  );
}

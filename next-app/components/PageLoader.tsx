"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const FADE_DURATION = 320;

//1.- Gestionar la visualización del overlay de carga durante el montaje inicial y cada navegación.
export function PageLoader() {
  //2.- Detectar cambios de ruta para reiniciar el estado del loader en cada pantalla.
  const pathname = usePathname();
  //3.- Controlar si el overlay debe permanecer montado y completamente opaco.
  const [isRendered, setIsRendered] = useState(true);
  const [isOpaque, setIsOpaque] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    //4.- Mostrar el fondo negro y el spinner apenas se prepara una nueva pantalla.
    setIsRendered(true);
    setIsOpaque(true);

    let isCancelled = false;

    //5.- Esperar a que el DOM termine de cargar y después asegurar que todas las imágenes estén listas.
    const resolveWhenReady = async () => {
      await waitForDocumentReady();
      if (isCancelled) {
        return;
      }

      await waitForImages();
      if (isCancelled) {
        return;
      }

      //6.- Iniciar el desvanecimiento y programar el desmontaje del overlay cuando termina la animación.
      setIsOpaque(false);
      hideTimerRef.current = setTimeout(() => {
        if (!isCancelled) {
          setIsRendered(false);
        }
      }, FADE_DURATION);
    };

    resolveWhenReady();

    return () => {
      //7.- Limpiar timers y abortar transiciones si ocurre un cambio de ruta antes de finalizar.
      isCancelled = true;
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = undefined;
      }
    };
  }, [pathname]);

  //8.- Evitar renderizados innecesarios cuando el overlay ya se ocultó.
  if (!isRendered) {
    return null;
  }

  const overlayClassName = `page-loader${isOpaque ? " page-loader--visible" : " page-loader--hidden"}`;

  return (
    <div className={overlayClassName} role="status" aria-live="polite" aria-label="Cargando contenido">
      {/* //9.- Mostrar un spinner accesible mientras los recursos se completan. */}
      <div className="page-loader__spinner" aria-hidden="true" />
      <span className="sr-only">Cargando contenido…</span>
    </div>
  );
}

//10.- Aguardar hasta que el documento haya emitido el evento `load`, indicando que el DOM y los estilos están listos.
const waitForDocumentReady = () => {
  if (typeof document === "undefined") {
    return Promise.resolve();
  }

  if (document.readyState === "complete") {
    return Promise.resolve();
  }

  return new Promise<void>((resolve) => {
    const cleanup = () => {
      document.removeEventListener("readystatechange", handleReadyState);
      window.removeEventListener("load", handleWindowLoad);
    };

    const handleReadyState = () => {
      if (document.readyState === "complete") {
        cleanup();
        resolve();
      }
    };

    const handleWindowLoad = () => {
      cleanup();
      resolve();
    };

    document.addEventListener("readystatechange", handleReadyState);
    window.addEventListener("load", handleWindowLoad, { once: true });
  });
};

//11.- Garantizar que todas las imágenes del documento hayan terminado de cargar antes de retirar el overlay negro.
const waitForImages = async () => {
  if (typeof document === "undefined") {
    return;
  }

  const images = Array.from(document.images);
  if (images.length === 0) {
    return;
  }

  await Promise.all(
    images.map(async (image) => {
      if (image.complete && image.naturalWidth !== 0) {
        return;
      }

      try {
        if ("decode" in image) {
          await image.decode();
          return;
        }
      } catch (error) {
        return;
      }

      await new Promise<void>((resolve) => {
        const cleanup = () => {
          image.removeEventListener("load", handleLoad);
          image.removeEventListener("error", handleError);
          resolve();
        };

        const handleLoad = () => {
          cleanup();
        };

        const handleError = () => {
          cleanup();
        };

        image.addEventListener("load", handleLoad, { once: true });
        image.addEventListener("error", handleError, { once: true });
      });
    })
  );
};

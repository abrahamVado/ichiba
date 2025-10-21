"use client";

import { useEffect } from "react";

//1.- Sincronizar la clase del <body> con la pantalla actual para reaprovechar el CSS original.
export function useBodyClass(className: string) {
  useEffect(() => {
    //2.- Guardar la clase previa para restaurarla al abandonar la vista.
    const previous = document.body.className;
    document.body.className = className;

    //3.- Revertir cualquier cambio al desmontar el componente.
    return () => {
      document.body.className = previous;
    };
  }, [className]);
}

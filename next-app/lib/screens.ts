//1.- Definir la forma de cada pantalla para compartir metadatos entre componentes.
export type ScreenInfo = {
  slug: string;
  title: string;
  path: string;
  description: string;
  category: "driver" | "passenger" | "shared";
};

//2.- Centralizar el catálogo de pantallas para alimentar los menús y breadcrumbs.
export const screens: ScreenInfo[] = [
  {
    slug: "inicio",
    title: "Demo de jornada",
    path: "/",
    description: "Punto de partida con accesos al flujo de conductor y pasajero.",
    category: "shared"
  },
  {
    slug: "login-oscuro",
    title: "Acceso del conductor",
    path: "/login-oscuro",
    description: "Captura del número móvil con alternativas de autenticación.",
    category: "driver"
  },
  {
    slug: "terminos-y-condiciones",
    title: "Aceptación de términos",
    path: "/terminos-y-condiciones",
    description: "Confirmación de lectura antes de continuar el proceso.",
    category: "driver"
  },
  {
    slug: "verificacion-del-vehiculo",
    title: "Verificación del vehículo",
    path: "/verificacion-del-vehiculo",
    description: "Checklist visual para asegurar que el vehículo está listo.",
    category: "driver"
  },
  {
    slug: "registro-de-llegada-manual",
    title: "Registro manual de llegada",
    path: "/registro-de-llegada-manual",
    description: "Opción manual para informar la llegada a la base asignada.",
    category: "driver"
  },
  {
    slug: "registro-de-llegada-a-base",
    title: "Registro de llegada a base",
    path: "/registro-de-llegada-a-base",
    description: "Confirmación rápida utilizando código QR.",
    category: "driver"
  },
  {
    slug: "registro-de-llegada-a-base-mapa",
    title: "Registro con mapa",
    path: "/registro-de-llegada-a-base-mapa",
    description: "Alternativa apoyada en geolocalización para validar la llegada.",
    category: "driver"
  },
  {
    slug: "rechazo-de-viaje",
    title: "Confirmación de rechazo",
    path: "/rechazo-de-viaje",
    description: "Pantalla para documentar los motivos al declinar un viaje.",
    category: "driver"
  },
  {
    slug: "bienvenido-a-tu-jornada",
    title: "Inicio de la jornada",
    path: "/bienvenido-a-tu-jornada",
    description: "Resumen previo a comenzar el turno activo.",
    category: "driver"
  },
  {
    slug: "trayecto-con-tarjeta-de-pasajera",
    title: "Trayecto con tarjeta",
    path: "/trayecto-con-tarjeta-de-pasajera",
    description: "Pantalla de viaje en curso con mapa y detalles del pago.",
    category: "driver"
  },
  {
    slug: "regreso-a-base-asignada",
    title: "Regreso a base",
    path: "/regreso-a-base-asignada",
    description: "Indicaciones para volver a la base al finalizar la jornada.",
    category: "driver"
  },
  {
    slug: "resumen-de-jornada",
    title: "Resumen de jornada",
    path: "/resumen-de-jornada",
    description: "Datos consolidados del turno del conductor.",
    category: "driver"
  },
  {
    slug: "historial-de-jornadas",
    title: "Historial de jornadas",
    path: "/historial-de-jornadas",
    description: "Listado de turnos recientes con accesos rápidos.",
    category: "driver"
  },
  {
    slug: "turno-finalizado",
    title: "Turno finalizado",
    path: "/turno-finalizado",
    description: "Mensaje de cierre y recomendaciones posteriores.",
    category: "driver"
  },
  {
    slug: "reserva-de-taxi-pasajero",
    title: "Reserva de taxi",
    path: "/reserva-de-taxi-pasajero",
    description: "Flujo compacto para que la pasajera solicite un servicio.",
    category: "passenger"
  },
  {
    slug: "reserva-de-taxi-pasajero-solicitud",
    title: "Solicitud de viaje",
    path: "/reserva-de-taxi-pasajero/solicitud",
    description: "Formulario para capturar origen, destino y horario.",
    category: "passenger"
  },
  {
    slug: "reserva-de-taxi-pasajero-asignado",
    title: "Viaje asignado",
    path: "/reserva-de-taxi-pasajero/asignado",
    description: "Confirmación de conductor asignado con detalles del auto.",
    category: "passenger"
  },
  {
    slug: "reserva-de-taxi-pasajero-calificacion",
    title: "Calificación",
    path: "/reserva-de-taxi-pasajero/calificacion",
    description: "Pantalla para evaluar el servicio al finalizar el trayecto.",
    category: "passenger"
  }
];

//3.- Facilitar listas específicas para los menús segmentados por tipo de usuario.
export const driverScreens = screens.filter((screen) => screen.category === "driver");
export const passengerScreens = screens.filter((screen) => screen.category === "passenger");

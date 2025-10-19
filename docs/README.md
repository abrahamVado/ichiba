# Demo Navigation & Screen Creation Tasks

This README captures all pending tasks required to wire the taxi demo journey and to add the missing screens referenced during review.

## 1. Wire demo flow between existing screens ✅ Completado
- Create a new `index.html` at the repository root that loads `styles/main.css`, mirrors the hero layout from `bienvenido_a_tu_jornada/index.html`, and offers a **Comenzar demo** button that links to `login_oscuro/index.html`.
- Add inline scripts (before each closing `</body>`) to the following pages so the primary CTAs advance to the next step of the journey and any "Atrás" controls go back:
  - `login_oscuro/index.html` → `terminos_y_condiciones/index.html`
  - `terminos_y_condiciones/index.html` → `bienvenido_a_tu_jornada/index.html`
  - `bienvenido_a_tu_jornada/index.html` → `verificacion_del_vehiculo/index.html`
  - `verificacion_del_vehiculo/index.html` → `registro_de_llegada_a_base/index.html`
  - `registro_de_llegada_a_base/index.html` → `registro_de_llegada_a_base_mapa/index.html`
  - `registro_de_llegada_a_base_mapa/index.html` → `trayecto_con_tarjeta_de_pasajera/index.html`
  - `trayecto_con_tarjeta_de_pasajera/index.html` → `regreso_a_base_asignada/index.html`
  - `regreso_a_base_asignada/index.html` → `resumen_de_jornada/index.html`
  - `resumen_de_jornada/index.html` → `turno_finalizado/index.html`
- Ensure any secondary navigation (e.g., alternative login paths) also uses `window.location.href` so testers can traverse the demo without editing URLs manually.

## 2. Add manual llegada a base form screen ✅ Completado
- Status: Se creó la pantalla dedicada y se conectó desde el flujo principal para admitir registros manuales completos.
- Create a new folder `registro_de_llegada_manual/` with `index.html` that reuses the form styling from `bienvenido_a_tu_jornada/index.html` to collect **Base**, **Hora de llegada**, and **Comentarios**.
- Provide two actions on the new screen: **Guardar** returning to `registro_de_llegada_a_base/index.html` and **Continuar** taking the user to `registro_de_llegada_a_base_mapa/index.html`.
- Update the existing "Registrar manualmente" link in `registro_de_llegada_a_base/index.html` so it routes to the new page and include the same navigation scripting pattern as the other screens.

## 3. Design rechazo de viaje confirmation screen
- Add `rechazo_de_viaje/index.html` beside the other demo folders, using the dark card styling from `regreso_a_base_asignada/index.html`.
- Include a short justification textarea and preset reasons such as **Fuera de cobertura** or **Otro motivo**, reusing the checklist styling from `verificacion_del_vehiculo/index.html`.
- Modify the **Rechazar** button in `registro_de_llegada_a_base_mapa/index.html` to navigate to the new screen, and wire the confirmation action there to proceed to `regreso_a_base_asignada/index.html` (or whichever queue screen product decides).

## 4. Build historial de jornadas overview screen
- Create a folder `historial_de_jornadas/` with an `index.html` that imports the shared stylesheet and renders past jornadas using the card layout from `resumen_de_jornada/index.html`.
- Add filters for date range and totals, leveraging the grid rows from the existing resumen page for consistency.
- Update the **Ver historial completo** button in `resumen_de_jornada/index.html` to navigate to the new screen, and include a back control there to return to `resumen_de_jornada/index.html`.

## Testing
- No automated tests are defined for the static demo. Manual verification involves clicking through the full sequence to confirm every CTA advances appropriately and back-links return to their origin screens.

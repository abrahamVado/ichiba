import Link from "next/link";
import type { ScreenInfo } from "../lib/screens";

//1.- Declarar las props esperadas para reutilizar el menú en distintas secciones.
type ScreenMenuProps = {
  title: string;
  description?: string;
  screens: ScreenInfo[];
};

//2.- Renderizar una tarjeta con enlaces hacia cada pantalla del flujo indicado.
export function ScreenMenu({ title, description, screens }: ScreenMenuProps) {
  return (
    <section className="menu-section">
      {/* //3.- Mostrar encabezados descriptivos para orientar al usuario en la navegación. */}
      <header>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </header>

      {/* //4.- Generar la lista de enlaces a partir del catálogo centralizado. */}
      <ul className="menu-list">
        {screens.map((screen) => (
          <li key={screen.slug}>
            <Link href={screen.path} className="menu-link">
              <span className="menu-link__title">{screen.title}</span>
              <span className="menu-link__desc">{screen.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

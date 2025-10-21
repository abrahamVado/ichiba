"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ScreenInfo } from "../lib/screens";

//1.- Renderizar la barra lateral con los accesos confirmados por diseño y producto.
export function AdminNavigation({ items }: { items: ScreenInfo[] }) {
  const pathname = usePathname();

  //2.- Identificar la ruta activa para reforzar la navegación contextual.
  return (
    <aside className="admin-nav" aria-label="Navegación del panel administrativo">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
          </div>
        </div>
      </div>

      <div className="admin-nav__intro">
        <p className="admin-nav__title">Operaciones</p>
        <p className="admin-nav__subtitle">Coordinación diaria del centro de control.</p>
      </div>

      <ul className="admin-nav__list">
        {items.map((item) => {
          const isActive = pathname === item.path;
          return (
            <li key={item.slug} className="admin-nav__item">
              <Link
                href={item.path}
                className={isActive ? "admin-nav__link admin-nav__link--active" : "admin-nav__link"}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="admin-nav__link-title">{item.title}</span>
                <span className="admin-nav__link-desc">{item.description}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

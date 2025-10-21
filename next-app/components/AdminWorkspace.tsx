"use client";

import type { ReactNode } from "react";
import { adminScreens } from "../lib/screens";
import { useBodyClass } from "../lib/useBodyClass";
import { AdminNavigation } from "./AdminNavigation";

interface AdminWorkspaceProps {
  title: string;
  subtitle: string;
  bodyClass?: string;
  children: ReactNode;
}

//1.- Componer la vista interna reutilizando navegación, copy y clase de cuerpo común.
export function AdminWorkspace({ title, subtitle, bodyClass = "page-admin-workspace", children }: AdminWorkspaceProps) {
  useBodyClass(bodyClass);

  //2.- Filtrar la navegación para omitir el acceso público de login.
  const workspaceScreens = adminScreens.filter((screen) => screen.path !== "/administrador");

  return (
    <div className="admin-workspace">
      <AdminNavigation items={workspaceScreens} />

      <section className="admin-workspace__content" aria-labelledby="admin-workspace-title">
        <header className="admin-workspace__header">
          <h1 id="admin-workspace-title" className="admin-workspace__title">
            {title}
          </h1>
          <p className="admin-workspace__subtitle">{subtitle}</p>
        </header>

        <div className="admin-workspace__body">{children}</div>
      </section>
    </div>
  );
}

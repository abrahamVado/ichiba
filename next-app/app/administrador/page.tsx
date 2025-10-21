"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Presentar el acceso administrativo con copy consensuado con producto y diseño.
export default function AdministradorLoginPage() {
  useBodyClass("page-admin-login");
  const router = useRouter();

  //2.- Simular la autenticación trasladando a la vista de panel al enviar el formulario.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/administrador/panel");
  };

  return (
    <main className="admin-login" aria-labelledby="admin-login-title">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
          </div>
        </div>
      </div>

      <h1 id="admin-login-title" className="admin-login__title">
        Centro de control Red TOSUR
      </h1>
      <p className="admin-login__subtitle">
        Inicia sesión para revisar métricas, monitorear unidades y coordinar respuestas.
      </p>

      <form className="admin-login__form" onSubmit={handleSubmit}>
        <label className="admin-login__label" htmlFor="admin-email">
          Correo corporativo
        </label>
        <input
          id="admin-email"
          className="admin-login__input"
          type="email"
          defaultValue="coordinacion@tosur.mx"
          required
        />

        <label className="admin-login__label" htmlFor="admin-pass">
          Código de acceso
        </label>
        <input id="admin-pass" className="admin-login__input" type="password" defaultValue="••••••" required />

        <div className="admin-login__actions">
          <button type="submit" className="admin-login__submit">
            Entrar al panel
          </button>
          <button type="button" className="admin-login__secondary" onClick={() => router.push("/")}>
            Volver al inicio
          </button>
        </div>
      </form>

      <p className="admin-login__note">
        Seguridad reforzada: se envía un token de confirmación al dispositivo de guardia.
      </p>
    </main>
  );
}

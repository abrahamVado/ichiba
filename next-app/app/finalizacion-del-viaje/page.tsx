"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useBodyClass } from "../../lib/useBodyClass";

//1.- Construir la pantalla para confirmar el cierre del viaje y registrar la información final.
export default function FinalizacionDelViajePage() {
  useBodyClass("page-finalizacion-del-viaje");
  const router = useRouter();

  //2.- Administrar el estado del formulario y rastrear los mensajes de validación necesarios.
  const [deliveredConfirmed, setDeliveredConfirmed] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [amount, setAmount] = useState("");
  const [incidents, setIncidents] = useState("");
  const [errors, setErrors] = useState<{ delivered?: string; paymentMethod?: string; amount?: string }>({});

  //3.- Validar cada campo requerido y dirigir al regreso a base una vez completado el registro.
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { delivered?: string; paymentMethod?: string; amount?: string } = {};

    if (!deliveredConfirmed) {
      nextErrors.delivered = "Confirme que la pasajera fue entregada en su destino.";
    }

    if (!paymentMethod) {
      nextErrors.paymentMethod = "Seleccione el método de pago registrado.";
    }

    const normalizedAmount = amount.trim();
    const parsedAmount = Number(normalizedAmount.replace(/,/g, "."));
    if (!normalizedAmount) {
      nextErrors.amount = "Indique el monto cobrado.";
    } else if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = "Capture un monto válido mayor a cero.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      router.push("/regreso-a-base-asignada");
    }
  };

  return (
    <main className="wrap" role="main">
      <div className="brand-anchor" aria-hidden="true">
        <div className="pin brand-pin">
          <div className="badge brand-badge">
            <img src="/assets/images/logo/logo.png" alt="Logo de Red TOSUR" loading="lazy" />
          </div>
        </div>
      </div>

      <h1 className="title">Finalización del viaje</h1>
      <p className="lead">Confirme la entrega segura de la pasajera y registre el pago recibido.</p>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <section className="card" aria-labelledby="summary-heading">
          <h2 id="summary-heading" className="section-title">
            Detalles finales del servicio
          </h2>

          <div className="field checkbox-field">
            <label className="checkbox">
              <input
                type="checkbox"
                checked={deliveredConfirmed}
                onChange={(event) => setDeliveredConfirmed(event.target.checked)}
              />
              <span>Confirmo que la pasajera llegó a su destino y fue entregada personalmente.</span>
            </label>
            {errors.delivered ? <p className="error">{errors.delivered}</p> : null}
          </div>

          <div className="field">
            <label className="label" htmlFor="paymentMethod">
              Método de pago
            </label>
            <select
              id="paymentMethod"
              className="input"
              value={paymentMethod}
              onChange={(event) => setPaymentMethod(event.target.value)}
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="efectivo">Efectivo</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
            </select>
            {errors.paymentMethod ? <p className="error">{errors.paymentMethod}</p> : null}
          </div>

          <div className="field">
            <label className="label" htmlFor="amount">
              Monto cobrado
            </label>
            <div className="amount">
              <span className="prefix">$</span>
              <input
                id="amount"
                className="input"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </div>
            {errors.amount ? <p className="error">{errors.amount}</p> : null}
          </div>

          <div className="field">
            <label className="label" htmlFor="incidents">
              Incidencias (opcional)
            </label>
            <textarea
              id="incidents"
              className="textarea"
              placeholder="Describa cualquier detalle relevante antes de cerrar el viaje."
              value={incidents}
              onChange={(event) => setIncidents(event.target.value)}
              rows={4}
            ></textarea>
          </div>
        </section>

        <button className="btn primary" type="submit">
          Confirmar cierre del viaje
        </button>
      </form>

      {incidents.trim() ? (
        <section className="incidents-preview" aria-live="polite">
          <h2 className="section-title">Incidencias registradas</h2>
          <p className="incident-note">{incidents.trim()}</p>
        </section>
      ) : null}
    </main>
  );
}

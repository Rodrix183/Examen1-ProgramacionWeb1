import React, { useState } from "react";
import { createRoot } from "react-dom/client";

function App() {
   // Guardamos los 5 precios como strings para facilitar validación
  const [precios, setPrecios] = useState(["", "", "", "", ""]);

  // Resultados
  const [subtotal, setSubtotal] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [total, setTotal] = useState(0);

  const onChangePrecio = (idx, value) => {
    // Permitimos vacío o número >= 0
    setPrecios((prev) => {
      const copy = [...prev];
      copy[idx] = value;
      return copy;
    });
  };

const formatMoney = (n) =>
    new Intl.NumberFormat("es-HN", {
      style: "currency",
      currency: "HNL",
      minimumFractionDigits: 2,
    }).format(n || 0);

 const validar = () => {
    // 1) No vacíos
    if (precios.some((p) => p === "")) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, llene los 5 precios.",
      });
      return false;
    }
    // 2) Numéricos y >= 0
    const nums = precios.map((p) => Number(p));
    if (nums.some((n) => isNaN(n) || n < 0)) {
      Swal.fire({
        icon: "error",
        title: "Valores inválidos",
        text: "Solo se aceptan valores numéricos mayores o iguales a 0.",
      });
      return false;
    }
    return true;
  };

 const calcularDescuento = (st) => {
    // Rangos:
    // 0.00 – 999.99 -> 0%
    // 1,000.00 – 4,999.99 -> 10%
    // 5,000.00 – 8,999.99 -> 20%
    // 9,000.00 – 12,999.99 -> 30%
    // 13,000.00 en adelante -> 40%
    if (st < 1000) return 0;
    if (st < 5000) return 10;
    if (st < 9000) return 20;
    if (st < 13000) return 30;
    return 40;
  };

const handleCalcular = () => {
    if (!validar()) return;

    const nums = precios.map((p) => Number(p));
    const st = nums.reduce((acc, n) => acc + n, 0);

    const pct = calcularDescuento(st);
    const desc = (st * pct) / 100;
    const tot = st - desc;

    setSubtotal(st);
    setPorcentaje(pct);
    setDescuento(desc);
    setTotal(tot);

    Swal.fire({
      icon: "success",
      title: "Cálculo realizado",
      text: Se aplicó un descuento del ${pct}%.,
      timer: 1400,
      showConfirmButton: false,
    });
  };

  const handleLimpiar = () => {
    setPrecios(["", "", "", "", ""]);
    setSubtotal(0);
    setPorcentaje(0);
    setDescuento(0);
    setTotal(0);

    Swal.fire({
      icon: "info",
      title: "Formulario limpiado",
      timer: 1100,
      showConfirmButton: false,
    });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h1 className="h4 text-center mb-3">Calculadora de Descuentos</h1>
              <p className="text-muted small text-center mb-4">
                Ingrese los precios de los 5 productos.
              </p>

              {/* Formulario de entrada */}
              <form onSubmit={(e) => e.preventDefault()}>
                {precios.map((val, idx) => (
                  <div className="mb-3" key={idx}>
                    <label className="form-label">
                      Producto {idx + 1} (L)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={val}
                      onChange={(e) => onChangePrecio(idx, e.target.value)}
                    />
                  </div>
                ))}

                <div className="d-flex gap-2 mt-3">
                  <button
                    type="button"
                    className="btn btn-primary w-100"
                    onClick={handleCalcular}
                  >
                    Calcular
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    onClick={handleLimpiar}
                  >
                    Limpiar
                  </button>
                </div>
              </form>

              {/* Resultados */}
              <hr className="my-4" />
              <h2 className="h6">Resultados de la compra</h2>

              <div className="mb-3">
                <label className="form-label">Subtotal</label>
                <input
                  className="form-control"
                  value={formatMoney(subtotal)}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label className="form-label mb-0">Descuento</label>
                  <span className="badge text-bg-info">
                    Descuento {porcentaje}%
                  </span>
                </div>
                <input
                  className="form-control"
                  value={formatMoney(descuento)}
                  readOnly
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Total a Pagar</label>
                <input
                  className="form-control"
                  value={formatMoney(total)}
                  readOnly
                />
              </div>

              <p className="text-muted small mt-3">
                *Rangos: 0–999.99 (0%), 1,000–4,999.99 (10%), 5,000–8,999.99
                (20%), 9,000–12,999.99 (30%), 13,000+ (40%).
              </p>
            </div>
          </div>
          <p className="text-center text-muted mt-3 mb-0 small">
            Hecho con React + Bootstrap + SweetAlert2 (CDN).
          </p>
        </div>
      </div>
    </div>
  );
}

  




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





}
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






}
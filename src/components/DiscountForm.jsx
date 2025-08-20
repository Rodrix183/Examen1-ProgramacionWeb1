import { useState } from "react";
import Swal from "sweetalert2";

function DiscountForm({ setFinalPrice }) {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!price || !discount) {
      Swal.fire("Error", "Debes ingresar ambos valores", "error");
      return;
    }

    if (discount < 0 || discount > 100) {
      Swal.fire("Error", "El descuento debe estar entre 0 y 100%", "warning");
      return;
    }

    const result = price - (price * discount) / 100;
    setFinalPrice(result.toFixed(2));

    Swal.fire("¡Listo!", "El cálculo se ha realizado", "success");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md w-80"
    >
      <div className="mb-4">
        <label className="block text-gray-700">Precio ($)</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full border p-2 rounded-lg"
          placeholder="Ejemplo: 100"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Descuento (%)</label>
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="w-full border p-2 rounded-lg"
          placeholder="Ejemplo: 20"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        Calcular
      </button>
    </form>
  );
}

export default DiscountForm;
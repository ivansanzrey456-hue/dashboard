import React, { useState, useEffect } from "react";

const Pagos = () => {
  const [formData, setFormData] = useState({
    id_socio: "",
    monto: "",
    tipo_pago: "efectivo",
    registrado_por: "Admin",
  });
  const [mensaje, setMensaje] = useState("");

  // Obtener usuario desde localStorage
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("usuario"));
  } catch (e) {
    console.warn("Usuario no encontrado o JSON inválido:", e);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuario"));
    if (user?.rol === "socio") {
      setFormData(prev => ({ ...prev, id_socio: user.id }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.id_socio || !formData.monto) {
      setMensaje("⚠️ Por favor completa todos los campos obligatorios.");
      return;
    }

    try {
      const payload = {
        ...formData,
        id_socio: Number(formData.id_socio),
        monto: Number(formData.monto),
      };

      console.log("Enviando:", payload);

      const res = await fetch("http://localhost/dashboard_pagos/registrar_pago.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      console.log("Respuesta del servidor:", text);

      const data = JSON.parse(text);

      if (data.success) {
        setMensaje("✅ Pago registrado exitosamente.");
        setFormData({
          id_socio: "",
          monto: "",
          tipo_pago: "efectivo",
          registrado_por: "Admin",
        });
      } else {
        setMensaje(`❌ ${data.mensaje || "Error al registrar el pago."}`);
      }
    } catch (error) {
      console.error("Error:", error);
      setMensaje("❌ Error de conexión con el servidor.");
    }
  };

  return (
    <div className="card" style={{ maxWidth: "500px" }}>
      <h2>Registrar Pago</h2>
      <form onSubmit={handleSubmit}>
        {user?.rol === "admin" && (
          <div style={{ marginBottom: "10px" }}>
            <label>ID del socio</label>
            <input type="number" name="id_socio" value={formData.id_socio} onChange={handleChange} required />
          </div>
        )}


        <div style={{ marginBottom: "10px" }}>
          <label>Monto pagado:</label>
          <input
            type="number"
            name="monto"
            value={formData.monto}
            onChange={handleChange}
            required
            placeholder="Ej. 250"
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Tipo de pago:</label>
          <select
            name="tipo_pago"
            value={formData.tipo_pago}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "none" }}
          >
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
            <option value="cheque">Cheque</option>
          </select>
        </div>

        <button type="submit">💾 Registrar Pago</button>
      </form>

      {mensaje && (
        <p style={{ marginTop: "15px", color: mensaje.includes("✅") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
};

export default Pagos;

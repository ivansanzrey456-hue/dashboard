import React, { useState, useEffect } from "react";

const RegistrarSocio = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    password: "",
    telefono: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [socios, setSocios] = useState([]);
  const [search, setSearch] = useState(""); // <-- búsqueda

  const nombreRegex = /^[A-Za-z\s]+$/; // Solo letras y espacios
  const telefonoRegex = /^\d{10}$/; // Solo 10 dígitos
  const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validación básica de email

  // Manejo de inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Registrar socio
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre || !formData.apellido_paterno || !formData.apellido_materno || !formData.correo || !formData.password) {
      setMensaje("⚠️ Completa todos los campos obligatorios.");
      return;
    }
    if (!nombreRegex.test(formData.nombre) || !nombreRegex.test(formData.apellido_paterno) || !nombreRegex.test(formData.apellido_materno)) {
      setMensaje("⚠️ Nombre o apellidos inválidos, solo letras y espacios.");
      return;
    }
    if (formData.telefono && !telefonoRegex.test(formData.telefono)) {
      setMensaje("⚠️ Teléfono inválido, debe contener 10 dígitos.");
      return;
    }
    if (!correoRegex.test(formData.correo)) {
      setMensaje("⚠️ Correo inválido.");
      return;
    }

    // Enviar datos al backend
    try {
      const res = await fetch("http://localhost/dashboard_pagos/registrar_socio.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMensaje("✅ Socio registrado!");
        setFormData({ nombre: "", apellido_paterno: "", apellido_materno: "", correo: "", password: "", telefono: "" });
        fetchSocios();
      } else {
        setMensaje(`❌ ${data.mensaje}`);
      }
    } catch (err) {
      console.error(err);
      setMensaje("❌ Error al registrar socio.");
    }
  };

  // Obtener socios registrados
  const fetchSocios = async () => {
    try {
      const res = await fetch("http://localhost/dashboard_pagos/obtener_socios.php");
      const data = await res.json();
      if (data.success) {
        // Orden ascendente por ID
        const sorted = data.socios.sort((a, b) => a.id - b.id);
        setSocios(sorted);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSocios();
  }, []);

  // Filtrado por búsqueda
  const filteredSocios = socios.filter((s) =>
    s.nombre.toLowerCase().includes(search.toLowerCase()) ||
    s.apellido_paterno.toLowerCase().includes(search.toLowerCase()) ||
    s.apellido_materno.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Registrar Socio</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="apellido_paterno" value={formData.apellido_paterno} onChange={handleChange} placeholder="Apellido Paterno" required />
        <input name="apellido_materno" value={formData.apellido_materno} onChange={handleChange} placeholder="Apellido Materno" required />
        <input name="correo" value={formData.correo} onChange={handleChange} placeholder="Correo" required />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Contraseña" required />
        <input name="telefono" value={formData.telefono} onChange={handleChange} placeholder="Teléfono" />
        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <h3>Socios Registrados</h3>

      <input
        type="text"
        placeholder="Buscar por nombre o apellido"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px", width: "100%" }}
      />

      <table border="1" cellPadding="5" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido Paterno</th>
            <th>Apellido Materno</th>
            <th>Correo</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {filteredSocios.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.nombre}</td>
              <td>{s.apellido_paterno}</td>
              <td>{s.apellido_materno}</td>
              <td>{s.correo}</td>
              <td>{s.telefono}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistrarSocio;

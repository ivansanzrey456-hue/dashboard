import React, { useEffect, useState } from "react";

const Socios = () => {
  const [socios, setSocios] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null); // ID del socio que se está editando
  const [editData, setEditData] = useState({}); // Datos temporales mientras se edita

  const fetchSocios = async () => {
    try {
      const res = await fetch("http://localhost/dashboard_pagos/obtener_socios.php");
      const data = await res.json();
      if (data.success) {
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

  const filteredSocios = socios.filter(
    (s) =>
      s.nombre.toLowerCase().includes(search.toLowerCase()) ||
      s.apellido_paterno.toLowerCase().includes(search.toLowerCase()) ||
      s.apellido_materno.toLowerCase().includes(search.toLowerCase())
  );

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este socio?")) return;

    try {
      const res = await fetch("http://localhost/dashboard_pagos/actualizar_o_eliminar_socio.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "eliminar", id }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSocios();
        alert("Socio eliminado ✅");
      } else {
        alert(`Error: ${data.mensaje}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error al eliminar socio");
    }
  };

  const handleEditar = (socio) => {
    setEditId(socio.id);
    setEditData({ ...socio });
  };

  const handleCancelar = () => {
    setEditId(null);
    setEditData({});
  };

  const handleGuardar = async () => {
    if (!window.confirm("¿Deseas guardar los cambios de este socio?")) return;

    try {
      const res = await fetch("http://localhost/dashboard_pagos/actualizar_o_eliminar_socio.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "actualizar", ...editData }),
      });
      const data = await res.json();
      if (data.success) {
        fetchSocios();
        setEditId(null);
        setEditData({});
        alert("Socio actualizado ✅");
      } else {
        alert(`Error: ${data.mensaje}`);
      }
    } catch (err) {
      console.error(err);
      alert("Error al actualizar socio");
    }
  };

  return (
    <div>
      <h2>Lista de Socios</h2>

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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredSocios.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>
                {editId === s.id ? (
                  <input
                    value={editData.nombre}
                    onChange={(e) => setEditData({ ...editData, nombre: e.target.value })}
                  />
                ) : (
                  s.nombre
                )}
              </td>
              <td>
                {editId === s.id ? (
                  <input
                    value={editData.apellido_paterno}
                    onChange={(e) => setEditData({ ...editData, apellido_paterno: e.target.value })}
                  />
                ) : (
                  s.apellido_paterno
                )}
              </td>
              <td>
                {editId === s.id ? (
                  <input
                    value={editData.apellido_materno}
                    onChange={(e) => setEditData({ ...editData, apellido_materno: e.target.value })}
                  />
                ) : (
                  s.apellido_materno
                )}
              </td>
              <td>
                {editId === s.id ? (
                  <input
                    value={editData.correo}
                    onChange={(e) => setEditData({ ...editData, correo: e.target.value })}
                  />
                ) : (
                  s.correo
                )}
              </td>
              <td>
                {editId === s.id ? (
                  <input
                    value={editData.telefono}
                    onChange={(e) => setEditData({ ...editData, telefono: e.target.value })}
                  />
                ) : (
                  s.telefono
                )}
              </td>
              <td>
                {editId === s.id ? (
                  <>
                    <button onClick={handleGuardar}>Guardar</button>{" "}
                    <button onClick={handleCancelar}>Cancelar</button>{" "}
                    <button onClick={() => handleEliminar(s.id)}>Eliminar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditar(s)}>Editar</button>{" "}
                    <button onClick={() => handleEliminar(s.id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Socios;

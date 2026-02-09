import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import DashboardHome from "./components/DashboardHome";
import RegistrarSocio from "./components/RegistrarSocio";
import Pagos from "./components/Pagos";
import Estadisticas from "./components/Estadisticas";
import Socios from "./components/Socios";

function App() {
  const navigate = useNavigate();
  let user = null;
    try {
      user = JSON.parse(localStorage.getItem("usuario"));
    } catch (e) {
      console.warn("Usuario no encontrado o JSON inválido:", e);
    }
  const rol = user?.rol || "usuario";


  useEffect(() => {
    if (!user) navigate("/login"); // Si no hay sesión → redirigir al login
  }, [user, navigate]);

  const [view, setView] = useState("home");

  const renderView = () => {
    switch (view) {
      case "home":
        return <DashboardHome user={user} />;
      case "registrarSocio":
        return <RegistrarSocio />;
      case "gestionarSocios":
        return <Socios />;
      case "pagos":
        return <Pagos />;
      case "estadisticas":
        return <Estadisticas />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar setView={setView} rol={rol} />
      <div style={{ flex: 1, padding: "20px" }}>{renderView()}</div>
    </div>
  );
}

export default App;

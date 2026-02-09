import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ setView, rol, currentView }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const menuItems = [
    { id: "home", label: "🏠 Inicio", icon: "🏠" },
    ...(rol === "admin" 
      ? [
          { id: "registrarSocio", label: "👤 Registrar Socio", icon: "👤" },
          { id: "gestionarSocios", label: "📊 Gestionar Socios", icon: "📊" },
          { id: "pagos", label: "💳 Pagos", icon: "💳" },
          { id: "estadisticas", label: "📈 Estadísticas", icon: "📈" }
        ]
      : []
    )
  ];

  return (
    <div className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Header del Sidebar */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="logo-icon">⚡</div>
          {!isCollapsed && <h2>Dashboard</h2>}
        </div>
        <button 
          className="toggle-btn"
          onClick={toggleSidebar}
          title={isCollapsed ? "Expandir" : "Contraer"}
        >
          {isCollapsed ? "➡️" : "⬅️"}
        </button>
      </div>

      {/* Menú de Navegación */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? 'nav-item-active' : ''}`}
            onClick={() => setView(item.id)}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {currentView === item.id && !isCollapsed && (
              <div className="active-indicator"></div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer del Sidebar */}
      <div className="sidebar-footer">
        <button 
          className="logout-btn"
          onClick={handleLogout}
          title={isCollapsed ? "Cerrar Sesión" : ""}
        >
          <span className="logout-icon">🚪</span>
          {!isCollapsed && <span>Cerrar Sesión</span>}
        </button>
      </div>

      {/* Efecto de brillo en el borde */}
      <div className="sidebar-glow"></div>
    </div>
  );
};

export default Sidebar;
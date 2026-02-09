import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!correo || !password) {
      setMensaje("⚠️ Completa todos los campos.");
      setIsLoading(false);
      return;
    }

    // SIMULACIÓN de login
    setTimeout(() => {
      const fakeUser = {
        id: 1,
        nombre: "Usuario Demo",
        rol: "Administrador"
      };

      localStorage.setItem("usuario", JSON.stringify(fakeUser));

      setMensaje("🎉 ¡Login demo exitoso! Redirigiendo...");
      setTimeout(() => {
        navigate("/");
      }, 1200);

      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="login-container">
      {/* Fondo animado */}
      <div className="login-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <h1>Dashboard Pagos</h1>
          </div>
          <p className="login-subtitle">Demo interactivo</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <div className="input-container">
              <input
                type="email"
                placeholder=" "
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="login-input"
                disabled={isLoading}
              />
              <label className="input-label">
                📧 Correo electrónico
              </label>
              <div className="input-underline"></div>
            </div>
          </div>

          <div className="input-group">
            <div className="input-container">
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
                disabled={isLoading}
              />
              <label className="input-label">
                🔒 Contraseña
              </label>
              <div className="input-underline"></div>
            </div>
          </div>

          <button 
            type="submit" 
            className={`login-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Procesando..." : "🚀 Entrar (Demo)"}
          </button>
        </form>

        {mensaje && (
          <div className={`message ${mensaje.includes('⚠️') ? 'error' : 'success'}`}>
            {mensaje}
          </div>
        )}

        <div className="login-footer">
          <p>Modo demostración. No requiere backend.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState, useEffect } from 'react';
import '../styles/bienvenida.css';

function Bienvenida({ onStart }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="bienvenida-modern-container">
      {/* Orbes luminosos de fondo */}
      <div className="glow-orb orb-1"></div>
      <div className="glow-orb orb-2"></div>

      <div className={`bienvenida-glass-card ${isLoaded ? 'fade-in' : ''}`}>
        <div className="badge-pill">
          <span className="badge-dot"></span> Módulo de Gestión v2.0
        </div>
        
        <h1 className="bienvenida-headline">
          Control de Acceso <br />
          <span className="gradient-text">Piscina & Gimnasio</span>
        </h1>
        
        <p className="bienvenida-subtext">
          Plataforma integral para la administración optimizada de socios, control de entradas y seguimiento de membresías.
        </p>

        {/* Bloques de características con diseño minimalista sin íconos */}
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-indicator"></span>
            <span>Optimizado</span>
          </div>
          <div className="feature-item">
            <span className="feature-indicator"></span>
            <span>Alta Fiabilidad</span>
          </div>
          <div className="feature-item">
            <span className="feature-indicator"></span>
            <span>Tiempo Real</span>
          </div>
        </div>
        
        <button className="modern-action-btn" onClick={onStart}>
          <span>Iniciar Sesión en el Sistema</span>
          <svg className="btn-arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Bienvenida;
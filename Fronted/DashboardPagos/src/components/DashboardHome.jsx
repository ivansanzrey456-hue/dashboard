import React from "react";

const DashboardHome = ({ user }) => {
  return (
    <div className="card">
      <h1>Bienvenido, {user?.nombre || "invitado"}!</h1>
      <p>Selecciona una opción del menú lateral para comenzar.</p>
    </div>
  );
};

export default DashboardHome;

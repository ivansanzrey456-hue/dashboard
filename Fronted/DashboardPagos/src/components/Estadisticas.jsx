import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./graficas.css";

function Estadisticas() {
  const [stats, setStats] = useState(null);
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);
  const chartInstance1 = useRef(null);
  const chartInstance2 = useRef(null);

  useEffect(() => {
    fetch("http://localhost/dashboard_pagos/getStats.php")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error al obtener estadísticas:", err));
  }, []);

  useEffect(() => {
    if (!stats) return;

    // Destruir gráficas anteriores si existen
    if (chartInstance1.current) {
      chartInstance1.current.destroy();
    }
    if (chartInstance2.current) {
      chartInstance2.current.destroy();
    }

    // Gráfico de pagos por mes
    const ctx1 = chartRef1.current;
    chartInstance1.current = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: stats.pagosPorMes.map(item => item.mes),
        datasets: [
          {
            label: "Monto mensual ($)",
            data: stats.pagosPorMes.map(item => item.total),
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            borderColor: "rgba(255, 255, 255, 0.8)",
            borderWidth: 1,
            borderRadius: 8,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { 
            display: false 
          },
          title: { 
            display: true, 
            text: "💰 Total recaudado por mes",
            color: "rgba(255, 255, 255, 0.9)",
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)"
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)"
            }
          },
          y: {
            grid: {
              color: "rgba(255, 255, 255, 0.1)"
            },
            ticks: {
              color: "rgba(255, 255, 255, 0.7)"
            },
            beginAtZero: true
          }
        }
      }
    });

    // Gráfico por tipo de pago
    const ctx2 = chartRef2.current;
    chartInstance2.current = new Chart(ctx2, {
      type: "pie",
      data: {
        labels: stats.pagosPorTipo.map(item => item.tipo_pago),
        datasets: [
          {
            data: stats.pagosPorTipo.map(item => item.cantidad),
            backgroundColor: [
              "rgba(102, 126, 234, 0.8)",
              "rgba(118, 75, 162, 0.8)",
              "rgba(255, 99, 132, 0.8)",
              "rgba(255, 206, 86, 0.8)",
              "rgba(75, 192, 192, 0.8)",
              "rgba(153, 102, 255, 0.8)"
            ],
            borderColor: "rgba(255, 255, 255, 0.3)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: "rgba(255, 255, 255, 0.8)",
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          title: { 
            display: true, 
            text: "💳 Pagos por tipo",
            color: "rgba(255, 255, 255, 0.9)",
            font: {
              size: 16,
              weight: 'bold'
            }
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartInstance1.current) {
        chartInstance1.current.destroy();
      }
      if (chartInstance2.current) {
        chartInstance2.current.destroy();
      }
    };
  }, [stats]);

  if (!stats) return (
    <div className="card loading-container">
      <p>Cargando estadísticas...</p>
    </div>
  );

  return (
    <div className="estadisticas-container">
      <h2 className="estadisticas-title">
        📊 Estadísticas Generales
      </h2>

      {/* Tarjetas resumen con estilo glass */}
      <div className="resumen-cards">
        <div className="card resumen-card">
          <h3 className="resumen-title">
            👥 Socios Totales
          </h3>
          <p className="resumen-value">
            {stats.totalSocios}
          </p>
        </div>

        <div className="card resumen-card">
          <h3 className="resumen-title">
            💰 Total Recaudado
          </h3>
          <p className="resumen-value">
            ${stats.totalRecaudado}
          </p>
        </div>
      </div>

      {/* Contenedores para gráficas */}
      <div className="graficas-grid">
        {/* Gráfica de barras */}
        <div className="card grafica-container">
          <div className="grafica-wrapper">
            <canvas ref={chartRef1} />
          </div>
        </div>

        {/* Gráfica de pie */}
        <div className="card grafica-container">
          <div className="grafica-wrapper">
            <canvas ref={chartRef2} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;
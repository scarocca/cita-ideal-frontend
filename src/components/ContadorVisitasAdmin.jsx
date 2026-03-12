import React, { useEffect, useState } from 'react';

const API_URL = "https://cita-ideal-backend.onrender.com";

const ContadorVisitasAdmin = () => {
  const [totalVisitas, setTotalVisitas] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        // Si tienes seguridad activa, aquí deberías agregar el header de Authorization
        const response = await fetch(`${API_URL}/api/visits/total`);
        const data = await response.json();
        setTotalVisitas(data);
      } catch (error) {
        console.error("Error al obtener visitas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  return (
    <div className="bg-white rounded-[2rem] p-6 border border-orange-100 shadow-sm flex items-center justify-between mb-8">
      <div>
        <h3 className="text-xs font-bold text-rose-900 uppercase tracking-widest opacity-50 mb-1">
          Estadísticas Internas
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-serif font-bold text-rose-900">
            {loading ? "..." : totalVisitas.toLocaleString()}
          </span>
          <span className="text-sm font-medium text-orange-400 uppercase">
            Visitas Totales
          </span>
        </div>
      </div>
      
      <div className="h-12 w-12 bg-orange-50 rounded-2xl flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      </div>
    </div>
  );
};

export default ContadorVisitasAdmin;
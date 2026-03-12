import React, { useState } from 'react';
import CalendarioDisponibilidad from './CalendarioDisponibilidad'; // Importamos el componente inteligente

const PlanDetalle = ({ plan, onClose }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [mostrarCalendario, setMostrarCalendario] = useState(false);

  const handleConfirmarReserva = () => {
    if (!fechaSeleccionada) {
      alert("Por favor, selecciona una fecha primero");
      return;
    }
    // Aquí podrías abrir el formulario de datos del cliente 
    // o enviar la fecha directamente si ya tienes el usuario logueado
    console.log("Reservando el plan:", plan.nombre, "para el día:", fechaSeleccionada);
  };

  return (
    <div className="p-8 text-slate-900">
      {/* 1. Información del Plan (lo que ya tenías) */}
      <header className="mb-6">
        <h2 className="text-3xl font-serif font-bold text-rose-900">{plan.nombre}</h2>
        <p className="text-orange-600 font-bold text-xl mt-2">${plan.precio?.toLocaleString()}</p>
        <p className="mt-4 text-slate-600 leading-relaxed">{plan.descripcion}</p>
      </header>

      {/* 2. Sección de Reserva */}
      <div className="mt-8 border-t border-orange-100 pt-6">
        <h3 className="text-rose-900 font-bold mb-4 flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Reserva tu experiencia:
        </h3>

        {/* Botón para desplegar el calendario inteligente */}
        <button 
          onClick={() => setMostrarCalendario(!mostrarCalendario)}
          className="w-full py-4 bg-orange-50 border-2 border-orange-200 text-orange-700 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-100 transition-all mb-4"
        >
          {mostrarCalendario ? "Ocultar Calendario" : "Ver Fechas Disponibles"}
        </button>

        {/* Mostramos el calendario solo si el usuario hizo clic */}
        {mostrarCalendario && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-4">
            <CalendarioDisponibilidad 
              onFechaSeleccionada={(fecha) => setFechaSeleccionada(fecha)} 
            />
          </div>
        )}

        {/* Botón de Acción Final */}
        <button 
          onClick={handleConfirmarReserva}
          disabled={!fechaSeleccionada}
          className={`w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all ${
            fechaSeleccionada 
              ? 'bg-rose-600 text-white hover:bg-rose-700' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {fechaSeleccionada ? 'Confirmar Reserva' : 'Selecciona una fecha'}
        </button>
      </div>

      {/* Botón para cerrar el modal */}
      <button 
        onClick={onClose}
        className="mt-4 w-full text-slate-400 text-sm hover:text-rose-900 transition-colors"
      >
        Cerrar ventana
      </button>
    </div>
  );
};

export default PlanDetalle;
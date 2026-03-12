import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import { parseISO, getDay, format, isValid } from 'date-fns';

registerLocale('es', es);

const API_URL = "https://cita-ideal-backend.onrender.com";

const CalendarioDisponibilidad = ({ onFechaSeleccionada }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechasBloqueadas, setFechasBloqueadas] = useState([]);
  const [feriadosChile, setFeriadosChile] = useState([]);

  useEffect(() => {
    // 1. Cargar reservas (con manejo de 404)
    const fetchReservas = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/reservas/fechas-bloqueadas`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setFechasBloqueadas(data.map(f => parseISO(f)).filter(d => isValid(d)));
          }
        } else {
          console.warn("Endpoint de reservas no encontrado (404). Revisa el Controller en Java.");
        }
      } catch (e) { console.error("Error conexión Backend:", e); }
    };

    // 2. Cargar feriados usando un proxy para evitar CORS
    const fetchFeriados = async () => {
      try {
        // Probamos con esta API que suele ser más amigable con CORS
        const res = await fetch('https://feriados-cl-api.herokuapp.com/feriados/2026');
        const data = await res.json();
        if (Array.isArray(data)) {
          setFeriadosChile(data.map(f => f.fecha));
        }
      } catch (e) { 
        console.error("Error feriados (CORS): Usando solo fines de semana por ahora."); 
      }
    };

    fetchReservas();
    fetchFeriados();
  }, []);

  const esDiaHabilitado = (date) => {
    const day = getDay(date);
    const fechaString = format(date, 'yyyy-MM-dd');

    // Sábado o Domingo siempre habilitados
    const esFinDeSemana = (day === 0 || day === 6);
    // Feriado solo si la API respondió, si no, solo fin de semana
    const esFeriado = feriadosChile.length > 0 ? feriadosChile.includes(fechaString) : false;

    return esFinDeSemana || esFeriado;
  };

  return (
    <div className="p-4 bg-white rounded-[2rem] border border-orange-100 flex flex-col items-center shadow-inner">
      <DatePicker
        selected={fechaSeleccionada}
        onChange={(date) => {
          setFechaSeleccionada(date);
          if (onFechaSeleccionada) onFechaSeleccionada(date);
        }}
        inline
        locale="es"
        minDate={new Date()}
        filterDate={esDiaHabilitado}
        excludeDates={fechasBloqueadas}
        calendarClassName="tucitaideal-calendar"
      />
      <p className="mt-4 text-[9px] text-rose-900/40 uppercase font-black tracking-widest text-center">
        Disponibilidad: Sábados, Domingos y Festivos
      </p>
    </div>
  );
};

export default CalendarioDisponibilidad;
import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import { parseISO, getDay, format, isValid } from 'date-fns';

registerLocale('es', es);

const API_URL = "https://cita-ideal-backend.onrender.com";

// 🇨🇱 Lista manual de Feriados Chile 2026 (Evita errores de CORS)
const FERIADOS_CHILE_2026 = [
  "2026-01-01", "2026-04-03", "2026-04-04", "2026-05-01", 
  "2026-05-21", "2026-06-21", "2026-06-29", "2026-07-16", 
  "2026-08-15", "2026-09-18", "2026-09-19", "2026-10-12", 
  "2026-10-31", "2026-11-01", "2026-12-08", "2026-12-25"
];

const CalendarioDisponibilidad = ({ onFechaSeleccionada }) => {
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [fechasBloqueadas, setFechasBloqueadas] = useState([]);

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const res = await fetch(`${API_URL}/api/v1/reservas/fechas-bloqueadas`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setFechasBloqueadas(data.map(f => parseISO(f)).filter(d => isValid(d)));
          }
        }
      } catch (e) { console.error("Error al cargar reservas del backend:", e); }
    };
    fetchReservas();
  }, []);

  const esDiaHabilitado = (date) => {
    const day = getDay(date);
    const fechaString = format(date, 'yyyy-MM-dd');

    const esFinDeSemana = (day === 0 || day === 6); // Sábado o Domingo
    const esFeriado = FERIADOS_CHILE_2026.includes(fechaString);

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
      <div className="mt-4 text-[9px] text-rose-900/40 uppercase font-black tracking-widest text-center leading-tight">
        * Atención: Fines de semana <br/> y días festivos en Chile
      </div>
    </div>
  );
};

export default CalendarioDisponibilidad;
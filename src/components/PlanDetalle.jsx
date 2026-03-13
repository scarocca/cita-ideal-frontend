import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CalendarioDisponibilidad from './CalendarioDisponibilidad'; 

const PlanDetalle = ({ planes }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  const plan = planes.find(p => String(p.id) === String(id));
  const horariosDisponibles = ["11:00", "13:30","19:00"];

  if (!plan) return (
    <div className="min-h-screen flex items-center justify-center bg-transparent font-bold text-rose-900">
      Cargando experiencia...
    </div>
  );

  const finalizarReservaWhatsApp = () => {
    const telefono = "56986343735"; // Tu número real aquí
    const fechaFormateada = fechaSeleccionada.toLocaleDateString('es-CL', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const mensaje = `¡Hola! Me gustaría reservar una experiencia:%0A%0A` +
      `*Plan:* ${plan.nombre}%0A` +
      `*Fecha:* ${fechaFormateada}%0A` +
      `*Horario:* ${horaSeleccionada} hrs%0A` +
      `*Precio:* $${new Intl.NumberFormat('es-CL').format(plan.precioBase)}%0A%0A` +
      `¿Me podrían confirmar disponibilidad?`;

    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  };

  return (
    /* 1. bg-transparent permite ver los corazones del body */
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-transparent pt-28 pb-20 px-4"
    >
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 text-rose-600 font-bold flex items-center gap-2 hover:scale-105 transition-transform"
        >
          ← Volver a Experiencias
        </button>

        {/* 2. bg-white/90 + backdrop-blur hace que el fondo se vea sutilmente por detrás */}
        <div className="bg-white/90 backdrop-blur-md rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-rose-100/50">
          
          {/* INFO DEL PLAN */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-white/50">
            <div className="relative group overflow-hidden rounded-[2rem] mb-6 shadow-lg">
              <img 
                src={plan.imagenUrl} 
                alt={plan.nombre} 
                className="w-full h-80 object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
            </div>
            <h1 className="text-4xl font-serif font-bold text-rose-900 mb-2">{plan.nombre}</h1>
            <p className="text-2xl text-orange-600 font-bold mb-4">
              ${new Intl.NumberFormat('es-CL').format(plan.precioBase)}
            </p>
            <p className="text-slate-600 leading-relaxed text-lg italic">
              "{plan.descripcion}"
            </p>
          </div>

          {/* SECCIÓN DE RESERVA */}
          <div className="lg:w-1/2 bg-rose-50/40 p-8 lg:p-12 border-l border-rose-100 flex flex-col gap-8">
            
            {/* 1. EL CALENDARIO */}
            <div>
              <h3 className="text-rose-900 font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">1</span>
                Elige tu fecha:
              </h3>
              <div className="bg-white p-4 rounded-3xl shadow-inner flex justify-center border border-rose-100">
                <CalendarioDisponibilidad onFechaSeleccionada={(f) => {
                  setFechaSeleccionada(f);
                  setHoraSeleccionada(null);
                }} />
              </div>
            </div>

            {/* 2. LOS HORARIOS */}
            <AnimatePresence>
              {fechaSeleccionada && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  exit={{ opacity: 0, y: 10 }}
                >
                  <h3 className="text-rose-900 font-bold mb-4 uppercase tracking-widest text-sm flex items-center gap-2">
                    <span className="bg-rose-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px]">2</span>
                    Selecciona el horario:
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {horariosDisponibles.map((hora) => (
                      <button
                        key={hora}
                        onClick={() => setHoraSeleccionada(hora)}
                        className={`py-3 rounded-xl font-bold transition-all transform active:scale-95 ${
                          horaSeleccionada === hora 
                          ? 'bg-rose-600 text-white shadow-lg scale-105' 
                          : 'bg-white text-rose-900 border border-rose-200 hover:bg-rose-50'
                        }`}
                      >
                        {hora}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. BOTÓN FINAL WHATSAPP */}
            <div className="mt-auto">
              <button
                disabled={!fechaSeleccionada || !horaSeleccionada}
                onClick={finalizarReservaWhatsApp}
                className={`w-full py-5 rounded-2xl font-black text-xl shadow-xl transition-all flex items-center justify-center gap-3 ${
                  fechaSeleccionada && horaSeleccionada
                  ? 'bg-[#25D366] text-white hover:bg-[#20ba5a] hover:scale-[1.02] active:scale-95 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                }`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                RESERVAR POR WHATSAPP
              </button>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlanDetalle;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanDetalle = ({ plan, onClose }) => {
  const [cargandoImagen, setCargandoImagen] = useState(true);

  if (!plan) return null;

  const getImagenUrl = (p) => {
    const link = p.imagenUrl || p.fotoUrl || p.url || p.imagen;
    if (!link) return 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8';
    return link.replace("http://", "https://");
  };

  const handleWhatsApp = () => {
    const telefono = "56986343735"; 
    const mensaje = encodeURIComponent(`¡Hola! Me interesa reservar el momento: *${plan.nombre}* 🌊🥂.`);
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-full w-full bg-white relative overflow-hidden">
      
      {/* --- BOTÓN CERRAR (CORREGIDO Y RESALTADO) --- */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-[100] bg-white/90 backdrop-blur-md shadow-lg text-rose-900 hover:bg-rose-600 hover:text-white p-3 rounded-full transition-all duration-300 active:scale-90 border border-orange-100"
        title="Cerrar detalle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* SECCIÓN IZQUIERDA: IMAGEN */}
      <div className="md:w-5/12 h-72 md:h-auto relative bg-gray-100 border-r border-orange-50">
        <AnimatePresence>
          {cargandoImagen && (
            <motion.div 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-10 bg-gradient-to-br from-gray-200 via-orange-50 to-gray-200 animate-pulse" 
            />
          )}
        </AnimatePresence>
        
        <img 
          src={getImagenUrl(plan)} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${cargandoImagen ? 'opacity-0' : 'opacity-100'}`}
          alt={plan.nombre}
          onLoad={() => setCargandoImagen(false)} 
          onError={(e) => {
            setCargandoImagen(false);
            e.target.src = 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8';
          }}
        />
      </div>

      {/* SECCIÓN DERECHA: CONTENIDO */}
      <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-between bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="text-orange-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-2 block">Experiencia Exclusiva</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-rose-900 mb-6 leading-tight">
            {plan.nombre}
          </h2>
          <div className="w-16 h-1 bg-orange-200 mb-8 rounded-full"></div>
          
          <p className="text-gray-600 font-light text-sm md:text-base leading-relaxed whitespace-pre-wrap italic">
            "{plan.descripcion}"
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 mt-10 border-t border-orange-50 gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest block mb-1 font-bold">Inversión Total</span>
            <span className="text-4xl font-black text-rose-600">
              ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
            </span>
          </div>
          
          <button 
            onClick={handleWhatsApp} 
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1eb956] text-white px-10 py-5 rounded-2xl font-bold text-sm shadow-xl shadow-green-100 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
               <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.246 2.248 3.484 5.232 3.484 8.412-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.309 1.656zm6.29-4.143c1.589.943 3.513 1.441 5.481 1.442 5.516 0 10.005-4.489 10.008-10.007.002-2.673-1.04-5.186-2.935-7.082-1.895-1.896-4.407-2.937-7.08-2.937-5.517 0-10.006 4.489-10.009 10.007 0 2.05.536 4.047 1.554 5.792l-1.023 3.732 3.824-1.003z" />
            </svg>
            Reservar WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetalle;
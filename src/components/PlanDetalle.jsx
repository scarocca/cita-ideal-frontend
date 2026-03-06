import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanDetalle = ({ plan, onClose }) => {
  // Estado para controlar la animación de carga
  const [cargandoImagen, setCargandoImagen] = useState(true);

  if (!plan) return null;

  const handleWhatsApp = () => {
    const telefono = "56986343735"; 
    const mensaje = encodeURIComponent(
      `¡Hola! Me interesa reservar el momento mágico: *${plan.nombre}* 🌊🥂.`
    );
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-full w-full bg-white relative">
      
      <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur-sm shadow-md text-gray-400 hover:text-rose-600 p-2 rounded-full transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* CONTENEDOR DE IMAGEN CON SKELETON */}
      <div className="md:w-5/12 h-72 md:h-auto overflow-hidden relative bg-gray-100">
        
        {/* EFECTO SKELETON (Solo se ve mientras cargandoImagen es true) */}
        <AnimatePresence>
          {cargandoImagen && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
            />
          )}
        </AnimatePresence>

        <motion.img 
          initial={{ opacity: 0 }}
          animate={{ opacity: cargandoImagen ? 0 : 1 }}
          transition={{ duration: 0.5 }}
          src={plan.imagenUrl || plan.imagen || 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8'} 
          className="w-full h-full object-cover"
          alt={plan.nombre}
          // EVENTO CLAVE: Se dispara cuando la imagen termina de bajar de Cloudinary
          onLoad={() => setCargandoImagen(false)}
        />
      </div>

      {/* CONTENIDO DEL PLAN */}
      <div className="md:w-7/12 p-6 md:p-10 flex flex-col justify-between bg-white">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <span className="text-rose-500 font-bold text-[10px] uppercase tracking-[0.2em]">CitaIdeal.cl</span>
          <h2 className="text-3xl font-serif font-bold text-rose-900 mt-2 mb-4">{plan.nombre}</h2>
          <div className="w-12 h-1 bg-orange-200 mb-6"></div>
         <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 font-light whitespace-pre-wrap">
  {plan.descripcion}
</p>
        </motion.div>

        <div className="flex items-center justify-between pt-8 border-t border-orange-50">
          <div>
            <span className="text-[10px] text-gray-400 uppercase block mb-1">Inversión</span>
            <span className="text-3xl font-black text-rose-600">
              ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
            </span>
          </div>
          <button onClick={handleWhatsApp} className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95">
            Reservar WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetalle;
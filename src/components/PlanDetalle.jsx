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
    const mensaje = encodeURIComponent(`¡Hola! Me interesa reservar: *${plan.nombre}* 🌊🥂.`);
    window.open(`https://wa.me/${telefono}?text=${mensaje}`, '_blank');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-full w-full bg-white relative">
      <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-white/80 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="md:w-5/12 h-72 md:h-auto relative bg-gray-100">
        <AnimatePresence>{cargandoImagen && <div className="absolute inset-0 bg-gray-200 animate-pulse" />}</AnimatePresence>
        <img 
          src={getImagenUrl(plan)} 
          className="w-full h-full object-cover" 
          onLoad={() => setCargandoImagen(false)} 
        />
      </div>

      <div className="md:w-7/12 p-10 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-serif font-bold text-rose-900 mb-4">{plan.nombre}</h2>
          <p className="text-gray-600 font-light whitespace-pre-wrap">{plan.descripcion}</p>
        </div>
        <div className="flex items-center justify-between pt-8 border-t">
          <div>
            <span className="text-[10px] text-gray-400 uppercase block">Inversión</span>
            <span className="text-3xl font-black text-rose-600">
              {/* ✅ CORREGIDO: precioBase */}
              ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
            </span>
          </div>
          <button onClick={handleWhatsApp} className="bg-[#25D366] text-white px-8 py-4 rounded-2xl font-bold">
            Reservar WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetalle;
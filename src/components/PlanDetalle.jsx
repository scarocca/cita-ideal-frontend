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
    // CAMBIO: bg-white/80 y backdrop-blur para ver los corazones detrás
    <div className="flex flex-col md:flex-row min-h-full w-full bg-white/90 backdrop-blur-xl relative overflow-hidden rounded-[2.5rem]">
      
      {/* BOTÓN CERRAR */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-[100] bg-white/90 backdrop-blur-md shadow-lg text-rose-900 hover:bg-rose-600 hover:text-white p-3 rounded-full transition-all duration-300 active:scale-90 border border-orange-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* SECCIÓN IZQUIERDA: IMAGEN */}
      <div className="md:w-5/12 h-72 md:h-auto relative bg-gray-100/50">
        <AnimatePresence>
          {cargandoImagen && (
            <motion.div 
              exit={{ opacity: 0 }} 
              className="absolute inset-0 z-10 bg-gradient-to-br from-rose-50 via-orange-50 to-rose-50 animate-pulse" 
            />
          )}
        </AnimatePresence>
        
        <img 
          src={getImagenUrl(plan)} 
          className={`w-full h-full object-cover transition-opacity duration-500 ${cargandoImagen ? 'opacity-0' : 'opacity-100'}`}
          alt={plan.nombre}
          onLoad={() => setCargandoImagen(false)} 
        />
      </div>

      {/* SECCIÓN DERECHA: CONTENIDO (Transparente) */}
      <div className="md:w-7/12 p-8 md:p-12 flex flex-col justify-between bg-transparent">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <span className="text-orange-600 font-bold text-[10px] uppercase tracking-[0.3em] mb-2 block">Experiencia Exclusiva</span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-rose-900 mb-6 leading-tight">
            {plan.nombre}
          </h2>
          <div className="w-16 h-1 bg-orange-400/50 mb-8 rounded-full"></div>
          
          <p className="text-rose-950/80 font-light text-base md:text-lg leading-relaxed italic">
            "{plan.descripcion}"
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-between pt-10 mt-10 border-t border-rose-100 gap-6">
          <div className="text-center sm:text-left">
            <span className="text-[10px] text-rose-400 uppercase tracking-widest block mb-1 font-bold">Inversión Total</span>
            <span className="text-4xl font-black text-rose-600">
              ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
            </span>
          </div>
          
          {/* BOTÓN WHATSAPP CORREGIDO */}
          <button 
            onClick={handleWhatsApp} 
            className="w-full sm:w-auto bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-green-200 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            {/* SVG RECONSTRUIDO PARA QUE SE VEA SÍ O SÍ */}
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 fill-white" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Reservar WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanDetalle;
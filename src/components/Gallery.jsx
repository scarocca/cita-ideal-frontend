import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PlanCard = ({ plan, index, onVerDetalle }) => {
  const [cargando, setCargando] = useState(true);

  const getImagenUrl = (p) => {
    // ✅ CORREGIDO: Busca imagenUrl (Java) o variantes de Cloudinary
    const link = p.imagenUrl || p.fotoUrl || p.url || p.imagen;
    if (!link) return 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8';
    return link.replace("http://", "https://");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-orange-50 flex flex-col h-full"
    >
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <AnimatePresence>
          {cargando && (
            <motion.div exit={{ opacity: 0 }} className="absolute inset-0 z-10 bg-orange-50 animate-pulse" />
          )}
        </AnimatePresence>
        <img
          src={getImagenUrl(plan)}
          className={`w-full h-full object-cover transition-all duration-700 ${cargando ? 'opacity-0' : 'opacity-100'}`}
          alt={plan.nombre}
          onLoad={() => setCargando(false)}
          onError={(e) => { setCargando(false); e.target.src = 'https://via.placeholder.com/400'; }}
        />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-rose-900 mb-2">{plan.nombre}</h3>
        <p className="text-gray-500 text-xs mb-4 line-clamp-2">{plan.descripcion}</p>
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-orange-50">
          <div>
            <span className="block text-gray-400 text-[9px] uppercase tracking-widest">Desde</span>
            <span className="text-xl font-black text-rose-600">
              {/* ✅ CORREGIDO: precioBase */}
              ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
            </span>
          </div>
          <button onClick={() => onVerDetalle(plan)} className="bg-orange-500 text-white p-3 rounded-xl shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = ({ planes = [], onVerDetalle }) => (
  <section id="experiencias" className="py-12 px-6 bg-[#fafaf9]">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-rose-900 text-center mb-10">Experiencias a la Orilla del Mar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {planes.length > 0 ? (
          planes.map((plan, index) => <PlanCard key={plan.id || index} plan={plan} index={index} onVerDetalle={onVerDetalle} />)
        ) : (
          <p className="col-span-full text-center text-gray-400 italic">No hay planes disponibles.</p>
        )}
      </div>
    </div>
  </section>
);

export default Gallery;
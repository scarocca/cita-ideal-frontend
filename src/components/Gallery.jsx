import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Sub-componente para manejar la lógica de carga de cada tarjeta individualmente
const PlanCard = ({ plan, index, onVerDetalle }) => {
  const [cargando, setCargando] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-orange-50 flex flex-col h-full"
    >
      {/* Contenedor de Imagen con Skeleton */}
      <div className="relative h-48 overflow-hidden bg-gray-100">

        {/* Efecto Skeleton */}
        <AnimatePresence>
          {cargando && (
            <motion.div
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-orange-50 to-gray-200 animate-pulse"
            />
          )}
        </AnimatePresence>

        <img
          src={plan.imagenUrl || plan.imagen || 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8'}
          className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${cargando ? 'opacity-0' : 'opacity-100'
            }`}
          alt={plan.nombre}
          onLoad={() => setCargando(false)}
        />

        <div className="absolute top-3 right-3 z-20 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-rose-600 font-bold text-[10px] uppercase">Destacado</span>
        </div>
      </div>

      {/* Contenido de la Tarjeta */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-rose-900 mb-2">{plan.nombre}</h3>

        {/* En tu Gallery.jsx */}
        <p className="text-gray-500 font-light text-xs leading-relaxed mb-4 line-clamp-2 whitespace-pre-wrap">
          {plan.descripcion}
        </p>

        <div className="flex gap-3 mb-6">
          <span title="Decoración" className="text-base">✨</span>
          <span title="Tabla Gourmet" className="text-base">🧀</span>
          <span title="Bebestible" className="text-base">🥂</span>
        </div>

        <div className="mt-auto flex justify-between items-center pt-4 border-t border-orange-50">
          <div>
            <span className="block text-gray-400 text-[9px] uppercase tracking-widest">Desde</span>
            <span className="text-xl font-black text-rose-600">
              ${new Intl.NumberFormat('es-CL').format(plan.precioBase || 0)}
            </span>
          </div>

          <button
            onClick={() => onVerDetalle(plan)}
            className="bg-orange-500 hover:bg-rose-600 text-white p-3 rounded-xl transition-all duration-300 shadow-md shadow-orange-100 active:scale-95"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = ({ planes = [], onVerDetalle }) => {
  return (
    <section id="experiencias" className="py-12 px-6 md:px-16 relative z-10 bg-[#fafaf9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-rose-900 mb-2 text-center">
          Experiencias a la Orilla del Mar
        </h2>
        <p className="text-center text-orange-700/70 text-sm font-light mb-10 italic">
          "Decoración exclusiva, tablas gourmet y el sonido de las olas"
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {planes.map((plan, index) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={index}
              onVerDetalle={onVerDetalle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
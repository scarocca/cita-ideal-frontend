import React from 'react';
import { motion } from 'framer-motion';
import PlanCard from './PlanCard';

const Gallery = ({ planes = [] }) => (
  <section id="experiencias" className="py-24 bg-transparent relative z-10">
    <div className="max-w-7xl mx-auto px-6">
      
      {/* CABECERA DE LA SECCIÓN */}
      <div className="flex flex-col items-center mb-16 md:mb-20">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] text-orange-500/80 mb-4"
        >
          Experiencias que enamoran
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-serif font-bold text-rose-900 text-center leading-tight"
        >
          Nuestra <span className="text-rose-600 italic font-light">Colección</span> <br className="hidden md:block" /> de Planes
        </motion.h2>
        
        {/* Línea decorativa minimalista */}
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: "80px" }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
          className="h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent mt-8"
        />
      </div>

      {/* GRILLA DE PLANES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
        {planes.length > 0 ? (
          planes.map((plan, index) => (
            <PlanCard 
              key={plan.id || index} 
              plan={plan} 
              index={index} 
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-rose-900/40 font-serif italic text-xl">
              Preparando nuevos momentos mágicos para ti...
            </p>
          </div>
        )}
      </div>
    </div>
  </section>
);

export default Gallery;
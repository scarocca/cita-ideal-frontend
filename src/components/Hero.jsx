import React, { useState, useEffect } from 'react';
// 1. IMPORTANTE: Debes importar motion para que funcione el span animado
import { motion } from 'framer-motion';

const Hero = () => {
  const palabras = [
    "Un Brindis frente al Mar",
    "Cenas Bajo las Estrellas",
    "Momentos para Dos",
    "Tu Cita Ideal en la Arena"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % palabras.length);
    }, 3000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <section className="relative h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-transparent">
      
      {/* CAPA DE LUZ DE FONDO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/50 via-transparent to-orange-50/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-100/20 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-4xl">
        {/* Usamos motion.span solo si importamos motion arriba */}
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-600 font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
        >
          Experiencias que enamoran
        </motion.span>

        <h1 className="text-6xl md:text-8xl font-serif font-bold text-rose-900 mb-6 drop-shadow-sm">
          Cita<span className="text-orange-500">Ideal</span>
        </h1>

        {/* Limpiamos el texto duplicado y dejamos solo el que tiene la animación */}
        <div className="h-24 mb-6 flex items-center justify-center">
          <motion.p
            key={palabras[index]}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-4xl font-light text-rose-700/80 italic"
          >
            {palabras[index]}
          </motion.p>
        </div>

        <button
          onClick={() => {
            const el = document.getElementById('experiencias');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-rose-600 hover:bg-rose-700 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-rose-200 transition-all transform hover:scale-105 active:scale-95 border-b-4 border-rose-800"
        >
          Ver Experiencias
        </button>
      </div>

      {/* 🏹 GUÍA DE SCROLL CON CORAZÓN PROTAGONISTA */}
      <motion.div 
        animate={{ y: [0, 12, 0] }}
        transition={{ 
          duration: 2.2, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-10 flex flex-col items-center gap-2 opacity-70 pointer-events-none"
      >
        {/* Corazón más grande y con color más definido */}
        <span className="text-xl text-rose-500 drop-shadow-sm">💖</span>
        
        {/* El camino y la flecha */}
        <svg 
          width="24" 
          height="50" 
          viewBox="0 0 24 60" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-rose-400"
        >
          {/* Camino punteado elegante */}
          <line 
            x1="12" y1="2" x2="12" y2="40" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeDasharray="4 6"
            className="opacity-40"
          />
          
          {/* Flecha minimalista final */}
          <path 
            d="M18 45L12 52L6 45" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

    </section>
  );
};
    ;

export default Hero;
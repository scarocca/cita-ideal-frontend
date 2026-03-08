import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    <section id="inicio" className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-transparent">
      
      {/* CAPA DE LUZ DE FONDO */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-50/50 via-transparent to-orange-50/30"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-rose-100/20 blur-[80px] md:blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-5xl">
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-600 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[10px] md:text-xs mb-4 md:mb-6 block"
        >
          Experiencias que enamoran
        </motion.span>

        {/* H1 CORREGIDO Y RESPONSIVO */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-bold text-rose-900 mb-6 drop-shadow-sm leading-tight">
          Tu <span className="text-rose-600">Cita</span><span className="text-orange-500 italic">Ideal</span>
        </h1>

        {/* TEXTO DINÁMICO RESPONSIVO */}
        <div className="h-20 md:h-24 mb-8 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={palabras[index]}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="text-lg md:text-3xl lg:text-4xl font-light text-rose-700/80 italic px-4"
            >
              {palabras[index]}
            </motion.p>
          </AnimatePresence>
        </div>

        <button
          onClick={() => {
            // ✅ Cambiado de 'planes' a 'experiencias'
            const el = document.getElementById('experiencias');
            if (el) {
              // Calculamos la posición un poco más arriba para que el Navbar no estorbe
              const offset = 80; // Altura de tu Navbar
              const bodyRect = document.body.getBoundingClientRect().top;
              const elementRect = el.getBoundingClientRect().top;
              const elementPosition = elementRect - bodyRect;
              const offsetPosition = elementPosition - offset;

              window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
              });
            }
          }}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold text-base md:text-xl shadow-2xl shadow-rose-200 transition-all transform hover:scale-105 active:scale-95 border-b-4 border-rose-800"
        >
          Ver Experiencias
        </button>
      </div>

      {/* 🏹 GUÍA DE SCROLL */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 md:bottom-10 flex flex-col items-center gap-2 opacity-60 pointer-events-none"
      >
        <span className="text-lg md:text-xl text-rose-500">💖</span>
        <svg width="24" height="40" viewBox="0 0 24 60" fill="none" className="text-rose-400">
          <line x1="12" y1="2" x2="12" y2="35" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" className="opacity-40" />
          <path d="M18 40L12 47L6 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;
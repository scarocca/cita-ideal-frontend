import React, { useState, useEffect } from 'react';

const Hero = () => {
  // --- 1. LÓGICA (Fuera del return) ---
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

  // --- 2. VISTA (Dentro del return) ---
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white">

      {/* FONDO: Imagen de playa con degradado cálido de atardecer */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1600"
          className="w-full h-full object-cover opacity-60"
          alt="Pareja en la playa"
        />
        {/* Este degradado le da el tono "atardecer" que invita a comprar */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-200/30 via-white/40 to-white"></div>
      </div>

      <div className="relative z-10 max-w-4xl">
        <span className="text-orange-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
          Celebra el amor en la costa
        </span>

        {/* Título con color cálido y elegante */}
        <h1 className="text-6xl md:text-8xl font-serif font-bold text-rose-900 mb-6 drop-shadow-sm">
          Cita Ideal
        </h1>

        <div className="h-16">
          <p
            key={palabras[index]}
            className="text-2xl md:text-4xl font-light text-rose-700 italic animate-in fade-in slide-in-from-bottom-2 duration-1000"
          >
            {palabras[index]}
          </p>
        </div>

        <button
          onClick={() => {
            document.getElementById('experiencias')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-rose-200 transition-all transform hover:scale-105 active:scale-95"
        >
          Reservar mi momento mágico
        </button>
      </div>

      {/* Flecha indicadora suave */}
      <div className="absolute bottom-10 animate-bounce">
        <svg className="w-6 h-6 text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
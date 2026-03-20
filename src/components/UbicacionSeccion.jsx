import React from 'react';
import { motion } from 'framer-motion';

const UbicacionSeccion = () => {
  // Enlace de Google Maps para San Alfonso del Mar, Algarrobo
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3344.832742965411!2d-71.66031252344717!3d-33.34960169234914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662391001a096ad%3A0x6b16c873f1d82126!2sSan%20Alfonso%20del%20Mar!5e0!3m2!1ses-419!2scl!4v1709290000000!5m2!1ses-419!2scl";

  return (
    <section className="py-24 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-orange-500 font-bold uppercase tracking-[0.3em] text-xs"
          >
            Un escenario inolvidable
          </motion.span>
          <h2 className="text-5xl font-serif font-bold text-rose-900 mt-2 mb-4">
            Nuestra Ubicación
          </h2>
          <div className="w-24 h-1 bg-orange-400 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Tarjeta de Información */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 bg-white/80 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl border border-rose-100 rotate-2 relative z-20"
          >
            <div className="absolute -top-8 -left-8 text-6xl">🌊</div>
            <h3 className="text-3xl font-serif font-bold text-rose-800 mb-6 italic leading-tight">
              Frente a la laguna más grande del mundo
            </h3>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              Nuestras citas se realizan al borde del mar en <strong>San Alfonso del Mar</strong>, en Algarrobo. Un entorno donde el azul del mar y la tranquilidad de la laguna crean el ambiente perfecto.
            </p>
            <div className="space-y-5">
              <div className="flex items-start gap-4 text-rose-900 font-medium">
                <span className="bg-rose-100 p-3 rounded-2xl shadow-sm">📍</span>
                <div>
                  <p className="font-bold">Algarrobo, Chile</p>
                  <p className="text-sm text-rose-700/70">Camino a Mirasol s/n</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-rose-900 font-medium">
                <span className="bg-rose-100 p-3 rounded-2xl shadow-sm">🏢</span>
                <span>San Alfonso del Mar</span>
              </div>
            </div>
            
            <div className="mt-10 pt-8 border-t border-rose-100 text-center">
               <p className="font-serif italic text-rose-400 text-lg">"El mar es el mejor testigo de tu historia."</p>
            </div>
          </motion.div>

          {/* El Mapa con Estilo Postal Gigante */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-2/3 w-full relative"
          >
            {/* Adorno: Pin de Corazón */}
            <div className="absolute -top-6 right-16 z-30 bg-rose-600 text-white p-4 rounded-full shadow-2xl animate-bounce">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <div className="p-4 bg-white rounded-[4rem] shadow-2xl border border-rose-50 -rotate-1 group hover:rotate-0 transition-all duration-700">
              <div className="rounded-[3.5rem] overflow-hidden h-[500px] relative">
                {/* Filtro Romántico Suave */}
                <div className="absolute inset-0 bg-rose-400/5 pointer-events-none z-10"></div>
                
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'sepia(15%) saturate(110%) hue-rotate(330deg) brightness(1.05)' }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Ubicación San Alfonso del Mar"
                  className="opacity-95 group-hover:opacity-100 transition-opacity duration-500"
                ></iframe>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default UbicacionSeccion;
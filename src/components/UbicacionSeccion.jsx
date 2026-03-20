import React from 'react';
import { motion } from 'framer-motion';

const UbicacionSeccion = () => {
  // Coordenadas ajustadas para centrar San Alfonso del Mar (tierra + mar)
  // El parámetro 'z=16' controla el zoom. Si quieres más cerca, usa 17.
  const mapSrc ="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4713.619641943029!2d-71.65330215288168!3d-33.34410300225163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x966213cc90cbff79%3A0x434c002126608bd!2sHumedal%20Urbano%20El%20Membrillo!5e0!3m2!1ses-419!2scl!4v1774025417835!5m2!1ses-419!2scl";

  return (
    <section className="py-16 md:py-24 px-4 bg-transparent relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-rose-900 mb-4">
            Nuestra Ubicación
          </h2>
          <p className="text-orange-500 font-medium tracking-widest uppercase text-xs md:text-sm">
            San Alfonso del Mar, Algarrobo
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-8 md:gap-12">
          
          {/* Tarjeta de Información - Más compacta en móvil */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/3 flex flex-col justify-center bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-rose-100/50 shadow-sm relative z-20"
          >
            <div className="hidden md:block absolute -top-6 -left-6 text-5xl">🌊</div>
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-rose-800 mb-4 italic leading-tight text-center lg:text-left">
              Frente a la laguna de cristal
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base text-center lg:text-left">
              Te esperamos en un entorno único en el mundo. La brisa marina y el azul infinito serán el marco de tu cita.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-rose-900 font-medium">
                <span className="bg-white/60 p-2 rounded-xl shadow-sm">📍</span>
                <span className="text-sm md:text-base">Algarrobo, V Región</span>
              </div>
              
            </div>
          </motion.div>

          {/* El Mapa - Optimizado para móvil */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-2/3 w-full"
          >
            <div className="p-2 md:p-4 bg-white/60 backdrop-blur-sm rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-white/50">
              <div className="rounded-[2rem] md:rounded-[3.5rem] overflow-hidden h-[350px] md:h-[500px] relative">
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  title="Mapa San Alfonso del Mar"
                  className="opacity-90 hover:opacity-100 transition-opacity duration-500"
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
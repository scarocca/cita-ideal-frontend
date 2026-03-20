import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass = "hover:text-rose-600 transition-all flex items-center gap-2 group text-sm uppercase tracking-widest font-medium text-rose-800/80";

  return (
    <nav className="absolute top-0 w-full z-[100] bg-transparent border-rose-100/50 h-20 flex items-center">
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center relative z-10">
        
        {/* LOGO + CORAZÓN LOGIN */}
        <div className="flex items-center gap-2">
          <Link to="/login" className="opacity-5 hover:opacity-100 transition-opacity duration-1000 text-rose-300 text-[10px] cursor-default">
            ❤
          </Link>
          <Link to="/" className="text-xl md:text-2xl font-serif font-bold text-rose-900 tracking-tight">
            Tu <span className="text-rose-600">Cita</span><span className="text-orange-500 italic">Ideal</span>
          </Link>
        </div>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex items-center gap-7">
          <NavHashLink smooth to="/#inicio" className={linkClass}>
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">🏠</span>
            Inicio
          </NavHashLink>

          <NavHashLink smooth to="/#experiencias" className={linkClass}>
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">✨</span>
            Planes
          </NavHashLink>

          <Link to="/galeria" className={linkClass}>
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">📸</span>
            Galería
          </Link>

          {/* NUEVO: Enlace a Ubicación */}
          <NavHashLink smooth to="/#ubicacion" className={linkClass}>
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">📍</span>
            Ubicación
          </NavHashLink>
        </div>

        {/* --- MOBILE BOTÓN --- */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="text-rose-900 focus:outline-none p-2">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-20 left-0 w-full bg-white/95 backdrop-blur-lg border-b border-rose-100 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <NavHashLink smooth to="/#inicio" onClick={toggleMenu} className={linkClass}>
                <span>🏠</span> Inicio
              </NavHashLink>
              
              <NavHashLink smooth to="/#experiencias" onClick={toggleMenu} className={linkClass}>
                <span>✨</span> Planes
              </NavHashLink>

              <Link to="/galeria" onClick={toggleMenu} className={linkClass}>
                <span>📸</span> Galería
              </Link>

              {/* NUEVO: Ubicación en Mobile */}
              <NavHashLink smooth to="/#ubicacion" onClick={toggleMenu} className={linkClass}>
                <span>📍</span> Ubicación
              </NavHashLink>
            </div>
          </motion.div>
        )}  
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
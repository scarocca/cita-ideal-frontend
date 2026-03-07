import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Función para cerrar el menú y navegar suavemente
  const handleNavClick = (path, isAnchor = false) => {
    setIsOpen(false);
    if (isAnchor) {
      // Si es un ancla (#), navegamos al inicio y luego scrolleamos
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('experiencias');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/90 backdrop-blur-md border-b border-orange-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)} className="text-2xl font-serif font-bold text-rose-900 tracking-tighter">
          Cita<span className="text-orange-500">Ideal</span>
        </Link>

        {/* MENÚ ESCRITORIO */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavClick('/')} className="text-sm font-medium text-rose-950/70 hover:text-orange-600 transition-colors">Inicio</button>
          <button onClick={() => handleNavClick('/', true)} className="text-sm font-medium text-rose-950/70 hover:text-orange-600 transition-colors">Experiencias</button>
          <button onClick={() => handleNavClick('/galeria')} className="text-sm font-medium text-rose-950/70 hover:text-orange-600 transition-colors">Galería</button>
          <Link to="/gestion-interna-cita-ideal" className="bg-rose-50 text-rose-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all">Admin</Link>
        </div>

        {/* BOTÓN HAMBURGUESA */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-rose-900 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-orange-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6 font-serif italic text-lg text-rose-900">
              <button onClick={() => handleNavClick('/')} className="text-left hover:text-orange-500 transition-colors border-b border-orange-50 pb-2">
                Inicio
              </button>
              <button onClick={() => handleNavClick('/', true)} className="text-left hover:text-orange-500 transition-colors border-b border-orange-50 pb-2">
                Experiencias
              </button>
              <button onClick={() => handleNavClick('/galeria')} className="text-left hover:text-orange-500 transition-colors border-b border-orange-50 pb-2">
                Galería
              </button>
              <Link to="/gestion-interna-cita-ideal" onClick={() => setIsOpen(false)} className="text-rose-400 text-sm font-sans not-italic font-bold uppercase tracking-widest pt-2">
                Acceso Admin
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
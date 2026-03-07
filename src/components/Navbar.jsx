import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Función para manejar la navegación y cerrar el menú móvil
  const handleNavClick = (path, isAnchor = false) => {
    setIsOpen(false);
    if (isAnchor) {
      // Si estamos en otra página, vamos a inicio y luego scrolleamos
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('experiencias');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      navigate(path);
      window.scrollTo(0, 0); // Asegura que suba al inicio de la página
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9999] bg-white/90 backdrop-blur-md border-b border-orange-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO CON CORAZÓN BLANCO DISIMULADO */}
        <Link 
          to="/" 
          onClick={() => setIsOpen(false)} 
          className="group flex items-center gap-2 text-2xl font-serif font-bold text-rose-900 tracking-tighter"
        >
          <div className="flex items-center">
            Cita<span className="text-orange-500">Ideal</span>
            {/* El Corazón Blanco Pequeño */}
            <motion.div
              initial={{ opacity: 0.6, scale: 0.9 }}
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.9, 1.05, 0.9] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="ml-1.5 flex items-center justify-center w-5 h-5 bg-orange-400 rounded-full shadow-sm shadow-orange-200"
            >
              <svg 
                viewBox="0 0 24 24" 
                className="w-3 h-3 fill-white" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </motion.div>
          </div>
        </Link>

        {/* MENÚ ESCRITORIO */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => handleNavClick('/')} className="text-sm font-medium text-rose-950/70 hover:text-orange-600 transition-colors">Inicio</button>
          <button onClick={() => handleNavClick('/', true)} className="text-sm font-medium text-rose-950/70 hover:text-orange-600 transition-colors">Experiencias</button>
          <button onClick={() => handleNavClick('/galeria')} className="text-sm font-medium text-rose-950/70 hover:text-orange-600 transition-colors">Galería</button>
          <Link to="/gestion-interna-cita-ideal" className="bg-rose-50 text-rose-700 px-4 py-2 rounded-xl text-xs font-bold hover:bg-rose-100 transition-all">Acceso</Link>
        </div>

        {/* BOTÓN HAMBURGUESA (Móvil) */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-rose-900 focus:outline-none"
        >
          <div className="w-8 h-8 flex flex-col justify-center items-center gap-1.5">
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-7 h-0.5 bg-rose-900 block rounded-full"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-7 h-0.5 bg-rose-900 block rounded-full"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-7 h-0.5 bg-rose-900 block rounded-full"
            />
          </div>
        </button>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL (Con corrección de deslizamiento) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "circOut" }}
            className="md:hidden bg-white border-b border-orange-100 overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-8 gap-6 font-serif italic text-xl text-rose-900">
              <button 
                onClick={() => handleNavClick('/')} 
                className="text-left hover:text-orange-500 border-b border-orange-50 pb-2 transition-all"
              >
                Inicio
              </button>
              <button 
                onClick={() => handleNavClick('/', true)} 
                className="text-left hover:text-orange-500 border-b border-orange-50 pb-2 transition-all"
              >
                Experiencias
              </button>
              <button 
                onClick={() => handleNavClick('/galeria')} 
                className="text-left hover:text-orange-500 border-b border-orange-50 pb-2 transition-all"
              >
                Galería
              </button>
              <Link 
                to="/gestion-interna-cita-ideal" 
                onClick={() => setIsOpen(false)} 
                className="text-orange-400 text-sm font-sans not-italic font-bold uppercase tracking-[0.2em] pt-4"
              >
                Panel Administrativo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
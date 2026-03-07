import React from 'react';
import { Link } from 'react-router-dom'; // Importante para navegar entre rutas
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] bg-white/70 backdrop-blur-md border-b border-rose-100/50 h-20 flex items-center overflow-hidden">
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

        {/* MENÚ DE NAVEGACIÓN */}
        <div className="hidden md:flex items-center gap-7 font-medium text-rose-800/80 text-sm uppercase tracking-widest">
          
          <Link to="/" className="hover:text-rose-600 transition-all flex items-center gap-2 group">
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">🏠</span>
            Inicio
          </Link>

          {/* Si Planes está en el Home, usa href="/#planes" o Link to="/#planes" */}
          <a href="/#experiencias" className="hover:text-rose-600 transition-all flex items-center gap-2 group">
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">✨</span>
            Planes
          </a>

          {/* RUTA A LA OTRA VENTANA */}
          <Link to="/galeria" className="hover:text-rose-600 transition-all flex items-center gap-2 group">
            <span className="text-lg group-hover:scale-125 transition-transform duration-300">📸</span>
            Galería
          </Link>

          <a href="/#contacto" className="bg-rose-600 text-white px-6 py-2.5 rounded-full hover:bg-rose-700 transition-all shadow-lg shadow-rose-200 flex items-center gap-2 active:scale-95">
            <span>💌</span>
            Reservar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
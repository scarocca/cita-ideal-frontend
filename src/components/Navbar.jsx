import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAccesoSecreto = (e) => {
    if (e.detail === 2) {
      navigate('/gestion-interna-cita-ideal');
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 px-6 md:px-16 py-4 flex justify-between items-center ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-orange-50 py-3' 
        : 'bg-transparent'
    }`}>
      
      {/* LADO IZQUIERDO: LOGO + CORAZÓN SECRETO */}
      <div className="flex items-center gap-2">
        <Link to="/" className="text-2xl font-serif font-bold text-rose-900 tracking-tight">
          CitaIdeal
        </Link>
        
        <span 
          onClick={handleAccesoSecreto}
          className="text-rose-400 text-[12px] cursor-default select-none opacity-20 hover:opacity-100 transition-all duration-700 mt-1 ml-1"
        >
          🤍
        </span>
      </div>

      {/* LADO DERECHO: LINKS DE NAVEGACIÓN */}
      <div className="hidden md:flex items-center gap-10">
       
        {/* Este nos lleva a la página de fotos que creamos hoy */}
        <Link to="/galeria" className="text-sm font-medium text-gray-600 hover:text-rose-600 transition-colors">
          Galería
        </Link>
        </div>

      {/* MENÚ MÓVIL */}
      <div className="md:hidden text-rose-900">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
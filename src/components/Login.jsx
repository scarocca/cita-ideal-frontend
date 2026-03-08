import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const API_URL = "https://cita-ideal-backend.onrender.com";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        setError("Credenciales inválidas. Revisa el acceso.");
        return; 
      }

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/admin/dashboard");
      
    } catch (err) {
      setError("Error de conexión. Revisa el servidor en Render.");
    }
  };

  return (
    // CAMBIO CLAVE: h-screen para ocupar todo el alto y items-center para centrar verticalmente
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#fafaf9] overflow-x-hidden">
      
      {/* 1. Fondo decorativo que asegura que la página no esté "vacía" */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-rose-50/50 to-white"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-rose-100/30 blur-[120px] rounded-full"></div>
      </div>

      {/* 2. La Card con z-50 para que esté por encima de todo menos del Navbar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-50 w-full max-w-md mx-4 mt-20" // mt-20 empuja la card debajo del navbar
      >
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-orange-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold text-rose-900 mb-2">Panel Administrativo</h2>
            <div className="w-16 h-1 bg-orange-400 mx-auto rounded-full"></div>
          </div>

          {error && (
            <p className="bg-rose-50 text-rose-600 p-4 rounded-2xl text-xs text-center mb-6 border border-rose-100 font-bold">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-rose-900/60 font-bold mb-2 ml-1">
                Correo Electrónico
              </label>
              <input
                type="email"
                required
                className="w-full px-6 py-4 rounded-2xl bg-orange-50/30 border border-orange-100 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all text-rose-900"
                placeholder="admin@citaideal.cl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.2em] text-rose-900/60 font-bold mb-2 ml-1">
                Contraseña
              </label>
              <input
                type="password"
                required
                className="w-full px-6 py-4 rounded-2xl bg-orange-50/30 border border-orange-100 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all text-rose-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-rose-200 uppercase tracking-widest text-xs mt-4 transform active:scale-95"
            >
              Entrar al Panel
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <button onClick={() => navigate('/')} className="text-rose-400 text-[10px] font-bold uppercase tracking-widest hover:text-rose-600 transition-colors">
              ← Volver al inicio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
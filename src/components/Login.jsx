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
        body: JSON.stringify({ username: email, password })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/admin/dashboard");
      } else {
        // Si el servidor responde 401, no intentamos hacer .json() porque viene vacío
        setError("Credenciales incorrectas. Revisa el email y la clave en Railway.");
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor. ¿Está Eclipse corriendo?");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafaf9] px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-orange-100 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-serif font-bold text-rose-900 mb-2">Panel Administrativo</h2>
          <div className="w-16 h-1 bg-orange-400 mx-auto rounded-full"></div>
        </div>

        {error && (
          <p className="bg-rose-50 text-rose-600 p-3 rounded-xl text-sm text-center mb-6 border border-rose-100">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-rose-900/60 font-bold mb-2 ml-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              required
              className="w-full px-6 py-4 rounded-2xl bg-orange-50/30 border border-orange-100 focus:ring-2 focus:ring-rose-400 focus:bg-white outline-none transition-all text-rose-900"
              placeholder="sergio@citaideal.cl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-rose-900/60 font-bold mb-2 ml-1">
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
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-rose-200 uppercase tracking-widest text-sm transform active:scale-95"
          >
            Iniciar Sesión
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion'; 

// Componentes
import VisitTracker from './components/VisitTracker';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import PlanDetalle from './components/PlanDetalle';
import GaleriaFotos from './components/GaleriaFotos';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SplashCursor from './components/SplashCursor';
import ChatValentin from './components/ChatValentin'; 

const API_URL = "https://cita-ideal-backend.onrender.com";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [planes, setPlanes] = useState([]);
  const [chatAbierto, setChatAbierto] = useState(false);

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        const response = await fetch(`${API_URL}/api/v1/planes/ver/activos`);
        if (response.ok) {
          const data = await response.json();
          setPlanes(data);
        }
      } catch (error) {
        console.error("🔥 Error de conexión:", error.message);
      }
    };
    cargarPlanes();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      {/* Efecto de cursor moderno */}
      <SplashCursor SPLAT_RADIUS={0.3} CURL={2} DENSITY_DISSIPATION={3} />
      <VisitTracker /> 
      <Navbar />

      <div className="min-h-screen bg-transparent flex flex-col pt-20">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                {/* Aquí dentro de Hero ya vive tu CircularText de React Bits */}
                <Hero />
                <main className="relative z-10">
                  <Gallery planes={planes} />
                </main>
              </>
            } />

            <Route path="/plan/:id" element={<PlanDetalle planes={planes} />} />
            <Route path="/galeria" element={<GaleriaFotos />} />
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        {/* --- INTERFAZ FLOTANTE (CHAT, INSTAGRAM, BOTONES) --- */}
        
        <AnimatePresence>
          {chatAbierto && (
            <div className="fixed bottom-24 right-6 z-[10000]">
              <ChatValentin onClose={() => setChatAbierto(false)} />
            </div>
          )}
        </AnimatePresence>

        {/* Botón de Valentín (Chat) */}
        {!chatAbierto && (
          <button 
            type="button"
            onClick={() => setChatAbierto(true)}
            className="fixed bottom-8 right-8 z-[9999] bg-rose-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all flex items-center justify-center cursor-pointer border-none"
          >
            <span className="mr-2 text-[10px] font-bold uppercase tracking-[0.2em]">Valentín</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        )}

        {/* Botón de Instagram - Reposicionado para no chocar */}
        <a 
          href="https://instagram.com/tucitaideal.cl" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-28 right-8 md:bottom-32 z-50 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all active:scale-95 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
          <span className="absolute right-16 bg-white text-gray-800 text-[10px] font-bold px-2 py-1 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            ¡Síguenos! 📸
          </span>
        </a>

        {/* FOOTER */}
        <footer className="py-12 bg-white/50 backdrop-blur-sm border-t border-orange-100 text-center relative z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-rose-900/60 font-bold mb-2">
            Tu Cita Ideal — Experiencias Románticas
          </p>
          <p className="text-[9px] uppercase tracking-[0.1em] text-orange-900/40">
            &copy; 2026 — Sergio Carocca Dev
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
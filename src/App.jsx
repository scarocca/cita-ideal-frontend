import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 

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
  const [planSeleccionado, setPlanSeleccionado] = useState(null);
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
      <SplashCursor SPLAT_RADIUS={0.3} CURL={2} DENSITY_DISSIPATION={3} />
      <VisitTracker /> 
      <Navbar />

      <div className="min-h-screen bg-transparent flex flex-col pt-20">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <main className="relative z-10">
                  <Gallery
                    planes={planes}
                    onVerDetalle={(plan) => setPlanSeleccionado(plan)}
                  />

                  {/* PORTAL PARA MODAL DE DETALLE DE PLAN */}
                  <AnimatePresence>
                    {planSeleccionado && ReactDOM.createPortal(
                      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          onClick={() => setPlanSeleccionado(null)}
                          className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.9, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 20 }}
                          className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative z-[100001]"
                        >
                          <PlanDetalle
                            plan={planSeleccionado} 
                            onClose={() => setPlanSeleccionado(null)}
                          />
                        </motion.div>
                      </div>,
                      document.getElementById('modal-root')
                    )}
                  </AnimatePresence>
                </main>
              </>
            } />

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

        {/* 🆕 CHAT DE VALENTÍN COMO VENTANA PEQUEÑA FLOTANTE */}
        <AnimatePresence>
          {chatAbierto && (
            <div className="fixed bottom-24 right-6 z-[9999] pointer-events-auto">
              <ChatValentin 
                key="chat-valentin-modal" 
                onClose={() => setChatAbierto(false)} 
              />
            </div>
          )}
        </AnimatePresence>

        {/* BOTÓN FLOTANTE (Abajo del chat) */}
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
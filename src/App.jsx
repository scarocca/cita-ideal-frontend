import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; 

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
      {/* Efecto visual de fondo */}
      <SplashCursor 
        SPLAT_RADIUS={0.3} 
        CURL={2} 
        DENSITY_DISSIPATION={3} 
      />
      
      {/* 🟢 CONTADOR INVISIBLE: Ejecutándose en todo el sitio */}
      <VisitTracker /> 
      
      {/* Barra de navegación fija */}
      <Navbar />

      <div className="min-h-screen bg-transparent flex flex-col pt-20">
        <div className="flex-grow">
          <Routes>
            {/* RUTA PRINCIPAL (HOME) */}
            <Route path="/" element={
              <>
                <Hero />
                <main className="relative z-10">
                  <Gallery
                    planes={planes}
                    onVerDetalle={(plan) => setPlanSeleccionado(plan)}
                  />

                  {/* PORTAL PARA EL MODAL DE DETALLE */}
                  {planSeleccionado && ReactDOM.createPortal(
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={() => setPlanSeleccionado(null)}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                      />
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] shadow-2xl relative z-[100000]"
                      >
                        <PlanDetalle
                          plan={planSeleccionado} 
                          onClose={() => setPlanSeleccionado(null)}
                        />
                      </motion.div>
                    </div>,
                    document.getElementById('modal-root')
                  )}
                </main>
              </>
            } />

            {/* OTRAS RUTAS PÚBLICAS */}
            <Route path="/galeria" element={<GaleriaFotos />} />
            <Route path="/login" element={<Login />} />
            
            {/* RUTA PROTEGIDA DE ADMINISTRACIÓN */}
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

        {/* FOOTER COHERENTE */}
        <footer className="py-12 bg-white/50 backdrop-blur-sm border-t border-orange-100 text-center">
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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import PlanDetalle from './components/PlanDetalle';
import GaleriaFotos from './components/GaleriaFotos';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

const API_URL = "https://cita-ideal-backend.onrender.com";

function App() {
  const [planes, setPlanes] = useState([]);
  const [planSeleccionado, setPlanSeleccionado] = useState(null);

  useEffect(() => {
    const cargarPlanes = async () => {
      try {
        // ✅ CORREGIDO: Ruta exacta del Controller con Backticks
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

                  {planSeleccionado && ReactDOM.createPortal(
                    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
                      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl relative">
                        <PlanDetalle
                          plan={planSeleccionado}
                          onClose={() => setPlanSeleccionado(null)}
                        />
                      </div>
                    </div>,
                    document.getElementById('modal-root')
                  )}
                </main>
              </>
            } />
            <Route path="/galeria" element={<GaleriaFotos />} />
            <Route path="/gestion-interna-cita-ideal" element={<Login />} />
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
        <footer className="py-10 bg-white border-t border-orange-100 text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-orange-900/40 font-bold">
            &copy; 2026 CitaIdeal.cl — Sergio Carocca Dev
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
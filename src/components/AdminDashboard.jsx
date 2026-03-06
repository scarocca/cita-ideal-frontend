import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import GestionGaleria from './GestionGaleria';
import TablaGaleriaAdmin from './TablaGaleriaAdmin';
import GestionPlanes from './GestionPlanes';
import CrearPlanForm from './CrearPlanForm';
import ActualizarFotoPlan from './ActualizarFotoPlan'; 
const API_URL = "https://cita-ideal-backend.onrender.com";
const AdminDashboard = () => {
  const [adminName, setAdminName] = useState('');
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [refreshFotos, setRefreshFotos] = useState(0);
  const [mostrarFormPlan, setMostrarFormPlan] = useState(false);

  const [nuevaReserva, setNuevaReserva] = useState({
    nombreCliente: '',
    emailCliente: '',
    planId: '',
    fechaEvento: '',
    telefono: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setAdminName(foundUser.username);
      cargarReservas();
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const cargarReservas = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/v1/reservas/todas`);
      if (response.ok) {
        const data = await response.json();
        setReservas(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
     const response = await fetch(`${API_URL}/api/v1/reservas/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: nuevoEstado 
      });

      if (response.ok) {
        setReservas(reservas.map(res =>
          res.id === id ? { ...res, estado: nuevoEstado } : res
        ));
        if (nuevoEstado === 'CONFIRMADA') alert("✅ Reserva confirmada y correo enviado.");
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
    }
  };

  const eliminarReserva = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta reserva?")) {
      try {
        const response = await fetch(`${API_URL}/api/v1/reservas/${id}`, {
        });
        if (response.ok) {
          setReservas(reservas.filter(res => res.id !== id));
        }
      } catch (error) {
        console.error("Error al eliminar:", error);
      }
    }
  };

  const handleCrearReservaManual = async (e) => {
    e.preventDefault();
    if (!nuevaReserva.planId) { alert("Por favor selecciona un plan"); return; }

    try {
      const fechaISO = `${nuevaReserva.fechaEvento}T12:00:00`;
      const dataAEnviar = {
        nombreCliente: nuevaReserva.nombreCliente,
        emailCliente: nuevaReserva.emailCliente,
        telefonoCliente: nuevaReserva.telefono,
        plan: { id: parseInt(nuevaReserva.planId) },
        fechaCita: fechaISO,
        estado: 'PENDIENTE'
      };

     const response = await fetch(`${API_URL}/api/v1/reservas/crear`, {
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataAEnviar)
      });

      if (response.ok) {
        const reservaCreada = await response.json();
        setReservas([reservaCreada, ...reservas]);
        setMostrarForm(false);
        setNuevaReserva({ nombreCliente: '', emailCliente: '', planId: '', fechaEvento: '', telefono: '' });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleFotoSubida = () => {
    setRefreshFotos(prev => prev + 1);
  };

  const handlePlanCreado = () => {
    setMostrarFormPlan(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] pt-28 px-4 md:px-8 pb-20">
      <div className="max-w-7xl mx-auto">

        {/* 1. CABECERA */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 bg-white p-8 rounded-[2rem] shadow-sm border border-orange-100 gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-rose-900">Panel Administrativo</h1>
            <p className="text-orange-800/60 font-light italic">Usuario: {adminName}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="bg-rose-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-rose-700 transition-all shadow-lg"
            >
              {mostrarForm ? '✕ Cerrar Registro' : '+ Registrar Venta WhatsApp'}
            </button>
            <button onClick={handleLogout} className="bg-orange-50 text-orange-700 px-6 py-3 rounded-2xl font-bold border border-orange-100">
              Cerrar Sesión
            </button>
          </div>
        </div>

        {/* 2. GESTIÓN DE GALERÍA */}
        <section className="mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] font-black text-orange-500 mb-6 ml-4">📸 Galería de Fotos</h2>
          <div className="space-y-6">
            <GestionGaleria onFotoSubida={handleFotoSubida} />
            <TablaGaleriaAdmin refresh={refreshFotos} />
          </div>
        </section>

        {/* 3. GESTIÓN DE PLANES (Incorporado ActualizarFotoPlan aquí) */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6 px-4">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] font-black text-orange-500">✨ Catálogo de Planes</h2>
              <p className="text-rose-900 font-serif text-xl font-bold">Gestiona tus experiencias</p>
            </div>
            <button 
              onClick={() => setMostrarFormPlan(!mostrarFormPlan)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
                mostrarFormPlan ? 'bg-orange-100 text-orange-700' : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {mostrarFormPlan ? '✕ Cancelar' : '＋ Nuevo Plan'}
            </button>
          </div>

          <AnimatePresence>
            {mostrarFormPlan && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <CrearPlanForm onPlanCreado={handlePlanCreado} />
              </motion.div>
            )}
          </AnimatePresence>

          <GestionPlanes />

          {/* Incorporación de ActualizarFotoPlan como herramienta de edición rápida */}
          <div className="mt-8">
            <ActualizarFotoPlan />
          </div>
        </section>

        {/* 4. FORMULARIO DE RESERVA MANUAL (Con Labels legibles) */}
        <AnimatePresence>
          {mostrarForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white p-8 rounded-[2rem] shadow-xl border-2 border-orange-200 mb-10"
            >
              <h2 className="text-xl font-bold text-rose-900 mb-6">📝 Datos de la Reserva</h2>
              <form onSubmit={handleCrearReservaManual} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Nombre</label>
                  <input type="text" required value={nuevaReserva.nombreCliente} 
                    className="w-full p-3 bg-white border border-orange-200 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-rose-500" 
                    onChange={(e) => setNuevaReserva({ ...nuevaReserva, nombreCliente: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Correo</label>
                  <input type="email" required value={nuevaReserva.emailCliente} 
                    className="w-full p-3 bg-white border border-orange-200 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-rose-500" 
                    onChange={(e) => setNuevaReserva({ ...nuevaReserva, emailCliente: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Fecha</label>
                  <input type="date" required value={nuevaReserva.fechaEvento} 
                    className="w-full p-3 bg-white border border-orange-200 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-rose-500" 
                    onChange={(e) => setNuevaReserva({ ...nuevaReserva, fechaEvento: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Teléfono</label>
                  <input type="text" required value={nuevaReserva.telefono} 
                    className="w-full p-3 bg-white border border-orange-200 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-rose-500" 
                    onChange={(e) => setNuevaReserva({ ...nuevaReserva, telefono: e.target.value })} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Plan</label>
                  <select required value={nuevaReserva.planId} 
                    className="w-full p-3 bg-white border border-orange-200 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-rose-500" 
                    onChange={(e) => setNuevaReserva({ ...nuevaReserva, planId: e.target.value })}>
                    <option value="">-- Elige --</option>
                    <option value="1">Plan Orilla del Mar</option>
                    <option value="2">Cena Romántica</option>
                    <option value="3">Picnic Premium</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full bg-rose-600 text-white p-3.5 rounded-xl font-bold hover:bg-rose-700 transition-all shadow-md">Guardar</button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5. TABLA DE RESERVAS */}
        <section>
          <h2 className="text-xs uppercase tracking-[0.2em] font-black text-orange-500 mb-6 ml-4">📅 Próximas Reservas</h2>
          <div className="bg-white rounded-[2rem] shadow-sm border border-orange-100 overflow-hidden text-slate-900">
            <table className="w-full text-left">
              <thead className="bg-orange-50/50 text-[10px] uppercase tracking-widest font-black text-rose-800/50">
                <tr>
                  <th className="px-8 py-5 text-center">ID</th>
                  <th className="px-8 py-4">Cliente</th>
                  <th className="px-8 py-4">Plan</th>
                  <th className="px-8 py-4">Fecha</th>
                  <th className="px-8 py-4 text-center">Estado</th>
                  <th className="px-8 py-4 text-center">Gestión</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-50">
                <AnimatePresence>
                  {reservas.map((reserva) => (
                    <motion.tr
                      key={reserva.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="hover:bg-orange-50/10 transition-colors"
                    >
                      <td className="px-8 py-5 font-mono text-xs text-orange-400 text-center">#{reserva.id}</td>
                      <td className="px-8 py-5">
                        <div className="font-bold text-rose-950">{reserva.nombreCliente}</div>
                        <div className="text-[10px] text-gray-500 font-light">{reserva.emailCliente}</div>
                      </td>
                      <td className="px-8 py-5 text-sm text-gray-700 font-medium">{reserva.plan?.nombre}</td>
                      <td className="px-8 py-5 text-sm text-rose-800/70 font-serif italic">
                        {reserva.fechaCita ? reserva.fechaCita.split('T')[0] : 'Sin fecha'}
                      </td>
                      <td className="px-8 py-5 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${reserva.estado === 'CONFIRMADA' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                          {reserva.estado}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center gap-2">
                          {reserva.estado === 'PENDIENTE' && (
                            <button
                              onClick={() => handleCambiarEstado(reserva.id, 'CONFIRMADA')}
                              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all shadow-sm"
                              title="Confirmar y Enviar Correo"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          <button
                            onClick={() => eliminarReserva(reserva.id)}
                            className="bg-rose-50 text-rose-400 hover:bg-rose-600 hover:text-white p-2 rounded-lg transition-all"
                            title="Eliminar"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
};

export default AdminDashboard;
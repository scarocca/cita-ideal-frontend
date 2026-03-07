import React, { useState } from 'react';
import { motion } from 'framer-motion';

const API_URL = "https://cita-ideal-backend.onrender.com";

const EditarPlanModal = ({ plan, onClose, onActualizar }) => {
    // Inicializamos el estado con los datos actuales del plan
    const [datos, setDatos] = useState({ ...plan });
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            // CORRECCIÓN: Aseguramos que el ID se pase correctamente en la URL con backticks
            const response = await fetch(`${API_URL}/api/v1/planes/${plan.id}`, {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    nombre: datos.nombre,
                    descripcion: datos.descripcion,
                    // CORRECCIÓN: Convertimos el precio a número explícitamente para evitar errores en Java
                    precioBase: Number(datos.precioBase),
                    activo: datos.activo,
                    // Incluimos la imagenUrl para que no se pierda al actualizar los textos
                    imagenUrl: datos.imagenUrl
                })
            });

            if (response.ok) {
                alert("✅ Plan actualizado correctamente");
                onActualizar(); // Recarga la lista en el componente padre
                onClose();      // Cierra el modal
            } else {
                const errorData = await response.text();
                alert("❌ Error al actualizar: " + errorData);
            }
        } catch (error) {
            console.error("Error en la petición PUT:", error);
            alert("❌ Error de conexión con el servidor");
        } finally {
            setCargando(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl border border-orange-100"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-serif font-bold text-rose-900">Editar Experiencia</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-rose-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* CAMPO NOMBRE */}
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase ml-1">Nombre</label>
                        <input 
                            type="text"
                            required
                            className="w-full p-3 bg-orange-50/30 border border-orange-100 rounded-xl text-slate-900 font-medium outline-none focus:ring-2 focus:ring-rose-400 transition-all"
                            value={datos.nombre}
                            onChange={(e) => setDatos({...datos, nombre: e.target.value})}
                        />
                    </div>

                    {/* CAMPO DESCRIPCIÓN */}
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase ml-1">Descripción</label>
                        <textarea 
                            required
                            className="w-full p-3 bg-orange-50/30 border border-orange-100 rounded-xl text-slate-900 font-medium outline-none h-32 focus:ring-2 focus:ring-rose-400 transition-all resize-none"
                            value={datos.descripcion}
                            onChange={(e) => setDatos({...datos, descripcion: e.target.value})}
                        />
                    </div>

                    {/* CAMPO PRECIO */}
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase ml-1">Precio Base (CLP)</label>
                        <input 
                            type="number"
                            required
                            min="1"
                            className="w-full p-3 bg-orange-50/30 border border-orange-100 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-rose-400 transition-all"
                            value={datos.precioBase}
                            onChange={(e) => setDatos({...datos, precioBase: e.target.value})}
                        />
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-orange-200 text-orange-800 font-bold rounded-xl hover:bg-orange-50 transition-all active:scale-95"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={cargando}
                            className="flex-1 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg disabled:bg-gray-400 transition-all active:scale-95 flex items-center justify-center gap-2"
                        >
                            {cargando ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Guardando...
                                </>
                            ) : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditarPlanModal;
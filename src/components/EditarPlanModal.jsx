import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EditarPlanModal = ({ plan, onClose, onActualizar }) => {
    const [datos, setDatos] = useState({ ...plan });
    const [cargando, setCargando] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCargando(true);

        try {
            const response = await fetch(`http://localhost:8080/api/v1/planes/${plan.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: datos.nombre,
                    descripcion: datos.descripcion,
                    precioBase: datos.precioBase,
                    activo: datos.activo
                })
            });

            if (response.ok) {
                alert("✅ Plan actualizado correctamente");
                onActualizar();
                onClose();
            }
        } catch (error) {
            console.error("Error:", error);
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
                <h3 className="text-2xl font-serif font-bold text-rose-900 mb-6">Editar Experiencia</h3>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Nombre</label>
                        <input 
                            type="text"
                            className="w-full p-3 bg-orange-50/30 border border-orange-100 rounded-xl text-slate-900 font-medium outline-none focus:ring-2 focus:ring-rose-400"
                            value={datos.nombre}
                            onChange={(e) => setDatos({...datos, nombre: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Descripción</label>
                        <textarea 
                            className="w-full p-3 bg-orange-50/30 border border-orange-100 rounded-xl text-slate-900 font-medium outline-none h-32 focus:ring-2 focus:ring-rose-400"
                            value={datos.descripcion}
                            onChange={(e) => setDatos({...datos, descripcion: e.target.value})}
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1 uppercase">Precio Base</label>
                        <input 
                            type="number"
                            className="w-full p-3 bg-orange-50/30 border border-orange-100 rounded-xl text-slate-900 font-bold outline-none focus:ring-2 focus:ring-rose-400"
                            value={datos.precioBase}
                            onChange={(e) => setDatos({...datos, precioBase: e.target.value})}
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button 
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-orange-200 text-orange-800 font-bold rounded-xl hover:bg-orange-50 transition-all"
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit"
                            disabled={cargando}
                            className="flex-1 py-3 bg-rose-600 text-white font-bold rounded-xl hover:bg-rose-700 shadow-lg disabled:bg-gray-400"
                        >
                            {cargando ? 'Guardando...' : 'Guardar Cambios'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditarPlanModal;